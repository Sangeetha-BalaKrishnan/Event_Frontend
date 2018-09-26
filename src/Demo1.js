
import React, { Component } from 'react';
import { Layout, Menu, Breadcrumb, Icon,Dropdown } from 'antd';
import logo from './images/new.png';
import ReactDOM from 'react-dom';
import './Demo1.css';
import moment from 'moment';
import MediaQuery from 'react-responsive';
import swal from 'sweetalert';


import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";

import { render } from 'react-dom';
import { DatePicker } from 'antd';
import Cookies from 'universal-cookie';
const cookies = new Cookies();
const { RangePicker } = DatePicker;

const after={
  borderColor:'red',
};


const before={
  borderColor:'#cccccc',
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


class Demo extends React.Component {
  constructor(props){
    super(props);
    this.state={
      event_name:'',
      event_org_name:'',
      event_url:'',
      start_date:'',
      end_date:'',
      category:'',
      render:'',
      collapsed:false,
      ismobile:false,
      check_event_name:before,
      check_event_org_name:before,
      check_event_url:before,
      check_event_start:before,
      check_event_end:before,
      event_url_backend:false,
      event_url_backend_msg:'',
      redirect:false,
      name:cookies.get('name'),
      user:cookies.get('user'),
      auth_token:cookies.get('auth_token'),
      redirect_logout:false
  };
  this.handleChange_toggle = this.handleChange_toggle.bind(this);
  this.handleChange2 = this.handleChange2.bind(this);
  this.handleChange222 = this.handleChange222.bind(this);
  this.handleChange1 = this.handleChange1.bind(this);
  this.summa = this.summa.bind(this);
  this.value_check = this.value_check.bind(this);
  this.send_values = this.send_values.bind(this);
  this.delete_cookies = this.delete_cookies.bind(this);
};
componentDidMount() {
  var cookie = cookies.get('event_id');
  if(cookie)
  {
    fetch('https://admin.thetickets.in/api/event_create/'+cookie, {
  method: 'get',
  headers: {
    'Accept': 'application/json, text/plain, */*',
    'Content-Type': 'application/json',
    'Authorization':'Bearer '+this.state.auth_token
  }
  }).then(res=>res.json())
  .then(res => {console.log(res);
    if(res.data != null)
    {
    console.log(res.data.start.length);
    this.setState({event_name:res.data.event_name,event_url:res.data.url,event_org_name:res.data.organizer,start_date:res.data.start,end_date:res.data.end,Category:res.data.category});
    console.log(this.state.start_date);
    console.log(this.state.Category);
  }

  });
  }
}
delete_cookies(){
  cookies.remove('name', { path: '/' });
  cookies.remove('user', { path: '/' });
  cookies.remove('auth_token', { path: '/' });
  cookies.remove('event_id', { path: '/' });
  this.setState({name:cookies.get('name'),redirect_logout:true});
}
send_values(){
  if(this.state.event_name == '')
  {
    this.setState({check_event_name:after});
  }
  if(this.state.event_org_name == '')
  {
    this.setState({check_event_org_name:after});
  }
  if(this.state.event_url == '')
  {
    this.setState({check_event_url:after});
  }
  if(this.state.start_date == '')
  {
    this.setState({check_event_start:after});
  }
  if(this.state.end_date == '')
  {
    this.setState({check_event_end:after});
  }
  var key;
  if(cookies.get('event_id')==undefined)
  {
    key=null;
  }
  else {
    key=cookies.get('event_id');
  }
  console.log(this.state.Category);
  if(this.state.event_name != '' && this.state.event_org_name != '' && this.state.event_url != '' && this.state.start_date != '' && this.state.end_date != '' && this.state.event_url_backend==false)
  {
    fetch('https://admin.thetickets.in/api/event_create', {
  method: 'post',
  headers: {
    'Accept': 'application/json, text/plain, */*',
    'Content-Type': 'application/json',
    'Authorization':'Bearer '+this.state.auth_token
  },
  body: JSON.stringify({event_name:this.state.event_name,event_url:this.state.event_url,event_organizer:this.state.event_org_name,start:this.state.start_date,end:this.state.end_date,event_id:key,category:this.state.Category})
}).then(res=>res.json())
  .then(res => {console.log(res);
    if(res.status==false)
    {
      swal("Oops", "try again after some time", "error");
    }
    if(res.status==true)
    {
      cookies.set('event_id',res.eventId, { path: '/' });
      this.setState({redirect:true});
    }
  });
  }
}
value_check(event){
  var cookie = cookies.get('event_id');
  if(event.target.value !='' && !cookie)
  {
    var link='https://admin.thetickets.in/check_url_exists/'+event.target.value;
    console.log(link);
    fetch(link, {
  method: 'get',
  headers: {
    'Accept': 'application/json, text/plain, */*',
    'Content-Type': 'application/json'
  }
}).then(res=>res.json())
  .then(res => {console.log(res);
    if(res.status==false)
    {
      this.setState({event_url_backend_msg:res.error,event_url_backend:true,check_event_url:after});
    }
    if(res.status==true)
    {

      this.setState({event_url_backend:false,check_event_url:before});
    }
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

handleChange2(event){
  this.setState({[event.target.name]:event.target.value});
  console.log(event.target.value);
  var temp="check_"+event.target.name;
  if(event.target.value=='')
  {
    this.setState({[temp]:after});
  }
}


handleChange222(event){

  console.log(event.target.value);
  this.setState({Category:event.target.value});

}

handleChange1(){
  alert("hello");

};

summa()
{
  this.setState({isMobile:true})
}



  onCollapse = (collapsed) => {
    console.log(collapsed);
    this.setState({ collapsed });
  };

  onChange(value, dateString) {
    console.log('Selected Time: ', value);
    console.log('Formatted Selected Time: ', dateString);
    this.setState({start_date:dateString});
  }
  onChange1(value, dateString) {
    console.log('Selected Time: ', value);
    console.log('Formatted Selected Time: ', dateString);
    this.setState({end_date:dateString});
  }

  onOk(value) {
    console.log('onOk: ', value);
  }
  render() {
    const bt={
      width:'112px',
      marginBottom:'40px'
    };
    const general_info=(
      <div>
      <div id="cat" className="row">
        <div  className="col-sm-6">
            <input  name="event_name" style={this.state.check_event_name} value={this.state.event_name} onChange={this.state.check_event_name==after?this.handleChange_toggle:this.handleChange2} type="text" placeholder="Event Name" id="email1" className="form-control" required/>
            <label  className="form-control-placeholder" for="name">Event Name</label>
            {this.state.check_event_name==after?message:''}
        </div>
        <div className="col-sm-6">
              <input name="event_org_name" style={this.state.check_event_org_name} value={this.state.event_org_name} onChange={this.state.check_event_org_name==after?this.handleChange_toggle:this.handleChange2} type="text"  placeholder="Event Organiser Name" id="inbox" className="form-control" required/>
              <label className="form-control-placeholder" for="password">Event Org Name</label>
              {this.state.check_event_org_name==after?message:''}
          </div>
      </div>
      <div id="cat1" className="row">
      <div className="col-sm-6">
      <input name="event_url" style={this.state.check_event_url} value={this.state.event_url} onChange={this.state.check_event_url==after?this.handleChange_toggle:this.handleChange2} onMouseOut={this.value_check} type="text"  placeholder="Event URL" id="email1" className="form-control" required/>
      <label className="form-control-placeholder" for="password">Event URL</label>
      {this.state.check_event_url==after?this.state.event_url_backend?'':message:''}
      <span style={{fontFamily:'Roboto',fontSize:'14px'}}>{this.state.event_url_backend?this.state.event_url_backend_msg:''}</span>
        </div>


      </div>
      <div style={{marginTop:'8px',fontFamily:'Roboto',fontSize:'15px'}}>Thetickets.com/Events/</div>
      <div id="cat1" className="row">
        <div  className="col-sm-6">
        <h5>START DATE</h5>
        {cookies.get('event_id')==undefined?
                  <DatePicker
                showTime
                format="YYYY-MM-DD HH:mm:ss"
                placeholder="Select Time"
                onChange={this.onChange.bind(this)}
                onOk={this.onOk.bind(this)}
                style={{width:'270px'}}
              />:

        <DatePicker
              showTime
              format="YYYY-MM-DD HH:mm:ss"
              placeholder="Select Time"
              value={moment(this.state.start_date, 'YYYY-MM-DD HH:mm:ss')}
              onChange={this.onChange.bind(this)}
              onOk={this.onOk.bind(this)}
              style={{width:'270px'}}
            />
          }
            <br/>{this.state.check_event_start==after?message:''}
        </div>
        <div className="col-sm-6">
        <h5>END DATE</h5>
        {cookies.get('event_id')==undefined?
        <DatePicker
              showTime
              format="YYYY-MM-DD HH:mm:ss"
              placeholder="Select Time"
              onChange={this.onChange1.bind(this)}

              onOk={this.onOk.bind(this)}
              style={{width:'270px'}}
            />:
        <DatePicker
              showTime
              format="YYYY-MM-DD HH:mm:ss"
              placeholder="Select Time"
              onChange={this.onChange1.bind(this)}
              value={moment(this.state.end_date, 'YYYY-MM-DD HH:mm:ss')}
              onOk={this.onOk.bind(this)}
              style={{width:'270px'}}
            />}
            <br/>{this.state.check_event_end==after?message:''}
          </div>
      </div>
      <div id="cat1" className="row">
        <div  className="col-sm-6">
          <label>Category</label>
          <div>
          <label>
            <select name="category" value={this.state.Category} style={{ width: '200px',height:'27px',borderRadius:'5px' }} onChange={this.handleChange222} >
              <option value=" ">Please Select</option>
              <option value="cultural">cultural</option>
              <option value="sports">sports</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Marathon">Marathon</option>
              <option value="Cycling">Cycling</option>
              <option value="Music Festival">Music fest</option>
              <option value="Dance">Dance</option>
              <option value="others">Others</option>
              </select>
              </label>

            </div>

        </div>
        </div>





      <br/><br/>

      &nbsp;&nbsp;&nbsp;&nbsp;
      <button type="button" style={bt} onClick={this.send_values} className="btn btn-primary">Next</button>&nbsp;&nbsp;

      </div>
    );

    const show_ticket=(
      <div>
      <br/><br/>
        <button type="button" className="btn btn-primary">ADD SHOW</button>
      </div>
    );
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

    if(this.state.redirect)
    {
      return <Redirect to='/H1' />
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

    defaultSelectedKeys={['toggle1']}
    mode="horizontal" style={{marginLeft:'20px'}}
  >
    <Menu.Item key="toggle1">
      General INFO
    </Menu.Item>
    <Menu.Item disabled key="toggle2" style={{marginLeft:'40px'}} onClick={this.handle}>
      <Link to={`/H1`}> ADDRESS</Link>
    </Menu.Item>
    <Menu.Item disabled key="toggle3" style={{marginLeft:'40px'}}>
      DESCRIPTION
    </Menu.Item>
    <Menu.Item disabled key="toggle4" style={{marginLeft:'40px'}}>
      DEPENDENCY
    </Menu.Item>
    <Menu.Item disabled key="toggle5" style={{marginLeft:'40px'}}>
      TICKETS
    </Menu.Item>
  </Menu>
  <div id="contain">

  {general_info}
  {this.state.summa}
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
    <Link to={`/`}><img style={awesome1} src={logo}/></Link>
    {dropdown_organiser_m}
    </Header>

    <Content style={{ margin: '0 16px' }}>
      <Breadcrumb style={{ margin: '16px 0' }}>
        
      </Breadcrumb>
      <div id="support" className="col-sm-12" style={{ padding: 24, background: '#fff', minHeight: 360 }}>

      <Menu

defaultSelectedKeys={['toggle1']}
mode="horizontal" style={{marginLeft:'20px'}}
>
<Menu.Item key="toggle1">
General INFO
</Menu.Item>
<Menu.Item disabled key="toggle2"  onClick={this.handle}>
<Link to={`/H1`}> ADDRESS</Link>
</Menu.Item>
<Menu.Item disabled key="toggle3" >
DESCRIPTION
</Menu.Item>
<Menu.Item disabled key="toggle4" >
DEPENDENCY
</Menu.Item>
<Menu.Item disabled key="toggle5" >
TICKETS
</Menu.Item>
</Menu>
<div id="contain">

{general_info}
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

export default Demo;
