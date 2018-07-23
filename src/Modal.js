import { DatePicker } from 'antd';
import React, { Component } from 'react';
import { render } from 'react-dom';
import './App.css';
const { RangePicker } = DatePicker;

class Modal extends Component{

onChange1(value, dateString) {
  console.log('Selected Time: ', value);
  console.log('Formatted Selected Time: ', dateString);
}

onOk(value) {
  console.log('onOk: ', value);
}
render(){
  return(

  <div>
    <DatePicker
      showTime
      format="YYYY-MM-DD HH:mm:ss"
      placeholder="Select Time"
      onChange={this.onChange1}
      popupStyle={{width:'360px !important'}}
    />
    <br />
    <RangePicker
      showTime={{ format: 'HH:mm' }}
      format="YYYY-MM-DD HH:mm"
      placeholder={['Start Time', 'End Time']}
      onChange={this.onChange1}
    />
  </div>
);
}
}

export default Modal;
