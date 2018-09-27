import React, { Component } from 'react';
import { Layout, Menu, Breadcrumb, Icon ,Input,Dropdown} from 'antd';
import logo from './images/new.png';
import ReactDOM from 'react-dom';
import Signup from './Signup';
import Events from './Events';
import { BrowserRouter as Router, Route, Link,Redirect } from "react-router-dom";
import { render } from 'react-dom';
import moment from 'moment';
import { DatePicker } from 'antd';
import MediaQuery from 'react-responsive';
import './Ticket.css';
import Cookies from 'universal-cookie';
import swal from 'sweetalert';
const cookies = new Cookies();
const after={
  borderColor:'red',
};

const before={
  borderColor:'#cccccc',
}
const message=(
  <span style={{fontFamily:'Roboto',fontSize:'11px'}}>&nbsp;Enter this field</span>
);
const message1=(
  <span style={{fontFamily:'Roboto',fontSize:'14px',color:'red'}}>&nbsp;Atleast one ticket should be there</span>
);
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
    toggle_show:false,
    ticket_name:'',
    show_name:'',
    start_date:'',
    end_date:'',
    price:'',
    quantity:'',
    show_name_array:[],
    start:[],
    end:[],
    ticket_name_array:[],
    price_array:[],
    quantity_array:[],
    check_show_name:before,
    check_event_start:before,
    check_event_end:before,
    check_ticket_name:before,
    check_quantity:before,
    check_price:before,
    error:false,
    name:cookies.get('name'),
    user:cookies.get('user'),
    auth_token:cookies.get('auth_token'),
    redirect_prev:false,
    redirect_logout:false
  };
  this.handleToggle = this.handleToggle.bind(this);
  this.add_show = this.add_show.bind(this);
  this.onChange = this.onChange.bind(this);
  this.onChange1 = this.onChange1.bind(this);
  this.handleChange = this.handleChange.bind(this);
  this.push_details = this.push_details.bind(this);
  this.push_details1 = this.push_details1.bind(this);
  this.close = this.close.bind(this);
  this.close1 = this.close1.bind(this);
  this.previous = this.previous.bind(this);
  this.next = this.next.bind(this);
  this.delete_ticket = this.delete_ticket.bind(this);
  this.handleChange_toggle = this.handleChange_toggle.bind(this);
  this.delete_cookies = this.delete_cookies.bind(this);


};
componentDidMount() {
  var cookie = cookies.get('event_id');
  if(cookie)
  {
    fetch('https://admin.thetickets.in/api/show_ticket/'+cookie, {
  method: 'get',
  headers: {
    'Accept': 'application/json, text/plain, */*',
    'Content-Type': 'application/json',
    'Authorization':'Bearer '+this.state.auth_token
  }
  }).then(res=>res.json())
  .then(res => {
    // console.log(res.data);
    if(res.data != null)
    {
    var a=[];
    var b=[];
    var c=[];
    for(var i=0;i<3;i++)
    {
      for(var j=0;j<res.data[0].length;j++)
      {
        if(i==0)
        {
          a.push(res.data[i][j]);
        }
        if(i==1)
        {
          b.push(res.data[i][j]);
        }
        if(i==2)
        {
          c.push(res.data[i][j]);
        }
      }
    }
    this.setState({ticket_name_array:a,quantity_array:b,price_array:c});

}
  });
  }
}

handleToggle(){
  this.setState({toggle:true});
  // console.log(this.state.ticket_name_array);
}
add_show(){
  this.setState({toggle_show:true});
}
onChange(value, dateString) {
  // console.log('Selected Time: ', value);
  // console.log('Formatted Selected Time: ', dateString);
  this.setState({start_date:dateString});
}
onChange1(value, dateString) {
  // console.log('Selected Time: ', value);
  // console.log('Formatted Selected Time: ', dateString);
  this.setState({end_date:dateString});
}
onOk(value) {
  // console.log('onOk: ', value);
}
previous(){
  this.setState({redirect_prev:true});
}
next(){
  if(this.state.ticket_name_array.length==0)
  {
    // console.log("hello");
    this.setState({error:true})
  }
  else
  {
    var key;
    if(cookies.get('event_id')==undefined)
    {
      key=null;
    }
    else {
      key=cookies.get('event_id');
    }

    fetch('https://admin.thetickets.in/api/create_ticket', {
  method: 'post',
  headers: {
    'Accept': 'application/json, text/plain, */*',
    'Content-Type': 'application/json',
    'Authorization':'Bearer '+this.state.auth_token
  },
  body: JSON.stringify({eventid:key,ticket_name:this.state.ticket_name_array,ticket_max:this.state.quantity_array,ticket_price:this.state.price_array})
}).then(res=>res.json())
  .then(res => {
    // console.log(res);
    if(res.status==false)
    {
      swal("Oops", "try again after some time", "error");
    }
    if(res.status==true)
    {
      swal("success", "Event created", "success");
    }

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

handleChange_toggle(event){

  this.setState({[event.target.name] : event.target.value});

var temp="check_"+event.target.name;
// console.log(temp);
  if((event.target.value).length>0)
  {
    this.setState({[temp]:before});
  }
}

handleChange(event){
  this.setState({[event.target.name]:event.target.value});
  var temp="check_"+event.target.name;
  if(event.target.value=='')
  {
    this.setState({[temp]:after});
  }
}

push_details()
{
  if(this.state.ticket_name ==''|| this.state.price=='' || this.state.quantity=='')
  {
    if(this.state.ticket_name =='')
    {
      this.setState({check_ticket_name:after});
    }
    if(this.state.price=='')
    {
      this.setState({check_price:after});
    }
    if(this.state.quantity=='')
    {
      this.setState({check_quantity:after});
    }
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
      toggle:false,
      error:false
    });


  }

}

push_details1()
{
  if(this.state.show_name ==''|| this.state.start_date=='' || this.state.end_date=='')
  {
    if(this.state.show_name =='')
    {
      this.setState({check_show_name:after});
    }
    if(this.state.start_date=='')
    {
      this.setState({check_event_start:after});
    }
    if(this.state.end_date=='')
    {
      this.setState({check_event_end:after});
    }
  }
  else
  {
    this.setState({
      show_name_array:[...this.state.show_name_array,this.state.show_name],
      start:[...this.state.start,this.state.start_date],
      end:[...this.state.end,this.state.end_date],
      show_name:'',
      start_date:'',
      end_date:'',
      toggle_show:false
    });
    // console.log(this.state.show_name_array,this.state.start,this.state.end);


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
close1()
{
  this.setState({
    show_name:'',
    start_date:'',
    end_date:'',
    toggle_show:false
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



  const show_ticket=(
    this.state.ticket_name_array.map((name,i)=>
  <div id="show_ticket_style" key={i}>
  <div id="show_ticket">
  <span style={{color:'#ce2127',fontSize:'18px'}}>TICKET</span>
  <br/>
  <span style={{marginLeft:'-40px'}}>{name}</span>&nbsp;&nbsp;&nbsp;<span>Rs.{this.state.price_array[i]}</span>&nbsp;&nbsp;&nbsp;<span>{this.state.quantity_array[i]}</span><button onClick={this.delete_ticket} className="btn btn-primary" name={i} style={{marginLeft:'40px'}}>DELETE</button>
  </div>

  </div>

)
  );
  const show_ticket_m=(
    this.state.ticket_name_array.map((name,i)=>
  <div id="show_ticket_style" key={i}>
  <div id="show_ticket">
  <span style={{color:'#ce2127',fontSize:'18px'}}>TICKET</span>
  <br/>
  <span>{name}</span>&nbsp;&nbsp;&nbsp;<span>Rs.{this.state.price_array[i]}</span>&nbsp;&nbsp;&nbsp;<span>{this.state.quantity_array[i]}</span><button onClick={this.delete_ticket} className="btn btn-primary" name={i} style={{marginLeft:'40px'}}>DELETE</button>
  </div>

  </div>

)
  );
  const add_ticket=(
    <div>
    <div id="add_ticket_style" onClick={this.handleToggle}>
    <div id="add_ticket">

    <i className="fa fa-plus" id="plus_mark"></i>
    <h4 id="add_ticket_text">ADD TICKETS</h4>
    </div>

    </div>
    <br/><br/>
    <button type="button" style={bt} onClick={this.previous} className="btn btn-primary">Previous</button>
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    <button type="button" style={bt} onClick={this.next} className="btn btn-primary">Next</button>
    </div>
  );
  const add_ticket_details=(
    <div id="ticket_details">

      <i className="fa fa-close" id="close_mark" onClick={this.close}></i>
      <h5>TICKET NAME</h5>
      <Input type="text" style={this.state.check_ticket_name} id="input_width" name="ticket_name" value={this.state.ticket_name} onChange={this.state.check_ticket_name==after?this.handleChange_toggle:this.handleChange} placeholder="Ticket Name" className="form-control" required/><br/>
      {this.state.check_ticket_name==after?message:''}
      <br/>
      <h5>QUANTITY</h5>
      <Input type="number" style={this.state.check_quantity} id="input_width" name="quantity" value={this.state.quantity} onChange={this.state.check_quantity==after?this.handleChange_toggle:this.handleChange} placeholder="Ticket price" /><br/>
      {this.state.check_quantity==after?message:''}
      <br/>
      <h5>TICKET PRICE</h5>
      <Input type="number" style={this.state.check_price} id="input_width" name="price" value={this.state.price} onChange={this.state.check_price==after?this.handleChange_toggle:this.handleChange} placeholder="Ticket price" /><br/>
      {this.state.check_price==after?message:''}
      <br/><br/>
      <button onClick={this.push_details} className="btn btn-primary">SUBMIT</button>
    </div>
  );
  const add_show=(
    <div id="ticket_details">

      <i className="fa fa-close" id="close_mark" onClick={this.close1}></i>
      <h5>Show NAME</h5>
      <Input type="text" style={this.state.check_show_name} id="input_width" name="show_name" value={this.state.show_name} onChange={this.state.check_ticket_name==after?this.handleChange_toggle:this.handleChange} placeholder="Ticket Name" className="form-control" required/><br/>
      {this.state.check_ticket_name==after?message:''}
      <br/>
      <div id="cat1" className="row">
        <div  className="col-sm-6">
        <h5>START DATE</h5>
        {cookies.get('event_id')==undefined?
                  <DatePicker
                showTime
                format="YYYY-MM-DD HH:mm:ss"
                placeholder="Select Time"
                onChange={this.onChange.bind(this)}
                onOk={this.onOk.bind(this)}
                style={{width:'270px'}}
              />:

        <DatePicker
              showTime
              format="YYYY-MM-DD HH:mm:ss"
              placeholder="Select Time"
              value={moment(this.state.start_date, 'YYYY-MM-DD HH:mm:ss')}
              onChange={this.onChange.bind(this)}
              onOk={this.onOk.bind(this)}
              style={{width:'270px'}}
            />
          }
            <br/>{this.state.check_event_start==after?message:''}
        </div>
        <div className="col-sm-6">
        <h5>END DATE</h5>
        {cookies.get('event_id')==undefined?
        <DatePicker
              showTime
              format="YYYY-MM-DD HH:mm:ss"
              placeholder="Select Time"
              onChange={this.onChange1.bind(this)}

              onOk={this.onOk.bind(this)}
              style={{width:'270px'}}
            />:
        <DatePicker
              showTime
              format="YYYY-MM-DD HH:mm:ss"
              placeholder="Select Time"
              onChange={this.onChange1.bind(this)}
              value={moment(this.state.end_date, 'YYYY-MM-DD HH:mm:ss')}
              onOk={this.onOk.bind(this)}
              style={{width:'270px'}}
            />}
            <br/>{this.state.check_event_end==after?message:''}
          </div>
      </div>
      <br/><br/>
      <button onClick={this.push_details1} className="btn btn-primary">SUBMIT</button>
    </div>
  );
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
          <Link to='/'><img style={awesome} src={logo}/></Link>
          {dropdown_organiser}
          </Header>

          <Content style={{ margin: '0 16px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>User</Breadcrumb.Item>
              <Breadcrumb.Item>Bill</Breadcrumb.Item>
            </Breadcrumb>
            <div id="support" className="col-sm-12" style={{ padding: 24, background: '#fff', minHeight: 360 }}>

            <Menu
    onClick={this.handleClick}
    defaultSelectedKeys={['toggle5']}
    mode="horizontal" style={{marginLeft:'20px'}}
  >
  <Menu.Item disabled key="toggle1">
    General INFO
  </Menu.Item>
  <Menu.Item disabled key="toggle2" style={{marginLeft:'40px'}} onClick={this.handle}>
    ADDRESS
  </Menu.Item>
  <Menu.Item disabled key="toggle3" style={{marginLeft:'40px'}}>
    DESCRIPTION
  </Menu.Item>
  <Menu.Item disabled key="toggle4" style={{marginLeft:'40px'}}>
    <Link to={`/H`}>DEPENDENCY</Link>
  </Menu.Item>
  <Menu.Item key="toggle5" style={{marginLeft:'40px'}}>
    TICKETS
  </Menu.Item>
  </Menu>
  <div id="contain" style={{height:'400px',overflow:'auto'}}>
  <br/>
  <button type="button" style={bt} onClick={this.add_show} className="btn btn-primary">ADD Show</button>
  {this.state.error?message1:''}
  {this.state.toggle_show?add_show:''}
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
              <Breadcrumb.Item>User</Breadcrumb.Item>
              <Breadcrumb.Item>Bill</Breadcrumb.Item>
            </Breadcrumb>
            <div id="support" className="col-sm-12" style={{ padding: 24, background: '#fff', minHeight: 360 }}>

            <Menu
    onClick={this.handleClick}
    defaultSelectedKeys={['toggle5']}
    mode="horizontal" style={{marginLeft:'20px'}}
  >
  <Menu.Item disabled key="toggle1">
    General INFO
  </Menu.Item>
  <Menu.Item disabled key="toggle2" style={{marginLeft:'40px'}} onClick={this.handle}>
    ADDRESS
  </Menu.Item>
  <Menu.Item disabled key="toggle3" style={{marginLeft:'40px'}}>
    DESCRIPTION
  </Menu.Item>
  <Menu.Item disabled key="toggle4" style={{marginLeft:'40px'}}>
    <Link to={`/H`}>DEPENDENCY</Link>
  </Menu.Item>
  <Menu.Item key="toggle5" style={{marginLeft:'40px'}}>
    TICKETS
  </Menu.Item>
  </Menu>
  <div id="contain" style={{height:'400px',overflow:'auto'}}>
  <br/>
  {this.state.error?message1:''}
  {this.state.toggle?'':show_ticket_m}
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
      </MediaQuery>
      </div>
    );
  }
}

export default Ticket;
