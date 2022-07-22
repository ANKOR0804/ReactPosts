import React from 'react';
import classes from './InputDefault.module.css';

const InputDefault = (props) => {
  return (
    <input className={classes.inputDefault} {...props}/>
  );
};

export default InputDefault;