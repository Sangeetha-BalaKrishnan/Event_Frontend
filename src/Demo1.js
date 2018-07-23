
import React, { Component } from 'react';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import logo from './images/new.png';
import ReactDOM from 'react-dom';
import Signup from './Signup';
import Events from './Events';
import Signin from './Signin';
import { Select } from 'antd';

import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import { render } from 'react-dom';

const Option = Select.Option;

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
      event_url:'',
      venue:'',
      address:'',
      city:'',
      category:'',
      current:'mail',
      render:''


  };
  this.handleChange2 = this.handleChange2.bind(this);
  this.handleChange1 = this.handleChange1.bind(this);
};

handleChange2(event){
  this.setState({[event.target.name]:event.target.value});
};


handleChange1(){
  alert("hello");

};

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
    const general_info=(
      <div>
      <div id="cat" class="row">
        <div  class="col-sm-6">
            <input  name="event_name" value={this.state.event_name} onChange={this.handleChange2} type="text" placeholder="Event Name" id="email1" class="form-control" required/>
            <label  class="form-control-placeholder" for="name">Event Name</label>
        </div>
        <div class="col-sm-6">
              <input name="event_url" value={this.state.event_url} onChange={this.handleChange2} type="text"  placeholder="Event URL" id="email1" class="form-control" required/>
              <label class="form-control-placeholder" for="password">Event URL</label>
          </div>
      </div>
      <div id="cat1" class="row">
      <div class="col-sm-6">
            <input name="venue" value={this.state.venue} onChange={this.handleChange2} type="text"  placeholder="Venue" id="email1" class="form-control" required/>
            <label class="form-control-placeholder" for="password">Venue</label>
        </div>
        <div class="col-sm-6">
         <textarea name="address" rows="6" cols="30" value={this.state.address} onChange={this.handleChange2} type="text"  placeholder="Address" id="email1" class="form-control" required/>

              <label class="form-control-placeholder" for="password">Address</label>
          </div>
      </div>
      <div id="cat1" class="row">
        <div  class="col-sm-6">
          <label>City</label>
          <div>
            <Select defaultValue="lucy" style={{ width: 200 }} onChange={this.handleChange2} class="form-control">
              <Option value="jack">Jack</Option>
              <Option value="lucy">Lucy</Option>
              <Option value="disabled" disabled>Disabled</Option>
              <Option value="Yiminghe">yiminghe</Option>
              </Select>

            </div>

        </div>
        <div  class="col-sm-6">
          <label>Category</label>
          <div>
            <Select defaultValue="lucy" style={{ width: 200 }} onChange={this.handleChange2} class="form-control">
              <Option value="jack">Jack</Option>
              <Option value="lucy">Lucy</Option>
              <Option value="disabled" disabled>Disabled</Option>
              <Option value="Yiminghe">yiminghe</Option>
              </Select>

            </div>
        </div>


      </div>
      <br/><br/>
      <button type="button" class="btn btn-primary">Cancel</button>
      &nbsp;&nbsp;&nbsp;&nbsp;
      <button type="button" class="btn btn-primary">Next</button>
      </div>
    );

    const show_ticket=(
      <div>
      <br/><br/>
        <button type="button" class="btn btn-primary">ADD SHOW</button>
      </div>
    );
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
    defaultSelectedKeys={[this.state.current]}
    mode="horizontal" style={{marginLeft:'20px'}}
  >
    <Menu.Item key="mail">
      General INFO
    </Menu.Item>
    <Menu.Item key="app" onClick={this.handle}>
      Shows / Tickets
    </Menu.Item>
    <SubMenu title={<span><Icon type="setting" />Navigation Three - Submenu</span>}>
      <MenuItemGroup title="Item 1">
        <Menu.Item key="setting:1">Option 1</Menu.Item>
        <Menu.Item key="setting:2">Option 2</Menu.Item>
      </MenuItemGroup>
      <MenuItemGroup title="Item 2">
        <Menu.Item key="setting:3">Option 3</Menu.Item>
        <Menu.Item key="setting:4">Option 4</Menu.Item>
      </MenuItemGroup>
    </SubMenu>
    <Menu.Item key="alipay">
      <a href="https://ant.design" target="_blank" rel="noopener noreferrer">Navigation Four - Link</a>
    </Menu.Item>
  </Menu>
  <div id="contain">
  {general_info}
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

export default Demo;
