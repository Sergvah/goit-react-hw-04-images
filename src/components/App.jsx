import { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Searchbar from './Searchbar/Searchbar';
import Button from './Button/Button';
import ImageGallery from './ImageGallery/ImageGallery';
import Modal from './Modal/Modal';
import Spinner from './Loader/Loader';
import response from './services/Fetch';

function App() {
  const [inputName, setInputName] = useState('');
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState([]);
  const [largeImage, setLargeImage] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [showModal, setShowModal] = useState('');

  useEffect(() => {
    if (!inputName) {
      return;
    }
    // const fetchArticles = () => {
    setLoading(true);

    response(inputName, page)
      .then(data => {
        console.log(data);
        data.hits.forEach(({ id, webformatURL, largeImageURL, tags }) => {
          setImages(
            prev => [...prev, { id, webformatURL, largeImageURL, tags }],
            setTotalPages(Math.ceil(data.totalHits / 12))
          );
        });
      })
      .finally(() => setLoading(false));
    // };
    // fetchArticles();
  }, [inputName, page]);

  const handleSubmitForm = inputName => {
    setInputName(inputName);
    setImages([]);
    setPage(1);
  };

  const onClick = photo => {
    setLargeImage(photo);
    setShowModal(true);
  };

  const loadMoreHandler = () => {
    setPage(prevPage => prevPage + 1);
  };
  const onModalClose = () => {
    setShowModal(prevModal => !prevModal);
  };

  return (
    <div>
      <Searchbar onSub={handleSubmitForm} />
      {loading && <Spinner />}
      {showModal && <Modal src={largeImage} onClose={onModalClose} />}
      <ToastContainer autoclose={3000} />
      {images.length > 0 && (
        <ImageGallery imageObject={images} onClick={onClick} />
      )}
      {images.length !== 0 && totalPages > page && (
        <Button onLoadMore={loadMoreHandler} />
      )}
    </div>
  );
}

export default App;
