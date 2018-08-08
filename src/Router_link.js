import React, { Component } from "react";

import "./App.css";

import { Switch} from 'react-router-dom'


import App from './App';
import Events from './Events';
import Signin_cust from './Signin_cust';
import Signin_org from './Signin_org'
import Signup from './Signup';
import Decision from './Decision';
import Org from './Signuporg';
import Demo  from './Demo';
import Demo1 from './Demo1';
import Nav from './Nav';
import Modal from './Modal';
import Address from './Address';
import Upload from './Upload';
import Tickets from './Ticket';
import Hello from './Hello';
import Text from './Text';
import { BrowserRouter as Router, Route } from "react-router-dom";


class Router_link extends Component {


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
             <Route exact path="/User/cust/signin" component={Signin_cust} />
             <Route exact path="/User/org/signin" component={Signin_org} />
             <Route exact path="/User/signup" component={Signup} />
             <Route exact path="/User/Decision" component={Decision} />
             <Route exact path="/User/signup_org" component={Org} />
             <Route exact path="/Us" component={Demo} />
             <Route exact path="/Us1" component={Demo1} />
             <Route exact path="/Home" component={Nav} />
             <Route exact path="/H" component={Modal} />
             <Route exact path="/H1" component={Address} />
             <Route exact path="/H2" component={Upload} />
             <Route exact path="/H3" component={Tickets} />
             <Route exact path="/dummy" component={Hello} />
             <Route exact path="/dummy1" component={Text} />
           </div>
           </Switch>

</Router>









    );
  }
}

export default Router_link;
