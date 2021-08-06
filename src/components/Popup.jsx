import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Popup extends Component {
  render() {
    const { raca, closePopup } = this.props;
    return (
      <div className="popup">
        <div className="innerContent">
          <h2>Cachorro encontrado!</h2>
          <p>Você achou um</p>
          <h3>{ raca }</h3>
          <button type="button" onClick={ () => closePopup() }>Massa demais!</button>
        </div>
      </div>
    );
  }
}

Popup.propTypes = {
  raca: PropTypes.string,
}.isRequired;

export default Popup;
