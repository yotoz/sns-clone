import React, { useState } from 'react';

//components
import SnsHeader from '../SnsHeader';
import SnsListItem from '../SnsListItme';

//styles
import './styles.scss';

const Animation_Status = {
  CLOSE: 0,
  OPENNING: 1,
  OPEN: 2,
  CLOSING: 3,
};

const SnsMain = () => {
  const [todoListData, setTodoListData] = useState([
    {
      isDone: false,
      title: '',
      details: '',
      imgUri: '',
    },
  ]);

  const [isExtends, setIsExtends] = useState(
    Animation_Status.CLOSE,
  );

  const _addTodoListData = (title, details, imgUri) => {
    setTodoListData(
      todoListData.concat({
        isDone: false,
        title,
        details,
        imgUri,
      }),
    );
  };

  const changeExtendsState = (state) => {
    setIsExtends(state);
  };

  return (
    <div className="container">
      <SnsHeader
        className="header-container"
        onAddTodoListData={_addTodoListData}
        isExtends={isExtends}
        changeExtendsState={changeExtendsState}
        Animation_Status={Animation_Status}
      ></SnsHeader>
      <div
        className="body-container"
        onClick={() => {
          if (
            !(
              isExtends === Animation_Status.CLOSE ||
              isExtends === Animation_Status.CLOSING
            )
          ) {
            changeExtendsState(Animation_Status.CLOSING);
          }
        }}
      >
        <div className="sns-main">
          <SnsListItem />
        </div>
      </div>
    </div>
  );
};

export default SnsMain;
