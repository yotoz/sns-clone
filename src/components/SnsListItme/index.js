import React, { useState, useRef, useEffect } from 'react';
import './styles.scss';
import PropTypes from 'prop-types';
import Modal from '../SnsModal';

const SnsListItem = ({
  todoListData,
  changeIsDoneData,
}) => {
  const imgRef = useRef();
  const cardRef = useRef(null);

  const [modalState, setModalState] = useState(false);

  const onClick = (e) => {
    setModalState(true);
    imgRef.current.src = e.target.src;
  };

  const onClose = () => {
    setModalState(false);
  };

  const refs = useRef([
    React.createRef(),
    React.createRef(),
  ]);

  return (
    <div className="sns-list-item">
      {todoListData
        .slice(0)
        .reverse()
        .map((item, idx) => (
          <div
            className="sns-card"
            key={idx}
            style={{}}
            ref={refs.current[idx]}
          >
            <div className="sns-card-header">
              <div className="sns-card-title">
                {item.title}
              </div>
              <input
                type="checkbox"
                name={item.uniqNum}
                id={idx}
                onClick={(e) => {
                  changeIsDoneData(
                    e.target.checked,
                    e.target.name,
                  );

                  e.target.checked === true
                    ? (refs.current[
                        idx
                      ].current.style.backgroundColor =
                        'gray')
                    : (refs.current[
                        idx
                      ].current.style.backgroundColor =
                        'white');

                  //.target.style.backgroundColor = 'black';
                }}
              />
              {console.log(todoListData)}
            </div>
            <div className="sns-card-body">
              <div className="sns-card-img-list">
                {item.imgUri.map((imgSrc, idx) => (
                  <img
                    width={100 / item.imgUri.length + '%'}
                    className="sns-card-img"
                    alt="post"
                    key={idx}
                    src={URL.createObjectURL(imgSrc)}
                    onClick={(e) => {
                      onClick(e);
                    }}
                  />
                ))}
              </div>
              <div className="sns-card-text">
                {item.details}
              </div>
            </div>
          </div>
        ))}

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

SnsListItem.propTypes = {};

export default SnsListItem;
