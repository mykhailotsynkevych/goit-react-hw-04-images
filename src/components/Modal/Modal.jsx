import { createPortal } from 'react-dom';
import { Component } from "react";

const modalContainer = document.getElementById('modal');


class Modal extends Component {

    componentDidMount() {
    window.addEventListener("keydown", this.handleModalClose);
  }

    componentWillUnmount() {
    window.removeEventListener("keydown", this.handleModalClose);
  }

  handleModalClose = (e) => {
    if (e.target === e.currentTarget || e.code === "Escape"){
      this.props.setModalFoto();
}

  };

  render() {
    const { modalFoto } = this.props;

  return createPortal(
    <div className="Overlay" onClick={this.handleModalClose}>
      <div className="Modal">
        <img src={modalFoto} alt="" />
      </div>
    </div>,
    modalContainer
  );
  }
}

export default Modal;