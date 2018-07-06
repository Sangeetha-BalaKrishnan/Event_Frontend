import React, { Component } from 'react';
import { render } from 'react-dom';
import logo from './images/new.png';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";


class Decision extends Component{
  render(){
    const awesome={
      height:'120px',
      marginTop : '-13px',

      marginLeft:'577px',
      marginBottom:'-14px'
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
    return(
      <div>
        <div className="head222">
        <Link to={`/`}>
          <img style={awesome} src={logo}/>
          </Link>
        </div>
        <div id="bkground" class="row">
          <div id="logform222" class="col-sm-6">

            <Link to={`/User/signup`}><button style={butt1} class="btn btn-primary">CUSTOMER</button></Link>
            <br/>
              <Link to={`/User/signup_org`}><button style={butt2} class="btn btn-primary">ORGANISER</button></Link>

          </div>
        </div>
      </div>
    );
  }
}


export default Decision;
