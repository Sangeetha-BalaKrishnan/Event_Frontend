import React, { Component } from 'react';
import { render } from 'react-dom';
import { Menu, Dropdown,Button } from 'antd';
import logo from './images/new.png';
import Slider from 'react-animated-slider';
import content from './content'
import 'react-animated-slider/build/horizontal.css';
import 'normalize.css/normalize.css';
import './slider-animations.css';
import './styles.css';
import './App.css';
import './App1.css';
import './hover.css';
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";
import { Spin, Icon } from 'antd';
import MediaQuery from 'react-responsive';
import Cookies from 'universal-cookie';

const cookies = new Cookies();


const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;


class App extends Component {
  constructor(props){
    super(props);
    this.state={
      photo:[],
      event_detail:[],
      event_time:[],
      event_url:[],
      name:cookies.get('name'),
      user:cookies.get('user'),
      organiser:false,
      customer:false,
      dashboard:false
    };
    this.delete_cookies = this.delete_cookies.bind(this);
    this.organiser = this.organiser.bind(this);
    this.customer = this.customer.bind(this);
    this.dashboard = this.dashboard.bind(this);
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    fetch('https://admin.thetickets.in/show/events', {
  method: 'get',
  headers: {
    'Accept': 'application/json, text/plain, */*',
    'Content-Type': 'application/json'
  }
  }).then(res=>res.json())
  .then(res => {console.log(res);
    const image=[];
    const name=[];
    const timestamp=[];
    const url=[];
    var i;
    for(i=0;i<res.data.length;i++)
    {
      image.push(res.data[i].image);
      name.push(res.data[i].event_name);
      timestamp.push(res.data[i].timestamp);
      var str_sub = res.data[i].url_name.substr(res.data[i].url_name.lastIndexOf("/")+1);
      var final_str = '/Events/'+str_sub;
      url.push(final_str);
      console.log(str_sub);
    }
    this.setState({event_time:timestamp,event_detail:name,photo:image,event_url:url});

  });
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



  render() {

    const signinbutton={
      marginLeft: '118px',
marginTop: '17px',
};
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
  const fontdrop={
    fontFamily:'Roboto',
    fontSize:'18px'
  };

    const dropdown_default=(  <Dropdown overlay={menu_default}>

      <button className="btn btn-primary" style={{marginLeft:'140px'}}><i style={{fontSize:'14px'}} className="fa fa-user"></i>&nbsp;&nbsp;SIGNIN
</button>

  </Dropdown>);
  const dropdown_customer=(  <Dropdown overlay={menu_customer}>
  <a style={fontdrop} className="ant-dropdown-link" href="#">
    <button className="btn btn-primary" style={{marginLeft:'140px'}}><i style={{fontSize:'14px'}} className="fa fa-user"></i>&nbsp;&nbsp;{this.state.user}</button>
  </a>
</Dropdown>);
const dropdown_organiser=(  <Dropdown overlay={menu_organiser}>
<a style={fontdrop} className="ant-dropdown-link" href="#">
  <button className="btn btn-primary" style={{marginLeft:'140px'}}><i style={{fontSize:'14px'}} className="fa fa-user"></i>&nbsp;&nbsp;{this.state.user}</button>
</a>
</Dropdown>);
const dropdown_default_m=(  <Dropdown overlay={menu_default}>

  <button className="btn btn-primary" style={{marginLeft:'263px'}}><i style={{fontSize:'14px'}} className="fa fa-user"></i>&nbsp;&nbsp;SIGNIN
</button>

</Dropdown>);
const dropdown_customer_m=(  <Dropdown overlay={menu_customer}>
<a style={fontdrop} className="ant-dropdown-link" href="#">
<button className="btn btn-primary" style={{marginLeft:'263px'}}><i style={{fontSize:'14px'}} className="fa fa-user"></i>&nbsp;&nbsp;{this.state.user}</button>
</a>
</Dropdown>);
const dropdown_organiser_m=(  <Dropdown overlay={menu_organiser}>
<a style={fontdrop} className="ant-dropdown-link" href="#">
<button className="btn btn-primary" style={{marginLeft:'263px'}}><i style={{fontSize:'14px'}} className="fa fa-user"></i>&nbsp;&nbsp;{this.state.user}</button>
</a>
</Dropdown>);
    const searchTime =(
        <Dropdown overlay={menu_default}>
          <Button style={{ marginLeft: 8 }}>
            Button <Icon type="down" />
          </Button>
        </Dropdown>
      );

    const cards=this.state.photo.map((photo,i)=>


      <div className="rows" key={i} id="saran1">

<Link to= {{pathname:this.state.event_url[i], state:{value:this.state.event_url[i].substr(this.state.event_url[i].lastIndexOf("/")+1)}}}  >
          <div className="column_main777 col-sm-4">

              <div className="box">


                    <img id="ironman" src={photo}/>



                        <div className="helllo">

                        <span className="helllo1">&nbsp;&nbsp;{this.state.event_detail[i]}</span>
                        <br/>
                        <span className="helllo2">&nbsp;&nbsp;&nbsp;&nbsp;{this.state.event_time[i]}</span>
                        </div>

                </div>

            </div>
          </Link>
            </div>

          );




    const iconStyle={
      color:'black',
      fontSize:'18px',
      fontFamily: 'Roboto',
      marginTop:'30px;',
      cursor:'pointer'
    };


    const hello={
      marginTop:'30px'
    };

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
    return (
      <div>
      <MediaQuery query="(min-device-width: 1224px)">
     <div>

     <div className="row" id="head_main">
       <div className="col-sm-3">
       <Link to={`/`}>
         <img id="LogoStyle" src={logo}/>
         </Link>
       </div>
       <div className="col-sm-7" id="head_tab1">
       <a className="hvr-bob1">HOME</a>
       <Link to='/Events'><a className="hvr-bob">EVENTS</a></Link>
       <Link to='/Trending'><a className="hvr-bob">TRENDING</a></Link>
       <Link to='/Upcoming_Events'><a className="hvr-bob">UPCOMING</a></Link>
       <a className="hvr-bob">GET STARTED</a>
       <a className="hvr-bob">ABOUT US</a>
       </div>
       <div className="col-sm-2 signinBlock">
       {this.state.name=='customer'?dropdown_customer:this.state.name=='organiser'?dropdown_organiser:dropdown_default}

       </div>
     </div>
      <Slider className="slider-wrapper" autoplay={2000}>
        {content.map((photo, index) => (
          <div
            key={index}
            className="slider-content"
            style={{ background: `url('${this.state.photo[index]}') no-repeat center center` }} >
            <div className="inner">
                      <h1>{this.state.event_detail[index]}</h1>

                    </div>
            <section>

              <span>

              </span>
            </section>
          </div>
        ))}
      </Slider>
      <br/>

      <div>
        {cards}
      </div>
      <br/> <br/>  <br/>  <br/>
      <div id="footer" className="col-md-12">
        <div className="col-md-6">
          <a className="menuOption">Privacy Policy</a>
        </div>
        <div className="col-md-5">
          <a href="https://www.facebook.com/thetickets.in"  target="_blank"><i className="fa fa-facebook fa-3x iconStyle" aria-hidden="true"></i></a>
        </div>
        <div id="instagram" className="col-md-1">
          <a href="https://www.instagram.com/thetickets.in"  target="_blank"><i style={{color:'#e95950'}} className="fa fa-instagram fa-3x iconStyle" aria-hidden="true"></i></a>
        </div>
      </div>
  </div>
  </MediaQuery>

  <MediaQuery query="(max-device-width: 1224px)">
 <div>

 <div className="row" id="head_main">
   <div className="col-sm-3">
   <Link to={`/`}>
     <img id="LogoStyle" src={logo}/>
     </Link>
   </div>
   <div className="col-sm-7" id="head_tab1">
   <a className="hvr-bob1">HOME</a>
   <Link to='/Events'><a className="hvr-bob">EVENTS</a></Link>
   <Link to='/Trending'><a className="hvr-bob">TRENDING</a></Link>
   <Link to='/Upcoming_Events'><a className="hvr-bob">UPCOMING</a></Link>
   <a className="hvr-bob">GET STARTED</a>
   <a className="hvr-bob">ABOUT US</a>
   </div>
   <div className="col-sm-2 signinBlock">
   {this.state.name=='customer'?dropdown_customer_m:this.state.name=='organiser'?dropdown_organiser_m:dropdown_default_m}

   </div>
 </div>
  <Slider className="slider-wrapper" autoplay={2000}>
    {content.map((item, index) => (
      <div
        key={index}
        className="slider-content"
        style={{ background: `url('${this.state.photo[index]}') no-repeat center center` }} >

        <section>

          <span>

          </span>
        </section>
      </div>
    ))}
  </Slider>
  <br/>

  <div>
    {cards}
  </div>
  <br/> <br/>  <br/>  <br/>
  <div id="footer" className="col-md-12">
    <div className="col-md-4">
      <a className="menuOption">Privacy Policy</a>
    </div>
    <div className="col-md-4">
      <a href="https://www.facebook.com/thetickets.in"  target="_blank"><i className="fa fa-facebook fa-3x iconStyle" aria-hidden="true"></i></a>
    </div>
    <div id="instagram" className="col-md-4">
      <a href="https://www.instagram.com/thetickets.in"  target="_blank"><i style={{color:'#e95950'}} className="fa fa-instagram fa-3x iconStyle1" aria-hidden="true"></i></a>
    </div>
  </div>
</div>
  </MediaQuery>
  </div>
    );
  }
}

export default App;
