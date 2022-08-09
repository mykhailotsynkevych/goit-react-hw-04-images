import PropTypes from 'prop-types';

const Button = ({ updatePage }) => {
  return (
    <button type="button" className="Button" onClick={updatePage}>Load more</button>
  );
};

Button.propTypes = {
  updatePage: PropTypes.func.isRequired,
};

export default Button;