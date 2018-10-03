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
import './Event.css';
import MediaQuery from 'react-responsive';
import AnchorLink from 'react-anchor-link-smooth-scroll';
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import { Spin, Icon } from 'antd';
import { Menu, Dropdown,Button } from 'antd';
import { Tabs } from 'antd';
import PaypalExpressBtn from 'react-paypal-express-checkout';
import Cookies from 'universal-cookie';
import swal from 'sweetalert';

const cookies = new Cookies();

const antIcon = <Icon type="loading" style={{ fontSize: 135,marginLeft:"45%",marginTop:"18%" }} spin />;
const antIcon1 = <Icon type="loading" style={{ fontSize: 70,marginLeft:"40%",marginTop:"50%" }} spin />;

const message=(
  <span style={{fontFamily:'Roboto',marginLeft:'600px',fontSize:'15px',color:'red'}}>&nbsp;You Must Login first</span>
);

const TabPane = Tabs.TabPane;


class Events extends Component{
  constructor(props){
    super(props);
    this.state={
      summa:"",
    loading:true,
    toggle:false,
    image:'',
    event_name:'',
    event_id:'',
    start:'',
    end:'',
    lat:'',
    long:'',
    address:'',
    organizer:'',
    phone:'',
    name:cookies.get('name'),
    user:cookies.get('user'),
    redirect_login:false,
    redirect_payment:false,
    auth_token:cookies.get('auth_token'),
    ticket_name:[],
    value:[],
    amount:[],
    quantity:[],
    total:0,
    conv:0,
    ticket_name_cpy:[],
    amount_cpy:[],
    quantity_cpy:[],
    unique_id:[],
    total_cpy:0,
    conv_cpy:0,
  selectedPlace:{name:'summa'},
  editorHtml:""
};
  this.organiser = this.organiser.bind(this);
  this.customer = this.customer.bind(this);
  this.dashboard = this.dashboard.bind(this);
  this.sub = this.sub.bind(this);
  this.add = this.add.bind(this);
  this.payment = this.payment.bind(this);
  this.toggle = this.toggle.bind(this);
  this.delete_cookies = this.delete_cookies.bind(this);
  }
  componentDidMount() {

    <Spin indicator={antIcon} />

if(cookies.get('link')==undefined)
{
    var  value =this.props.match.params.value;
  }
  else {
    var value = cookies.get('link');
  }
// console.log(value);
window.scrollTo(0, 0);
fetch('https://admin.thetickets.in/event/'+value, {
method: 'get',
headers: {
'Accept': 'application/json, text/plain, */*',
'Content-Type': 'application/json',
'Authorization':'Bearer '+this.state.auth_token
}
}).then(res=>res.json())
.then(res => {


  this.setState({event_name:res.data.event_details.name,start:res.data.event_details.start_time,end:res.data.event_details.end_time,editorHtml:res.data.event_details.description,lat:res.data.location.lat_long.substr(0,res.data.location.lat_long.indexOf(",")),long:res.data.location.lat_long.substr(res.data.location.lat_long.indexOf(",")+1),organizer:res.data.event_details.organizer,phone:res.data.event_details.phone,ticket_name:res.data.tickets[0],amount:res.data.tickets[2],quantity:res.data.tickets[1],value:res.data.tickets[3],address:res.data.location.address,event_id:res.data.eventid,image:res.data.image,loading:false});
  cookies.remove('link', { path: '/' });

});


}

add(x){
var array=this.state.value;
if(this.state.value[x]<=this.state.quantity[x])
{
  array[x]+=1;
  this.setState({value:array,total:0});
}
  var y=0;
for(var i=0;i<this.state.ticket_name.length;i++)
{
  y+=this.state.value[i]*this.state.amount[i];
}

this.setState({total:y,conv:(y*6)/100});

}

payment()
{
  // console.log(this.state.name);
  if(this.state.name==undefined || this.state.name=='')
  {
    this.setState({customer:true});
    cookies.set('link', this.props.location.state.value, { path: '/' });
  }
  else
  {
    fetch('https://admin.thetickets.in/api/book_ticket', {
  method: 'post',
  headers: {
    'Accept': 'application/json, text/plain, */*',
    'Content-Type': 'application/json',
    'Authorization':'Bearer '+this.state.auth_token
  },
  body: JSON.stringify({eventid:this.state.event_id,ticket_name:this.state.ticket_name,ticket_max:this.state.value,ticket_price:this.state.amount,total:this.state.quantity.length})
}).then(res=>res.json())
  .then(res => {
    // console.log(res);
    if(res.status==false)
    {
      swal("Oops", "try again after some time", "error");
    }
    if(res.status==true)
    {
    const a=[];
    const b=[];
    const c=[];
    const d=[];
    for(var i=0;i<res.data.length;i++)
    {
      a.push(res.data[i].ticket_name);
      b.push(res.data[i].total_ticket);
      c.push(res.data[i].cost);
      d.push(res.data[i].uniqueid);
    }
    this.setState({ticket_name_cpy:a,quantity_cpy:b,amount_cpy:c,total_cpy:res.total,conv_cpy:res.convenince,toggle:true,unique_id:d});
    console.log(d);
  }
  });
  }
}

onSuccess = (payment) => {
               
               fetch('https://admin.thetickets.in/api/save_ticket', {
               method: 'post',
               headers: {
               'Accept': 'application/json, text/plain, */*',
               'Content-Type': 'application/json',
               'Authorization':'Bearer '+this.state.auth_token
             },
             body: JSON.stringify({eventid:this.state.event_id,uniqueid:this.state.unique_id,transactionid:payment.paymentID,cost:this.state.total_cpy,charge:this.state.conv_cpy})
               }).then(res=>res.json())
               .then(res => {
                // console.log(res);

                 if(res.status==true)
                 {
                   swal("Payment", "Has been successfully Made", "success");
                   this.setState({redirect_payment:true});
                 }

               });

               // You can bind the "payment" object's value to your state or props or whatever here, please see below for sample returned data
       }
onCancel = (data) => {
           // User pressed "cancel" or close Paypal's popup!
           console.log('The payment was cancelled!', data);
           // You can bind the "data" object's value to your state or props or whatever here, please see below for sample returned data
       }
onError = (err) => {
           // The main Paypal's script cannot be loaded or somethings block the loading of that script!
           console.log("Error!", err);
           // Because the Paypal's main script is loaded asynchronously from "https://www.paypalobjects.com/api/checkout.js"
           // => sometimes it may take about 0.5 second for everything to get set, or for the button to appear
       }


toggle()
{
  this.setState({toggle:false});
}
sub(x){
  if(this.state.value[x] >0)
  {
    var array=this.state.value;
    array[x]-=1;
      this.setState({value:array});
      var y=0;
    for(var i=0;i<this.state.ticket_name.length;i++)
    {
      y+=this.state.value[i]*this.state.amount[i];
    }
    this.setState({total:y,conv:(y*6)/100});
}
}
delete_cookies(){
  cookies.remove('name', { path: '/' });
  cookies.remove('user', { path: '/' });
  cookies.remove('auth_token', { path: '/' });
  cookies.remove('event_id', { path: '/' });
  this.setState({name:''});
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
  // console.log(key);
}
total(){
  for(var i=0;i<this.state.value.length;i++)
  {
    if(this.state.value[i]>0)
    {
      this.state.total+=(this.state.value[i]*this.state.amount[i]);
      // console.log(this.state.total);
    }
  }
}
  render(){

    let env = 'production'; // you can set here to 'production' for production
        let currency = 'INR'; // or you can set this value from your props or state
        let total = 10; // same as above, this is the total amount (based on currency) to be paid by using Paypal express checkout
        // Document on Paypal's currency code: https://developer.paypal.com/docs/classic/api/currency_codes/

        const client = {
            sandbox:    'Aa2y_9921vWrSgo_1dP52Dw_pTjpjZQfjD47D0CdgbSKtVvr7dvh5SVSPq7HIchmEtM526HVpIRHydLq',
            production: 'AY2EyPEs0uTNjoMySfEfhw0_kuEXs7IZOzhTGjZDWHW3MkmI5sb660FA9pYHY_i4Pzm301wcMCdZT7uk',
        }

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
      width:'67%',
      marginLeft:'215px',
      marginRight:'131px',
      height:'362px'
    };
    const awesome2={
      width:'40%',
      marginLeft:'70px'
    };
    const awesome3={
      width:'88%',
      marginLeft:'26px',
      height:'220px'
    };
    const sign={
      marginTop:'36px'
    };


    const Ticket=this.state.ticket_name.map((name,i)=>
    <div key={i} className="outer">
    <br/>&nbsp;&nbsp;
    <span style={{fontSize:'18px',display:'inline-block',width:'200px'}}>{this.state.ticket_name[i]}</span>
    <span style={{fontSize:'16px',marginLeft:'250px'}}>Rs.{this.state.amount[i]}</span>
    <Icon  onClick={() => this.sub(i)} style={{cursor:'pointer',fontSize:'18px',marginLeft:'40px'}} type="minus" theme="outlined" />
    <span className="numb">{this.state.value[i]}</span>
    <Icon  onClick={() => this.add(i)} style={{cursor:'pointer',fontSize:'18px'}} type="plus" theme="outlined" />
    <span style={{fontSize:'18px',marginLeft:'20px'}} >Rs.{this.state.amount[i]*this.state.value[i]}</span>
    </div>
  );
  const Ticket_m=this.state.ticket_name.map((name,i)=>
  <div key={i} className="outer1">
  <br/>&nbsp;&nbsp;
  <span style={{fontSize:'18px',display:'inline-block',width:'200px'}}>{this.state.ticket_name[i]}</span>
  <br/>
  <span style={{fontSize:'16px',marginLeft:'31px'}}>Rs.{this.state.amount[i]}</span>
  <Icon  onClick={() => this.sub(i)} style={{cursor:'pointer',fontSize:'18px',marginLeft:'40px'}} type="minus" theme="outlined" />
  <span className="numb">{this.state.value[i]}</span>
  <Icon  onClick={() => this.add(i)} style={{cursor:'pointer',fontSize:'18px'}} type="plus" theme="outlined" />
  <span style={{fontSize:'18px',marginLeft:'20px'}} >Rs.{this.state.amount[i]*this.state.value[i]}</span>
  </div>
);
    const menu_default = (
  <Menu style={{marginLeft:'415px',marginTop:'12px'}}>
    <Menu.Item key="1" style={{marginTop:'5px'}}>
      <a onClick={this.organiser}>&nbsp;&nbsp;ORGANISER</a>
    </Menu.Item>
    <Menu.Item key="2" style={{marginTop:'5px'}}>
      <a onClick={this.customer}>&nbsp;&nbsp;CUSTOMER</a>
    </Menu.Item>


  </Menu>
);
const menu_default_m = (
<Menu style={{marginLeft:'10px',marginTop:'12px'}}>
<Menu.Item key="1" style={{marginTop:'5px'}}>
  <a onClick={this.organiser}>&nbsp;&nbsp;ORGANISER</a>
</Menu.Item>
<Menu.Item key="2" style={{marginTop:'5px'}}>
  <a onClick={this.customer}>&nbsp;&nbsp;CUSTOMER</a>
</Menu.Item>


</Menu>
);
const menu_organiser = (
<Menu style={{marginLeft:'415px',marginTop:'12px'}}>
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
const menu_customer = (
<Menu style={{marginLeft:'415px',marginTop:'12px'}}>
<Menu.Item key="1" style={{marginTop:'2px'}}>
  <a onClick={this.delete_cookies}>&nbsp;&nbsp;LOGOUT</a>
</Menu.Item>


</Menu>
);
const menu_customer_m = (
<Menu style={{marginLeft:'10px',marginTop:'12px'}}>
<Menu.Item key="1" style={{marginTop:'5px'}}>
  <a onClick={this.delete_cookies}>&nbsp;&nbsp;LOGOUT</a>
</Menu.Item>


</Menu>
);

const dropdown_default=(  <Dropdown overlay={menu_default}>

  <button className="btn btn-primary" style={{marginLeft:'415px',marginTop:'19px'}}><i style={{fontSize:'14px'}} className="fa fa-user"></i>&nbsp;&nbsp;SIGNIN
</button>

</Dropdown>);
const dropdown_default_m=(  <Dropdown overlay={menu_default}>

  <button className="btn btn-primary" style={{marginLeft:'10px'}}><i style={{fontSize:'14px'}} className="fa fa-user"></i>&nbsp;&nbsp;SIGNIN
</button>

</Dropdown>);
const dropdown_customer=(  <Dropdown overlay={menu_customer}>
<a style={fontdrop} className="ant-dropdown-link" href="#">
<button className="btn btn-primary" style={{marginLeft:'415px',marginTop:'19px'}}><i style={{fontSize:'14px'}} className="fa fa-user"></i>&nbsp;&nbsp;{this.state.user}</button>
</a>
</Dropdown>);
const dropdown_customer_m=(  <Dropdown overlay={menu_customer}>
<a style={fontdrop} className="ant-dropdown-link" href="#">
<button className="btn btn-primary" style={{marginLeft:'10px'}}><i style={{fontSize:'14px'}} className="fa fa-user"></i>&nbsp;&nbsp;{this.state.user}</button>
</a>
</Dropdown>);
const dropdown_organiser=(  <Dropdown overlay={menu_organiser}>
<a style={fontdrop} className="ant-dropdown-link" href="#">
<button className="btn btn-primary" style={{marginLeft:'415px',marginTop:'19px'}}><i style={{fontSize:'14px'}} className="fa fa-user"></i>&nbsp;&nbsp;{this.state.user}</button>
</a>
</Dropdown>);
const dropdown_organiser_m=(  <Dropdown overlay={menu_organiser_m}>
<a style={fontdrop} className="ant-dropdown-link" href="#">
  <button className="btn btn-primary" style={{marginLeft:'10px'}}><i style={{fontSize:'14px'}} className="fa fa-user"></i>&nbsp;&nbsp;{this.state.user}</button>
</a>
</Dropdown>);

const payment_ticket=this.state.ticket_name_cpy.map((name,i)=>
<div key={i} style={{border:'1px solid #e9e9e9'}}>
<br/>
<span className="ticket">TICKET NAME :</span>
<span style={{marginLeft:'40px',fontSize:'18px',fontFamily:'Roboto'}}>{this.state.ticket_name_cpy[i]}</span>
<br/>
<span className="ticket">NO OF TICKETS :</span>
<span style={{marginLeft:'40px',fontSize:'18px',fontFamily:'Roboto'}}>{this.state.quantity_cpy[i]}</span>
<br/>
<span className="ticket">PRICE :</span>
<span style={{marginLeft:'40px',fontSize:'18px',fontFamily:'Roboto'}}>{this.state.amount_cpy[i]}</span>
<br/><br/>
</div>);


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
if(this.state.redirect_login)
{
  return <Redirect to='/User/cust/signin' />
}

if(this.state.redirect_payment)
{
  return <Redirect to='/' />
}



    return(

<div>

<MediaQuery query="(min-device-width: 1224px)">
{this.state.loading==true?antIcon:
      <div>

      <div className="row" id="head_main">
        <div className="col-sm-4">
        <Link to={`/`}>
          <img style={awesome} src={logo}/>
          </Link>
        </div>

        <div className="col-sm-4 signinBlock1">
        {this.state.name=='customer'?dropdown_customer:this.state.name=='organiser'?dropdown_organiser:dropdown_default}

        </div>
      </div>



        <div style={col}>
        <img style={awesome1} src={this.state.image}/>
        </div>
        <div>
        <Tabs defaultActiveKey="1" onChange={this.callback}>
      <TabPane tab="About Event" key="1">
      <div style={{marginBottom:'50px'}}>
      <div className="outer_box">
      <div>
      <span className="header1">{this.state.event_name}</span>
      <br/>

      {this.state.editorHtml!=""?
      <div style={{marginLeft:'35px'}} dangerouslySetInnerHTML={{ __html: this.state.editorHtml }} />:''}
      <br/>


      <br/>
      <span className="header2">{this.state.start==''?'':"START DATE :"}&nbsp;&nbsp;&nbsp;{this.state.start}</span>
      {this.state.organizer==''?'':<span className="contact"><Icon type="user" theme="outlined" />&nbsp;&nbsp;Contact info</span>}
      <br/>
      <span className="header2">{this.state.end==''?'':"END DATE :"}&nbsp;&nbsp;&nbsp;{this.state.end}</span>
      <span className="contact1">{this.state.organizer}&nbsp;&nbsp;{this.state.organizer==''?'':<i class="fa fa-phone" style={{fontSize:"18px"}}></i>}&nbsp;{this.state.phone}</span>
      <br/><br/>

      </div>
      </div>

</div>
      </TabPane>

      <TabPane tab="Buy Tickets" key="2">
      {this.state.toggle==false?<div style={{marginBottom:'50px'}}>
      {Ticket}
      {this.state.total>=1?<span style={{marginLeft:'830px',fontSize:'18px',fontFamily:'Roboto'}}>TICKET PRICE</span>:''}
      {this.state.total>=1?<span style={{marginLeft:'40px',fontSize:'18px',fontFamily:'Roboto'}}>{this.state.total}</span>:''}
      <br/>
      {this.state.total>=1?<span style={{marginLeft:'824px',fontSize:'18px',width:'149px !important',display:'inline-block',fontFamily:'Roboto'}}>CONVENIENCE</span>:''}
      {this.state.total>=1?<span style={{marginLeft:'40px',fontSize:'18px',fontFamily:'Roboto'}}>{this.state.conv}</span>:''}
      <br/>
      <br/>
      {this.state.total>=1?<div style={{borderTop: '1px solid #CCC',
    borderBottom: '1px solid #CCC',
    margin: '0 !important',
    padding: '20px 0 !important',width:'60%',marginLeft:'272px'}}></div>:''}<br/>
    {this.state.total>=1?<span style={{marginLeft:'893px',fontSize:'18px',width:'149px !important',display:'inline-block',fontFamily:'Roboto'}}>TOTAL</span>:''}
    {this.state.total>=1?<span style={{marginLeft:'40px',fontSize:'18px',fontFamily:'Roboto'}}>{this.state.total+this.state.conv}</span>:''}<br/>
    {this.state.total>=1?<div style={{borderTop: '1px solid #CCC',
  borderBottom: '1px solid #CCC',
  margin: '0 !important',
  padding: '20px 0 !important',width:'60%',marginLeft:'272px'}}></div>:''}<br/>
      <br/>
      {this.state.total>0?<button  onClick={this.payment} className="btn btn-primary book_ticket">BOOK TICKET</button> :''}

      <b/><br/>
      </div>:
      <div style={{marginBottom:'80px'}}>
      <div style={{backgroundColor:'#e8e8e8'}}>
      <br/><br/>
      <div style={{width:'60%',marginLeft:'239px',backgroundColor:'white',border:'1px solid #e9e9e9'}}>
      <h1 style={{marginLeft:'283px'}}>Order Summary</h1>

      {payment_ticket}
      <br/>
      <span className="ticket">TICKET PRICE :</span>
      <span style={{marginLeft:'40px',fontSize:'18px',fontFamily:'Roboto'}}>{this.state.total_cpy}</span>
      <br/>
      <span className="ticket">CONVENIENCE :</span>
      <span style={{marginLeft:'40px',fontSize:'18px',fontFamily:'Roboto'}}>{this.state.conv_cpy}</span>
      <br/><br/>
      <div style={{backgroundColor:'#e8e8e8',border:'1px solid black'}}>
      <span className="ticket">TOTAL :</span>
      <span style={{marginLeft:'40px',fontSize:'18px',fontFamily:'Roboto'}}>{this.state.conv_cpy+this.state.total_cpy}</span>
      <br/>
      </div>
      </div>
      <br/>

      </div>
      <br/>
      <div style={{marginLeft:'500px'}}><PaypalExpressBtn env ={env} client={client} onError={this.onError} onSuccess={this.onSuccess} onCancel={this.onCancel} currency={'INR'} total={this.state.total_cpy+this.state.conv_cpy} /></div>
      <button  onClick={this.toggle} className="btn btn-primary" id="book_ticket1">CANCEL</button>
    </div>}
      </TabPane>

      <TabPane tab="Get Direction" key="3">
      <br/>
      <span style={{marginLeft: '147px',
        fontSize: '28px',
        fontFamily: 'Roboto'}}>{this.state.address}</span>
      <br/>
      <div style={{height:'700px'}}>
      <Map google={this.props.google} zoom={14} initialCenter={{
            lat: this.state.lat,
            lng: this.state.long
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





      </div>}
      </MediaQuery>

      <MediaQuery query="(max-device-width: 1224px)">
      {this.state.loading==true?antIcon1:
      <div>

      <div className="row" id="head_main">

        <Link to={`/`}>
          <img style={awesome2} src={logo}/>
          </Link>


        {this.state.name=='customer'?dropdown_customer_m:this.state.name=='organiser'?dropdown_organiser_m:dropdown_default_m}


      </div>



        <div style={col}>
        <img style={awesome3} src={this.state.image}/>
        </div>
        <div>
        <Tabs defaultActiveKey="1" onChange={this.callback}>
      <TabPane tab="About Event" key="1">
      <div style={{marginBottom:'50px'}}>
      <div className="outer_box">
      <div>
      <span className="header1_m">{this.state.event_name}</span>
      <br/>

      {this.state.editorHtml!=""?
      <div style={{marginLeft:'15px'}} dangerouslySetInnerHTML={{ __html: this.state.editorHtml }} />:''}
      <br/>


      <br/>
      <span className="header2_m">{this.state.start==''?'':"START DATE :"}&nbsp;&nbsp;&nbsp;{this.state.start}</span>
      <span className="header2_m">{this.state.end==''?'':"END DATE :"}&nbsp;&nbsp;&nbsp;{this.state.end}</span>
      <br/>
      <br/>
      {this.state.organizer==''?'':<span className="contact"><Icon type="user" theme="outlined" />&nbsp;&nbsp;Contact info</span>}
      <br/>
      <span className="contact1_m">{this.state.organizer}&nbsp;&nbsp;{this.state.organizer==''?'':<i class="fa fa-phone" style={{fontSize:"18px"}}></i>}&nbsp;{this.state.phone}</span>
      <br/><br/>

      </div>
      </div>

</div>
      </TabPane>

      <TabPane tab="Buy Tickets" key="2">
      {this.state.toggle==false?<div style={{marginBottom:'50px'}}>
      {Ticket_m}
      {this.state.total>=1?<span style={{marginLeft:'106px',fontSize:'18px',fontFamily:'Roboto'}}>TICKET PRICE</span>:''}
      {this.state.total>=1?<span style={{marginLeft:'40px',fontSize:'18px',fontFamily:'Roboto'}}>{this.state.total}</span>:''}
      <br/>
      {this.state.total>=1?<span style={{marginLeft:'101px',fontSize:'18px',width:'149px !important',display:'inline-block',fontFamily:'Roboto'}}>CONVENIENCE</span>:''}
      {this.state.total>=1?<span style={{marginLeft:'40px',fontSize:'18px',fontFamily:'Roboto'}}>{this.state.conv}</span>:''}
      <br/>
      <br/>
      {this.state.total>=1?<div style={{borderTop: '1px solid #CCC',
    borderBottom: '1px solid #CCC',
    margin: '0 !important',
    padding: '20px 0 !important',width:'60%',marginLeft:'85px'}}></div>:''}<br/>
    {this.state.total>=1?<span style={{marginLeft:'165px',fontSize:'18px',width:'149px !important',display:'inline-block',fontFamily:'Roboto'}}>TOTAL</span>:''}
    {this.state.total>=1?<span style={{marginLeft:'40px',fontSize:'18px',fontFamily:'Roboto'}}>{this.state.total+this.state.conv}</span>:''}<br/>
    {this.state.total>=1?<div style={{borderTop: '1px solid #CCC',
  borderBottom: '1px solid #CCC',
  margin: '0 !important',
  padding: '20px 0 !important',width:'60%',marginLeft:'85px'}}></div>:''}<br/>
      <br/>
      {this.state.total>0?<button  onClick={this.payment} className="btn btn-primary book_ticket_m">BOOK TICKET</button> :''}

      <b/><br/>
      </div>:
      <div style={{marginBottom:'80px'}}>
      <div style={{backgroundColor:'#e8e8e8'}}>
      <br/><br/>
      <div style={{width:'83%',marginLeft:'36px',backgroundColor:'white',border:'1px solid #e9e9e9'}}>
      <h1 style={{marginLeft:'63px'}}>Order Summary</h1>

      {payment_ticket}
      <br/>
      <span className="ticket">TICKET PRICE :</span>
      <span style={{marginLeft:'40px',fontSize:'18px',fontFamily:'Roboto'}}>{this.state.total_cpy}</span>
      <br/>
      <span className="ticket">CONVENIENCE :</span>
      <span style={{marginLeft:'40px',fontSize:'18px',fontFamily:'Roboto'}}>{this.state.conv_cpy}</span>
      <br/><br/>
      <div style={{backgroundColor:'#e8e8e8',border:'1px solid black'}}>
      <span className="ticket">TOTAL :</span>
      <span style={{marginLeft:'40px',fontSize:'18px',fontFamily:'Roboto'}}>{this.state.conv_cpy+this.state.total_cpy}</span>
      <br/>
      </div>
      </div>
      <br/>

      </div>
      <br/>
      <div style={{marginLeft:'120px'}}><PaypalExpressBtn env ={env} client={client} onError={this.onError} onSuccess={this.onSuccess} onCancel={this.onCancel} currency={'INR'} total={this.state.total_cpy+this.state.conv_cpy} /></div>
      <br/><br/><br/>
      <button  onClick={this.toggle} className="btn btn-primary" id="book_ticket1_m">CANCEL</button>
    </div>}
      </TabPane>

      <TabPane tab="Get Direction" key="3">
      <br/>
      <span style={{marginLeft: '10px',
        fontSize: '20px',
        fontFamily: 'Roboto'}}>{this.state.address}</span>
      <br/>
      <div style={{height:'700px'}}>
      <Map google={this.props.google} zoom={14} initialCenter={{
            lat: this.state.lat,
            lng: this.state.long
          }}
          style={{width: '85%', height: '50%', position: 'relative',marginLeft:'25px'}}>

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





      </div>}
      </MediaQuery>

      </div>









    );
  }
}

export default GoogleApiWrapper({
  apiKey: ('AIzaSyCWpEoKPyUDW7x3OnfX0slzlz4NfV-abBI')
})(Events);
