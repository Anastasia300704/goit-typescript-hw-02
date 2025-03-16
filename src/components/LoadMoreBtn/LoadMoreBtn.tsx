import React from 'react';
import styles from './LoadMoreBtn.module.css';

type Props = {
  onClick: () => void;
};

const LoadMoreBtn: React.FC<Props> = ({ onClick }) => {
  return (
    <button className={styles.loadMoreBtn} onClick={onClick}>
      Load more
    </button>
  );
};

export default LoadMoreBtn;
