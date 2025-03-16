import React from 'react';
import ImageCard from '../ImageCard/ImageCard'; 
import styles from './ImageGallery.module.css';

import { ImageType } from '../../types';

type Props = {
  images: ImageType[];
  onImageClick: (image: ImageType) => void;
};

const ImageGallery: React.FC<Props> = ({ images, onImageClick }) => {
  return (
    <ul>
      {images.map((image) => (
        <li key={image.id}>
          <ImageCard image={image} onClick={onImageClick} />
        </li>
      ))}
    </ul>
  );
};

export default ImageGallery;