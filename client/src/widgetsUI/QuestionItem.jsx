import React, { PureComponent } from 'react';
import Popup from 'react-popup';
import './style.css';
import { Motion, spring } from 'react-motion';
import { FormControl, FormControlLabel, RadioGroup, Radio ,Button } from '@material-ui/core/';

import styles from './question_item.css';
import Checkbox from './Checkbox';

class QuestionItem extends PureComponent {

    state = {
        loading: false,
        selectedOption: '',
        disabled: false,
        showResult: false
    }

    componentWillMount = () => {
        this.selectedCheckboxes = new Set();
      }

    toggleCheckbox = label => {
        if (this.selectedCheckboxes.has(label)) {
          this.selectedCheckboxes.delete(label);
        } else {
          this.selectedCheckboxes.add(label);
        }
      }

    createCheckbox = label => (
        <Checkbox
                label={label}
                handleCheckboxChange={this.toggleCheckbox}
                key={label}
            />
      )

    equalCheckboxAnswers = (rightAnswers, checkboxSet) => {
        const checkboxArrSorted = Array.from(checkboxSet).sort();
        const rightAnswersSorted = rightAnswers.sort();
        return checkboxArrSorted.length===rightAnswersSorted.length && checkboxArrSorted.every(function(v,i) { return v === rightAnswersSorted[i]});
    }

    checkAnswer = e => {
        e.preventDefault();
        if (this.props.question.rightAnswers.length > 1) {
            if (this.selectedCheckboxes.size === 0) return Popup.alert('Выберите хотя бы один ответ!');
            this.props.answeredQuestion(this.props.question._id);
            this.setState({
                disabled: true,
                showResult: true
            })
    } else {
            if (this.state.selectedOption === '') return Popup.alert('Выберите ответ!');
        this.props.answeredQuestion(this.props.question._id);
        this.setState({
            disabled: true,
            showResult: true
        })
    }
    }

    handleChange = (e) => {
        this.setState({
            selectedOption: e.target.value
        })
    }

    renderAnswers = () => (
        this.props.question.answers ?
            this.props.question.answers.map((answer, i) => (
                    <FormControlLabel key={i} value={answer} control={<Radio />} label={answer} />
            ))
            :
            null
    )

    showResult = () => {
        if(this.props.question.rightAnswers.length > 1) {
            return (
                this.equalCheckboxAnswers(this.props.question.rightAnswers,this.selectedCheckboxes) ?
                <Motion defaultStyle={{ x: 0 }} style={{ x: spring(1) }}>
                    {value => <div
                        className={styles.answer_check_right}
                        style={{ opacity: value.x.toFixed(1) }}
                    >
                        <span className={styles.answer_text}>Верно!</span>
                    </div>}
                </Motion>
                :
                <Motion defaultStyle={{ x: 0 }} style={{ x: spring(1) }}>
                    {value => <div
                        className={styles.answer_check_wrong}
                        style={{ opacity: value.x.toFixed(1) }}
                    >
                        <span className={styles.answer_text}>Верные ответы были: {this.props.question.rightAnswers.map((item,i)=>{
                            if(i === this.props.question.rightAnswers.length-1) return `${item}`;
                            return `${item}, `
                        })}</span>
                    </div>}
                </Motion>
            )
        } else {
            return (
                this.state.selectedOption === this.props.question.rightAnswers[0] ?
            <Motion defaultStyle={{ x: 0 }} style={{ x: spring(1) }}>
                {value => <div
                    className={styles.answer_check_right}
                    style={{ opacity: value.x.toFixed(1) }}
                >
                    <span className={styles.answer_text}>Верно!</span>
                </div>}
            </Motion>
            :
            <Motion defaultStyle={{ x: 0 }} style={{ x: spring(1) }}>
                {value => <div
                    className={styles.answer_check_wrong}
                    style={{ opacity: value.x.toFixed(1) }}
                >
                    <span className={styles.answer_text}>Верный ответ был: {this.props.question.rightAnswers[0]}</span>
                </div>}
            </Motion>
            )
        }
    }

    renderCheckboxes = () => (
        this.props.question.answers ?
            this.props.question.answers.map(this.createCheckbox)
            :null
    )

    render() {
        return (
            <div className={styles.question_item}>
                {this.state.showResult ?
                    this.showResult()
                    :
                    null
                }
                <div className={styles.question_main}>
                    <div className={styles.question_header}>
                        <h3>{this.props.question.question}</h3>
                    </div>
                    <div className={styles.question_items}>
                        {this.props.question.description ?
                            <div className={styles.question_descript}>{this.props.question.description}</div>
                            :
                            null
                        }
                        <form onSubmit={this.checkAnswer} className={styles.question_form} data-key={this.props.question._id}>
                            { this.props.question.rightAnswers.length > 1 ? 
                            <div>
                            {this.renderCheckboxes()}
                            </div>
                            :
                             <FormControl component="fieldset" required>
                                <RadioGroup
                                    aria-label="answers"
                                    name="answers"
                                    value={this.state.selectedOption}
                                    onChange={this.handleChange}
                                    disabled={this.state.disabled}
                                >
                                    {this.renderAnswers()}
                                </RadioGroup>
                            </FormControl>}
                            <Button size="small" className={styles.question_button} type="submit" variant="raised" disabled={this.state.disabled}>Ответить</Button>
                        </form>
                    </div>
                    <div className={styles.question_info}>
                        <div className={styles.question_info_desc}>Категория: <span className={styles.bold}>{this.props.question.category}</span></div>
                        <div className={styles.question_info_desc}>Уровень: <span className={styles.bold}>{this.props.question.level}</span></div>
                    </div>
                </div>
            </div>
        );
    }
}

export default QuestionItem;