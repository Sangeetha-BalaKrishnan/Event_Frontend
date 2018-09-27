
import React, { Component } from 'react';
import { Layout, Menu, Breadcrumb, Icon,Switch,Dropdown } from 'antd';
import logo from './images/new.png';
import ReactDOM from 'react-dom';
import Signup from './Signup';
import Events from './Events';
import { BrowserRouter as Router, Route, Link ,Redirect } from "react-router-dom";
import './Demo.css';
import { render } from 'react-dom';
import Cookies from 'universal-cookie';
import swal from 'sweetalert';
const cookies = new Cookies();
const { Header, Content, Footer, Sider } = Layout;
const SubMenu = Menu.SubMenu;

class Demo extends React.Component {
  constructor(props){
    super(props);
    this.state={
      name:cookies.get('user'),
      user:cookies.get('user'),
      auth_token:cookies.get('auth_token'),
      event_name:[],
      start_date:[],
      end_date:[],
      Check_box:[],
      event_id:[],
      link:[],
      redirect_edit:false,
      redirect_logout:false
    };
    this.handleChange = this.handleChange.bind(this);
    this.edit = this.edit.bind(this);
    this.delete = this.delete.bind(this);
    this.delete_cookies = this.delete_cookies.bind(this);
    this.preview = this.preview.bind(this);

  };

  componentDidMount() {

      fetch('https://admin.thetickets.in/api/publish/event', {
    method: 'get',
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
      'Authorization':'Bearer '+this.state.auth_token
    }
    }).then(res=>res.json())
    .then(res => {console.log(res);
      if(res.status==true)
      {

      console.log(res.data.length);
      var a=[];
      var b=[];
      var c=[];
      var d=[];
      var e=[];
      var f=[];
      for(var i=0;i<res.data.length;i++)
      {
        a.push(res.data[i].event_name);
        b.push(res.data[i].start);
        c.push(res.data[i].end);
        d.push(res.data[i].url);
        e.push(res.data[i].event_id);
        f.push(res.data[i].publish);
      }
      this.setState({event_name:a,start_date:b,end_date:c,link:d,event_id:e,Check_box:f});
    }


    });
  }
preview(i){
  cookies.set('link',this.state.link[i],{ path: '/'});
  window.open("/Events/"+this.state.link[i]);
}
  delete_cookies(){
    cookies.remove('name', { path: '/' });
    cookies.remove('user', { path: '/' });
    cookies.remove('auth_token', { path: '/' });
    cookies.remove('event_id', { path: '/' });
    this.setState({name:cookies.get('name'),redirect_logout:true});
  }


  manage(i){
    cookies.set('manage_event',this.state.event_id[i], { path: '/' });
    window.open("/sales_report");
  }
  edit(x)
  {
    cookies.set('event_id',this.state.event_id[x], { path: '/' });
    this.setState({redirect_edit:true});
  }

  delete(x)
  {

  }

  state = {
    collapsed: false,
  };

  onCollapse = (collapsed) => {
    console.log(collapsed);
    this.setState({ collapsed });
  };

  handleChange(event)
  {
    var array=[];
    array=this.state.Check_box;
    array[event.target.name]=event.target.checked;
    console.log(event.target.checked)
    this.setState({Check_box:array});
    console.log(this.state.Check_box)
    if(event.target.checked==true)
    {
      fetch('https://admin.thetickets.in/api/publish_the_event/'+this.state.event_id[event.target.name], {
    method: 'get',
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
      'Authorization':'Bearer '+this.state.auth_token
    }
    }).then(res=>res.json())
    .then(res => {console.log(res);
      if(res.status==true)
      {
        swal('Event', "Has been successfully published!", "success");
      }


    });
    }
    else {
      fetch('https://admin.thetickets.in/api/unpublish_the_event/'+this.state.event_id[event.target.name], {
    method: 'get',
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
      'Authorization':'Bearer '+this.state.auth_token
    }
    }).then(res=>res.json())
    .then(res => {console.log(res);
      if(res.status==true)
      {
        swal('Event', "Has been successfully unpublished!", "success");
      }


    });
    }
  };
  render() {
    const fontdrop={
      fontFamily:'Roboto',
      fontSize:'18px'
    };
    const awesome={
      height:'120px',
      marginTop : '-27px',

      marginLeft:'490px',
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
    const Event=this.state.event_name.map((name,i)=>

    <div key={i} className="box-width">
    <span style={{fontSize:'20px',marginRight:'5px',color:'#ce2127',marginLeft:'15px'}}>{this.state.event_name[i]}</span>
    <span style={{fontSize:'14px',marginLeft:'20px'}}>{this.state.start_date[i]}</span>
    <button class="btn btn-primary" onClick={() => this.manage(i)}  style={{fontSize:'20px',marginRight:'5px',marginLeft:'15px',cursor:'pointer',height:'28px',paddingTop:'0px'}}>Manage</button>
    <br/><br/>
    <button class="btn btn-primary" onClick={()=>this.preview(i)}  style={{fontSize:'20px',marginRight:'5px',marginLeft:'15px',cursor:'pointer',height:'32px',paddingTop:'2px'}}>Preview</button>
    <button class="btn btn-primary" onClick={() => this.edit(i)} style={{fontSize:'20px',marginRight:'5px',marginLeft:'80px',cursor:'pointer',height:'32px',paddingTop:'2px'}}>Edit</button>
    <button class="btn btn-primary" onClick={this.delete} style={{fontSize:'20px',marginRight:'5px',background:'#ce2127',marginLeft:'80px',cursor:'pointer',height:'32px',paddingTop:'2px'}}>Delete</button>

    <span style={{fontSize:'20px',marginRight:'5px',marginLeft:'80px'}}>Published</span>
    <input name={i} style={{width:'23px',height:'17px'}} type="checkbox"  checked={this.state.Check_box[i]}  onChange={this.handleChange} />

    </div>

  );

  if(this.state.redirect_edit)
  {
    return <Redirect to='/Us1' />
  }

  if(this.state.redirect_logout)
  {
    return <Redirect to='/' />
  }


    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider
          collapsible
          collapsed={this.state.collapsed}
          onCollapse={this.onCollapse}
        >
          <div className="logo" />
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
            <Menu.Item key="1" >
              <Icon type="dashboard" theme="outlined" />
              <span >Home</span>
            </Menu.Item>
            <Menu.Item key="2" >
            <Link to={`/Us1`}>  <Icon type="desktop" />
              <span>Create an Event</span></Link>
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
            <div id="support" class="col-sm-12" style={{ padding: 24, background: '#fff', minHeight: 360 }}>
              <h1 style={{marginLeft:'450px',marginRight:'300px'}}>Welcome {this.state.name}</h1>
              {Event}
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>

          </Footer>
        </Layout>
      </Layout>
    );
  }
}

export default Demo;
