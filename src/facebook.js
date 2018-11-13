import React from 'react';
import ReactDOM from 'react-dom';
import FacebookLogin from 'react-facebook-login';
 
class facebook extends React.Component {
  responseFacebook(response) {
    console.log(response)
  }
 
  render() {
    return (
      <FacebookLogin
        appId="287771521949300"
        autoLoad={true}
        fields="name,email,picture"
        callback={this.responseFacebook}
      />
    )
  }
}
 
export default facebook;
