import PropTypes from 'prop-types';

const ImageGalleryItem = ({ id, webformatURL, setModalFoto, largeImageURL }) => {
  return (
    <li key={id} className="ImageGalleryItem" onClick={() => setModalFoto(largeImageURL)}>
      <img src={webformatURL} alt="" className="ImageGalleryItem-image" />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  id: PropTypes.number.isRequired,
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  setModalFoto: PropTypes.func.isRequired,
};

export default ImageGalleryItem;
