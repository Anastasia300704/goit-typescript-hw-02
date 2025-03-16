import React from 'react';
import { ImageType } from '../../types';

type Props = {
  image: ImageType;
  onClick: (image: ImageType) => void;
};

const ImageCard: React.FC<Props> = ({ image, onClick }) => {
  return (
    <div>
      <img
        src={image.urls.small}
        alt={image.alt_description}
        onClick={() => onClick(image)}
        style={{ cursor: 'pointer' }}
      />
    </div>
  );
};

export default ImageCard;

