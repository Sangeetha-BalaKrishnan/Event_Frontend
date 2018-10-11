import { render } from 'react-dom';
import React, { Component } from 'react';
import { Layout, Menu, Breadcrumb, Icon,Input,Dropdown } from 'antd';
import logo from './images/new.png';
import ReactDOM from 'react-dom';
import Signup from './Signup';
import Events from './Events';
import MediaQuery from 'react-responsive';

import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";
import Cookies from 'universal-cookie';
const cookies = new Cookies();

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

const { Header, Content, Footer, Sider } = Layout;
const after={
  borderColor:'red',
};


const before={
  borderColor:'#cccccc',
}

const message=(
  <span style={{fontFamily:'Roboto',fontSize:'11px'}}>&nbsp;Enter this field</span>
);


class Hello extends Component{
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
      category_option_ref1:'Alpha numeric',
      category_option_arr:[],
      category_option_ref_arr:[],
      name_arr:[],
      check_name:before,
      checkbox_mand_arr:[],
      checkbox_mand_arr_cpy:[],
      name_ch:cookies.get('name'),
      user:cookies.get('user'),
      auth_token:cookies.get('auth_token'),
      redirect_logout:false,
      redirect_prev:false,
      redirect_next:false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleChange_name1 = this.handleChange_name1.bind(this);
    this.handleChange_toggle = this.handleChange_toggle.bind(this);
    this.handleChange1 = this.handleChange1.bind(this);
    this.handleChange_name = this.handleChange_name.bind(this);
    this.close = this.close.bind(this);
    this.clicked = this.clicked.bind(this);
    this.delete_ticket = this.delete_ticket.bind(this);
    this.statechange = this.statechange.bind(this);
    this.delete_cookies = this.delete_cookies.bind(this);
    this.previous = this.previous.bind(this);
    this.next = this.next.bind(this);
  }

  componentDidMount() {
    var cookie = cookies.get('event_id');

    if(cookie)
    {
      fetch('https://admin.thetickets.in/api/get_addon/'+cookie, {
    method: 'get',
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
      'Authorization':'Bearer '+this.state.auth_token
    }
    }).then(res=>res.json())
    .then(res => {
      console.log(res);
      if(res.status==true)
      {
        var i;
        var arr=[];
        for(i=0;i<res.title.length;i++)
        {
          if(res.optional==1)
          {
            arr.push("YES");
          }
          else {
            arr.push("NO");
          }
        }
        this.setState({name_arr:res.title,category_option_arr:res.type,category_option_ref_arr:res.value,checkbox_mand_arr:arr,checkbox_mand_arr_cpy:res.optional});
      }


    });
    }
  }

  handleChange_toggle(event){

    this.setState({[event.target.name] : event.target.value});

  var temp="check_"+event.target.name;
  // console.log(temp);
    if((event.target.value).length>0)
    {
      this.setState({[temp]:before});
    }
  }
  handleChange_name1(event){

    this.setState({[event.target.name] : event.target.value});
    var temp="check_"+event.target.name;
    if(event.target.value=='')
    {
      this.setState({[temp]:after});
    }

  }

  handleChange(event){
  this.setState({checkbox:event.target.checked,toggleFirst:!this.state.toggleFirst});
  // console.log(this.state.checkbox);
}
previous(){
  this.setState({redirect_prev:true});
}
next(){
  console.log(this.state.name_arr,"tttttt");
  fetch('https://admin.thetickets.in/api/store_addon', {
method: 'post',
headers: {
  'Accept': 'application/json, text/plain, */*',
  'Content-Type': 'application/json',
  'Authorization':'Bearer '+this.state.auth_token
},
body: JSON.stringify({eventid:cookies.get('event_id'),
	title:this.state.name_arr,
	type:this.state.category_option_arr,
	value:this.state.category_option_ref_arr,
  optional:this.state.checkbox_mand_arr_cpy,
	total:this.state.name_arr.length})
}).then(res=>res.json())
.then(res => {
  console.log(res);
  if(res.status==true)
  {
    this.setState({redirect_next:true});
  }

});
}
delete_cookies(){
  cookies.remove('name', { path: '/' });
  cookies.remove('user', { path: '/' });
  cookies.remove('auth_token', { path: '/' });
  cookies.remove('event_id', { path: '/' });
  this.setState({name:cookies.get('name'),redirect_logout:true});
}
  delete_ticket(event)
  {


    const temp1=this.state.name_arr;
    const temp2=this.state.category_option_arr;
    const temp3=this.state.category_option_ref_arr;
    const temp4=this.state.checkbox_mand_arr;

    temp1.splice(event.target.name,1);
    temp2.splice(event.target.name,1);
    temp3.splice(event.target.name,1);
    temp4.splice(event.target.name,1);



    this.setState({

      name_arr : temp1,
      category_option_arr : temp2,
      category_option_ref_arr : temp3,
      checkbox_mand_arr:temp4

    });
    // console.log(this.state.name_arr);

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
    return <div><input  name="category_option_ref" value={this.state.category_option_ref} onChange={this.handleChange_name} type="text" placeholder="options seperated by commas" id="email1" className="form-control" required/></div>;
  }
  /*else if(this.state.category_option=='Date')
  {
    return <div><input  name="category_option_ref" value={this.state.category_option_ref} onChange={this.handleChange_name} type="text" placeholder="Min,Max age by DOB" id="email1" className="form-control" required/></div>;
  }
  else if(this.state.category_option=='Attachment')
  {
    return <div><input  name="category_option_ref" value={this.state.category_option_ref} onChange={this.handleChange_name} type="text" placeholder="Enter file formats" id="email1" className="form-control" required/></div>;
  }*/
  else if(this.state.category_option=='Mobile'||this.state.category_option=='Text_area')
  {
    return <div>-</div>
  }
  return <div>  <label>
    <select name="category_option_ref1" value={this.state.category_option_ref1} style={{ width: '200px',height:'29px',borderRadius:'7px' }} onChange={this.handleChange_name} >
    <option value="Alpha">Alpha numeric</option>
    <option value="char">char only</option>
    <option value="numb">Number only</option>
    </select>
    </label></div>;
}


clicked(){
  if(this.state.name == '')
  {
    this.setState({check_name:after});
  }
  else {


  var value;
  var check;
  var check_temp;
if(this.state.category_option_ref!='')
{
  value=this.state.category_option_ref;
}
else if(this.state.category_option_ref1!='' && this.state.category_option=="Text box" ){
  value=this.state.category_option_ref1;
}
else{
  value="--";
}
if(this.state.checkbox_mand)
{
  check="YES";
  check_temp=1;
}
else {
  check="NO";
  check_temp=0;
}

  this.setState({
      name_arr:[...this.state.name_arr,this.state.name],
      category_option_arr:[...this.state.category_option_arr,this.state.category_option],
      category_option_ref_arr:[...this.state.category_option_ref_arr,value],
      checkbox_mand_arr:[...this.state.checkbox_mand_arr,check],
      checkbox_mand_arr_cpy:[...this.state.checkbox_mand_arr_cpy,check_temp],
      name:'',
      category_option:'Text box',
      category_option_ref:'',
      category_option_ref1:'Alpha Numeric',
      checkbox_mand:'',
      toggle:false,
      toggleAfter:true
    })
   console.log(this.state.name,this.state.category_option,value,check);
}
}

statechange(){
  this.setState({toggle:true});
}

handleClick = (e) => {
  // console.log('click ', e);
  this.setState({
    current: e.key,
  });
};

  state = {
    collapsed: false,
  };

  onCollapse = (collapsed) => {
    // console.log(collapsed);
    this.setState({ collapsed });
  };



  render(){
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
    <button name={i} onClick={this.delete_ticket} className="btn btn-primary"  style={{marginLeft:'40px',marginTop:'-12px',height:'28px',paddingTop:'3px'}}>DELETE</button>
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
      <div className="col-sm-3">

            <input  name="name" style={this.state.check_name} value={this.state.name} onChange={this.state.check_name==after?this.handleChange_toggle:this.handleChange_name} type="text" placeholder="Event Name" id="email1" className="form-control" required/>
            {this.state.check_name==after?message:''}
      </div>
            <div className="col-sm-3">
                  <label>
                  <select name="category_option" value={this.state.category_option} style={{ width: '200px',height:'29px',borderRadius:'7px' }} onChange={this.handleChange_name} >
                  <option value="Text_box">Text box</option>
                  <option value="Mobile">Mobile</option>
                  <option value="Radio_button">Radio button</option>
                  <option value="Check_box">Check box</option>
                  <option value="Select_box">Select box</option>
                  <option value="Text_area">Text area</option>

                  </select>
                  </label>
            </div>
            <div className="col-sm-3">
            {this.dynamic()}

            </div>
            <div className="col-sm-3">
                 <input style={{marginLeft:'27px'}} type="checkbox" onChange={this.handleChange1} /><br/>
            </div>
            <br/><br/><br/><br/>
          <button  style={{height:'25px',marginTop:'10px',paddingTop:'2px',marginLeft:'15px'}} type="button" onClick={this.clicked} className="btn btn-primary">save</button>
      </div>
      </div>
    );
    const drop_down_mobile=(
      <div>

      <div className="rows">
      <i className="fa fa-close" style={{marginLeft:'89%',marginTop:'-8px',fontSize:25,cursor:'pointer'}} onClick={this.close}></i>
      <div className="col-sm-3">
            <h4>Name</h4>
            <input  name="name" style={this.state.check_name} value={this.state.name} onChange={this.state.check_name==after?this.handleChange_toggle:this.handleChange_name} type="text" placeholder="Event Name" id="email1" className="form-control" required/>
            {this.state.check_name==after?message:''}
      </div>
            <div className="col-sm-3">
            <h4>Type</h4>
                  <label>
                  <select name="category_option" value={this.state.category_option} style={{ width: '200px',height:'29px',borderRadius:'7px' }} onChange={this.handleChange_name} >
                  <option value="Text_box">Text box</option>
                  <option value="Mobile">Mobile</option>
                  <option value="Radio_button">Radio button</option>
                  <option value="Check_box">Check box</option>
                  <option value="Select_box">Select box</option>
                  <option value="Text_area">Text area</option>

                  </select>
                  </label>
            </div>
            <div className="col-sm-3">
            <h4>Options</h4>
            {this.dynamic()}

            </div>
            <div className="col-sm-3">
            <h4>Mandatory</h4>
                 <input style={{marginLeft:'27px'}} type="checkbox" onChange={this.handleChange1} /><br/>
            </div>
            <br/><br/><br/><br/>
          <button  style={{height:'25px',marginTop:'10px',paddingTop:'2px',marginLeft:'15px'}} type="button" onClick={this.clicked} className="btn btn-primary">save</button>
      </div>
      </div>
    );
    const main_table=(
      <div>
      <br/><br/>

      <i className="fa fa-close" style={{marginLeft:'89%',marginTop:'-8px',fontSize:25,cursor:'pointer'}} onClick={this.close}></i>
      <div className="rows">
      <div className="col-sm-2">
          Name
      </div>
            <div className="col-sm-2" style={{marginLeft:'86px'}}>
                Type
            </div>
            <div className="col-sm-2" style={{marginLeft:'93px'}}>
                Options
            </div>
            <div className="col-sm-2" style={{marginLeft:'88px'}}>
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
const check=(<div><input type="checkbox"  checked={this.state.checkbox}  onChange={this.handleChange} /> ADD dependency<br/></div>);

const add=(<div><button style={{height:'25px',marginTop:'10px',paddingTop:'2px',marginLeft:'15px'}} className="btn btn-primary" onClick={this.statechange}>ADD</button></div>);
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
  return <Redirect to='/dummy1' />
}
if(this.state.redirect_next)
{
  return <Redirect to='/H2' />
}
if(this.state.redirect_logout)
{
  return <Redirect to='/' />
}

    return(
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
          <Link to='/'><img style={awesome} src={logo}/></Link>
          {dropdown_organiser}
          </Header>

          <Content style={{ margin: '0 16px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>

            </Breadcrumb>
            <div id="support" className="col-sm-12" style={{ padding: 24, background: '#fff', minHeight: 360 }}>

            <Menu
    onClick={this.handleClick}
    defaultSelectedKeys={['toggle4']}
    mode="horizontal" style={{marginLeft:'20px'}}
  >
  <Menu.Item disabled key="toggle1">
    General INFO
  </Menu.Item>
  <Menu.Item disabled key="toggle2" style={{marginLeft:'40px'}} onClick={this.handle}>
    ADDRESS
  </Menu.Item>
  <Menu.Item disabled key="toggle3" style={{marginLeft:'40px'}}>
    <Link to={`/dummy1`}>DESCRIPTION</Link>
  </Menu.Item>
  <Menu.Item key="toggle4" style={{marginLeft:'40px'}}>
    DEPENDENCY
  </Menu.Item>
  <Menu.Item disabled key="toggle6" style={{marginLeft:'40px'}}>
  <Link to={`/H3`}>UPLOAD</Link>
  </Menu.Item>
  <Menu.Item disabled key="toggle5" style={{marginLeft:'40px'}}>
    <Link to={`/H3`}>TICKETS</Link>
  </Menu.Item>
  </Menu>
  <div id="contain" style={{height:'400px',overflow:'auto'}}>
<br/>
      {this.state.toggle?'':check}

      {this.state.toggleFirst?this.state.toggle?main_table:this.state.toggleAfter?main_table1:main_table1:''}
      <br/><br/>
      {this.state.toggleFirst?this.state.toggle?'':add:''}
      <br/><br/>
      {this.state.toggle?'':
      <div>
      <button type="button" style={bt} onClick={this.previous} className="btn btn-primary">Previous</button>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <button type="button" style={bt} onClick={this.next} className="btn btn-primary">Next</button></div>}
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
  collapsed={['true']}
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
defaultSelectedKeys={['toggle4']}
mode="horizontal" style={{marginLeft:'20px'}}
>
<Menu.Item disabled key="toggle1">
General INFO
</Menu.Item>
<Menu.Item disabled key="toggle2" style={{marginLeft:'40px'}} onClick={this.handle}>
ADDRESS
</Menu.Item>
<Menu.Item disabled key="toggle3" style={{marginLeft:'40px'}}>
<Link to={`/dummy1`}>DESCRIPTION</Link>
</Menu.Item>
<Menu.Item key="toggle4" style={{marginLeft:'40px'}}>
DEPENDENCY
</Menu.Item>
<Menu.Item disabled key="toggle6" style={{marginLeft:'40px'}}>
<Link to={`/H3`}>UPLOAD</Link>
</Menu.Item>
<Menu.Item disabled key="toggle5" style={{marginLeft:'40px'}}>
<Link to={`/H3`}>TICKETS</Link>
</Menu.Item>
</Menu>
<div id="contain" style={{height:'400px',overflow:'auto'}}>
<br/>
{this.state.toggle?'':check}

{this.state.toggleFirst?this.state.toggle?drop_down_mobile:this.state.toggleAfter?main_table1:'':''}
<br/><br/>
{this.state.toggleFirst?this.state.toggle?'':add:''}
<br/><br/>
{this.state.toggle?'':
<div>
<button type="button" style={bt} onClick={this.previous} className="btn btn-primary">Previous</button>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
<button type="button" style={bt} onClick={this.next} className="btn btn-primary">Next</button></div>}
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


export default Hello;
