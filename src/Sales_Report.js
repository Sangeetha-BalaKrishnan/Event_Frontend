import React, { Component } from 'react';
import logo from './images/new.png';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import { ReactTableDefaults } from 'react-table';
import Cookies from 'universal-cookie';
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";
import './Sales_Report.css';
const cookies = new Cookies();
class Sales extends Component {
  constructor(props){
    super(props);
    this.state={
      ans:[],
      event_id:cookies.get('manage_event'),
      auth_token:cookies.get('auth_token'),
    };
    this.download = this.download.bind(this);
  }
  componentDidMount() {
    window.scrollTo(-10, -10);
    // cookies.set('manage_event',this.state.event_id);
    fetch('https://admin.thetickets.in/api/manage_event/'+this.state.event_id, {
  method: 'get',
  headers: {
    'Accept': 'application/json, text/plain, */*',
    'Content-Type': 'application/json',
    'Authorization':'Bearer '+this.state.auth_token
  }
  }).then(res=>res.json())
  .then(res => {
    // console.log(res);

    this.setState({ans:res.data});
    console.log(this.state.ans);
    // cookies.remove('manage_event', { path: '/' });

  });
  }
  download()
  {
    fetch('https://admin.thetickets.in/api/report_download/'+this.state.event_id, {
  method: 'get',
  headers: {
    'Accept': 'application/json, text/plain, */*',
    'Content-Type': 'application/json',
    'Authorization':'Bearer '+this.state.auth_token
  }
  }).then(res => {console.log(res);


  });
  }
render() {

  const bt={
    width:'112px',
    marginBottom:'40px',
    marginLeft:'1020px'
  };
  const columns = [{
    Header: 'User Name',
    accessor: 'username' // String-based value accessors!
  }, {
    Header: 'Phone',
    accessor: 'phone',
    Cell: props => <span className='number'>{props.value}</span> // Custom cell components!
  }, {
    Header: 'Email Id',
    accessor: 'email'// Custom value accessors!
  }, {
    Header: 'Ticket Name', // Custom header components!
    accessor: 'ticket_name',
  },{
    Header: 'Total Ticket',
    accessor: 'total_ticket',
    Cell: props => <span className='number'>{props.value}</span> // Custom cell components!
  },{
    Header: 'Cost', // Custom header components!
    accessor: 'cost',
  },{
    Header: 'Booked at', // Custom header components!
    accessor: 'booked_at',
  }]
return(
  <div>
  <div className="row" id="head_main">
    <div className="col-sm-3">
      <Link to={`/`}>
      <img id="LogoStyle_sales" src={logo}/>
      </Link>
    </div>

    </div>
    <br/>
    <button type="button" style={bt} onClick={()=> window.open(`https://admin.thetickets.in/api/report_download/${this.state.event_id}`, "_blank")} className="btn btn-primary">Download</button>
    <br/>
    <div style={{marginLeft:'20px' , width:'90%', height:'70%'}}>
  <ReactTable
    data={this.state.ans}
    columns={columns}
  />
  </div>
  </div>
);
}
}
export default Sales;
