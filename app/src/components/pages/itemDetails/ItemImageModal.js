import React from 'react';
import { Modal } from 'reactstrap';

class ItemImageModal extends React.Component {
  render() {
    return (
      <div className="mt-5">
        <Modal
          centered
          size="lg"
          isOpen={this.props.modalIsOpen}
          toggle={this.props.toggleModalHandler}
          // className="modal-width mt-5"
        >
          <div>
            <i
              className="btn far fa-times-circle float-right"
              onClick={this.props.toggeleModalHandler}
            />
          </div>
          <img src={this.props.imageUrl} width="100%" height="auto" alt="" />
        </Modal>
      </div>
    );
  }
}
export default ItemImageModal;
