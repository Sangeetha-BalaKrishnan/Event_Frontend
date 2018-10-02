import { Layout, Menu, Breadcrumb, Icon,Dropdown } from 'antd';
import React, { Component } from 'react';
import { render } from 'react-dom';
import { Upload, Modal } from 'antd';
import './App.css';
import logo from './images/new.png';
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";
import Cookies from 'universal-cookie';
import axios from 'axios';
import MediaQuery from 'react-responsive';
const cookies = new Cookies();
const { Header, Content, Footer, Sider } = Layout;
const SubMenu = Menu.SubMenu;
const instance = axios.create();

const message=(
  <span style={{fontFamily:'Roboto',fontSize:'14px',color:'red'}}>&nbsp;Please Upload the IMAGE</span>
);

const antIcon = <Icon type="loading" style={{ fontSize: 135,marginLeft:"45%",marginTop:"18%" }} spin />;
const antIcon1 = <Icon type="loading" style={{ fontSize: 70,marginLeft:"40%",marginTop:"50%" }} spin />;

class Up extends Component {
  constructor(props) {
    super(props);
  this.state = {
    loading:true,
    collapsed: false,
    file: '',
    imagePreviewUrl: 'https://via.placeholder.com/380x230',
    name:cookies.get('name'),
    user:cookies.get('user'),
    redirect_prev:false,
    redirect_next:false,
    error:false,
    redirect_logout:false,
    auth_token:cookies.get('auth_token'),
  };
  instance.defaults.headers.common['Authorization'] = `Bearer ${this.state.auth_token}` ;
  this._handleImageChange = this._handleImageChange.bind(this);
  this.previous = this.previous.bind(this);
  this._handleSubmit = this._handleSubmit.bind(this);
  this.delete_cookies = this.delete_cookies.bind(this);
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



componentDidMount() {
  var cookie = cookies.get('event_id');
  if(cookie)
  {
    fetch('https://admin.thetickets.in/api/show_image/'+cookie, {
  method: 'get',
  headers: {
    'Accept': 'application/json, text/plain, */*',
    'Content-Type': 'application/json',
    'Authorization':'Bearer '+this.state.auth_token
  }
  }).then(res=>res.json())
  .then(res => {
    // console.log(res);
    if(res.status == true && res.url!=null)
    {
    this.setState({imagePreviewUrl:res.url,loading:false});
  }


  });
  }
  this.setState({loading:false});
}


  onCollapse = (collapsed) => {
    // console.log(collapsed);
    this.setState({ collapsed });
  }

  _handleSubmit(e) {
    e.preventDefault();
    // TODO: do something with -> this.state.file
    var eventid = cookies.get('event_id');
    // console.log(this.state.file,eventid);

    if(eventid)
    {
      var formData = new FormData();
   formData.append('eventid',eventid);
   formData.append('url','');
     formData.append('import_image', this.state.file);
     for (var key of formData.entries()) {
       // console.log(key[0] , key[1]);
   }


    let url='https://admin.thetickets.in/api/create_image';

  axios.post(url, formData)

    .then(res => {
      // console.log(res.data);
      if(this.state.imagePreviewUrl == 'https://via.placeholder.com/380x230' && res.data.status == false)
      {
        this.setState({error:true});
      }
      else
      {
        this.setState({error:false,redirect_next:true});
      }
    });
    }
  }
    _handleImageChange(e) {
      e.preventDefault();

      let reader = new FileReader();
      let file = e.target.files[0];

      reader.onloadend = () => {
        this.setState({
          file: file,
          imagePreviewUrl: reader.result
        });
        // console.log(file,reader.result);
      }

      reader.readAsDataURL(file)
    }


  render() {
    let {imagePreviewUrl} = this.state;
    let $imagePreview = null;
    let $imagePreview1 = null;
    if (imagePreviewUrl) {
      $imagePreview = (<img src={imagePreviewUrl} width="380" height="230"/>);
    }
    if (imagePreviewUrl) {
      $imagePreview1 = (<img src={imagePreviewUrl} style={{marginLeft: "-108px",
    marginTop: "48px",
    marginBottom: "12px",
    width: "277px",
    height: "194px"}}/>);
    }
//dont keep names as awesome ,awesome 1 -_- @saravanan

const bt={
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

      marginLeft:'11px',
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
      return <Redirect to='/dummy1' />
    }
    if(this.state.redirect_next)
    {
      return <Redirect to='/H3' />
    }
    if(this.state.redirect_logout)
    {
      return <Redirect to='/' />
    }
    return (
      <div>
      <MediaQuery query="(min-device-width: 1224px)">
      {this.state.loading==true?antIcon:
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
          <Header style={{ background: '#fff', padding: 0 }} >
          <Link to={`/`}><img style={awesome} src={logo}/></Link>
          {dropdown_organiser}
          </Header>
          <Content style={{ margin: '0 16px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>

            </Breadcrumb>

            <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
            <Menu

    defaultSelectedKeys={['toggle4']}
    mode="horizontal" style={{marginLeft:'20px'}}
  >
    <Menu.Item disabled key="toggle1">
      General INFO
    </Menu.Item>
    <Menu.Item disabled key="toggle2" style={{marginLeft:'40px'}} onClick={this.handle}>
      <Link to={`/H1`}> ADDRESS</Link>
    </Menu.Item>
    <Menu.Item disabled key="toggle3" style={{marginLeft:'40px'}}>
      DESCRIPTION
    </Menu.Item>
    <Menu.Item key="toggle4" style={{marginLeft:'40px'}}>
      UPLOAD
    </Menu.Item>
    <Menu.Item disabled key="toggle5" style={{marginLeft:'40px'}}>
      TICKETS
    </Menu.Item>
  </Menu>
  <br/><br/>
            <div>
            <div className="row">
              <div className="col-xs-4 image-form" >
              <form onSubmit={this._handleSubmit}>
                <input type="file" onChange={this._handleImageChange} />
                <br/>
                {this.state.error==true?<span>{message}</span>:''}
                <br/><br/><br/><br/><br/><br/><br/><br/><br/>
                <button type="button" style={bt} onClick={this.previous} className="btn btn-primary">Previous</button>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <button type="button" style={bt} onClick={this._handleSubmit} className="btn btn-primary">Next</button>
              </form>
              </div>
              <div className="col-xs-8" align="center">
              {$imagePreview}
              <br/>
              <span>Please upload image at 16:9 aspect ratio</span>
              </div>
              </div>
            </div>
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>

          </Footer>
        </Layout>
      </Layout>}
      </MediaQuery>
      <MediaQuery query="(max-device-width: 1224px)">
      {this.state.loading==true?antIcon1:
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
          <Header style={{ background: '#fff', padding: 0 }} >
          <Link to={`/`}><img style={awesome1} src={logo}/></Link>
          {dropdown_organiser_m}
          </Header>
          <Content style={{ margin: '0 16px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>

            </Breadcrumb>

            <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
            <Menu

    defaultSelectedKeys={['toggle4']}
    mode="horizontal" style={{marginLeft:'20px'}}
  >
    <Menu.Item disabled key="toggle1">
      General INFO
    </Menu.Item>
    <Menu.Item disabled key="toggle2" style={{marginLeft:'40px'}} onClick={this.handle}>
      <Link to={`/H1`}> ADDRESS</Link>
    </Menu.Item>
    <Menu.Item disabled key="toggle3" style={{marginLeft:'40px'}}>
      DESCRIPTION
    </Menu.Item>
    <Menu.Item key="toggle4" style={{marginLeft:'40px'}}>
      UPLOAD
    </Menu.Item>
    <Menu.Item disabled key="toggle5" style={{marginLeft:'40px'}}>
      TICKETS
    </Menu.Item>
  </Menu>
  <br/><br/>
            <div>
            <div className="row">
              <div className="col-xs-4 image-form" >
              <form onSubmit={this._handleSubmit}>
                <input type="file" onChange={this._handleImageChange} />
                <br/>
                {this.state.error==true?<span>{message}</span>:''}
                <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
                <button type="button" style={bt} onClick={this.previous} className="btn btn-primary">Previous</button>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <button type="button" style={bt} onClick={this._handleSubmit} className="btn btn-primary">Next</button>
              </form>
              </div>
              <div className="col-xs-8" align="center">
              {$imagePreview1}
              <br/>
              <span style={{marginLeft:"-107px"}}>Please upload image at 16:9 aspect ratio</span>
              </div>
              </div>
            </div>
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>

          </Footer>
        </Layout>
      </Layout>}

      </MediaQuery>
      </div>
    );
  }
}
export default Up;
