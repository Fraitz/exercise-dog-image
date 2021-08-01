import React, { Component } from 'react';

class InputNameButton extends Component {
  constructor(props) {
    super(props);
    this.inputName = this.inputName.bind(this);
  }

  inputName(){
    const { addDog } = this.props;
    const nome = document.querySelector('.dogName').value;
    addDog(nome);
  }

  render() { 
    return ( 
      <>
        <label>Dê um nome para o cachorro:
          <input type="text" name="dogName" className="dogName" placeholder="Doguinho"></input>
        </label>
        <button onClick={ this.inputName }>Adicionar Nome</button>
      </>
     );
  }
}
 
export default InputNameButton;
