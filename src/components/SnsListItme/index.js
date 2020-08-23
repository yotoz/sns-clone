import React, { useState, useRef } from 'react';
import './styles.scss';
import PropTypes from 'prop-types';
import Modal from '../SnsModal';
const SnsListItem = ({
  isDone,
  title = '제에모목',
  detatils = '내용',
  imgUri = ['/test1.png', '/test2.png', '/test3.png'],
}) => {
  const imgRef = useRef();

  const [modalState, setModalState] = useState(false);
  const onClick = (e) => {
    setModalState(true);
    imgRef.current.src = e.target.src;
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
            {imgUri.map((imgSrc, idx) => (
              <img
                width={100 / imgUri.length + '%'}
                className="sns-card-img"
                alt="post"
                key={idx}
                src={imgSrc}
                onClick={(e) => {
                  onClick(e);
                }}
              />
            ))}
          </div>
          <div className="sns-card-text">{detatils}</div>
        </div>
      </div>

      <Modal visible={modalState} onClose={onClose}>
        <img
          ref={imgRef}
          className="sns-card-img"
          alt="post"
          src=""
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
  imgUri: PropTypes.any,
};

export default SnsListItem;
