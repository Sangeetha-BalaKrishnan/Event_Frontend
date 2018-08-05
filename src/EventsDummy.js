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
import AnchorLink from 'react-anchor-link-smooth-scroll';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import { Spin, Icon } from 'antd';


const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;

class Events extends Component{
  constructor(props){
    super(props);
    this.state={summa:"",
  selectedPlace:{name:'summa'}}
  }
  componentDidMount() {

    <Spin indicator={antIcon} />

    const  value =this.props.location.state;
console.log(value);
window.scrollTo(0, 0);
}
  render(){

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
      width:'80%',
      marginLeft:'135px'
    };
    const sign={
      marginTop:'36px'
    };

    return(
      <div>
        <div className="head222">
        <Link to={`/`}>
          <img style={awesome} src={logo}/>
          </Link>
          <Link to={`/User/signin`}>
          <span style={sign} className="awesome2"><i class="fa fa-user"></i>&nbsp;&nbsp;signin</span>
          </Link>
        </div>
        <div style={col}>
        <img style={awesome1} src={"https://d1eejzs07oawlt.cloudfront.net/files/events/9321-traditionalathon--1524073058740077502.jpg"}/>
        </div>
        <div>
        <div id="subnav">
      <AnchorLink  className="smooth" href='#things'>Things</AnchorLink>&nbsp;&nbsp;&nbsp;
      <AnchorLink className="smooth" href='#stuff'>Stuff</AnchorLink>
      <AnchorLink className="smooth" href='#stuff'>map</AnchorLink>
      </div>


    <section id='things'>
      <div>

        </div>
    </section>
    <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
    <section id='stuff'>
      <h1>EVENT DESCRIPTION</h1>

    </section>
    <section id='map'>
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
    </section>
  </div>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: ('AIzaSyCWpEoKPyUDW7x3OnfX0slzlz4NfV-abBI')
})(Events);
