import React, { Component } from 'react';
import './App.css';
import logo from './images/new.png';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class Signin extends Component{
  constructor(props){
    super(props);
    this.state={

      email:'',
      password:'',

  };
  this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event){
    this.setState({
      [event.target.name]:event.target.value
    });
  }
  render(){
    const hello={
      height:'20px',
      width:'21px',

    };
    const awesome={
      height:'120px',
      marginTop : '-13px',

      marginLeft:'577px',
      marginBottom:'-14px'
    };
    const hello1={
      marginTop:'-20px'
    };
    const bt={
      width:'112px',
      marginBottom:'40px'
    };
    return(
      <div>


      <div className="head222">
      <Link to={`/`}>
      <img style={awesome} src={logo}/>
      </Link>
      </div>
      <div id="bkground" class="row">
      <ul id="signup"><li id="list1"> Do not have an account?</li><Link to={`/User/Decision`}><li id="list2"><button class="btn btn-default" id="btt">signup</button></li></Link></ul>

      <div id="logform" class="col-sm-6">
      <br/><br/><br/><br/>
      <div class="row">
          <div class="col-md-6 mx-auto">
            <div class="form-group">
                <input style={{height:'100px'}} name="email" value={this.state.email} onChange={this.handleChange} type="text" placeholder="Email Address" id="email" class="form-control" required/>
                <label  class="form-control-placeholder" for="name">Email Address</label>
            </div>
            <br/>
          <div class="form-group">
                <input name="password" value={this.state.password} onChange={this.handleChange} type="password"  placeholder="Password" id="email" class="form-control" required/>
                <label class="form-control-placeholder" for="password">Password</label>
            </div>
            <div classname="email"></div>
          </div>
      </div>
      <br/>
      <ul id="bullet"><li><input style={hello} type="checkbox" name="vehicle" value="Bike"/></li><li id="bullet1"> Remember Me</li><li id="bullet2">Forget Password?</li></ul><br/>
      <br/>
      <button type="button" style={bt} class="btn btn-primary">Login</button>
</div>
<div class="col-sm-6" id="logform1">
  <ul id="googlesign">
    <li id="goosign1">
    <div className="or-space">
    <div className="or-spacer">
    <span>or</span>
    </div>
    </div>
    </li>
    <li id="goosign2">
    Sign in with
    </li>
    <br/>

  </ul>
<br/>
  <button id="btt1" class="btn btn-default">Google+</button>
  <br/><br/>
  <button id="bttfb" class="btn btn-default">FaceBook</button>

</div>
</div>



</div>

    );
  }
}

export default Signin;
