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
import './hover.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Spin, Icon } from 'antd';
import Cookies from 'universal-cookie';

const cookies = new Cookies();


const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;


class App extends Component {
  constructor(props){
    super(props);
    this.state={
      photo:
        ["https://d1eejzs07oawlt.cloudfront.net/files/events/thumbs/9428-geo-marathon-1526580850635134152.png","https://d1eejzs07oawlt.cloudfront.net/files/events/thumbs/15117261551488711069.jpg","https://d1eejzs07oawlt.cloudfront.net/files/events/thumbs/9321-traditionalathon--1524073058543826265.jpg","https://d1eejzs07oawlt.cloudfront.net/files/events/thumbs/9510-business-and-franchise-expo-15289580782052527469.png","https://d1eejzs07oawlt.cloudfront.net/files/events/thumbs/9498-power-yoga-15288006231733000337.jpg","https://d1eejzs07oawlt.cloudfront.net/files/events/thumbs/9417-adventure-fun-travel-to-india-s-grand-canyon-caves-1525982658135363334.jpg"],
      event_detail:["GEO trail Marathon","KIDS Marathon","TRADITIONLANTHON","BUSINESS AND FRANCHISE EXPO","POER YOGA","Adventure Fun Travel"],
      event_time:["24th June 2018,05.30 AM,CHENNAI","31th March 2018,05.30 AM,CHENNAI","24th June 2018,05.30 AM,CHENNAI","24th December 2018,05.30 AM,CHENNAI","15th November 2018,05.30 AM,CHENNAI","24th June 2018,05.30 AM,CHENNAI"],
      name:cookies.get('name')
    };
    this.delete_cookies = this.delete_cookies.bind(this);
  }

  componentDidMount(){
  <Spin indicator={antIcon} />
}

delete_cookies(){
  cookies.remove('name', { path: '/' });
  this.setState({name:cookies.get('name')});
}

  render() {

    const signinbutton={
      marginLeft: '118px',
marginTop: '17px',
};
    const menu_default = (
  <Menu style={{marginLeft:'140px',marginTop:'12px'}}>
    <Link to={`User/org/signin`}><Menu.Item style={{marginTop:'5px'}}>
      <a>&nbsp;&nbsp;ORGANISER</a>
    </Menu.Item></Link>
    <Link to={`User/cust/signin`}><Menu.Item style={{marginTop:'5px'}}>
      <a>&nbsp;&nbsp;CUSTOMER</a>
    </Menu.Item></Link>


  </Menu>
);
const menu_organiser = (
<Menu style={{marginLeft:'140px',marginTop:'12px'}}>
<Menu.Item style={{marginTop:'5px'}}>
  <a>&nbsp;&nbsp;DASHBOARD</a>
</Menu.Item>
<Menu.Item style={{marginTop:'5px'}}>
  <a onClick={this.delete_cookies}>&nbsp;&nbsp;LOGOUT</a>
</Menu.Item>


</Menu>
);
const menu_customer = (
<Menu style={{marginLeft:'140px',marginTop:'12px'}}>
<Menu.Item style={{marginTop:'2px'}}>
  <a onClick={this.delete_cookies}>&nbsp;&nbsp;LOGOUT</a>
</Menu.Item>


</Menu>
);
  const fontdrop={
    fontFamily:'Roboto',
    fontSize:'18px'
  };

    const dropdown_default=(  <Dropdown overlay={menu_default}>
    <a style={fontdrop} className="ant-dropdown-link" href="#">
      <button className="btn btn-primary" style={{marginLeft:'140px'}}><i style={{fontSize:'14px'}} className="fa fa-user"></i>&nbsp;&nbsp;SIGNIN</button>
    </a>
  </Dropdown>);
  const dropdown_customer=(  <Dropdown overlay={menu_customer}>
  <a style={fontdrop} className="ant-dropdown-link" href="#">
    <button className="btn btn-primary" style={{marginLeft:'140px'}}><i style={{fontSize:'14px'}} className="fa fa-user"></i>&nbsp;&nbsp;{this.state.name}</button>
  </a>
</Dropdown>);
const dropdown_organiser=(  <Dropdown overlay={menu_organiser}>
<a style={fontdrop} className="ant-dropdown-link" href="#">
  <button className="btn btn-primary" style={{marginLeft:'140px'}}><i style={{fontSize:'14px'}} className="fa fa-user"></i>&nbsp;&nbsp;{this.state.name}</button>
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


      <div className="rows" id="saran1">

<Link to= {{pathname:'/Events', state:{value:'hello',gel:'summa'}}}  >
          <div className="column_main777 col-sm-3">

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



    const LogoStyle={
      height:'120px',
      marginTop : '-13px',
      float:'letf',
      marginLeft:'20px',
      marginBottom:'-20px'
    };
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

    return (
     <div>

     <div className="row" id="head_main">
       <div className="col-sm-3">
       <Link to={`/`}>
         <img style={LogoStyle} src={logo}/>
         </Link>
       </div>
       <div className="col-sm-6" id="head_tab1">
       <a className="hvr-bob">HOME</a>
       <a className="hvr-bob">EVENTS</a>
       <a className="hvr-bob">TRENDING</a>
       <a className="hvr-bob">UPCOMING</a>
       <a className="hvr-bob">GET STARTED</a>
       <a className="hvr-bob">ABOUT US</a>
       </div>
       <div className="col-sm-3 signinBlock">
       {this.state.name=='customer'?dropdown_customer:this.state.name=='organiser'?dropdown_organiser:dropdown_default}

       </div>
     </div>
      <Slider className="slider-wrapper" autoplay={2000}>
        {content.map((item, index) => (
          <div
            key={index}
            className="slider-content"
            style={{ background: `url('${item.image}') no-repeat center center` }} >
            <div className="inner">
              <h1>{item.title}</h1>
              <p>{item.description}</p>
              <button>{item.button}</button>
            </div>
            <section>
              <img src={item.userProfile} alt={item.user} />
              <span>
                Posted by <strong>{item.user}</strong>
              </span>
            </section>
          </div>
        ))}
      </Slider>
      <br/>
      <div className="row">
      <div className="col-sm-5"><input id="deadpool1" type="text" placeholder="  search events"/></div>
      <div className="col-sm-5"><input id="deadpool2" type="text" placeholder="area"/></div>
      <div className="col-sm-2"><button id="deadpool3"onClick={this.hello} className="btn btn-primary">GO</button></div>
      </div>
      <div>
        {cards}
      </div>
      <br/> <br/>  <br/>  <br/>
      <div id="footer" className="col-md-12">
        <div className="col-md-6">
          <a className="menuOption">Privacy Policy</a>
        </div>
        <div className="col-md-6">
          <a href="http://www.facebook.com/The-Tickets-212290419409526/?modal=admin_todo_tour"  target="_blank"><i className="fa fa-facebook fa-3x iconStyle" aria-hidden="true"></i></a>

        </div>
      </div>
  </div>
    );
  }
}

export default App;
