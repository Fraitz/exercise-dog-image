import React, { Component } from 'react';
import ButtonImgFetch from './ButtonImgFetch';
import InputNameButton from './InputNameButton';
import Popup from './Popup';
import '../dogPhotos.css';

class DogPhotos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imagemAtual: '',
      nomeDoDogAtual: '',
      raca: '',
      loading: true,
      popup: false,
      arrayDogs: [],
    };
    this.renderImage = this.renderImage.bind(this);
    this.showTheDog = this.showTheDog.bind(this);
    this.closePopup = this.closePopup.bind(this);
    this.fetchImg = this.fetchImg.bind(this);
    this.getFirst = this.getFirst.bind(this);
    this.pushDog = this.pushDog.bind(this);
    this.addDog = this.addDog.bind(this);
    this.alerta = this.alerta.bind(this);
  }

  componentDidMount() {
    // console.log('Did Mount');
    const dogs = JSON.parse(localStorage.getItem('Dogs'));
    if (dogs) {
      const lastDog = dogs[dogs.length - 1];
      this.getFirst(lastDog);
    } else {
      this.fetchImg();
    }
  }

  getFirst(lastDog) {
    const breed = lastDog.imagemAtual.split('/')[4];
    this.setState({
      loading: false,
      imagemAtual: lastDog.imagemAtual,
      raca: breed,
    });
    this.closePopup();
  }

  async addDog(nome) {
    this.setState({
      nomeDoDogAtual: nome,
    }, () => this.pushDog());
  }

  pushDog() {
    const { nomeDoDogAtual, imagemAtual } = this.state;
    this.setState(({ arrayDogs }) => ({
      arrayDogs: [...arrayDogs, {
        nomeDoDogAtual,
        imagemAtual,
      }],
    }),
    () => this.saveStorage());
  }

  saveStorage() {
    const { arrayDogs } = this.state;
    const dogs = JSON.parse(localStorage.getItem('Dogs'));
    if (dogs) {
      const ultimo = [...arrayDogs].pop();
      localStorage.setItem('Dogs', JSON.stringify([...dogs, ultimo]));
    } else {
      localStorage.setItem('Dogs', JSON.stringify(arrayDogs));
    }
  }

  showTheDog(url) {
    // console.log('ShowDog');
    // const INTERVALO = 1000;
    const breed = url.split('/')[4];
    if (url.includes('terrier')) {
      this.fetchImg();
      console.log('NOT TERRIERS');
    } else {
      this.setState({
        loading: false,
        imagemAtual: url,
        raca: breed,
      });
    }
    // setTimeout(() => {
    //   this.setState({
    //     popup: true,
    //   });
    // }, Intervalo);
  }

  closePopup() {
    // console.log('chamou');
    this.setState({
      popup: false,
    });
  }

  alerta() {
    // console.log('imagem Renderizada - Popup');
    this.setState({
      popup: true,
    });
  }

  async fetchImg() {
    // console.log('Fetch');
    this.setState({
      loading: true,
    });
    const requestAPI = await fetch('https://dog.ceo/api/breeds/image/random');
    const fetchedDog = await requestAPI.json();
    this.showTheDog(fetchedDog.message);
  }

  renderImage() {
    // console.log('renderizando imagem');
    const { imagemAtual } = this.state;
    return (<img
      src={ imagemAtual }
      alt="imagem de um cachorro"
      className="dogPhoto"
      onLoad={ () => this.alerta() }
    />);
  }

  render() {
    // console.log('renderizou o componente');
    const { loading, raca, popup } = this.state;
    const loader = <span className="loader">Loading...</span>;
    const poopi = <Popup raca={ raca } closePopup={ this.closePopup } />;

    return (
      <section className="dogBack">
        <div className="dogPage">
          { loading ? loader : this.renderImage() }
          { popup && poopi}
          <div className="dogControls">
            <ButtonImgFetch fetchImg={ this.fetchImg } />
            <InputNameButton addDog={ this.addDog } />
          </div>
        </div>
      </section>
    );
  }
}

export default DogPhotos;
