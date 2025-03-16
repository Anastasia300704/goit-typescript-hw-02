import React, { useEffect } from 'react';
import Modal from 'react-modal';
import styles from './ImageModal.module.css';

import { ImageType } from '../../types';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  image: ImageType | null;
};

const ImageModal: React.FC<Props> = ({ isOpen, onClose, image }) => {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);

  if (!image) return null;

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className={styles.modalContent}
      overlayClassName={styles.overlay}
      closeTimeoutMS={200}
    >
      <div className={styles.modalWrapper}>
        <img src={image.urls.regular} alt={image.alt_description} />
        <div className={styles.info}>
          <p>Author: {image.user.name}</p>
          <p>Likes: {image.likes}</p>
          <p>{image.alt_description || 'No description available'}</p>
        </div>
      </div>
    </Modal>
  );
};

export default ImageModal;
