import React, { Component } from "react";
import ButtonImgFetch from "./ButtonImgFetch";
import InputNameButton from "./InputNameButton";
import '../dogPhotos.css' 

class DogPhotos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imagemAtual: "",
      nomeDoDogAtual: "",
      lading: true,
      arrayDogs: [],
    };
    this.renderImage = this.renderImage.bind(this);
    this.showTheDog = this.showTheDog.bind(this);
    this.fetchImg = this.fetchImg.bind(this);
    this.pushDog = this.pushDog.bind(this);
    this.addDog = this.addDog.bind(this);
  }

  renderImage() {
    const img = this.state.imagemAtual;
    return <img src={ img } alt="imagem de um cachorro" className="dogPhoto" />;
  }

  async fetchImg() {
    this.setState({
      loading: true,
    })
    const requestAPI = await fetch('https://dog.ceo/api/breeds/image/random')
    const fetchedDog = await requestAPI.json();
    this.showTheDog(fetchedDog.message);
  }

  showTheDog(url) {
    const raca = url.split('/')[4];
    if(url.includes('terrier')) this.fetchImg();
    this.setState ({
      loading: false,
      imagemAtual: url,
    })
    setTimeout(() => {
      alert(`Cão da raça: ${raca}`)
    }, 1200);
  }

  saveStorage() {
    localStorage.setItem('Dogs', JSON.stringify(this.state.arrayDogs) )
  }

  pushDog() {
    const nome = this.state.nomeDoDogAtual;
    const url = this.state.imagemAtual;
    this.setState(({arrayDogs}) => {
      return {arrayDogs: [...arrayDogs,{ nome, url }]}
    })
    this.saveStorage();
  }

  async addDog(nome) {
    this.setState({
      nomeDoDogAtual: nome,
    })
    this.pushDog()
  }

  componentDidMount() {
    const dogs = JSON.parse(localStorage.getItem('Dogs'));
    if(dogs) {
      const lastDog = dogs[dogs.length - 1];
      console.log('achou');
      this.setState({
        imagemAtual: lastDog.url,
      })
    } else {
      this.fetchImg();
    }
  }

  render() {
    const loading = this.state.loading;
    const loader = <span className="loader">Loading...</span>;

    return (
      <section>
        { loading ? loader : this.renderImage() }
        <ButtonImgFetch fetchImg={ this.fetchImg } />
        <InputNameButton addDog={ this.addDog }/>
      </section>
    );
  }
}

export default DogPhotos;
