import React, { Component } from 'react';
import './App.css';
import logo from './images/new.png';
import { BrowserRouter as Router, Route, Link,Redirect } from "react-router-dom";
import Cookies from 'universal-cookie';

import './signin_org.css';

const cookies = new Cookies();

const after={
  borderColor:'red'
};

const before={
  borderColor:'#cccccc'
}

const message=(
  <span style={{fontFamily:'Roboto'}}>&nbsp;Enter this field</span>
);

class Signin_org extends Component{
  constructor(props){
    super(props);
    this.state={

      email:'',
      password:'',
      check_email:before,
      check_password:before,
      error:false,
      error_msg:'',
      redirect:false

  };
  this.handleChange = this.handleChange.bind(this);
  this.verify = this.verify.bind(this);
  this.handleChange_toggle = this.handleChange_toggle.bind(this);
  }
  handleChange_toggle(event){

    this.setState({[event.target.name] : event.target.value});

  var temp="check_"+event.target.name;
  console.log(temp);
    if((event.target.value).length>0)
    {
      this.setState({[temp]:before});
    }
  }
  handleChange(event){

      this.setState({[event.target.name] : event.target.value});
      var temp="check_"+event.target.name;
      if(event.target.value=='')
      {
        this.setState({[temp]:after});
      }

  }
  verify(){
    if(this.state.email=='')
    {
      this.setState({check_email:after});
    }
    if(this.state.password=='')
    {
      this.setState({check_password:after});
    }
    if(this.state.email!='' && this.state.password!='')
    {
    console.log(this.state.email,this.state.password);
    fetch('https://admin.thetickets.in/api/login', {
  method: 'post',
  headers: {
    'Accept': 'application/json, text/plain, */*',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({email: this.state.email, password: this.state.password})
}).then(res=>res.json())
  .then(res => {console.log(res.status);
    if(res.status==true)
    {

      cookies.set('name', 'organiser', { path: '/' });
      cookies.set('user',res.name, { path: '/' });
      cookies.set('auth_token',res.token,{ path: '/' });
      this.setState({redirect:true});
    }
    else if(res.status==false)
    {
      this.setState({error:true,error_msg:res.error});
    }
  });
}
  }
  render(){
    const hello={
      height:'20px',
      width:'21px',

    };

    const hello1={
      marginTop:'-20px'
    };
    const bt={
      width:'112px',
      marginBottom:'40px'
    };
    if(this.state.redirect)
    {
      return <Redirect to='/' />
    }

    return(

      <div>


      <div className="head222">
      <Link to={`/`}>
      <img id="logo" src={logo}/>
      </Link>
      </div>
      <div id="bkground" class="row">
      <ul id="signup"><li id="list1"> Do not have an account?</li><Link to={`/User/signup_org`}><li id="list2"><button class="btn btn-default" id="btt">signup</button></li></Link></ul>

      <div id="logform" class="col-sm-6">
      <br/><br/><br/><br/>
      <div class="row">
          <div class="col-md-6 mx-auto">
            <div class="form-group">
                <input style={this.state.check_email} name="email" value={this.state.email} onChange={this.state.check_email==after?this.handleChange_toggle:this.handleChange} type="text" placeholder="Email Address" id="email" class="form-control" required/>
                <label  class="form-control-placeholder" for="name">Email Address</label>
                {this.state.check_email==after?message:''}
            </div>
            <br/>
          <div class="form-group">
                <input style={this.state.check_password} name="password" value={this.state.password} onChange={this.state.check_password==after?this.handleChange_toggle:this.handleChange} type="password"  placeholder="Password" id="email" class="form-control" required/>
                <label class="form-control-placeholder" for="password">Password</label>
                {this.state.check_password==after?message:''}

                <div style={{fontSize:'Roboto',color:'red'}}>{this.state.error?this.state.error_msg:''}</div>
            </div>
            <div classname="email"></div>
          </div>
      </div>
      <br/>
      <ul id="bullet"><li><input style={hello} type="checkbox" name="vehicle" value="Bike"/></li><li id="bullet1"> Remember Me</li><li id="bullet2">Forget Password?</li></ul><br/>
      <br/>
      <button type="button" style={bt} onClick={this.verify} class="btn btn-primary">Login</button>
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

  <button style={{marginLeft:'64px !important'}} id="bttfb_signin" class="btn btn-default">FaceBook</button>

</div>
</div>



</div>

    );
  }
}

export default Signin_org;
