
import React, { Component } from 'react';
import { Layout, Menu, Breadcrumb, Icon,Switch } from 'antd';
import logo from './images/new.png';
import ReactDOM from 'react-dom';
import Signup from './Signup';
import Events from './Events';
import { BrowserRouter as Router, Route, Link ,Redirect } from "react-router-dom";
import './Demo.css';
import { render } from 'react-dom';
import Cookies from 'universal-cookie';
const cookies = new Cookies();
const { Header, Content, Footer, Sider } = Layout;
const SubMenu = Menu.SubMenu;

class Demo extends React.Component {
  constructor(props){
    super(props);
    this.state={
      name:cookies.get('user'),
      event_name:['demo','summa'],
      start_date:['2017-04-21 21:22:22','2017-04-21 21:22:22'],
      end_date:['2017-04-22 01:22:22','2017-04-21 21:22:22'],
      Check_box:[true,false],
      event_id:['mikl1234nji','IndustryProgram'],
      redirect_edit:false
    };
    this.handleChange = this.handleChange.bind(this);
    this.edit = this.edit.bind(this);
    this.delete = this.delete.bind(this);

  };



  edit(x)
  {
    cookies.set('event_id',this.state.event_id[x], { path: '/' });
    this.setState({redirect_edit:true});
  }

  delete()
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
    this.setState({Check_box:array});
    console.log(this.state.Check_box)
  };
  render() {
    const awesome={
      height:'120px',
      marginTop : '-27px',

      marginLeft:'490px',
      marginBottom:'-14px'
    };
    const Event=this.state.event_name.map((name,i)=>

    <div className="box-width">
    <span key={i} style={{fontSize:'20px',marginRight:'5px',color:'#ce2127',marginLeft:'15px'}}>{this.state.event_name[i]}</span>
    <span style={{fontSize:'14px',marginLeft:'20px'}}>{this.state.start_date[i]}</span>
    <br/><br/>
    <span onClick={()=> window.open("https://admin.thetickets.in/event/"+this.state.event_id[i], "_blank")}  style={{fontSize:'20px',marginRight:'5px',marginLeft:'15px',cursor:'pointer'}}>Preview</span>
    <span key={i} onClick={() => this.edit(i)} style={{fontSize:'20px',marginRight:'5px',marginLeft:'100px',cursor:'pointer'}}>Edit</span>
    <span onClick={this.delete} style={{fontSize:'20px',marginRight:'5px',color:'#ce2127',marginLeft:'100px',cursor:'pointer'}}>Delete</span>
    <span style={{fontSize:'20px',marginRight:'5px',marginLeft:'100px'}}>Published</span>
    <input name={i} style={{width:'23px',height:'17px'}} type="checkbox"  checked={this.state.Check_box[i]}  onChange={this.handleChange} />

    </div>

  );

  if(this.state.redirect_edit)
  {
    return <Redirect to='/Us1' />
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
          <Link to='/'><img style={awesome} src={logo}/></Link>
          </Header>

          <Content style={{ margin: '0 16px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>User</Breadcrumb.Item>
              <Breadcrumb.Item>Bill</Breadcrumb.Item>
            </Breadcrumb>
            <div id="support" class="col-sm-12" style={{ padding: 24, background: '#fff', minHeight: 360 }}>
              <h1 style={{marginLeft:'450px',marginRight:'300px'}}>Welcome {this.state.name}</h1>
              {Event}
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
