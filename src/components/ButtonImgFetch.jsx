import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ButtonImgFetch extends Component {
  render() {
    const { fetchImg } = this.props;
    return (
      <button type="button" onClick={ () => fetchImg() }>Buscar Novo Dog</button>
    );
  }
}

ButtonImgFetch.propTypes = {
  fetchImg: PropTypes.func,
}.isRequired;

export default ButtonImgFetch;
