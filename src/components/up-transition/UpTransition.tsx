import React from 'react';
import {TransitionProps} from '@mui/material/transitions';
import {Slide} from '@mui/material';

export const UpTransition = React.forwardRef(function Transition(
  {children, ...props}: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} children={children} {...props}/>;
});
