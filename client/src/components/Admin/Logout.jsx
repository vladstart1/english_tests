import React from 'react';
import axios from 'axios';

const Logout = (props) => {

    axios.get(`/api/logout`)
    .then(res=>{
        setTimeout(()=>{
            props.history.push('/')
        },2000)
    })

    return (
        <div>
            <h1>Sorry to see you go :(</h1>
        </div>
    );
};

export default Logout;