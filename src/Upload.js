import { Layout, Menu, Breadcrumb, Icon,Dropdown } from 'antd';
import React, { Component } from 'react';
import { render } from 'react-dom';
import { Upload, Modal } from 'antd';
import './App.css';
import logo from './images/new.png';
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";
import Cookies from 'universal-cookie';
const cookies = new Cookies();
const { Header, Content, Footer, Sider } = Layout;
const SubMenu = Menu.SubMenu;

class Up extends Component {
  constructor(props) {
    super(props);
  this.state = {
    collapsed: false,
    file: '',
    imagePreviewUrl: '',
    name:cookies.get('name'),
    user:cookies.get('user'),
    auth_token:cookies.get('auth_token'),
  };
  this._handleImageChange = this._handleImageChange.bind(this);
  this._handleSubmit = this._handleSubmit.bind(this);
}
  onCollapse = (collapsed) => {
    console.log(collapsed);
    this.setState({ collapsed });
  }

  _handleSubmit(e) {
    e.preventDefault();
    // TODO: do something with -> this.state.file
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
        console.log(file,reader.result);
      }

      reader.readAsDataURL(file)
    }


  render() {
    let {imagePreviewUrl} = this.state;
    let $imagePreview = null;
    if (imagePreviewUrl) {
      $imagePreview = (<img src={imagePreviewUrl} />);
    }

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
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider
          collapsible
          collapsed={this.state.collapsed}
          onCollapse={this.onCollapse}
        >
          <div className="logo" />
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
            <Menu.Item key="1">
              <Icon type="dashboard" theme="outlined" />
              <span>Home</span>
            </Menu.Item>
            <Menu.Item key="2">
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
              <Breadcrumb.Item>User</Breadcrumb.Item>
              <Breadcrumb.Item>Bill</Breadcrumb.Item>
            </Breadcrumb>
            <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
            <div>
              <form onSubmit={this._handleSubmit}>
                <input type="file" onChange={this._handleImageChange} />
                <button type="submit" onClick={this._handleSubmit}>Upload Image</button>
              </form>
              {$imagePreview}
            </div>
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            Ant Design ©2018 Created by Ant UED
          </Footer>
        </Layout>
      </Layout>
    );
  }
}
export default Up;
