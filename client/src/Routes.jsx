import React from 'react';
import {Switch, Route} from 'react-router-dom';

import Home from './components/Home/Home';
import Layout from './hoc/Layout';
import Login from './containers/Admin/Login';
import User from './components/Admin';
import AddQuestion from './containers/Admin/Add';
import UserQuestions from './components/Admin/UserQuestions';
import EditQuestion from './containers/Admin/Edit';
import Register from './containers/Admin/Register';
import Logout from './components/Admin/Logout';

import Auth from './hoc/Auth';


const Routes = () => {
    return (
        <Layout>
            <Switch>
                <Route path='/' exact component={Auth(Home,null)}/>
                <Route path='/login' exact component={Auth(Login,false)}/>
                <Route path='/user' exact component={Auth(User,true)}/>
                <Route path='/user/logout' exact component={Auth(Logout,true)}/>
                <Route path='/user/add' exact component={Auth(AddQuestion,true)}/>
                <Route path='/user/register' exact component={Auth(Register,false)}/>
                <Route path='/user/edit-question/:id' exact component={Auth(EditQuestion,true)}/>
                <Route path='/user/user-questions' exact component={Auth(UserQuestions,true)}/>
            </Switch>
        </Layout>
    );
};

export default Routes;