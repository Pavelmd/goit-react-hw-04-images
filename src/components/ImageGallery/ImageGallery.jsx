import { ImageGalleryItem } from 'components/ImageGaleryItem/ImageGaleryItem';
import css from './ImageGallery.module.css';

export const ImageGallery = ({ images, onImageClick }) => (
  <ul className={css.ImageGallery}>
    {images.map((image, index) => (
      <ImageGalleryItem onclick={onImageClick} image={image} key={index} />
    ))}
  </ul>
);
