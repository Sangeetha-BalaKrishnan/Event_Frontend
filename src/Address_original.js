import React, { Component } from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import { Layout, Menu, Breadcrumb,Icon,Input,Tabs} from 'antd';
import logo from './images/new.png';
import Signup from './Signup';
import Events from './Events';
import './App.css';
import MediaQuery from 'react-responsive';

import { BrowserRouter as Router, Route, Link } from "react-router-dom";


const TabPane = Tabs.TabPane;


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
    link:''
  };
  this.handleChange = this.handleChange.bind(this);
  this.reset = this.reset.bind(this);
  this.handleChange_toggle = this.handleChange_toggle.bind(this);

};

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

}}
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
    defaultSelectedKeys={'toggle2'}
    mode="horizontal" style={{marginLeft:'20px'}}
  >
  <Menu.Item key="toggle1">
    <Link to={`/Us1`}>General INFO</Link>
  </Menu.Item>
  <Menu.Item key="toggle2" style={{marginLeft:'40px'}} onClick={this.handle}>
    ADDRESS
  </Menu.Item>
  <Menu.Item key="toggle3" style={{marginLeft:'40px'}}>
    <Link to={`/dummy1`}>DESCRIPTION</Link>
  </Menu.Item>
  <Menu.Item key="toggle4" style={{marginLeft:'40px'}}>
    DEPENDENCY
  </Menu.Item>
  <Menu.Item key="toggle5" style={{marginLeft:'40px'}}>
    TICKETS
  </Menu.Item>
  </Menu>
  <div id="contain">
  <Tabs defaultActiveKey="1">
<TabPane tab="Physical Location" key="1">
<div style={{marginLeft:'65px'}}>
<h3>Event Venue</h3>
<br/>
<div>
<Input name="venue" style={this.state.check_venue} value={this.state.venue} onChange={this.state.check_venue==after?this.handleChange_toggle:this.handleChange} style={{width:'270px'}} placeholder="Name of Venue" />
{this.state.check_venue==after?message:''}
<br/><br/>
<Input name="add1" style={this.state.check_add1} value={this.state.add1} onChange={this.state.check_add1==after?this.handleChange_toggle:this.handleChange} style={{width:'270px'}} placeholder="Street Line1" />
{this.state.check_add1==after?message:''}
<br/><br/>
<Input name="add2" value={this.state.add2} onChange={this.handleChange} style={{width:'270px'}} placeholder="Street Line2" />
<br/><br/>
<Input name="city" style={this.state.check_city} value={this.state.city} onChange={this.state.check_city==after?this.handleChange_toggle:this.handleChange} style={{width:'270px'}} placeholder="City" />
{this.state.check_city==after?message:''}
<br/><br/>
<span style={{cursor:'pointer'}} onClick={this.reset}><Icon type="reload" />&nbsp;&nbsp;Reset Location</span>
<br/><br/><br/>
</div>
<div id="map"style={{height:'338px',marginLeft:'180px',marginTop:'-344px'}}>
<Map google={this.props.google} zoom={14} initialCenter={{
      lat: 11.082382,
      lng: 76.986913
    }}
    style={{width: '60%', height: '70%', position: 'relative',marginLeft:'150px'}}>

  <Marker onMouseover={this.onMouseoverMarker}
          name={'Current location'} />

  <InfoWindow onClose={this.onInfoWindowClose}>
      <div>
        <h1>helo</h1>
      </div>
  </InfoWindow>
</Map>
</div>
<button type="button" style={bt} class="btn btn-primary">Submit</button>
</div>
</TabPane>
<TabPane tab="Online Event" key="2">
<div style={{marginLeft:'65px'}}>
<h3>Link (optional)</h3>
<br/>
<Input name="link" value={this.state.link} onChange={this.handleChange} style={{width:'450px'}} placeholder="Name of Venue" />
<br/><br/>
<button type="button" style={bt1} class="btn btn-primary">Submit</button>
</div>
</TabPane>

</Tabs>
  </div>
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            Ant Design ©2016 Created by Ant UED
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
    defaultSelectedKeys={'toggle2'}
    mode="horizontal" style={{marginLeft:'20px'}}
  >
  <Menu.Item key="toggle1">
    <Link to={`/Us1`}>General INFO</Link>
  </Menu.Item>
  <Menu.Item key="toggle2" style={{marginLeft:'40px'}} onClick={this.handle}>
    ADDRESS
  </Menu.Item>
  <Menu.Item key="toggle3" style={{marginLeft:'40px'}}>
    <Link to={`/dummy1`}>DESCRIPTION</Link>
  </Menu.Item>
  <Menu.Item key="toggle4" style={{marginLeft:'40px'}}>
    DEPENDENCY
  </Menu.Item>
  <Menu.Item key="toggle5" style={{marginLeft:'40px'}}>
    TICKETS
  </Menu.Item>
  </Menu>
  <div id="contain">
  <Tabs defaultActiveKey="1">
<TabPane tab="Physical Location" key="1">
<div style={{marginLeft:'65px'}}>
<h3>Event Venue</h3>
<br/>
<div>
<Input name="venue" value={this.state.venue} onChange={this.handleChange} style={{width:'270px'}} placeholder="Name of Venue" />
<br/><br/>
<Input name="add1" value={this.state.add1} onChange={this.handleChange} style={{width:'270px'}} placeholder="Street Line1" />
<br/><br/>
<Input name="add2" value={this.state.add2} onChange={this.handleChange} style={{width:'270px'}} placeholder="Street Line2" />
<br/><br/>
<Input name="city" value={this.state.city} onChange={this.handleChange} style={{width:'270px'}} placeholder="City" />
<br/><br/>
<span style={{cursor:'pointer'}} onClick={this.reset}><Icon type="reload" />&nbsp;&nbsp;Reset Location</span>
<br/><br/><br/>
</div>
<div id="map"style={{height:'338px',marginLeft:'180px',marginTop:'-344px'}}>
<Map google={this.props.google} zoom={14} initialCenter={{
      lat: 11.082382,
      lng: 76.986913
    }}
    style={{width: '60%', height: '70%', position: 'relative',marginLeft:'150px'}}>

  <Marker onMouseover={this.onMouseoverMarker}
          name={'Current location'} />

  <InfoWindow onClose={this.onInfoWindowClose}>
      <div>
        <h1>helo</h1>
      </div>
  </InfoWindow>
</Map>
</div>
<button type="button" style={bt} class="btn btn-primary">Submit</button>
</div>
</TabPane>
<TabPane tab="Online Event" key="2">
<div style={{marginLeft:'65px'}}>
<h3>Link (optional)</h3>
<br/>
<Input name="link" value={this.state.link} onChange={this.handleChange} style={{width:'450px'}} placeholder="Name of Venue" />
<br/><br/>
<button type="button" style={bt1} class="btn btn-primary">Submit</button>
</div>
</TabPane>

</Tabs>
  </div>
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            Ant Design ©2016 Created by Ant UED
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
