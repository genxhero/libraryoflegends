import React from 'react';
import Header from './header';

const App = ( props ) => {
    return <div className="container">
         <Header />
         <div className="content"> 
           {props.children}
         </div>
    </div>;
}

export default App;