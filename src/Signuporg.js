import React, { Component } from 'react';
import './App.css';
import logo from './images/new.png';
import { BrowserRouter as Router, Route, Link,Redirect} from "react-router-dom";
import './Signup_org.css';
import swal from 'sweetalert';
import MediaQuery from 'react-responsive';
import SocialButton from './SocialButton';
import FacebookLogin from 'react-facebook-login';

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
      email:'',
      password:'',
      cpassword:'',
      phone:'',
      check_organisation_name:before,
      check_email:before,
      check_password:before,
      check_cpassword:before,
      check_phone:before,
      pass_length:false,
      pass_crct:false,
      redirect:false

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
// console.log(temp);
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
  if(this.state.organisation_name!='' && this.state.email!='' && this.state.password!='' && this.state.cpassword!='' && this.state.phone!='')
  {
    fetch('https://admin.thetickets.in/api/register', {
  method: 'post',
  headers: {
    'Accept': 'application/json, text/plain, */*',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({name:this.state.organisation_name,role:'organiser',email: this.state.email,phone:this.state.phone, password: this.state.password})
}).then(res=>res.json())
  .then(res => {
    // console.log(res);
    var name='Organisation '+this.state.organisation_name;
    if(res.status==true)
    {
      swal(name, "Has been successfully created!", "success");
      this.setState({redirect:true});
    }
    else
    {
      swal(res.error, "error");
    }
  });
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
  // console.log(this.state.password,this.state.cpassword);
    if( this.state.password!==this.state.cpassword && this.state.password!=='')
    {
        this.setState({check_cpassword:after,pass_crct:true});
    }


    if(this.state.password==this.state.cpassword && this.state.cpassword!=='')
    {
        this.setState({check_cpassword:before,pass_crct:false});
    }

}

facebookDataLogin(user) {
    var name = user['name'];
    var email = user['email'];
    var password = '12345678';
    var role = 'customer';
    var phone = null;
    if(user['email'] ==  undefined || user['email'] == "" || user['email'] == null)
      {
        swal('Your account does not have email id . Please use our singup page to register yoursef.');
        return ;
      }
    fetch('https://admin.thetickets.in/api/register1', {
    method: 'post',
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({name:name,role:'organiser',email:email,phone:phone, password:password})
  }).then(res=>res.json())
    .then(res => {
      // console.log(res);
      var name='Organisation '+this.state.organisation_name;
      if(res.status==true)
      {
        swal(name, "Has been successfully created!", "success");
        this.setState({redirect:true});
      }
      else
      {
        swal(res.error);
      }
    });
  }

  render(){
  const handleSocialLogin = (user) => {
    console.log(user);
    this.facebookDataLogin(user);
  }
    const handleSocialLoginFailure = (err) => {
        console.error(err)
      }
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
    if(this.state.redirect)
    {
      return <Redirect to='/User/org/signin' />
    }
    return(
      <div>
      <MediaQuery query="(min-device-width: 1224px)">
      <div>


      <div className="head222">
      <Link to={`/`}>
      <img id="logo" src={logo}/>
      </Link>
      </div>
      <div id="bkground" class="row">
      <ul id="signup"><li id="list1"> Already a Member?</li><Link to={`/User/org/signin`}><li id="list2"><button class="btn btn-default" id="btt">signin</button></li></Link></ul>


      <div id="logform2" class="col-sm-6">
      <br/><br/><br/><br/>
        <div class="col-sm-6" id="signup1">
          <FacebookLogin
              appId="246946452678768"
              autoLoad={false}
              fields="name,email,picture"
              callback={handleSocialLogin}
              onFailure = {handleSocialLoginFailure}
              cssClass="btn btn-default bttfb"
            />
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
            <div class="col-sm-6">
                  <input style={this.state.check_email} name="email" value={this.state.email} onChange={this.state.check_email==after?this.handleChange_toggle:this.handleChange} type="text"  placeholder="Email Address" id="email1" class="form-control" required/>
                  <label class="form-control-placeholder" for="password">Email Address</label>
                  {this.state.check_email==after?message:''}
              </div>
          </div>
          <div id="cat1" class="row">
          <div  class="col-sm-6">
              <input name="password" style={this.state.check_password} value={this.state.password} onMouseOut={this.length_check} onChange={this.state.check_password==after?this.handleChange_toggle:this.handleChange} type="text" placeholder="Password" id="email1" class="form-control" required/>
              <label  class="form-control-placeholder" for="name">Password</label>
              {this.state.check_password==after?this.state.pass_length==true?password_msg1:message:''}
          </div>
          <div class="col-sm-6">
                <input style={this.state.check_cpassword} name="cpassword" value={this.state.cpassword} onMouseOut={this.check_all} onChange={this.state.check_cpassword==after?this.handleChange_toggle:this.handleChange} type="text"  placeholder="Confirm Password" id="email1" class="form-control" required/>
                <label class="form-control-placeholder" for="password">Confirm Password</label>
                {this.state.check_cpassword==after?this.state.pass_crct==true?password_msg:message:''}
            </div>
          </div>
          <div id="cat1" class="row">

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
</MediaQuery>



<MediaQuery query="(max-device-width: 1224px)">
<div>


<div className="head222">
<Link to={`/`}>
<img id="logo" src={logo}/>
</Link>
</div>
<div id="bkground" class="row">
<ul id="signup"><li id="list1"> Already a Member?</li><Link to={`/User/org/signin`}><li id="list2"><button class="btn btn-default" id="btt">signin</button></li></Link></ul>


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
<br/>

    <div id="cat" class="row">
      <div  class="col-sm-6">
          <input style={this.state.check_organisation_name} name="organisation_name" value={this.state.organisation_name} onChange={this.state.check_organisation_name==after?this.handleChange_toggle:this.handleChange} type="text" placeholder="Organisation Name" id="email1" class="form-control" required/>
          <label  class="form-control-placeholder" for="name">Organisation Name</label>
          {this.state.check_organisation_name==after?message:''}
      </div>
      <br/><br/>
      <div class="col-sm-6">
            <input style={this.state.check_email} name="email" value={this.state.email} onChange={this.state.check_email==after?this.handleChange_toggle:this.handleChange} type="text"  placeholder="Email Address" id="email1" class="form-control" required/>
            <label class="form-control-placeholder" for="password">Email Address</label>
            {this.state.check_email==after?message:''}
        </div>
    </div>
    <div id="cat1" class="row">
    <div  class="col-sm-6">
        <input name="password" style={this.state.check_password} value={this.state.password} onMouseOut={this.length_check} onChange={this.state.check_password==after?this.handleChange_toggle:this.handleChange} type="text" placeholder="Password" id="email1" class="form-control" required/>
        <label  class="form-control-placeholder" for="name">Password</label>
        {this.state.check_password==after?this.state.pass_length==true?password_msg1:message:''}
    </div>
    <br/><br/>
    <div class="col-sm-6">
          <input style={this.state.check_cpassword} name="cpassword" value={this.state.cpassword} onMouseOut={this.check_all} onChange={this.state.check_cpassword==after?this.handleChange_toggle:this.handleChange} type="text"  placeholder="Confirm Password" id="email1" class="form-control" required/>
          <label class="form-control-placeholder" for="password">Confirm Password</label>
          {this.state.check_cpassword==after?this.state.pass_crct==true?password_msg:message:''}
      </div>
    </div>
    <div id="cat1" class="row">

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
</MediaQuery>
</div>

    );
  }
}

export default Signuporg;
