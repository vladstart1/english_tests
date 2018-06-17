import React, { Component } from 'react';
import {connect} from 'react-redux';
import {getUserQuestions} from '../../actions';
import {Link} from 'react-router-dom';
import moment from 'moment-js';
import styles from './style.css';

class UserQuestions extends Component {

    componentWillMount() {
        this.props.dispatch(getUserQuestions(this.props.user.login.id))
    }

    showUserQuestions = (user) => (
        user.userQuestions ?
            user.userQuestions.map(item=>(
                <tr key={item._id}>
                    <td>
                    <Link to={`/user/edit-question/${item._id}`}>
                    {item.question}
                    </Link>
                    </td>
                    <td>{moment(item.createdAt).format('DD/MM/YY')}</td>
                </tr>
            ))
        :null
    )

    render() {
        let user = this.props.user;
        return (
            <div>
                <h4>Твои вопросы:</h4>
                <table className={styles.questins_table}>
                    <thead>
                        <tr>
                            <th>Question</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.showUserQuestions(user)}
                    </tbody>
                </table>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(UserQuestions);