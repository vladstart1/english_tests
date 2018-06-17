const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const mongoose = require('mongoose');
const config = require('./config/config').get(process.env.NODE_ENV);

const app = express();

mongoose.Promise = global.Promise;
mongoose.connect(config.DATABASE);
const User = require('./models/user');
const Question = require('./models/question');
const auth = require('./middleware/auth');

app.use(bodyParser.json());
app.use(cookieParser());

app.use(express.static('client/build'))


// GET
app.get('/api/auth', auth, (req,res)=>{
    res.json({
        isAuth: true,
        id: req.user._id,
        email: req.user.email,
        name: req.user.name,
        lastname: req.user.lastname
    })
})

app.get('/api/logout', auth, (req,res)=>{
    req.user.deleteToken(req.token, (err, user)=>{
        if (err) return res.status(400).send(err);
        res.sendStatus(200);        
    })

})

app.get('/api/getQuestion',(req,res)=>{
    let id = req.query.id;
    
    Question.findById(id,(err,doc)=>{
        if (err) return res.status(400).send(err);
        res.send(doc);        
    })

});

app.get('/api/questions',(req,res)=>{

    let skip = parseInt(req.query.skip) || 0;
    let limit = parseInt(req.query.limit) || 0;
    let order = req.query.order || 'desc';
    let nin = req.query.nin || [];

    // ORDER = asc || desc
    Question.find({ _id: { $nin: JSON.parse(nin) } }).skip(skip).sort({_id: order}).limit(limit).exec((err,doc)=>{
        if (err) return res.status(400).send(err);
        res.send(doc);
    })

})

app.get('/api/getOwner',(req, res)=>{

    let id = req.query.id;
    User.findById(id,(err,doc)=>{
        if (err) return res.status(400).send(err);
        res.json({
            name: doc.name,
            lastname: doc.lastname
        })        
    })

}) 

app.get('/api/users', (req,res)=>{
    User.find({},(err,users)=>{
        if (err) return res.status(400).send(err);        
        res.status(200).send(users);
    })
})

app.get('/api/user_posts', (req,res)=>{
    Question.find({ownerId: req.query.user}).exec((err,docs)=>{
        if (err) return res.status(400).send(err);        
        res.send(docs);        
    })
})

// POST

app.post('/api/question', (req,res)=>{
    const question = new Question(req.body);

    question.save((err, doc)=>{
        if (err) return res.status(400).send(err);
        res.status(200).json({
            post: true,
            questionId: doc._id
        })
    })
})

app.post('/api/register',(req,res)=>{
    const user = new User(req.body);

    user.save((err,doc)=>{
        if (err) return res.status(400).json({success:false});
        res.status(200).json({
            success: true,
            user: doc
        })
    })
})

app.post('/api/login', (req,res)=>{

    User.findOne({'email': req.body.email},(err, user)=>{
        if(!user) return res.json({
            isAuth: false,
            message: 'Не удалось войти, проверьте правильность email\'a'
        });

        user.comperePassword(req.body.password, (err, isMatch)=>{
            if(!isMatch) return res.json({
                isAuth: false,
                message: 'Не верный пароль'
            });

            user.generateToken((err, user)=>{
                if(err) return res.status(400).send(err);
                res.cookie('auth', user.token).json({
                    isAuth: true,
                    id: user._id,
                    email: user.email
                })
            })
        })
    })

})

// UPDATE
app.post('/api/question_update', (req,res)=>{
    Question.findByIdAndUpdate(req.body._id, req.body,{new: true}, (err,doc)=>{
        if (err) return res.status(400).send(err);
        res.json({
            success: true,
            doc
        })
    })
})



// DELETE

app.delete('/api/delete_question', (req,res)=>{
    let id = req.query.id;

    Question.findByIdAndRemove(id,(err,doc)=>{
        if (err) return res.status(400).send(err);
        res.json(true)
    })
})

if(process.env.NODE_ENV === 'production'){
    const path = require('path');
    app.get('/*', (req,res)=>{
        res.sendfile(path.resolve(__dirname,'../client','build', 'index.html'))
    });
}


const port = process.env.PORT || 3001;
app.listen(port,()=>{
    console.log(`Server is running on port: ${port}`);
})