import React from 'react';
import { Tooltip, IconButton } from '@material-ui/core';

export default ({ children, onClick, btnClassName, tip, tipClassName }) => (
  <Tooltip title={tip} className={tipClassName} placement='top'>
    <IconButton onClick={onClick} className={btnClassName}>
      {children}
    </IconButton>
  </Tooltip>
);
