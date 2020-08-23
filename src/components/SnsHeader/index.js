import React, {
  useState,
  useRef,
  useEffect,
  useReducer,
} from 'react';

//styles
import './styles.scss';

const AnimationsName = {
  CLOSE: 'header-container-close',
  OPENNING: 'animation-open',
  OPEN: 'header-container-open',
  CLOSING: 'animation-close',
};

const reducer = (state, action) => {
  return {
    ...state,
    [action.name]: action.value,
  };
};

const SnsHeader = ({
  onAddTodoListData,
  className,
  isExtends,
  changeExtendsState,
  Animation_Status,
}) => {
  const headerClassNames = {
    CLOSE: 'header-container-close',
    OPENNING: 'animation-open',
    OPEN: 'header-container-open',
    CLOSING: 'animation-close',
  };

  const headerRef = useRef(null);
  const submitRef = useRef(null);
  const hiddenFileInput = React.useRef(null);

  const handleClick = (event) => {
    hiddenFileInput.current.click();
  };

  //const [url, setUrl] = useState(null);
  const handleChange = (event) => {
    //setUrl(URL.createObjectURL(event.target.files[0]));

    if (event.target.files.length > 0) {
      onAddTodoListData(
        inputManager.title,
        inputManager.details,
        [...event.target.files],
      );

      inputDispatch({ name: 'title', value: '' });
      inputDispatch({ name: 'details', value: '' });

      closeHeader();
    }
  };

  // useEffect(() => {
  //   console.log(url);
  // }, [url]);

  const [inputManager, inputDispatch] = useReducer(
    reducer,
    {
      title: '',
      details: '',
    },
  );

  useEffect(() => {
    const animations = headerRef.current.getAnimations();

    if (animations.length <= 0) return;

    animations[0].onfinish = (ani) => {
      if (
        ani.target.animationName === AnimationsName.OPENNING
      ) {
        changeExtendsState(Animation_Status.OPEN);
      } else if (
        ani.target.animationName === AnimationsName.CLOSING
      ) {
        changeExtendsState(Animation_Status.CLOSE);
      }
    };

    return () => {};
  });

  const onFoucus = () => {
    if (
      !(
        isExtends === Animation_Status.OPEN ||
        isExtends === Animation_Status.OPENNING
      )
    ) {
      changeExtendsState(Animation_Status.OPENNING);
    }
  };

  const closeHeader = () => {
    if (
      !(
        isExtends === Animation_Status.CLOSE ||
        isExtends === Animation_Status.CLOSING
      )
    ) {
      changeExtendsState(Animation_Status.CLOSING);
    }
  };

  return (
    <div
      className={`${className} ${
        isExtends === Animation_Status.CLOSE
          ? headerClassNames.CLOSE
          : isExtends === Animation_Status.OPENNING
          ? headerClassNames.OPENNING
          : isExtends === Animation_Status.OPEN
          ? headerClassNames.OPEN
          : isExtends === Animation_Status.CLOSING
          ? headerClassNames.CLOSING
          : ''
      }`}
      ref={headerRef}
    >
      <div className="left-space"></div>
      <div className="header-input-space">
        <div className="header-text">Todo</div>
        <div className="header-text-box-container">
          <input
            placeholder="Title..."
            className="header-text-box"
            type="text"
            autoComplete="off"
            name="title"
            value={inputManager.title}
            onChange={(e) => {
              inputDispatch(e.target);
            }}
            onFocus={() => {
              onFoucus();
            }}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                e.target.blur();
                submitRef.current.click();
              }
            }}
          />
          {isExtends === Animation_Status.OPENNING ||
          isExtends === Animation_Status.OPEN ? (
            <textarea
              placeholder="Details..."
              className="header-text-box"
              type="text"
              name="details"
              value={inputManager.details}
              onChange={(e) => {
                inputDispatch(e.target);
              }}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  e.target.blur();
                  submitRef.current.click();
                }
              }}
            />
          ) : (
            ''
          )}
        </div>
        <button
          type="submit"
          className="header-submit-button"
          onClick={() => {
            ///processing
            handleClick();
          }}
          ref={submitRef}
        >
          Submit
        </button>
        <input
          type="file"
          ref={hiddenFileInput}
          onChange={handleChange}
          style={{ display: 'none' }}
          accept="image/*"
          multiple
        />
      </div>
      <div className="right-space"></div>
    </div>
  );
};

export default SnsHeader;
