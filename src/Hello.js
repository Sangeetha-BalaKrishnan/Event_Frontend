import React from 'react';


class MyComponent extends React.Component {

  state = {
    isMobile: false
  }

  render() {
    const { isMobile } = this.state;

    return (
      <div>
        {isMobile ?
          <div>Mobile</div> :
          <div>Not mobile</div>
        }
      </div>
    );
  }
}

export default MyComponent;
