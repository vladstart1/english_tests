import React, { Component } from 'react';
import * as FontAwesome from 'react-icons/lib/fa';
import {Link} from 'react-router-dom';

import styles from './header.css';
import Nav from './SideNav/SideNav';

class Header extends Component {

    state = {
        showNav: false
    }

    onHideNav = () => {
        this.setState({
            showNav: false
        })
    }

    render() {
        return (
            <header>
                <div className={styles.open_nav}>
                    <FontAwesome.FaBars
                        style={{
                            color: '#000',
                            padding: '18px',
                            cursor: 'pointer'
                        }}
                        onClick={()=>this.setState({showNav: true})}
                    />
                </div> 

                <Nav
                    showNav={this.state.showNav}
                    onHideNav={()=>this.onHideNav()}
                />  

                <Link to='/' className={styles.logo}>
                    Regular Tests
                </Link>
                    
            </header>
        );
    }
}

export default Header;