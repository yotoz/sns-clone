import React, { useState } from 'react';
import './styles.scss';
import PropTypes from 'prop-types';
import Modal from '../SnsModal';
const SnsListItem = ({
  isDone,
  title = '제에모목',
  detatils = '내용',
  imgUri = '이미지당',
}) => {
  const [modalState, setModalState] = useState(false);
  const onClick = () => {
    setModalState(true);
  };

  const onClose = () => {
    setModalState(false);
  };

  return (
    <div className="sns-list-item">
      <div className="sns-card">
        <div className="sns-card-header">{title}</div>
        <div className="sns-card-body">
          <div className="sns-card-img-list">
            <img
              className="sns-card-img"
              alt="post"
              src="/test.png"
              onClick={onClick}
            />
            <img
              className="sns-card-img"
              alt="post"
              src="/test.png"
            />
            <img
              className="sns-card-img"
              alt="post"
              src="/test.png"
            />
          </div>
          <div className="sns-card-text">
            {detatils}aaaaaaaaaaa
          </div>
        </div>
      </div>

      <Modal visible={modalState} onClose={onClose}>
        <img
          className="sns-card-img"
          alt="post"
          src="/test.png"
          onClick={(e) => e.stopPropagation()}
        />
      </Modal>
    </div>
  );
};

SnsListItem.propTypes = {
  isDone: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  detatils: PropTypes.string.isRequired,
  imgUri: PropTypes.string.isRequired,
};

export default SnsListItem;
