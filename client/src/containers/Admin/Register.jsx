import React, { PureComponent } from 'react';
import {connect} from 'react-redux';
import {userRegister,clearRegister} from '../../actions';
import { TextField, Button, Snackbar } from '@material-ui/core/';
import styles from './AddQuestion.css';

class Register extends PureComponent {

    state = {
       name: '',
       lastname: '',
       email: '',
       password: '',
       message: '',
       open: false
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.user.register === true){
            this.setState({
                name: '',
                lastname: '',
                email: '',
                password: '',
                message: 'Вы успешно зарегистрировались, перенаправляем вас на страницу входа...',
                open: true
            });
        } else {
            this.setState({message: 'Ошибка, попробуйте еще раз',
            open: true})
        }
    }

    componentWillUnmount() {
        this.props.dispatch(clearRegister());
    }

    handleInputEmail = (e) => {
        this.setState({email: e.target.value});
    }

    handleInputPassword = (e) => {
        this.setState({password: e.target.value});
    }

    handleInputName = (e) => {
        this.setState({name: e.target.value});
    }

    handleInputLastname = (e) => {
        this.setState({lastname: e.target.value});
    }

    submitForm = (e) => {
        e.preventDefault();
        this.setState({message: ''});
        this.props.dispatch(userRegister({
            email: this.state.email,
            password: this.state.password,
            name: this.state.name,
            lastname: this.state.lastname
        }))
    }

    redirectUser = () => {
        setTimeout(() => {
            this.props.history.push('/login')
        }, 3000)
    }

    handleClose = () => {
        this.setState({
            open: false
        })
    }

    render() {
        return (
            <div className={styles.root}>
            <Snackbar
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    open={this.state.open}
                    onClose={this.handleClose}
                    autoHideDuration={3000}
                    ContentProps={{
                        'aria-describedby': 'message-id',
                    }}
                    message={<span id="message-id">{this.state.message}</span>}
                />
                <form onSubmit={this.submitForm}>
                    <h2>Регистрация</h2>

                    <div>
                        <TextField 
                            type="text"
                            label='Введите Имя'
                            fullWidth
                            value={this.state.name}
                            onChange={this.handleInputName}
                        />
                    </div>
                    <div>
                        <TextField 
                            type="text"
                            label='Введите Фамилию'
                            fullWidth
                            value={this.state.lastname}
                            onChange={this.handleInputLastname}
                        />
                    </div>
                    <div>
                        <TextField 
                            type="email"
                            label='Введите Email'
                            fullWidth
                            value={this.state.email}
                            onChange={this.handleInputEmail}
                        />
                    </div>
                    <div>
                        <TextField 
                            type="password"
                            label='Введите Пароль'
                            fullWidth
                            value={this.state.password}
                            onChange={this.handleInputPassword}
                        />
                    </div>
                    <div className={styles.submit_button}>
                    <Button variant="contained" color="primary" type="submit">Зарегистрироваться</Button>
                    </div>
                </form>
                {this.props.user.register === true ?
                this.redirectUser()
                :null }
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(Register);