import { slide as Menu } from 'react-burger-menu'
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import './App.css'
import Dummy from './Dummy'
import Dummy1 from './Dummy1'

class Event1 extends React.Component {
  constructor(props){
    super(props);
    this.state={
      menuOpen:true
    }
  };
  showSettings (event) {
    event.preventDefault();
  };
  /*handleclick(){

    ReactDOM.render(<Dummy1 />, document.getElementById('summa'));
  };
*/
  render () {
    var styles = {
  bmBurgerButton: {
    position: 'fixed',
    width: '36px',
    height: '30px',
    left: '36px',
    top: '36px'
  },
  bmBurgerBars: {
    background: 'red'
  },
  bmCrossButton: {
    height: '24px',
    width: '24px'
  },
  bmCross: {
    background: '#bdc3c7'
  },
  bmMenu: {
    background: 'red',
    padding: '2.5em 1.5em 0',
    fontSize: '1.15em'
  },
  bmMorphShape: {
    fill: '#373a47'
  },
  bmItemList: {
    color: 'red',
    padding: '0.8em'
  },
  bmItem: {
    display: 'inline-block'
  },
  bmOverlay: {
    background: 'rgba(0, 0, 0, 0.3)'
  }
}
    return (
<div id="outer-container">
      <Menu isopen={false} width={'18%'} id={ "sidebar" } bodyClassName={ "my-class" } style={styles} pageWrapId={ "page-wrap" } outerContainerId={ "outer-container" } >
        <a id="home" className="menu-item" href="/Event">Home</a>
        <br/>
        <a id="about" className="menu-item" onClick={this.handleclick}>About</a>
        <a id="contact" className="menu-item" href="/">Contact</a>

        </Menu>
        <main id="summa">
          <Dummy/>

        </main>
</div>

    );
  }
}


export default Event1;
