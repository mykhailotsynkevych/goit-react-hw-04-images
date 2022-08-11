import { useEffect, useState } from 'react';

import { fetchQueryPhotos } from '../api/pixabay-api';
import ImageGallery from './ImageGallery/ImageGallery';
import Searchbar from './Searchbar/Searchbar';
import Button from './Button/Button';
import Modal from './Modal/Modal';
import { Bars } from 'react-loader-spinner';

const App = () => {
  const [query, setQuery] = useState('all');
  const [fotos, setFotos] = useState([]);
  const [totalHits, setTotalHits] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [modalFoto, setModalFoto] = useState(null);

  const handleFormSubmit = query => {
    setQuery(query);
    setPage(1);
  };

  const updatePage = () => {
    setPage(page => page + 1);
  };

  const funcModalFoto = (modalFoto = null) => {
    setModalFoto(modalFoto);
  };

  useEffect(() => {
    setLoading(true);
    fetchQueryPhotos(query, page)
      .then(({ hits, totalHits }) => {
        setFotos(fotos => (page === 1 ? hits : [...fotos, ...hits]));
        page === 1 && setTotalHits(totalHits);
      })
      .catch(err => console.log(err))
      .finally(() => setLoading(false));
  }, [page, query]);

  return (
    <div>
      <Searchbar onSubmit={handleFormSubmit} />
      {fotos.length > 0 ? (
        <ImageGallery fotos={fotos} setModalFoto={funcModalFoto} />
      ) : null}
      {fotos.length > 0 && fotos.length < totalHits && (
        <Button updatePage={updatePage} />
      )}
      {modalFoto && (
        <Modal modalFoto={modalFoto} setModalFoto={funcModalFoto} />
      )}
      {loading && <Bars color="#00BFFF" height={80} width={80} />}
    </div>
  );
};

export default App;
