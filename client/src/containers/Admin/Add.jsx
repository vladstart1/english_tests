import React, { Component } from 'react';
import styles from './AddQuestion.css';
import RightAnsverButton from './RightAnsverButton';
import { connect } from 'react-redux';
import { addQuestion } from '../../actions';
import { TextField, Button, Select, MenuItem, FormControl, FormControlLabel, RadioGroup, Radio, FormLabel } from '@material-ui/core/';

class AddQuestion extends Component {

    state = {
        formdata: {
            question: '',
            description: '',
            level: '',
            category: '',
            answers: ['', ''],
            rightAnswers: [],
            rating: '',
            random: false
        },
        open: false,
        validErr: false
    }

    handleAnswerChange = (idx) => (evt) => {
        const newAnswers = this.state.formdata.answers.map((answer, sidx) => {
            if (idx !== sidx) return answer;
            return evt.target.value;
        });
        this.setState({
            formdata: {
                ...this.state.formdata,
                answers: newAnswers
            }
        });
    }
    handleAddAnswer = () => {
        this.setState({
            formdata: {
                ...this.state.formdata,
                answers: this.state.formdata.answers.concat([''])
            }
        });
    }
    handleRemoveAnswer = (idx) => () => {
        this.setState({
            formdata: {
                ...this.state.formdata,
                answers: this.state.formdata.answers.filter((s, sidx) => idx !== sidx)
            }
        });
    }

    handleAddRightAnswer = (idx) => (e) => {
        if (this.state.formdata.answers[idx] === '') return;
        const newRightAnswers = this.state.formdata.rightAnswers.concat(this.state.formdata.answers[idx]);
        this.setState({
            formdata: {
                ...this.state.formdata,
                rightAnswers: newRightAnswers
            },
            disabled: true
        })
    }

    handleInput = (e, name) => {
        const newFormData = {
            ...this.state.formdata
        };
        newFormData[name] = e.target.value;
        this.setState({
            formdata: newFormData
        })
    }

    showNewQuestion = (question) => (
        question.post ?
            <div className={styles.success_add}>
                Ваш вопрос был добавлен!
                {/* {this.redirectUser()} */}
            </div>
            :
            <div className={styles.err_add}>
                Ошибка валидации:
                {this.props.questions.newQuestion.response.data.message} !!!
            </div>
    )

    handleClose = () => {
        this.setState({
            open: false,
            validErr: false
        });
    }

    redirectUser = () => {
        setTimeout(() => {
            this.props.history.push('/user/user-questions')
        }, 3000)
    }

    submitForm = (e) => {
        e.preventDefault();
        this.props.dispatch(addQuestion({
            ...this.state.formdata,
            ownerId: this.props.user.login.id
        }))
    }


    render() {
        return (
            <div className={styles.root}>
                <form onSubmit={this.submitForm}>
                    <h2>Добавить вопрос</h2>
                    <div className={styles.form_element}>
                    <TextField
                            type="text"
                            label='Введите вопрос'
                            value={this.state.formdata.question}
                            fullWidth
                            onChange={(e) => this.handleInput(e, 'question')}
                        />
                    </div>

                    <div className={styles.form_element}>
                    <TextField type="text"
                            label='Введите описание'
                            value={this.state.formdata.description}
                            multiline
                            onChange={(e) => this.handleInput(e, 'description')}
                            rows="6"
                            fullWidth
                        />
                    </div>
                    <div className={styles.form_element}>
                        {this.state.formdata.answers.map((answer, idx) => (
                                <RightAnsverButton key={idx} answer={answer} id={idx} addRightAnswer={this.handleAddRightAnswer(idx)} handleChange={this.handleAnswerChange(idx)} removeAnswer={this.handleRemoveAnswer(idx)} />
                        ))}
                        <Button variant="contained" color="primary" type="button" onClick={this.handleAddAnswer}>Добавить вариант ответа</Button>

                    </div>
                    <div className={styles.form_selects}>
                        <div className={styles.form_inner_selects}>
                            <FormControl>
                                <Select
                                    value={this.state.formdata.level}
                                    onChange={(e) => this.handleInput(e, 'level')}
                                    displayEmpty
                                >
                                    <MenuItem value="" disabled>Уровень сложности</MenuItem>
                                    <MenuItem value="А1">А1 - Начинающий</MenuItem>
                                    <MenuItem value="А2">А2 - Начинающий</MenuItem>
                                    <MenuItem value="B1">B1 - Начинающий</MenuItem>
                                    <MenuItem value="B2">B2 - Начинающий</MenuItem>
                                    <MenuItem value="C1">C1 - Начинающий</MenuItem>
                                    <MenuItem value="C2">C2 - Начинающий</MenuItem>
                                </Select>
                            </FormControl>
                            <FormControl>
                                <Select
                                    value={this.state.formdata.rating}
                                    onChange={(e) => this.handleInput(e, 'rating')}
                                    displayEmpty
                                >
                                    <MenuItem value="" disabled>Оценка</MenuItem>
                                    <MenuItem value="1">1</MenuItem>
                                    <MenuItem value="2">2</MenuItem>
                                    <MenuItem value="3">3</MenuItem>
                                    <MenuItem value="4">4</MenuItem>
                                    <MenuItem value="5">5</MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                        <FormControl component="fieldset">
                            <FormLabel component="legend">Times</FormLabel>
                            <RadioGroup
                                aria-label="times"
                                name="times"
                                value={this.state.formdata.category}
                                onChange={(e) => this.handleInput(e, 'category')}
                            >
                                <FormControlLabel value="Present" control={<Radio />} label="Present" />
                                <FormControlLabel value="Past" control={<Radio />} label="Past" />
                                <FormControlLabel value="Future" control={<Radio />} label="Future" />
                            </RadioGroup>
                        </FormControl>
                    </div>
                    <div className={styles.form_sumit}>
                        <Button variant="contained" color="primary" type="submit">Отправить</Button>
                    </div>
                    {
                        this.props.questions.newQuestion ?
                            this.showNewQuestion(this.props.questions.newQuestion)
                            :
                            null
                    }
                </form>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        questions: state.questions
    }
}

export default connect(mapStateToProps)(AddQuestion);