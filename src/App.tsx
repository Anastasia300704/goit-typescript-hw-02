import React, { useState, useEffect } from 'react';
import ImageGallery from './components/ImageGallery/ImageGallery';
import ImageModal from './components/ImageModal/ImageModal';
import Loader from './components/Loader/Loader';
import ErrorMessage from './components/ErrorMessage/ErrorMessage';
import LoadMoreBtn from './components/LoadMoreBtn/LoadMoreBtn';
import SearchBar from './components/SearchBar/SearchBar';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { ImageType } from './types';

const App: React.FC = () => {
  const [images, setImages] = useState<ImageType[]>([]);
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<ImageType | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  const apiKey = '3PbS8YVQfqwalQib-p3agk5DXvxvvO977_I9zHKXEiE';

  useEffect(() => {
    if (!query) return;

    setLoading(true);
    setError(null);

    axios
      .get(`https://api.unsplash.com/search/photos?query=${query}&page=${page}&per_page=12&client_id=${apiKey}`)
      .then((response) => {
        const fetchedImages: ImageType[] = response.data.results;
        setImages((prevImages) => [...prevImages, ...fetchedImages]);
        setTotalPages(Math.ceil(response.data.total / 12));
      })
      .catch(() => {
        setError('Ошибка загрузки изображений');
        toast.error('Ошибка загрузки изображений');
      })
      .finally(() => setLoading(false));
  }, [query, page]);

  const openModal = (image: ImageType) => {
    setSelectedImage(image);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedImage(null);
  };

  const handleSearchSubmit = (searchQuery: string) => {
    if (searchQuery.trim() === '') {
      toast.error('Пожалуйста, введите текст для поиска!');
      return;
    }
    setQuery(searchQuery);
    setImages([]);
    setPage(1);
  };

  const loadMoreImages = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  return (
    <div>
      <SearchBar onSubmit={handleSearchSubmit} />
      {error && <ErrorMessage message={error} />}
      {loading && !images.length && <Loader />}
      {!loading && images.length === 0 && !error && <p>Ничего не найдено.</p>}

      <ImageGallery images={images} onImageClick={openModal} />

      {images.length > 0 && page < totalPages && <LoadMoreBtn onClick={loadMoreImages} />}

      <ImageModal isOpen={modalIsOpen} onClose={closeModal} image={selectedImage} />
    </div>
  );
};


export default App;
