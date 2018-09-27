import React, { Component } from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import { Layout, Menu, Breadcrumb,Icon,Input,Tabs,Dropdown} from 'antd';
import logo from './images/new.png';
import Signup from './Signup';
import Events from './Events';
import './App.css';
import MediaQuery from 'react-responsive';
import Cookies from 'universal-cookie';
import swal from 'sweetalert';

import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";

const cookies = new Cookies();
const TabPane = Tabs.TabPane;

const after={
  borderColor:'red',
  width:'35% !important'
};


const before={
  borderColor:'#cccccc',
  width:'35% !important'
}

const message=(
  <span style={{fontFamily:'Roboto',fontSize:'11px'}}>&nbsp;Enter this field</span>
);


function handleChange(value) {
  console.log(`selected ${value}`);
}
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

const { Header, Content, Footer, Sider } = Layout;


class Address extends React.Component {
  constructor(props){
    super(props);
    this.state={
    venue:'',
    add1:'',
    add2:'',
    city:'',
    link:'',
    check_venue:before,
    check_add1:before,
    check_city:before,
    redirect_prev:false,
    redirect_next:false,
    name:cookies.get('name'),
    user:cookies.get('user'),
    auth_token:cookies.get('auth_token'),
    redirect_logout:false
  };
  this.handleChange = this.handleChange.bind(this);
  this.reset = this.reset.bind(this);
  this.previous = this.previous.bind(this);
  this.next = this.next.bind(this);
  this.handleChange_toggle = this.handleChange_toggle.bind(this);
  this.delete_cookies = this.delete_cookies.bind(this);
};
componentDidMount() {
  var cookie = cookies.get('event_id');
  if(cookie)
  {
    fetch('https://admin.thetickets.in/api/show_address/'+cookie, {
  method: 'get',
  headers: {
    'Accept': 'application/json, text/plain, */*',
    'Content-Type': 'application/json',
    'Authorization':'Bearer '+this.state.auth_token
  }
  }).then(res=>res.json())
  .then(res => {console.log(res);
    if(res.data.address != null)
    {
    var myarray = res.data.address.split(',');
    this.setState({venue:myarray[0],add1:myarray[1],add2:myarray[2],city:myarray[3]});
  }


  });
  }
}

previous(){
  this.setState({redirect_prev:true});
}
delete_cookies(){
  cookies.remove('name', { path: '/' });
  cookies.remove('user', { path: '/' });
  cookies.remove('auth_token', { path: '/' });
  cookies.remove('event_id', { path: '/' });
  this.setState({name:cookies.get('name'),redirect_logout:true});
}
next(){
  if(this.state.venue=='')
  {
    this.setState({check_venue:after});
  }
  if(this.state.add1=='')
  {
    this.setState({check_add1:after});
  }
  if(this.state.city=='')
  {
    this.setState({check_city:after});
  }
  var key;
  if(cookies.get('event_id')==undefined)
  {
    key=null;
  }
  else {
    key=cookies.get('event_id');
  }
  if(this.state.venue!='' && this.state.add1!='' && this.state.city!='')
  {
    console.log(key);
    var location=this.state.venue+'+'+this.state.add1+'+'+this.state.add2+'+'+this.state.city;
    var location1=this.state.venue+','+this.state.add1+','+this.state.add2+','+this.state.city;
    console.log(location1);
    fetch('https://maps.googleapis.com/maps/api/geocode/json?address='+location+'&key=AIzaSyCWpEoKPyUDW7x3OnfX0slzlz4NfV-abBI', {
  method: 'get',
  headers: {
    'Accept': 'application/json, text/plain, */*',

  }
  }).then(res=>res.json())
  .then(res => {console.log(res);
    console.log(res.results[0].geometry.location);
    var summa=res.results[0].geometry.location.lat+","+res.results[0].geometry.location.lng;
    console.log(summa);
    fetch('https://admin.thetickets.in/api/create_address', {
  method: 'post',
  headers: {
    'Accept': 'application/json, text/plain, */*',
    'Content-Type': 'application/json',
    'Authorization':'Bearer '+this.state.auth_token
  },
  body: JSON.stringify({eventid:key,address:location1,lat_long:summa})
}).then(res=>res.json())
  .then(res => {console.log(res);
    if(res.status==false)
    {
      swal("Oops", "try again after some time", "error");
    }
    if(res.status==true)
    {
      this.setState({redirect_next:true});
    }
  });


  });
  }
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

reset(){
  this.setState({venue:'',add1:'',add2:'',city:''});
}

handleClick = (e) => {
  console.log('click ', e);
  this.setState({
    current: e.key,
  });
};

  state = {
    collapsed: false,
  };

  onCollapse = (collapsed) => {
    console.log(collapsed);
    this.setState({ collapsed });
  };


  render() {
    const bt={
      width:'112px',
      marginBottom:'40px'
    };
    const bt1={
      width:'112px',
      marginBottom:'40px'
    };
    const awesome={
      height:'120px',
      marginTop : '-27px',

      marginLeft:'490px',
      marginBottom:'-14px'
    };
    const awesome1={
      height:'120px',
      marginTop : '-27px',

      marginLeft:'28px',
      marginBottom:'-14px'
    };
    const menu_organiser = (
    <Menu style={{marginLeft:'327px',marginTop:'12px'}}>
    <Menu.Item key="1" style={{marginTop:'5px'}}>
      <a onClick={this.dashboard}>&nbsp;&nbsp;DASHBOARD</a>
    </Menu.Item>
    <Menu.Item key="2" style={{marginTop:'5px'}}>
      <a onClick={this.delete_cookies}>&nbsp;&nbsp;LOGOUT</a>
    </Menu.Item>


    </Menu>
    );
    const menu_organiser_m = (
    <Menu style={{marginLeft:'10px',marginTop:'12px'}}>
    <Menu.Item key="1" style={{marginTop:'5px'}}>
      <a onClick={this.dashboard}>&nbsp;&nbsp;DASHBOARD</a>
    </Menu.Item>
    <Menu.Item key="2" style={{marginTop:'5px'}}>
      <a onClick={this.delete_cookies}>&nbsp;&nbsp;LOGOUT</a>
    </Menu.Item>


    </Menu>
    );
    const dropdown_organiser=(  <Dropdown overlay={menu_organiser}>
    <a style={fontdrop} className="ant-dropdown-link" href="#">
      <button className="btn btn-primary" style={{marginLeft:'327px'}}><i style={{fontSize:'14px'}} className="fa fa-user"></i>&nbsp;&nbsp;{this.state.user}</button>
    </a>
    </Dropdown>);
    const dropdown_organiser_m=(  <Dropdown overlay={menu_organiser_m}>
    <a style={fontdrop} className="ant-dropdown-link" href="#">
      <button className="btn btn-primary" style={{marginLeft:'10px'}}><i style={{fontSize:'14px'}} className="fa fa-user"></i>&nbsp;&nbsp;{this.state.user}</button>
    </a>
    </Dropdown>);
    const fontdrop={
      fontFamily:'Roboto',
      fontSize:'18px'
    };

    if(this.state.redirect_prev)
    {
      return <Redirect to='/Us1' />
    }
    if(this.state.redirect_next)
    {
      return <Redirect to='/dummy1' />
    }
    if(this.state.redirect_logout)
    {
      return <Redirect to='/' />
    }

    return (
      <div>
      <MediaQuery query="(min-device-width: 1224px)">
      <Layout style={{ minHeight: '100vh' }}>
        <Sider
          collapsible
          collapsed={this.state.collapsed}
          onCollapse={this.onCollapse}
        >
          <div className="logo" />
          <Menu theme="dark" defaultSelectedKeys={['2']} mode="inline">
            <Menu.Item key="1" onClick={this.handleChange}>
              <Link to={`/Us`}><Icon type="dashboard" theme="outlined" />
              <span >Home</span></Link>
            </Menu.Item>
            <Menu.Item key="2"  >
              <Icon type="desktop" />
              <span>Create an Event</span>
            </Menu.Item>


          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }}  >
          <div className="row">
            <div className="col-sm-4">
            <Link to={`/`}>
              <img style={awesome} src={logo}/>
              </Link>
            </div>

            <div className="col-sm-4 signinBlock2">
            {dropdown_organiser}

            </div>
          </div>
          </Header>

          <Content style={{ margin: '0 16px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>

            </Breadcrumb>
            <div id="support" className="col-sm-12" style={{ padding: 24, background: '#fff', minHeight: 360 }}>

            <Menu
    onClick={this.handleClick}
    defaultSelectedKeys={['toggle2']}
    mode="horizontal" style={{marginLeft:'20px'}}
  >
  <Menu.Item disabled key="toggle1">
    <Link to={`/Us1`}>General INFO</Link>
  </Menu.Item>
  <Menu.Item key="toggle2" style={{marginLeft:'40px'}} onClick={this.handle}>
    ADDRESS
  </Menu.Item>
  <Menu.Item disabled key="toggle3" style={{marginLeft:'40px'}}>
    <Link to={`/dummy1`}>DESCRIPTION</Link>
  </Menu.Item>
  <Menu.Item disabled key="toggle4" style={{marginLeft:'40px'}}>
    UPLOAD
  </Menu.Item>
  <Menu.Item disabled key="toggle5" style={{marginLeft:'40px'}}>
    TICKETS
  </Menu.Item>
  </Menu>
  <div id="contain">

<div style={{marginLeft:'65px'}}>
<h3>Event Address</h3>
<br/>
<div>
<h4>Event Venue</h4>
<input style={this.state.check_venue} name="venue" value={this.state.venue} onChange={this.state.check_venue==after?this.handleChange_toggle:this.handleChange} type="text" placeholder="enter the venue" id="email2" className="form-control" required/>
{this.state.check_venue==after?message:''}
<br/>
<h4>Street Line1</h4>
<input name="add1" style={this.state.check_add1} value={this.state.add1} onChange={this.state.check_add1==after?this.handleChange_toggle:this.handleChange}   id="email2" className="form-control" placeholder="Street Line1" />
{this.state.check_add1==after?message:''}
<br/>
<h4>Street Line2</h4>
<input name="add2" value={this.state.add2} onChange={this.handleChange} className="form-control" id="email2" placeholder="Street Line2" />
<br/>
<h4>City</h4>
<input name="city" style={this.state.check_city} value={this.state.city} onChange={this.state.check_city==after?this.handleChange_toggle:this.handleChange} id="email2" className="form-control" placeholder="City" />
{this.state.check_city==after?message:''}
<br/><br/>
</div>

<button type="button" style={bt} onClick={this.previous} className="btn btn-primary">Previous</button>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
<button type="button" style={bt} onClick={this.next} className="btn btn-primary">Next</button>
</div>
  </div>
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>

          </Footer>
        </Layout>
      </Layout>
      </MediaQuery>

      <MediaQuery query="(max-device-width: 1224px)">
      <Layout style={{ minHeight: '100vh' }}>
      <Sider
        collapsible
        collapsed={'true'}
      >
          <div className="logo" />
          <Menu theme="dark" defaultSelectedKeys={['2']} mode="inline">
            <Menu.Item key="1" onClick={this.handleChange}>
              <Link to={`/Us`}><Icon type="dashboard" theme="outlined" />
              <span >Home</span></Link>
            </Menu.Item>
            <Menu.Item key="2"  >
              <Icon type="desktop" />
              <span>Create an Event</span>
            </Menu.Item>

          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }}  >
          <Link to='/'><img style={awesome1} src={logo}/></Link>
          {dropdown_organiser_m}
          </Header>

          <Content style={{ margin: '0 16px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>

            </Breadcrumb>
            <div id="support" className="col-sm-12" style={{ padding: 24, background: '#fff', minHeight: 360 }}>

            <Menu
    onClick={this.handleClick}
    defaultSelectedKeys={['toggle2']}
    mode="horizontal" style={{marginLeft:'20px'}}
  >
  <Menu.Item disabled key="toggle1">
    <Link to={`/Us1`}>General INFO</Link>
  </Menu.Item>
  <Menu.Item key="toggle2" style={{marginLeft:'40px'}} onClick={this.handle}>
    ADDRESS
  </Menu.Item>
  <Menu.Item disabled key="toggle3" style={{marginLeft:'40px'}}>
    <Link to={`/dummy1`}>DESCRIPTION</Link>
  </Menu.Item>
  <Menu.Item disabled key="toggle4" style={{marginLeft:'40px'}}>
    UPLOAD
  </Menu.Item>
  <Menu.Item disabled key="toggle5" style={{marginLeft:'40px'}}>
    TICKETS
  </Menu.Item>
  </Menu>
  <div id="contain">
<div style={{marginLeft:'-7px'}}>
<h3>Event Venue</h3>
<br/>
<div>
<h4>Event Venue</h4>
<input style={this.state.check_venue} name="venue" value={this.state.venue} onChange={this.state.check_venue==after?this.handleChange_toggle:this.handleChange} type="text" placeholder="enter the venue" id="email3" className="form-control" required/>
{this.state.check_venue==after?message:''}
<br/>
<h4>Street Line1</h4>
<input name="add1" style={this.state.check_add1} value={this.state.add1} onChange={this.state.check_add1==after?this.handleChange_toggle:this.handleChange}   id="email3" className="form-control" placeholder="Street Line1" />
{this.state.check_add1==after?message:''}
<br/>
<h4>Street Line2</h4>
<input name="add2" value={this.state.add2} onChange={this.handleChange} className="form-control" id="email3" placeholder="Street Line2" />
<br/>
<h4>City</h4>
<input name="city" style={this.state.check_city} value={this.state.city} onChange={this.state.check_city==after?this.handleChange_toggle:this.handleChange} id="email3" className="form-control" placeholder="City" />
{this.state.check_city==after?message:''}
<br/><br/>

</div>

<button type="button" style={bt} onClick={this.previous} className="btn btn-primary">Previous</button>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
<button type="button" style={bt} onClick={this.next} className="btn btn-primary">Next</button>
</div>


  </div>
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>

          </Footer>
        </Layout>
      </Layout>
      </MediaQuery>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: ('AIzaSyCWpEoKPyUDW7x3OnfX0slzlz4NfV-abBI')
})(Address);
