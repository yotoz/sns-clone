import React, { useState } from 'react';

//components
import SnsHeader from '../SnsHeader';
import SnsListItem from '../SnsListItme';

//styles
import './styles.scss';

const Animation_Status = {
  CLOSE: 0,
  OPENING: 1,
  OPEN: 2,
  CLOSING: 3,
};

const Body_Class_Name = {
  CLOSE: 'body-container-close',
  OPENING: 'body-container-opening',
  OPEN: 'body-container-open',
  CLOSING: 'body-container-closing',
};

const SnsMain = () => {
  const [todoListData, setTodoListData] = useState([
    // {
    //   isDone: false,
    //   title: '',
    //   details: '',
    //   imgUri: {},
    // },
  ]);
  const [uniqNum, setUniqNum] = useState(0);

  const [isExtends, setIsExtends] = useState(
    Animation_Status.CLOSE,
  );

  const _addTodoListData = (title, details, imgUri) => {
    setTodoListData(
      todoListData.concat({
        isDone: false,
        title: title,
        details: details,
        imgUri: imgUri,
        uniqNum: uniqNum,
      }),
    );

    setUniqNum(uniqNum + 1);
  };

  const changeExtendsState = (state) => {
    setIsExtends(state);
  };

  const changeIsDoneData = (isDone, uniqNum) => {
    const array = [...todoListData];

    array.forEach((element) => {
      if (element.uniqNum === uniqNum) {
        element.isDone = isDone;
      }
    });

    setTodoListData(array);
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
        className={`body-container ${
          isExtends === Animation_Status.CLOSE
            ? Body_Class_Name.CLOSE
            : isExtends === Animation_Status.OPENING
            ? Body_Class_Name.OPENING
            : isExtends === Animation_Status.OPEN
            ? Body_Class_Name.OPEN
            : isExtends === Animation_Status.CLOSING
            ? Body_Class_Name.CLOSING
            : ''
        }`}
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
          <SnsListItem
            todoListData={todoListData}
            changeIsDoneData={changeIsDoneData}
          />
        </div>
      </div>
    </div>
  );
};

export default SnsMain;
