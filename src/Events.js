import React, { Component } from 'react';
import { render } from 'react-dom';
import logo from './images/new.png';
import Slider from 'react-animated-slider';
import content from './content'
import 'react-animated-slider/build/horizontal.css';
import 'normalize.css/normalize.css';
import './slider-animations.css';
import './styles.css';
import './App.css';
import './Event.css'
import AnchorLink from 'react-anchor-link-smooth-scroll';
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import { Spin, Icon } from 'antd';
import { Menu, Dropdown,Button } from 'antd';
import { Tabs } from 'antd';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;


const TabPane = Tabs.TabPane;


class Events extends Component{
  constructor(props){
    super(props);
    this.state={summa:"",
    image:'',
    event_name:'',
    start:'',
    end:'',
    name:cookies.get('name'),
    user:cookies.get('user'),
    auth_token:cookies.get('auth_token'),
    ticket_name:['Hello','summa'],
    value:[0,0],
    amount:[200,400],
    total:0,
  selectedPlace:{name:'summa'},
  editorHtml:""
};
  this.organiser = this.organiser.bind(this);
  this.customer = this.customer.bind(this);
  this.dashboard = this.dashboard.bind(this);
  this.sub = this.sub.bind(this);
  this.add = this.add.bind(this);
  }
  componentDidMount() {

    <Spin indicator={antIcon} />

    const  value =this.props.location.state;
console.log(value.value);
window.scrollTo(0, 0);
fetch('https://admin.thetickets.in/api/event_create/d851346e', {
method: 'get',
headers: {
'Accept': 'application/json, text/plain, */*',
'Content-Type': 'application/json',
'Authorization':'Bearer '+this.state.auth_token
}
}).then(res=>res.json())
.then(res => {console.log(res);

  this.setState({event_name:res.data.event_name,start:res.data.start,end:res.data.end});

});

  fetch('https://admin.thetickets.in/api/event_description/d851346e', {
method: 'get',
headers: {
  'Accept': 'application/json, text/plain, */*',
  'Content-Type': 'application/json',
  'Authorization':'Bearer '+this.state.auth_token
}
}).then(res=>res.json())
.then(res => {console.log(res);
  if(res.data.description!=null)
  {

    this.setState({editorHtml:res.data.description});
}

});
}
add(x){
var array=this.state.value;
array[x]+=1;
  this.setState({value:array});


}
sub(x){
  if(this.state.value[x] >0)
  {
    var array=this.state.value;
    array[x]-=1;
      this.setState({value:array});
}
}
delete_cookies(){
  cookies.remove('name', { path: '/' });
  cookies.remove('user', { path: '/' });
  cookies.remove('auth_token', { path: '/' });
  cookies.remove('event_id', { path: '/' });
  this.setState({name:cookies.get('name')});
}
organiser(){
  this.setState({organiser:true});
}
customer(){
  this.setState({customer:true});
}
dashboard(){
  this.setState({dashboard:true});
}
callback(key) {
  console.log(key);
}
total(){
  for(var i=0;i<this.state.value.length;i++)
  {
    if(this.state.value[i]>0)
    {
      this.state.total+=(this.state.value[i]*this.state.amount[i]);
      console.log(this.state.total);
    }
  }
}
  render(){
    const fontdrop={
      fontFamily:'Roboto',
      fontSize:'18px'
    };
    const butt1={
      marginTop:'30px',
      width: '50%',
      height:'48px',
      fontFamily:'Roboto',
      fontSize:'17px',
    marginLeft: '219px'
    };
    const butt2={
      marginTop:'40px',
      marginBottom:'30px',
      height:'48px',
      fontFamily:'Roboto',
      fontSize:'17px',
      width: '50%',
    marginLeft: '219px'
    };
    const col={
      background:'#e8e8e8'
    };
    const awesome={
      height:'120px',
      marginTop : '-13px',

      marginLeft:'577px',
      marginBottom:'-20px'
    };
    const awesome1={
      width:'40%',
      marginLeft:'405px'
    };
    const sign={
      marginTop:'36px'
    };
    const Ticket=this.state.ticket_name.map((name,i)=>
    <div key={i} className="outer">
    <br/>&nbsp;&nbsp;
    <span style={{fontSize:'18px',display:'inline-block',width:'60px'}}>{this.state.ticket_name[i]}</span>
    <span style={{fontSize:'16px',marginLeft:'340px'}}>Rs.{this.state.amount[i]}</span>
    <Icon  onClick={() => this.sub(i)} style={{cursor:'pointer',fontSize:'18px',marginLeft:'40px'}} type="minus" theme="outlined" />
    <span className="numb">{this.state.value[i]}</span>
    <Icon  onClick={() => this.add(i)} style={{cursor:'pointer',fontSize:'18px'}} type="plus" theme="outlined" />
    <span style={{fontSize:'18px',marginLeft:'20px'}} >Rs.{this.state.amount[i]*this.state.value[i]}</span>
    </div>
  );
    const menu_default = (
  <Menu style={{marginLeft:'140px',marginTop:'12px'}}>
    <Menu.Item key="1" style={{marginTop:'5px'}}>
      <a onClick={this.organiser}>&nbsp;&nbsp;ORGANISER</a>
    </Menu.Item>
    <Menu.Item key="2" style={{marginTop:'5px'}}>
      <a onClick={this.customer}>&nbsp;&nbsp;CUSTOMER</a>
    </Menu.Item>


  </Menu>
);
const menu_organiser = (
<Menu style={{marginLeft:'140px',marginTop:'12px'}}>
<Menu.Item key="1" style={{marginTop:'5px'}}>
  <a onClick={this.dashboard}>&nbsp;&nbsp;DASHBOARD</a>
</Menu.Item>
<Menu.Item key="2" style={{marginTop:'5px'}}>
  <a onClick={this.delete_cookies}>&nbsp;&nbsp;LOGOUT</a>
</Menu.Item>


</Menu>
);
const menu_customer = (
<Menu style={{marginLeft:'140px',marginTop:'12px'}}>
<Menu.Item key="1" style={{marginTop:'2px'}}>
  <a onClick={this.delete_cookies}>&nbsp;&nbsp;LOGOUT</a>
</Menu.Item>


</Menu>
);

const dropdown_default=(  <Dropdown overlay={menu_default}>

  <button className="btn btn-primary" style={{marginLeft:'415px',marginTop:'19px'}}><i style={{fontSize:'14px'}} className="fa fa-user"></i>&nbsp;&nbsp;SIGNIN
</button>

</Dropdown>);
const dropdown_customer=(  <Dropdown overlay={menu_customer}>
<a style={fontdrop} className="ant-dropdown-link" href="#">
<button className="btn btn-primary" style={{marginLeft:'415px',marginTop:'19px'}}><i style={{fontSize:'14px'}} className="fa fa-user"></i>&nbsp;&nbsp;{this.state.user}</button>
</a>
</Dropdown>);
const dropdown_organiser=(  <Dropdown overlay={menu_organiser}>
<a style={fontdrop} className="ant-dropdown-link" href="#">
<button className="btn btn-primary" style={{marginLeft:'415px',marginTop:'19px'}}><i style={{fontSize:'14px'}} className="fa fa-user"></i>&nbsp;&nbsp;{this.state.user}</button>
</a>
</Dropdown>);

if(this.state.organiser)
{
  return <Redirect to='/User/org/signin' />
}
if(this.state.customer)
{
  return <Redirect to='/User/cust/signin' />
}
if(this.state.dashboard)
{
  return <Redirect to='/Us1' />
}

    return(
      <div>

        <div className="head222">
        <Link to={`/`}>
          <img style={awesome} src={logo}/>
          </Link>
          {this.state.name=='customer'?dropdown_customer:this.state.name=='organiser'?dropdown_organiser:dropdown_default}
        </div>
        <div style={col}>
        <img style={awesome1} src={this.state.image}/>
        </div>
        <div>
        <Tabs defaultActiveKey="1" onChange={this.callback}>
      <TabPane tab="About Event" key="1">
      <div>
      <h4>{this.state.event_name}</h4>
      <br/>
      {this.state.start}
      <br/>
      {this.state.end}
      </div>
      {this.state.editorHtml!=""?
      <div dangerouslySetInnerHTML={{ __html: this.state.editorHtml }} />:''}
      </TabPane>

      <TabPane tab="Buy Tickets" key="2">
      {Ticket}
      {this.state.value[0]>=1?<button className="btn btn-primary book_ticket">Book Tickets</button>:''}
      <b/><br/>
      </TabPane>

      <TabPane tab="Get Direction" key="3">
      <div style={{height:'700px'}}>
      <Map google={this.props.google} zoom={14} initialCenter={{
            lat: 11.082382,
            lng: 76.986913
          }}
          style={{width: '80%', height: '70%', position: 'relative',marginLeft:'150px'}}>

        <Marker onMouseover={this.onMouseoverMarker}
                name={'Current location'} />

        <InfoWindow onClose={this.onInfoWindowClose}>
            <div>
              <h1>{this.state.selectedPlace.name}</h1>
            </div>
        </InfoWindow>
      </Map>
      </div>
      </TabPane>
    </Tabs>
        </div>





      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: ('AIzaSyCWpEoKPyUDW7x3OnfX0slzlz4NfV-abBI')
})(Events);
