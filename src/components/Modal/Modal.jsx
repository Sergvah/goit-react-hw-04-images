import { useEffect } from 'react';
import PropTypes from 'prop-types';
import css from '../Modal/Modal.module.css';

function Modal({ onClose, src }) {
  useEffect(() => {
    const onModal = event => {
      if (event.code === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', onModal);
    return () => {
      window.removeEventListener('keydown', onModal);
    };
  }, [onClose]);

  const onBackdrop = event => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };
  return (
    <div className={css.overlay} onClick={onBackdrop}>
      <div className={css.modal}>
        <img src={src} alt="largeImage" />
      </div>
    </div>
  );
}

export default Modal;

Modal.propTypes = {
  src: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};
