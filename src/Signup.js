import React, { Component } from 'react';
import './App.css';
import ReactDOM from 'react-dom';
import logo from './images/new.png';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class Signin extends Component{
  constructor(props){
    super(props);
    this.state={
      name_user:'',
      email:'',
      password:'',
      cpassword:'',
      phone:''

  };
  this.handleChange = this.handleChange.bind(this);
  this.handleClick = this.handleClick.bind(this);

}
handleChange(event){
  this.setState({[event.target.name]:event.target.value});
  ReactDOM.findDOMNode(this.refs.input).borderColor='red';
}
handleClick()
{
  if(this.state.user_name!=='' && this.state.email!=='' && this.state.password!=='' && this.state.cpassword!=='' && this.state.phone!='')
  {
    if(this.state.passord!==this.state.cpassword)
    {
      alert("both PW should be same");
    }
  }
  else {
    alert("fill all the details");
  }
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
      <ul id="signup22"><li id="list1"> Already a Member?</li><Link to={`/User/signin`}><li id="list2"><button class="btn btn-default" id="btt">signin</button></li></Link></ul>


      <div id="logform2" class="col-sm-6">
      <br/><br/><br/><br/>
        <div class="col-sm-6" id="signup1">


          <button id="bttfb" class="btn btn-default">FaceBook</button>
        </div>

      <div className="or-space1">
      <div className="or-spacer1">
      <span>or</span>
      </div>
      </div>
      <br/><br/>

          <div id="cat" class="row">
            <div  class="col-sm-6">
                <input name="name_user" ref="input" value={this.state.name_user} onChange={this.handleChange} type="text" placeholder="Name" id="email1" class="form-control" required/>
                <label  class="form-control-placeholder" for="name">Name</label>
            </div>
            <div class="col-sm-6">
                  <input name="email" value={this.state.email} onChange={this.handleChange} type="text"  placeholder="Email Address" id="email1" class="form-control" required/>
                  <label class="form-control-placeholder" for="password">Email Address</label>
              </div>
          </div>
          <div id="cat1" class="row">
            <div  class="col-sm-6">
                <input name="password" value={this.state.password} onChange={this.handleChange} type="text" placeholder="Password" id="email1" class="form-control" required/>
                <label  class="form-control-placeholder" for="name">Password</label>
            </div>
            <div class="col-sm-6">
                  <input name="cpassword" value={this.state.cpassword} onChange={this.handleChange} type="text"  placeholder="Confirm Password" id="email1" class="form-control" required/>
                  <label class="form-control-placeholder" for="password">Confirm Password</label>
              </div>
          </div>
          <div id="cat1" class="row">
            <div  class="col-sm-6">
                <input name="phone" value={this.state.phone} onChange={this.handleChange} type="number" placeholder="Phone Number" id="email1" class="form-control" required/>
                <label  class="form-control-placeholder" for="name">Phone Number</label>
            </div>

          </div>
          <br/><br/>
          <button id="btt3" onClick={this.handleClick} class="btn btn-default">CREATE ACCOUNT</button>
            <br/>



</div>

</div>



</div>

    );
  }
}

export default Signin;
