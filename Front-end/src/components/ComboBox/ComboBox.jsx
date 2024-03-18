import { useId, useState } from 'react';
import classNames from 'classnames/bind';
// import Tippy from '@tippyjs/react';
import HeadlessTippy from '@tippyjs/react/headless';
import 'tippy.js/dist/tippy.css'; // optional

import styles from './ComboBox.module.scss';
import PopperWrapper from '../PopperWrapper';
import MenuItem from './MenuItem';

const cx = classNames.bind(styles);

function ComboBox({ title, value, data, onClickValue }) {
  const id = useId();
  const [inputValue, setInputValue] = useState(value);
  const [optionsData, setOptionsData] = useState(data);

  const handleChangeInput = (e) => {
    setInputValue(e.target.value);
    const filteredOptionsData = data.filter((option) => {
      const defaultValue = option.toString();
      const targetValue = e.target.value;
      return defaultValue.includes(targetValue);
    });
    setOptionsData(filteredOptionsData);
  };

  const handleSetInputValue = (selectedValue) => setInputValue(selectedValue);

  const renderOptionItems = (attrs) => {
    return (
      <div tabIndex={-1} {...attrs}>
        <PopperWrapper>
          <div className={cx('menu-list')}>
            {optionsData.length === 0 ? (
              <p className={cx('not-match')}>No option</p>
            ) : (
              optionsData.map((option, index) => {
                return (
                  <MenuItem
                    key={index}
                    value={option}
                    inputValue={inputValue}
                    handleClickValue={onClickValue}
                    handleSetInputValue={handleSetInputValue}
                  />
                );
              })
            )}
          </div>
        </PopperWrapper>
      </div>
    );
  };

  return (
    <HeadlessTippy trigger="click" interactive placement="bottom-end" render={renderOptionItems}>
      <div className={cx('wrapper')}>
        <input
          className={cx('input')}
          type="text"
          id={id}
          value={inputValue}
          onChange={(e) => handleChangeInput(e)}
          placeholder={title}
          spellCheck="false"
        />
      </div>
    </HeadlessTippy>
  );
}

export default ComboBox;
