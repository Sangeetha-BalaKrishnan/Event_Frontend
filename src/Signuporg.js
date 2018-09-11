import React, { Component } from 'react';
import './App.css';
import logo from './images/new.png';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

const after={
  borderColor:'red'
};

const before={
  borderColor:'#cccccc'
}
const message=(
  <span style={{fontFamily:'Roboto'}}>&nbsp;Enter this field</span>
);

const password_msg=(
  <span style={{fontFamily:'Roboto'}}>&nbsp;Passwords should be same</span>
);

const password_msg1=(
  <span style={{fontFamily:'Roboto'}}>&nbsp;Atleast 8 min char</span>
);

class Signuporg extends Component{
  constructor(props){
    super(props);
    this.state={
      organisation_name:'',
      organiser_name:'',
      email:'',
      password:'',
      cpassword:'',
      phone:'',
      check_organisation_name:before,
      check_organiser_name:before,
      check_email:before,
      check_password:before,
      check_password:before,
      check_phone:before,
      pass_length:false,
      pass_crct:false

  };
  this.handleChange = this.handleChange.bind(this);
  this.handleChange_toggle = this.handleChange_toggle.bind(this);
  this.handleClick = this.handleClick.bind(this);
  this.length_check = this.length_check.bind(this);
  this.check_all = this.check_all.bind(this);

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
handleClick()
{
  if(this.state.organiser_name=='')
  {
    this.setState({check_organiser_name:after});
  }
  if(this.state.organisation_name=='')
  {
    this.setState({check_organisation_name:after});
  }
  if(this.state.email=='')
  {
    this.setState({check_email:after});
  }
  if(this.state.password=='')
  {
    this.setState({check_password:after});
  }
  if(this.state.cpassword=='')
  {
    this.setState({check_cpassword:after});
  }
  if(this.state.phone=='')
  {
    this.setState({check_phone:after});
  }

}
length_check()
{
  if(this.state.password.length<8 && this.state.password!=='')
  {
    this.setState({check_password:after,pass_length:true});
  }
  if(this.state.password.length>=8)
  {
    this.setState({check_password:before,pass_length:false});
  }
}
check_all()
{
  console.log(this.state.password,this.state.cpassword);
    if( this.state.password!==this.state.cpassword && this.state.password!=='')
    {
        this.setState({check_cpassword:after,pass_crct:true});
    }


    if(this.state.password==this.state.cpassword && this.state.cpassword!=='')
    {
        this.setState({check_cpassword:before,pass_crct:false});
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
      <ul id="signup22"><li id="list1"> Already a Member?</li><Link to={`/User/org/signin`}><li id="list2"><button class="btn btn-default" id="btt">signin</button></li></Link></ul>


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
                <input style={this.state.check_organisation_name} name="organisation_name" value={this.state.organisation_name} onChange={this.state.check_organisation_name==after?this.handleChange_toggle:this.handleChange} type="text" placeholder="Organisation Name" id="email1" class="form-control" required/>
                <label  class="form-control-placeholder" for="name">Organisation Name</label>
                {this.state.check_organisation_name==after?message:''}
            </div>
            <div  class="col-sm-6">
                <input style={this.state.check_organiser_name} name="organiser_name" value={this.state.organiser_name} onChange={this.state.check_organiser_name==after?this.handleChange_toggle:this.handleChange} type="text" placeholder="Organiser" id="email1" class="form-control" required/>
                <label  class="form-control-placeholder" for="name">Organiser</label>
                {this.state.check_organiser_name==after?message:''}
            </div>
          </div>
          <div id="cat1" class="row">
          <div class="col-sm-6">
                <input style={this.state.check_email} name="email" value={this.state.email} onChange={this.state.check_email==after?this.handleChange_toggle:this.handleChange} type="text"  placeholder="Email Address" id="email1" class="form-control" required/>
                <label class="form-control-placeholder" for="password">Email Address</label>
                {this.state.check_email==after?message:''}
            </div>
            <div  class="col-sm-6">
                <input name="password" style={this.state.check_password} value={this.state.password} onMouseOut={this.length_check} onChange={this.state.check_password==after?this.handleChange_toggle:this.handleChange} type="text" placeholder="Password" id="email1" class="form-control" required/>
                <label  class="form-control-placeholder" for="name">Password</label>
                {this.state.check_password==after?this.state.pass_length==true?password_msg1:message:''}
            </div>
          </div>
          <div id="cat1" class="row">
          <div class="col-sm-6">
                <input style={this.state.check_cpassword} name="cpassword" value={this.state.cpassword} onMouseOut={this.check_all} onChange={this.state.check_cpassword==after?this.handleChange_toggle:this.handleChange} type="text"  placeholder="Confirm Password" id="email1" class="form-control" required/>
                <label class="form-control-placeholder" for="password">Confirm Password</label>
                {this.state.check_cpassword==after?this.state.pass_crct==true?password_msg:message:''}
            </div>
            <div  class="col-sm-6">
                <input style={this.state.check_phone} name="phone" value={this.state.phone} onChange={this.state.check_phone==after?this.handleChange_toggle:this.handleChange} type="number" placeholder="Phone Number" id="email1" class="form-control" required/>
                <label  class="form-control-placeholder" for="name">Phone Number</label>
                {this.state.check_phone==after?message:''}
            </div>

          </div>
          <br/><br/>
          <button id="btt3" class="btn btn-default" onClick={this.handleClick}>CREATE ACCOUNT</button>
            <br/>



</div>

</div>



</div>

    );
  }
}

export default Signuporg;
