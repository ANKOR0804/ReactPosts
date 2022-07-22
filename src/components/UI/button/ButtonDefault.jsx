import React from 'react';
import classes from './ButtonDefault.module.css';

const ButtonDefault = ({children, ...props}) => {
  return (
    <button {...props} className={classes.btnDefault}>
      {children}
    </button>
  );
};

export default ButtonDefault;