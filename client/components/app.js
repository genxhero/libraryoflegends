import React from 'react';
import Header from './header';
import {withRouter } from 'react-router-dom';

const App = ( props ) => {
    return <div className="container">
         <Header />
         {props.children}
    </div>;
}

export default withRouter(App);