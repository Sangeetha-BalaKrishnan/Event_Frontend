import React, { Component } from 'react';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import logo from './images/new.png';
import ReactDOM from 'react-dom';
import Signup from './Signup';
import Events from './Events';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { render } from 'react-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';


function handleChange(value) {
  console.log(`selected ${value}`);
}
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

const { Header, Content, Footer, Sider } = Layout;


class TextEditor extends React.Component {
  constructor(props) {
    super(props)
    this.state = { editorHtml: '', theme: 'snow' }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange (html) {
  	this.setState({ editorHtml: html });
    console.log(this.state.editorHtml);
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
    const awesome={
      height:'120px',
      marginTop : '-27px',

      marginLeft:'490px',
      marginBottom:'-14px'
    };

    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider
          collapsible
          collapsed={this.state.collapsed}
          onCollapse={this.onCollapse}
        >
          <div className="logo" />
          <Menu theme="dark" defaultSelectedKeys={['2']} mode="inline">
            <Menu.Item key="1" onClick={this.handleChange}>
              <Link to={`/Us`}><Icon type="pie-chart" />
              <span >Option 1</span></Link>
            </Menu.Item>
            <Menu.Item key="2"  >
              <Icon type="desktop" />
              <span>Option 2</span>
            </Menu.Item>
            <SubMenu
              key="sub1"
              title={<span><Icon type="user" /><span>User</span></span>}
            >
              <Menu.Item key="3">Tom</Menu.Item>
              <Menu.Item key="4">Bill</Menu.Item>
              <Menu.Item key="5">Alex</Menu.Item>
            </SubMenu>
            <SubMenu
              key="sub2"
              title={<span><Icon type="team" /><span>Team</span></span>}
            >
              <Menu.Item key="6">Team 1</Menu.Item>
              <Menu.Item key="8">Team 2</Menu.Item>
            </SubMenu>
            <Menu.Item key="9">
              <Icon type="file" />
              <span>File</span>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }}  >
          <img style={awesome} src={logo}/>
          </Header>

          <Content style={{ margin: '0 16px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>User</Breadcrumb.Item>
              <Breadcrumb.Item>Bill</Breadcrumb.Item>
            </Breadcrumb>
            <div id="support" class="col-sm-12" style={{ padding: 24, background: '#fff', minHeight: 360 }}>

            <Menu
    onClick={this.handleClick}
    defaultSelectedKeys={'toggle3'}
    mode="horizontal" style={{marginLeft:'20px'}}
  >
  <Menu.Item key="toggle1">
    General INFO
  </Menu.Item>
  <Menu.Item key="toggle2" style={{marginLeft:'40px'}} onClick={this.handle}>
    <Link to={`/H1`}>ADDRESS</Link>
  </Menu.Item>
  <Menu.Item key="toggle3" style={{marginLeft:'40px'}}>
    DESCRIPTION
  </Menu.Item>
  <Menu.Item key="toggle4" style={{marginLeft:'40px'}}>
    <Link to={`/H`}>DEPENDENCY</Link>
  </Menu.Item>
  <Menu.Item key="toggle5" style={{marginLeft:'40px'}}>
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
        </div>
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        Ant Design ©2016 Created by Ant UED
      </Footer>
    </Layout>
  </Layout>
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
