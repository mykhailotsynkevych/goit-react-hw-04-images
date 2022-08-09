import PropTypes from 'prop-types';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem'

const ImageGallery = ({ fotos, setModalFoto }) => {
  return (
  <ul className="ImageGallery">
    {fotos.map(image => (
      <ImageGalleryItem
            key={image.id}
            id={image.id}
        webformatURL={image.webformatURL}
        largeImageURL={image.largeImageURL}
        setModalFoto={setModalFoto}
          />
    ))}
  </ul>
  );
};

ImageGallery.propTypes = {
  ImageGalleryItem: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
    })
  ),
  setModalFoto: PropTypes.func.isRequired,
};

export default ImageGallery;