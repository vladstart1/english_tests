import React, { Component } from 'react';
import {connect} from 'react-redux';
import {loginUser} from '../../actions';
import { TextField, Button, Snackbar } from '@material-ui/core/';
import styles from './AddQuestion.css';

class Login extends Component {

    state = {
        email: '',
        password: '',
        error: '',
        success: false,
        open: false
    }

    submitForm = (e) => {
        e.preventDefault();
        this.props.dispatch(loginUser(this.state))
        .then(()=>{
            this.setState({
                open: true
            })
        })
    }

    handleInputEmail = (e) => {
        this.setState({email: e.target.value})
    }

    handleInputPassword = (e) => {
        this.setState({password: e.target.value})
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.user.login.isAuth){
            this.props.history.push('/user')
        }
    }

    handleClose = () => {
        this.setState({
            open: false
        })
    }

    render() {
        let user = this.props.user;
        return (
            <div className={styles.root}>
                <form onSubmit={this.submitForm}>
                    <h2>Введите данные для входа:</h2>
                    <div>
                        <TextField
                            type="email"
                            label='Введите Email'
                            value={this.state.email}
                            fullWidth
                            onChange={this.handleInputEmail}
                        />
                    </div>
                    <div>
                    <TextField
                            type="password"
                            label='Введите Email'
                            value={this.state.password}
                            fullWidth
                            onChange={this.handleInputPassword}
                        />
                    </div>
<div className={styles.submit_button}>
<Button variant="contained" color="primary" type="submit">Войти</Button>
</div>
                    {
                        user.login ?

                                        <Snackbar
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    open={this.state.open}
                    onClose={this.handleClose}
                    autoHideDuration={4000}
                    ContentProps={{
                        'aria-describedby': 'message-id',
                    }}
                    message={<span id="message-id">{user.login.message}</span>}
                />
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
        user: state.user
    }
}

export default connect(mapStateToProps)(Login);