import React from 'react';
import classes from './ModalDefault.module.css'

const ModalDefault = ({children, visible, setVisible}) => {
  const rootClasses = [classes.modalDefault];

  if(visible) {
    rootClasses.push(classes.active)
  }

  return (
    <div className={rootClasses.join(' ')} onClick={() => setVisible(false)}>
      <div className={classes.modalDefaultContent} onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};

export default ModalDefault;