import React, { Component } from 'react';
import PropTypes from 'prop-types';

class InputNameButton extends Component {
  constructor(props) {
    super(props);
    this.inputName = this.inputName.bind(this);
  }

  inputName() {
    const { addDog } = this.props;
    const nome = document.querySelector('.dogName').value;
    addDog(nome);
  }

  render() {
    return (
      <div className="inputName">
        <p>Dê um nome para o dog!</p>
        <label htmlFor="dogName" className="dogNames">
          <input type="text" name="dogName" className="dogName" placeholder="Doguinho" />
        </label>
        <button type="button" onClick={ this.inputName }>Adicionar Nome</button>
      </div>
    );
  }
}

InputNameButton.propTypes = {
  addDog: PropTypes.func,
}.isRequired;

export default InputNameButton;
