import React from 'react';
import styles from './ErrorMessage.module.css';

type Props = {
  message: string;
};

const ErrorMessage: React.FC<Props> = ({ message }) => {
  return <p className={styles.error}>{message}</p>;
};

export default ErrorMessage;
