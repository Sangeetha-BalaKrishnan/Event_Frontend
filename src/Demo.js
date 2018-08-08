
import React, { Component } from 'react';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import logo from './images/new.png';
import ReactDOM from 'react-dom';
import Signup from './Signup';
import Events from './Events';
import { BrowserRouter as Router, Route, Link ,Redirect } from "react-router-dom";

import { render } from 'react-dom';

const { Header, Content, Footer, Sider } = Layout;
const SubMenu = Menu.SubMenu;

class Demo extends React.Component {
  constructor(props){
    super(props);

  }

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
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
            <Menu.Item key="1" >
              <Icon type="pie-chart" />
              <span >Option 1</span>
            </Menu.Item>
            <Menu.Item key="2" >
            <Link to={`/Us1`}>  <Icon type="desktop" />
              <span>Option 2</span></Link>
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
              <h1 style={{marginLeft:'450px',marginRight:'300px'}}>Welcome saran</h1>
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

export default Demo;
