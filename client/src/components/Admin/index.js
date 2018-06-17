import React from 'react';
import styles from './style.css';

const User = (props) => {
    let user = props.user.login;
    return (
        <div className={styles.root}>
            <div className={styles.avatar}>
                <img src="/images/avatar.png" alt="avatar"/>
            </div>
            <div className={styles.user_info}>
                <div><span>Name:</span> {user.name}</div>
                <div><span>Lastname:</span> {user.lastname}</div>
                <div><span>Email:</span> {user.email}</div>
            </div>
        </div>
    );
};

export default User;