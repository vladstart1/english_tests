import React, { PureComponent } from 'react';
import styles from './AddQuestion.css';
import RightAnsverButton from './RightAnsverButton';
import { connect } from 'react-redux';
import { getQuestion, updateQuestion, clearQuestion, deleteQuestion } from '../../actions';
import { TextField, Button, Select, MenuItem, FormControl, InputLabel, FormControlLabel, RadioGroup, Radio, FormLabel, Snackbar } from '@material-ui/core/';


class EditQuestion extends PureComponent {

    state = {
        formdata: {
            _id: this.props.match.params.id,
            question: '',
            description: '',
            level: '',
            category: 'Present',
            answers: ['', ''],
            rightAnswers: [],
            rating: '',
            random: false
        },
        open: false,
        deleted: false
    }

    componentWillReceiveProps(nextProps) {
        let question = nextProps.questions.question;
        this.setState({
            formdata: {
                _id: question._id,
                question: question.question,
                description: question.description,
                level: question.level,
                category: question.category,
                answers: question.answers,
                rightAnswers: question.rightAnswers,
                rating: `${question.rating}`,
                random: question.random
            }
        })
    }

    componentWillMount() {
        this.props.dispatch(getQuestion(this.props.match.params.id));
    }

    componentWillUnmount() {
        this.props.dispatch(clearQuestion());
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

    handleRemoveAnswer = (idx, answer) => () => {
        this.state.formdata.rightAnswers.includes(answer) ? 
        this.setState({
            formdata: {
                ...this.state.formdata,
                answers: this.state.formdata.answers.filter((s, sidx) => idx !== sidx),
                rightAnswers: this.state.formdata.rightAnswers.filter(a=>a!==answer)
            }
        })
        :
        this.setState({
            formdata: {
                ...this.state.formdata,
                answers: this.state.formdata.answers.filter((s, sidx) => idx !== sidx)
            }
        })
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

    submitForm = (e) => {
        e.preventDefault();
        this.props.dispatch(updateQuestion(this.state.formdata))
            .then(() => {
                this.setState({
                    open: this.props.questions.updateQuestion
                });
            })
    }

    handleClose = () => {
        this.setState({
            open: false,
            deleted: false
        });
    }

    deletePost = () => {
        this.props.dispatch(deleteQuestion(this.props.match.params.id))
            .then(() => {
                this.setState({
                    deleted: true
                })
            })
    }

    redirectUser = () => {
        setTimeout(() => {
            this.props.history.push('/user/user-questions')
        }, 2000)
    }

    render() {
        return (
            <div className={styles.root}>
                {
                    this.props.questions.postDeleted ?
                        this.redirectUser()
                        : null
                }
                <Snackbar
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    open={this.state.open}
                    onClose={this.handleClose}
                    autoHideDuration={2500}
                    ContentProps={{
                        'aria-describedby': 'message-id',
                    }}
                    message={<span id="message-id">Вопрос изменен!</span>}
                />
                <Snackbar
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    open={this.state.deleted}
                    onClose={this.handleClose}
                    autoHideDuration={2500}
                    ContentProps={{
                        'aria-describedby': 'message-id',
                    }}
                    message={<span id="message-id">Вопрос удален!</span>}
                />
                <form onSubmit={this.submitForm}>
                    <h2>Изменить вопрос</h2>
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
                            <RightAnsverButton key={idx} answer={answer} id={idx} addRightAnswer={this.handleAddRightAnswer(idx)} handleChange={this.handleAnswerChange(idx)} removeAnswer={this.handleRemoveAnswer(idx,answer)} rightAnswers={this.state.formdata.rightAnswers} />
                        ))}
                        <Button variant="contained" color="primary" type="button" onClick={this.handleAddAnswer}>Добавить вариант ответа</Button>

                    </div>
                    <div className={styles.form_selects}>
                        <div className={styles.form_inner_selects}>
                            <FormControl>
                                <InputLabel htmlFor="level">Уровень сложности</InputLabel>
                                <Select
                                    value={this.state.formdata.level}
                                    onChange={(e) => this.handleInput(e, 'level')}
                                >
                                    <MenuItem value="А1">А1 - Начинающий</MenuItem>
                                    <MenuItem value="А2">А2 - Базовый</MenuItem>
                                    <MenuItem value="B1">B1 - Ниже среднего</MenuItem>
                                    <MenuItem value="B2">B2 - Средний</MenuItem>
                                    <MenuItem value="C1">C1 - Выше среднего</MenuItem>
                                    <MenuItem value="C2">C2 - Продвинутый</MenuItem>
                                </Select>
                            </FormControl>
                            <FormControl>
                                <InputLabel htmlFor="rating">Оценка</InputLabel>
                                <Select
                                    value={this.state.formdata.rating}
                                    onChange={(e) => this.handleInput(e, 'rating')}
                                >
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
                        <Button variant="contained" color="primary" type="submit">Изменить</Button>
                        <Button variant="contained" color="secondary"
                            onClick={this.deletePost}
                        >
                            Удалить
                    </Button>
                    </div>
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

export default connect(mapStateToProps)(EditQuestion);