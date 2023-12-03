import css from './StyleContainer.module.css';
import React, { useState, useEffect } from 'react';

import { Searchbar } from './SearchBar/Searchbar';
import { fetchImages } from './Api/fetchImages';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';

export const App = () => {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentSearch, setCurrentSearch] = useState('');
  const [pageNr, setPageNr] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalImg, setModalImg] = useState('');
  const [modalAlt, setModalAlt] = useState('');
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    if (currentSearch === '') {
      return;
    }
    async function addImages() {
      setIsLoading(true);
      const response = await fetchImages(currentSearch, pageNr);

      setImages(prevImages => [...prevImages, ...response.hits]);
      setIsLoading(false);
      setTotalPages(Math.ceil(response.totalHits / 12));
    }
    addImages();
  }, [currentSearch, pageNr]);

  const handleSubmit = query => {
    setCurrentSearch(query);
    setImages([]);
    setPageNr(1);
  };

  const handleClickMore = () => {
    setPageNr(pageNr => pageNr + 1);
  };

  const handleImageClick = e => {
    setModalOpen(true);
    setModalAlt(e.target.alt);
    setModalImg(e.target.name);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setModalAlt('');
    setModalImg('');
  };

  return (
    <div className={css.container}>
      {isLoading && pageNr === 1 ? (
        <Loader />
      ) : (
        <React.Fragment>
          <Searchbar onSubmit={handleSubmit} />
          <ImageGallery onImageClick={handleImageClick} images={images} />

          {isLoading && pageNr >= 2 ? <Loader /> : null}
          {images.length > 0 && !isLoading && pageNr < totalPages ? (
            <Button onClick={handleClickMore} />
          ) : null}
        </React.Fragment>
      )}
      {modalOpen ? (
        <Modal src={modalImg} alt={modalAlt} handleClose={handleModalClose} />
      ) : null}
    </div>
  );
};
