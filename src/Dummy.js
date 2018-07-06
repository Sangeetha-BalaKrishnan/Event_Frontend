import React, { Component } from "react";

import "./App.css";

import { Switch} from 'react-router-dom'


import App from './App';
import Events from './Events';
import Signin from './Signin';
import Signup from './Signup';
import Decision from './Decision';
import Org from './Signuporg';
import Demo  from './Demo';
import { BrowserRouter as Router, Route } from "react-router-dom";


class Dummy extends Component {


  render() {


    const awesome={
      height:'120px',
      marginTop : '-13px',
      float:'letf',
      marginLeft:'20px'
    };
    const awesome1={
      color:'black',
      fontSize:'18px',
      fontFamily: 'Roboto',
      marginTop:'30px;',
      cursor:'pointer'
    };
    const awesome2={
      color:'black',
      fontSize:'18px',
      fontFamily: 'Roboto',
      marginTop:'30px;',
      cursor:'pointer',
      marginRight:'40px',
      float:'right'
    }
    const hello={
      marginTop:'40px'
    }
    return (

<Router>
<Switch>
           <div className="App">
             <Route exact path="/" component={App} />
             <Route exact path="/Events" component={Events} />
             <Route exact path="/User/signin" component={Signin} />
             <Route exact path="/User/signup" component={Signup} />
             <Route exact path="/User/Decision" component={Decision} />
             <Route exact path="/User/signup_org" component={Org} />
            <Route exact path="/Us" component={Demo} />


           </div>
           </Switch>

</Router>









    );
  }
}

export default Dummy;
