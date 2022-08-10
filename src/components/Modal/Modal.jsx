import { createPortal } from 'react-dom';
import { useEffect } from 'react';
import PropTypes from 'prop-types';

const modalContainer = document.getElementById('modal');

const Modal = ({ modalFoto, setModalFoto }) => {
  const handleModalClose = e => {
    if (e.target === e.currentTarget || e.code === 'Escape') {
      setModalFoto();
    }
  };

  useEffect(() => {
    if (modalFoto) {
      window.addEventListener('keydown', handleModalClose);
    }

    return () => {
      window.removeEventListener('keydown', handleModalClose);
    };
  });

  return createPortal(
    <div className="Overlay" onClick={handleModalClose}>
      <div className="Modal">
        <img src={modalFoto} alt="" />
      </div>
    </div>,
    modalContainer
  );
};

Modal.propTypes = {
  modalFoto: PropTypes.string.isRequired,
  setModalFoto: PropTypes.func.isRequired,
};

export default Modal;
