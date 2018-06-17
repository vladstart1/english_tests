import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

import styles from './Sidenav_items.css';

const SideNavItems = ({ user, onHideNav }) => {

    const items = [
        {
            type: styles.option,
            icon: 'home',
            text: 'Главная',
            link: '/',
            restricted: false
        },
        {
            type: styles.option,
            icon: 'file-text-o',
            text: 'Профиль',
            link: '/user',
            restricted: true
        },
        {
            type: styles.option,
            icon: 'file-text-o',
            text: 'Регистрация',
            link: '/user/register',
            restricted: false,
            exclude: true
        },
        {
            type: styles.option,
            icon: 'file-text-o',
            text: 'Войти',
            link: '/login',
            restricted: false,
            exclude: true
        },
        {
            type: styles.option,
            icon: 'file-text-o',
            text: 'Мои вопросы',
            link: '/user/user-questions',
            restricted: true
        },
        {
            type: styles.option,
            icon: 'file-text-o',
            text: 'Добавить вопрос',
            link: '/user/add',
            restricted: true
        },
        {
            type: styles.option,
            icon: 'file-text-o',
            text: 'Выйти',
            link: '/user/logout',
            restricted: true
        }
    ];

    const element = (item, i) => (
        <NavLink className={styles.navItem} key={i} to={item.link} exact onClick={onHideNav} activeClassName={styles.selected}>
            <div className={item.type}>
                {item.text}
            </div>
        </NavLink>

    );


    const showItems = () => (
        user.login ?
            items.map((item, i) => {
                if (user.login.isAuth) {
                    return !item.exclude ?
                        element(item, i)
                        : null
                } else {
                    return !item.restricted ?
                        element(item, i)
                        : null
                }
            })
            :
            null
    );

    return (
        <div>
            {showItems()}
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}


export default connect(mapStateToProps)(SideNavItems);