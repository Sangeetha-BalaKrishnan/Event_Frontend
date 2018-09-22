import React, { Component } from 'react';
import { render } from 'react-dom';
import { Menu, Dropdown,Button,Icon } from 'antd';
import logo from './images/new.png';
import './App.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";


class Trending extends Component{
  constructor(props){
    super(props);
    this.state={
      photo:
        [],
      event_detail:[],
      event_time:[],
      event_url:[]

    };

  }
  componentDidMount() {
    fetch('https://admin.thetickets.in/show/trending_events', {
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
      console.log(url);

    }
    this.setState({event_time:timestamp,event_detail:name,photo:image,event_url:url});

  });
  }

  render(){
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
<Link to={`/Us1`}><Menu.Item style={{marginTop:'5px'}}>
  <a>&nbsp;&nbsp;DASHBOARD</a>
</Menu.Item></Link>
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
const LogoStyle={
  height:'120px',
  marginTop : '-13px',
  float:'letf',
  marginLeft:'20px',
  marginBottom:'-20px'
};
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

  <Link to= {{pathname:this.state.event_url[i], state:{value:this.state.event_url[i].substr(this.state.event_url[i].lastIndexOf("/")+1)}}}  >
          <div className="column_main777 col-sm-6">

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

    return(
      <div>
      <div className="row" id="head_main">
        <div className="col-sm-3">
        <Link to={`/`}>
          <img style={LogoStyle} src={logo}/>
          </Link>
        </div>
        <div className="col-sm-7" id="head_tab1">
        <Link to='/'><a className="hvr-bob">HOME</a></Link>
        <Link to='/Events'><a className="hvr-bob">EVENTS</a></Link>
        <a className="hvr-bob1">TRENDING</a>
        <Link to='./Upcoming_Events'><a className="hvr-bob">UPCOMING</a></Link>
        <a className="hvr-bob">GET STARTED</a>
        <a className="hvr-bob">ABOUT US</a>
        </div>
        <div className="col-sm-2 signinBlock">
        {this.state.name=='customer'?dropdown_customer:this.state.name=='organiser'?dropdown_organiser:dropdown_default}

        </div>
      </div>
      <div>
      {cards}
      </div>
      </div>
    );
  }

}


export default Trending;
