import React, { Component } from 'react';

class ButtonImgFetch extends Component {
  constructor(props) {
    super(props);
  }

  render() { 
    const { fetchImg } = this.props;
    return ( 
      <>
        <button onClick={ () => fetchImg() }>Buscar Novo Dog</button>
      </>
     );
  }
}
 
export default ButtonImgFetch;
