import React, { Component } from 'react';
import { Layout, Menu, Breadcrumb, Icon ,Input} from 'antd';
import logo from './images/new.png';
import ReactDOM from 'react-dom';
import Signup from './Signup';
import Events from './Events';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { render } from 'react-dom';


function handleChange(value) {
  console.log(`selected ${value}`);
}
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

const { Header, Content, Footer, Sider } = Layout;


class Ticket extends React.Component {
  constructor(props){
    super(props);
    this.state={
    toggle:false,
    ticket_name:'',
    price:'',
    quantity:'',
    ticket_name_array:[],
    price_array:[],
    quantity_array:[]
  };
  this.handleToggle = this.handleToggle.bind(this);
  this.handleChange = this.handleChange.bind(this);
  this.push_details = this.push_details.bind(this);
  this.close = this.close.bind(this);
  this.delete_ticket = this.delete_ticket.bind(this);



};


handleToggle(){
  this.setState({toggle:true});
  console.log(this.state.ticket_name_array);
}

handleChange(event){
  this.setState({[event.target.name]:event.target.value});
}

push_details()
{
  if(this.state.ticket_name ==''|| this.state.price=='' || this.state.quantity=='')
  {
    alert("Enter All the Values");
  }
  else
  {
    this.setState({
      ticket_name_array:[...this.state.ticket_name_array,this.state.ticket_name],
      price_array:[...this.state.price_array,this.state.price],
      quantity_array:[...this.state.quantity_array,this.state.quantity],
      quantity:'',
      ticket_name:'',
      price:'',
      toggle:false
    });


  }

}

close()
{
  this.setState({
    ticket_name:'',
    price:'',
    quantity:'',
    toggle:false
  });
}

delete_ticket(event)
{
  const temp1=this.state.ticket_name_array;
  const temp2=this.state.price_array;
  const temp3=this.state.quantity_array;
  temp1.splice(event.target.name,1);
  temp2.splice(event.target.name,1);
  temp3.splice(event.target.name,1);
  this.setState({
    ticket_name_array:temp1,
    price_array:temp2,
    quantity_array:temp3
  });
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

  const add_ticket_style={
    border:'1px solid black',
    borderStyle:'dashed',
    width:'32%',
    cursor:'pointer',
    marginLeft:'324px'
  };
  const show_ticket_style={
    border:'1px solid black',
    borderStyle:'dashed',
    width:'32%',
    marginTop:'25px',
    marginLeft:'324px'
  };
  const show_ticket=(
    this.state.ticket_name_array.map((name,i)=>
  <div style={show_ticket_style} key={i}>
  <div style={{marginTop:'30px',marginLeft:'100px',marginBottom:'10px'}}>
  <h5>TICKET</h5>
  <span>{name}</span>&nbsp;&nbsp;&nbsp;<span>{this.state.price_array[i]}</span>&nbsp;&nbsp;&nbsp;<span>{this.state.quantity_array[i]}</span><button onClick={this.delete_ticket} className="btn btn-primary" name={i} style={{marginLeft:'40px'}}>DELETE</button>
  </div>

  </div>

)
  );
  const add_ticket=(
    <div style={add_ticket_style} onClick={this.handleToggle}>
    <div style={{marginTop:'30px',marginLeft:'149px',marginBottom:'10px'}}>
    <Icon type="plus" style={{ fontSize: 35, color: '#08c' }}/>
    <h4 style={{marginLeft:'-34px'}}>ADD TICKETS</h4>
    </div>
    </div>
  );
  const add_ticket_details=(
    <div style={{marginLeft:'67px'}}>
      <Icon style={{marginLeft:'40%',marginTop:'25px',fontSize:25,cursor:'pointer'}} onClick={this.close} type="close" />
      <h5>TICKET NAME</h5>
      <Input type="text" style={{width:'27%'}} name="ticket_name" value={this.state.ticket_name} onChange={this.handleChange} placeholder="Ticket Name" />
      <br/>
      <h5>QUANTITY</h5>
      <Input type="number" style={{width:'27%'}} name="quantity" value={this.state.quantity} onChange={this.handleChange} placeholder="Ticket price" />
      <h5>TICKET PRICE</h5>
      <Input type="number" style={{width:'27%'}} name="price" value={this.state.price} onChange={this.handleChange} placeholder="Ticket price" /><br/><br/>
      <button onClick={this.push_details} className="btn btn-primary">SUBMIT</button>
    </div>
  );


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
    defaultSelectedKeys={'toggle5'}
    mode="horizontal" style={{marginLeft:'20px'}}
  >
  <Menu.Item key="toggle1">
    General INFO
  </Menu.Item>
  <Menu.Item key="toggle2" style={{marginLeft:'40px'}} onClick={this.handle}>
    ADDRESS
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
  <div id="contain" style={{height:'400px',overflow:'auto'}}>
  {this.state.toggle?'':show_ticket}
  <br/><br/>
  {this.state.toggle?add_ticket_details:add_ticket}
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

export default Ticket;
