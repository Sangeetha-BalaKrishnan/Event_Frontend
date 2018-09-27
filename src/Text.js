import React, { Component } from 'react';
import { Layout, Menu, Breadcrumb, Icon,Dropdown } from 'antd';
import logo from './images/new.png';
import ReactDOM from 'react-dom';
import Signup from './Signup';
import Events from './Events';
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";
import { render } from 'react-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import MediaQuery from 'react-responsive';
import swal from 'sweetalert';
import Cookies from 'universal-cookie';
const cookies = new Cookies();

function handleChange(value) {
  console.log(`selected ${value}`);
  console.log(value);
}
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

const message=(
  <span style={{fontFamily:'Roboto',fontSize:'14px',color:'red'}}>&nbsp;Enter this field</span>
);

const { Header, Content, Footer, Sider } = Layout;


class TextEditor extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      editorHtml: '',
      theme: 'snow',
      redirect_prev:false,
      redirect_next:false,
      error:false,
      name:cookies.get('name'),
      user:cookies.get('user'),
      auth_token:cookies.get('auth_token'),
      redirect_logout:false
      }
    this.handleChange = this.handleChange.bind(this);
    this.previous = this.previous.bind(this);
    this.next = this.next.bind(this);
    this.delete_cookies = this.delete_cookies.bind(this);

  }
  componentDidMount() {
    var cookie = cookies.get('event_id');
    if(cookie)
    {
      fetch('https://admin.thetickets.in/api/event_description/'+cookie, {
    method: 'get',
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
      'Authorization':'Bearer '+this.state.auth_token
    }
    }).then(res=>res.json())
    .then(res => {console.log(res);
      if(res.data.description!=null)
      this.setState({editorHtml:res.data.description});


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

  previous(){
    this.setState({redirect_prev:true});
  }
  next(){
    if(this.state.editorHtml == '' || this.state.editorHtml == '<p><br></p>')
    {
      this.setState({error:true});
    }
    else
    {
      fetch('https://admin.thetickets.in/api/event_description', {
    method: 'post',
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
      'Authorization':'Bearer '+this.state.auth_token
    },
    body: JSON.stringify({event_id:cookies.get('event_id'),description:this.state.editorHtml})
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
    }
  }

  handleChange (html) {
  	this.setState({ editorHtml: html });
    console.log(this.state.editorHtml,'saran');
    if(this.state.editorHtml != '')
    {
      this.setState({error:false});
    }
    else if(this.state.editorHtml == '' || this.state.editorHtml == '<p><br></p>')
    {
      this.setState({error:true});
    }

  }

  handleThemeChange (newTheme) {
    if (newTheme === "core") newTheme = null;
    this.setState({ theme: newTheme })
    console.log(this.state.theme);
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
      return <Redirect to='/H1' />
    }
    if(this.state.redirect_next)
    {
      return <Redirect to='/H2' />
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
    defaultSelectedKeys={['toggle3']}
    mode="horizontal" style={{marginLeft:'20px'}}
  >
  <Menu.Item disabled key="toggle1">
    General INFO
  </Menu.Item>
  <Menu.Item disabled key="toggle2" style={{marginLeft:'40px'}} onClick={this.handle}>
    <Link to={`/H1`}>ADDRESS</Link>
  </Menu.Item>
  <Menu.Item key="toggle3" style={{marginLeft:'40px'}}>
    DESCRIPTION
  </Menu.Item>
  <Menu.Item disabled key="toggle4" style={{marginLeft:'40px'}}>
    <Link to={`/H`}>UPLOAD</Link>
  </Menu.Item>
  <Menu.Item disabled key="toggle5" style={{marginLeft:'40px'}}>
    TICKETS
  </Menu.Item>
  </Menu>
  <div id="contain">
  <br/><br/>
      <ReactQuill
      	theme = {this.state.theme}
      	value={this.state.editorHtml}
      	onChange = {this.handleChange}
      	modules = {TextEditor.modules}
      	formats={TextEditor.formats}
      	placeholder={'Write Something....'} />
        {this.state.error?message:''}
        <br/><br/>
        <button type="button" style={bt} onClick={this.previous} className="btn btn-primary">Previous</button>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <button type="button" style={bt} onClick={this.next} className="btn btn-primary">Next</button>
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
defaultSelectedKeys={['toggle3']}
mode="horizontal" style={{marginLeft:'20px'}}
>
<Menu.Item disabled key="toggle1">
General INFO
</Menu.Item>
<Menu.Item disabled key="toggle2" style={{marginLeft:'40px'}} onClick={this.handle}>
<Link to={`/H1`}>ADDRESS</Link>
</Menu.Item>
<Menu.Item key="toggle3" style={{marginLeft:'40px'}}>
DESCRIPTION
</Menu.Item>
<Menu.Item disabled key="toggle4" style={{marginLeft:'40px'}}>
<Link to={`/H`}>UPLOAD</Link>
</Menu.Item>
<Menu.Item disabled key="toggle5" style={{marginLeft:'40px'}}>
TICKETS
</Menu.Item>
</Menu>
<div id="contain">
<br/><br/>
<ReactQuill
  theme = {this.state.theme}
  value={this.state.editorHtml}
  onChange = {this.handleChange}
  modules = {TextEditor.modules}
  formats={TextEditor.formats}
  placeholder={'Write Something....'} />
  {this.state.error?message:''}
  <br/><br/>
  <button type="button" style={bt} onClick={this.previous} className="btn btn-primary">Previous</button>
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  <button type="button" style={bt} onClick={this.next} className="btn btn-primary">Next</button>
  <br/><br/><br/>
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

TextEditor.modules = {
	toolbar: [
	[{header:['1','2','3','4']}],
    [{ 'font': [] }],
    [{size: []}],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{color:['red','blue','white','black']}],
    [{'list': 'ordered'}, {'list': 'bullet'},
      {'indent': '-1'}, {'indent': '+1'}],
    ['clean']
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false,
  }
}
TextEditor.formats = [
  'header', 'font', 'size','color',
  'bold', 'italic', 'underline', 'strike', 'blockquote',
  'list', 'bullet', 'indent'
]

export default TextEditor ;
