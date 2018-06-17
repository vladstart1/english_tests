import React from 'react';
import SideNav from 'react-simple-sidenav';

import SideNavItems from './SideNavItems';

const Nav = (props) => {
    return (
        <SideNav
            showNav={props.showNav}
            onHideNav={props.onHideNav}
            navStyle={{
                    background: '#fff',
                    maxWidth: '300px',
                }}
        >
            <SideNavItems onHideNav={props.onHideNav} />
        </SideNav>
    );
};

export default Nav;