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
import dummy from './Dummy';
import signin from './Signin';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";



class App extends Component {
  constructor(props){
    super(props);
    this.state={
      photo:
        ["https://d1eejzs07oawlt.cloudfront.net/files/events/thumbs/9428-geo-marathon-1526580850635134152.png","https://d1eejzs07oawlt.cloudfront.net/files/events/thumbs/15117261551488711069.jpg","https://d1eejzs07oawlt.cloudfront.net/files/events/thumbs/9321-traditionalathon--1524073058543826265.jpg","https://d1eejzs07oawlt.cloudfront.net/files/events/thumbs/9510-business-and-franchise-expo-15289580782052527469.png","https://d1eejzs07oawlt.cloudfront.net/files/events/thumbs/9498-power-yoga-15288006231733000337.jpg","https://d1eejzs07oawlt.cloudfront.net/files/events/thumbs/9417-adventure-fun-travel-to-india-s-grand-canyon-caves-1525982658135363334.jpg"],
      event_detail:["GEO trail Marathon","KIDS Marathon","TRADITIONLANTHON","BUSINESS AND FRANCHISE EXPO","POER YOGA","Adventure Fun Travel"],
      event_time:["24th June 2018,05.30 AM,CHENNAI","31th March 2018,05.30 AM,CHENNAI","24th June 2018,05.30 AM,CHENNAI","24th December 2018,05.30 AM,CHENNAI","15th November 2018,05.30 AM,CHENNAI","24th June 2018,05.30 AM,CHENNAI"]
    };
  }



  render() {

    const cards=this.state.photo.map((photo,i)=>


      <div class="rows" id="saran1">

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



    const awesome={
      height:'120px',
      marginTop : '-13px',
      float:'letf',
      marginLeft:'20px',
      marginBottom:'-20px'
    };
    const awesome1={
      color:'black',
      fontSize:'18px',
      fontFamily: 'Roboto',
      marginTop:'30px;',
      cursor:'pointer'
    };

    const hello={
      marginTop:'40px'
    }
    return (
     <div>

     <div class="row" id="head_main">
       <div class="col-sm-3">
       <Link to={`/`}>
         <img style={awesome} src={logo}/>
         </Link>
       </div>
       <div class="col-sm-6" id="head_tab1">
       <span style={awesome1}>HOME&nbsp;&nbsp;&nbsp;&nbsp;</span>
       <span style={awesome1}>EVENTS&nbsp;&nbsp;&nbsp;&nbsp;</span>
       <span style={awesome1}>TRENDING&nbsp;&nbsp;&nbsp;&nbsp;</span>
       <span style={awesome1}>UPCOMING&nbsp;&nbsp;&nbsp;&nbsp;</span>
       <span style={awesome1}>GET STARTED&nbsp;&nbsp;&nbsp;&nbsp;</span>
       <span style={awesome1}>ABOUT US</span>
       </div>
       <div style={hello} class="col-sm-3">
       <Link to={`/User/signin`}>
       <span className="awesome2"><i class="fa fa-user"></i>&nbsp;&nbsp;signin</span>
       </Link>
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
      <div class="row">
      <div class="col-sm-5"><input id="deadpool1" type="text" placeholder="  search events"/></div>
      <div class="col-sm-5"><input id="deadpool2" type="text" placeholder="  area"/></div>
      <div class="col-sm-2"><button id="deadpool3"onClick={this.hello} class="btn btn-primary">GO</button></div>
      </div>





<br/><br/>


      {cards}









  </div>
    );
  }
}

export default App;
