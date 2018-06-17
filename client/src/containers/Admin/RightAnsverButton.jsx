import React, { Component } from 'react';
import {TextField,Button} from '@material-ui/core/';
import styles from './AddQuestion.css';

class RightAnsverButton extends Component {
    state = {
        disabled: false
    }

    handleAdd = () => {
        this.props.addRightAnswer()
        this.setState({
            disabled: true
        })
    }

    handleRemove = () => {
        this.props.removeAnswer();
        if(this.state.disabled){
        this.setState({
            disabled: !this.state.disabled
        })}
    }

    render() {
        return (
            <div className={styles.answer}>
            <TextField
                fullWidth
                type="text"
                label={`Ответ №${this.props.id + 1}`}
                value={this.props.answer}
                onChange={this.props.handleChange}
                disabled={this.state.disabled}
            />
            <Button variant="outlined" size="small" type="button" disabled={this.state.disabled} onClick={this.handleAdd} className={styles.answer_button}>✓</Button>
            <Button variant="outlined" size="small" type="button" onClick={this.handleRemove} className={styles.answer_button}>–</Button>
            </div>
        );
    }
}

export default RightAnsverButton;