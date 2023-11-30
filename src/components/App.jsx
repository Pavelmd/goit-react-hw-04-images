import css from './StyleContainer.module.css'
import React from 'react';

import { Searchbar } from './SearchBar/Searchbar';
import { fetchImages } from './Api/fetchImages';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';



export const App =() =>  {
  const[images, setImages] = useState([]);
  const[isLoading, setIsLoading] = useState(false);
  const[currentSearch, setCurrentSearch] = useState('');
  const[pageNr, setPageNr] = useState(1);
  const[modalOpen, setModalOpen] = useState(false);
  const[modalImg, setModalImg] = useState('');
  const[modalAlt, setModalAlt] = useState('');
  // state = {
  //   images: [],
  //   isLoading: false,
  //   currentSearch: '',
  //   pageNr: 1,
  //   modalOpen: false,
  //   modalImg: '',
  //   modalAlt: '',
  // };

  const handleSubmit = async e => {
    e.preventDefault();
    setIsLoading(true);
    const inputForSearch = e.target.elements.inputForSearch;
    if (inputForSearch.value.trim() === '') {
      return;
    }
    const response = await fetchImages(inputForSearch.value, 1);
    setImages(response);
    setIsLoading(false);
    setCurrentSearch(inputForSearch.value);
    setPageNr(1)
    // this.setState({
    //   images: response,
    //   isLoading: false,
    //   currentSearch: inputForSearch.value,
    //   pageNr: 1,
    // });
  };

  const handleClickMore = async () => {
    const response = await fetchImages(
      this.state.currentSearch,
      this.state.pageNr + 1
    );
    this.setState({
      images: [...this.state.images, ...response],
      pageNr: this.state.pageNr + 1,
    });
  };

  handleImageClick = e => {
    this.setState({
      modalOpen: true,
      modalAlt: e.target.alt,
      modalImg: e.target.name,
    });
    console.log(e.target);
  };

  handleModalClose = () => {
    this.setState({
      modalOpen: false,
      modalImg: '',
      modalAlt: '',
    });
  };

  handleKeyDown = event => {
    if (event.code === 'Escape') {
      this.handleModalClose();
    }
  };

  async componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }


  render() {
    return (
      <div className = {css.container}>
       {this.state.isLoading ? (
          <Loader />
        ) : (
          <React.Fragment>
            <Searchbar onSubmit={this.handleSubmit} />
            <ImageGallery
              onImageClick={this.handleImageClick}
              images={this.state.images}
            />
            {this.state.images.length > 0 ? (
              <Button onClick={this.handleClickMore} />
            ) : null}
          </React.Fragment>
        )}
        {this.state.modalOpen ? (
          <Modal
            src={this.state.modalImg}
            alt={this.state.modalAlt}
            handleClose={this.handleModalClose}
          />
        ) : null}
      </div>
    )
  }
}








