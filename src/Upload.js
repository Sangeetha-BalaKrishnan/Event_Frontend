import React, { Component } from 'react';
import { render } from 'react-dom';
import { Upload, Icon, Modal } from 'antd';
import './App.css';
import logo from './images/Capture.PNG';

class Up extends React.Component {
  constructor(props){
    super(props);
    this.state={
      demo:''
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event){
    this.setState({[event.target.name]:event.target.value});
  }

  render(){
    const demo={
      height:'35px',
      width:'50px'
    };
    return(
      <div>
      Your image: <input  type="file" name="pic" id="pic"/><br/>
      <div id="xxx">
      <image style={demo} src={logo}/>
      </div>

      </div>
    );
  }


}

export default Up;
