import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';
import styles from './App.module.css';
import { getAPI } from 'pixabay-api';
import { useEffect, useState } from 'react';

export const App = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');
  const [query, setQuery] = useState('');
  const [showBtn, setShowBtn] = useState(false);

  useEffect(() => {
    if (!query) return;
    const searchImages = async () => {
      setLoading(true);

      try {
        const response = await getAPI(query, page);
        setImages(prevImages => [...prevImages, ...response.hits]);
        setShowBtn(page < Math.ceil(response.totalHits / 12));
      } catch (error) {
        console.error('Error fetching images:', error);
      } finally {
        setLoading(false);
      }
    };

    searchImages();
  }, [query, page]);

  const handleSearch = newQuery => {
    setImages([]);
    setPage(1);
    setQuery(newQuery);
  };

  const loadMoreImages = () => {
    setPage(prevPage => prevPage + 1);
  };

  const openModal = imageUrl => {
    setModalOpen(true);
    setSelectedImage(imageUrl);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedImage('');
    document.body.style.overflow = '';
  };

  const handleOverlayClick = () => {
    closeModal();
  };

  return (
    <div className={styles.App}>
      <Searchbar onSubmit={handleSearch} />
      <ImageGallery images={images} openModal={openModal} />
      {loading && <Loader />}
      {showBtn && <Button onLoadMore={loadMoreImages} hasMore={!loading} />}
      <Modal
        isOpen={modalOpen}
        closeModal={closeModal}
        imageUrl={selectedImage}
        onOverlayClick={handleOverlayClick}
      />
    </div>
  );
};

export default App;