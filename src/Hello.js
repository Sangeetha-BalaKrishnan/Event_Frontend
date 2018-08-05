import React, { Component } from 'react';
import { Layout, Menu, Breadcrumb, Icon,Input } from 'antd';
import logo from './images/new.png';
import ReactDOM from 'react-dom';
import Signup from './Signup';
import Events from './Events';
import Signin from './Signin';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { render } from 'react-dom';




const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

const { Header, Content, Footer, Sider } = Layout;


class Dependency extends React.Component {
  constructor(props){
    super(props);
    this.state={
    toggle:false,
    toggleFirst:false,
    toggleAfter:false,
    checkbox:'',
    category:'',
    name:'',
    checkbox_mand:'',
    options:'',
    category_option:'Text box',
    category_option_ref:'',
    category_option_ref1:'',
    category_option_arr:[],
    category_option_ref_arr:[],
    name_arr:[],
    checkbox_mand_arr:[]

  };
  this.handleChange = this.handleChange.bind(this);
  this.handleChange1 = this.handleChange1.bind(this);
  this.handleChange_name = this.handleChange_name.bind(this);
  this.close = this.close.bind(this);
  this.clicked = this.clicked.bind(this);
  this.delete_ticket = this.delete_ticket.bind(this);
  this.statechange = this.statechange.bind(this);
};
handleChange(event){
this.setState({checkbox:event.target.checked,toggleFirst:!this.state.toggleFirst});
console.log(this.state.checkbox);
}

delete_ticket(event)
{
  alert(event.target.name);

  const temp1=this.state.name_arr;
  const temp2=this.state.category_option_arr;
  if(this.state.category_option_arr.length!=1)
  {
  temp1.splice(event.target.name,1);
  temp2.splice(event.target.name,1);
}
else {
  alert('Atleast one dependency should be der');
}

  this.setState({

    name_arr : temp1,
    category_option_arr : temp2

  });
  console.log(this.state.name_arr);

}


handleChange1(event){
this.setState({checkbox_mand:event.target.checked});

}


handleChange_name(event){

  this.setState({[event.target.name]:event.target.value});
}


close()
{
this.setState({
  toggle:false,
  toggleFirst:true,
  category_option_ref:'',
  category_option_ref1:'',
  name:'',
  category_option:'Text box'
});
}


dynamic(){
if(this.state.category_option=='Check_box'||this.state.category_option=='Select_box'||this.state.category_option=='Radio_button')
{
  return <div><input style={{marginLeft:'153px',width:'200px !important',marginTop:'-2px'}} name="category_option_ref" value={this.state.category_option_ref} onChange={this.handleChange_name} type="text" placeholder="options seperated by commas"  class="form-control" required/></div>;
}
else if(this.state.category_option=='Date')
{
  return <div><input style={{marginLeft:'153px',width:'200px !important',marginTop:'-2px'}} name="category_option_ref" value={this.state.category_option_ref} onChange={this.handleChange_name} type="text" placeholder="Min,Max age by DOB"  class="form-control" required/></div>;
}
else if(this.state.category_option=='Attachment')
{
  return <div><input style={{marginLeft:'153px',width:'200px !important',marginTop:'-2px'}} name="category_option_ref" value={this.state.category_option_ref} onChange={this.handleChange_name} type="text" placeholder="Enter file formats"  class="form-control" required/></div>;
}
else if(this.state.category_option=='Mobile'||this.state.category_option=='Text_area')
{
  return <div style={{marginLeft:'153px'}}>-</div>
}
return <div>  <label>
  <select name="category_option_ref1" value={this.state.category_option_ref1} style={{ width: '200px',marginLeft:'154px',height:'29px',borderRadius:'7px' }} onChange={this.handleChange_name} >
  <option value="Alpha">Alpha numeric</option>
  <option value="char">char only</option>
  <option value="numb">Number only</option>
  </select>
  </label></div>;
}


clicked(){
var value;
var check;
if(this.state.category_option_ref!='')
{
value=this.state.category_option_ref;
}
else if(this.state.category_option_ref1!=''){
value=this.state.category_option_ref1;
}
else{
value="--";
}
if(this.state.checkbox_mand)
{
check="YES";
}
else {
check="NO";
}
console.log(value);
this.setState({
    name_arr:[...this.state.name_arr,this.state.name],
    category_option_arr:[...this.state.category_option_arr,this.state.category_option],
    category_option_ref_arr:[...this.state.category_option_ref_arr,value],
    checkbox_mand_arr:[...this.state.checkbox_mand_arr,check],
    name:'',
    category_option:'Text box',
    category_option_ref:'',
    category_option_ref1:'',
    checkbox_mand:'',
    toggle:false,
    toggleAfter:true
  })
console.log(this.state.name_arr);
}

statechange(){
this.setState({toggle:true});
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
  const show_values=(
    this.state.name_arr.map((name,i)=>
  <div  key={i}>
  <div style={{marginTop:'30px',marginBottom:'10px'}}>
  <div className="rows">
  <div className="col-sm-2">
  {name}
  </div>
  <div className="col-sm-2">
  {this.state.category_option_arr[i]}
  </div>
  <div className="col-sm-2">
  {this.state.category_option_ref_arr[i]}
  </div>
  <div className="col-sm-2">
  {this.state.checkbox_mand_arr[i]}
  </div>
  <div className="col-sm-2">
  <button name={i} onClick={this.delete_ticket} className="btn btn-primary"  style={{marginLeft:'40px',marginTop:'-12px'}}>DELETE</button>
  </div>
  </div>

  </div>
  <br/>
  </div>


)
  );

  const drop_down=(
    <div>

    <div className="rows">
    <div className="col-sm-2">
          <input   name="name" value={this.state.name} onChange={this.handleChange_name} type="text" placeholder="Event Name"  class="form-control" required/>
    </div>
          <div className="col-sm-2">
                <label>
                <select name="category_option" value={this.state.category_option} style={{ width: '200px',marginLeft:'83px',height:'31px',borderRadius:'7px' }} onChange={this.handleChange_name} >
                <option value="Text_box">Text box</option>
                <option value="Mobile">Mobile</option>
                <option value="Radio_button">Radio button</option>
                <option value="Check_box">Check box</option>
                <option value="Select_box">Select box</option>
                <option value="Text_area">Text area</option>
                <option value="Date">Date</option>
                <option value="Attachment">Attachment</option>
                </select>
                </label>
          </div>
          <div className="col-sm-2">
          {this.dynamic()}

          </div>
          <div className="col-sm-2">
               <input style={{marginLeft:'253px'}} type="checkbox" onChange={this.handleChange1} /><br/>
          </div>
          <br/><br/>
        <button  style={{height:'25px',marginTop:'10px',paddingTop:'2px',marginLeft:'15px'}} type="button" onClick={this.clicked} class="btn btn-primary">save</button>
    </div>
    </div>
  );
  const main_table=(
    <div>
    <br/><br/>
    <Icon style={{marginLeft:'83%',marginTop:'-8px',fontSize:25,cursor:'pointer'}} onClick={this.close} type="close" />
    <div className="rows">
    <div className="col-sm-2">
        Name
    </div>
          <div className="col-sm-2" style={{marginLeft:'85px'}}>
              Type
          </div>
          <div className="col-sm-2" style={{marginLeft:'71px'}}>
              Options
          </div>
          <div className="col-sm-2" style={{marginLeft:'75px'}}>
              Mandatory
          </div>

    </div>
  <br/><br/>
  {drop_down}

    </div>);
    const main_table1=(
      <div>
      <br/><br/>

      <div className="rows">
      <div className="col-sm-2">
          Name
      </div>
            <div className="col-sm-2">
                Type
            </div>
            <div className="col-sm-2">
                Options
            </div>
            <div className="col-sm-2">
                Mandatory
            </div>

      </div>
    <br/><br/>
    {show_values}

      </div>);
const check=(<div><input type="checkbox"  style={{marginTop:'20px'}} checked={this.state.checkbox}  onChange={this.handleChange} /> ADD dependency<br/></div>);

const add=(<div><button style={{height:'25px',marginTop:'10px',paddingTop:'2px',marginLeft:'15px'}} className="btn btn-primary" onClick={this.statechange}>ADD</button></div>);



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
      <Link to={`/H1`}> Shows / Tickets</Link>
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
  <div id="contain" style={{height:'400px',overflow:'auto'}}>
  {this.state.toggle?'':check}

  {this.state.toggleFirst?this.state.toggle?main_table:this.state.toggleAfter?main_table1:'':''}
  <br/><br/>
  {this.state.toggleFirst?this.state.toggle?'':add:''}

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

export default Dependency;