import { Component } from 'react';

import { fetchPhotos, fetchQueryPhotos } from '../api/pixabay-api';
import ImageGallery from './ImageGallery/ImageGallery';
import Searchbar from './Searchbar/Searchbar';
import Button from './Button/Button';
import Modal from './Modal/Modal';
import { Bars } from 'react-loader-spinner';

export class App extends Component {
  state = {
    fotos: [],
    query: '',
    loading: false,
    totalHits: 0,
    page: 1,
    modalFoto: null,
  };

  componentDidMount() {
    const { page } = this.state;
    this.setState({ loading: true });
    fetchPhotos(page)
      .then(({ hits, totalHits }) => this.setState({ fotos: hits, totalHits }))
      .catch(err => {
        console.log(err);
      })
      .finally(() => this.setState({ loading: false }));
  }

  handleFormSubmit = query => {
    this.setState({ query: query });
  };

  setModalFoto = (modalFoto = null) => {
    this.setState({ modalFoto });
  };

  componentDidUpdate(prevProps, prevState) {
    const { query, page } = this.state;

    if (this.state.query !== prevState.query) {
      fetchQueryPhotos(query).then(({ hits, totalHits }) => {
        this.setState({ fotos: hits, totalHits, page: 1 });
      });
    }

    if (this.state.page !== prevState.page && this.state.page !== 1 && query) {
      this.setState({ loading: true });
      fetchQueryPhotos(query, page)
        .then(({ hits }) =>
          this.setState(prev => ({
            fotos: [...prev.fotos, ...hits],
          }))
        )
        .catch(err => console.log(err))
        .finally(() => this.setState({ loading: false }));
    }

    if (this.state.page !== prevState.page && !query) {
      this.setState({ loading: true });
      fetchPhotos(page)
        .then(({ hits }) =>
          this.setState(prev => ({
            fotos: [...prev.fotos, ...hits],
          }))
        )
        .catch(err => console.log(err))
        .finally(() => this.setState({ loading: false }));
    }
  }

  updatePage = () => {
    this.setState(prev => ({
      page: prev.page + 1,
    }));
  };

  // <h2>Sorry, no photos for "{query}"</h2>

  render() {
    const { fotos, totalHits, modalFoto } = this.state;
    return (
      <div>
        <Searchbar onSubmit={this.handleFormSubmit} />
        {fotos.length > 0 ? (
          <ImageGallery fotos={fotos} setModalFoto={this.setModalFoto} />
        ) : null}
        {fotos.length > 0 && fotos.length < totalHits && (
          <Button updatePage={this.updatePage} />
        )}
        {modalFoto && (
          <Modal modalFoto={modalFoto} setModalFoto={this.setModalFoto} />
        )}
        {this.state.loading && <Bars color="#00BFFF" height={80} width={80} />}
      </div>
    );
  }
}
