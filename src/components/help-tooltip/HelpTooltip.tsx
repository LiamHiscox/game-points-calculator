import React from 'react';
import {ClickAwayListener, IconButton, Tooltip} from '@mui/material';
import HelpIcon from '@mui/icons-material/Help';

interface HelpTooltipProps {
  title: string;
}

export function HelpTooltip(props: HelpTooltipProps): JSX.Element {
  const [tooltipOpen, setTooltipOpen] = React.useState(false);

  const handleTooltipClose = (): void => {
    setTooltipOpen(false);
  };

  const handleTooltipOpen = (): void => {
    setTooltipOpen(true);
  };

  return (
    <ClickAwayListener onClickAway={handleTooltipClose}>
    <div>
      <Tooltip
        title={props.title}
        PopperProps={{
          disablePortal: true,
        }}
        onClose={handleTooltipClose}
        open={tooltipOpen}
        disableFocusListener
        disableHoverListener
        disableTouchListener
        arrow
        slotProps={{
          popper: {
            modifiers: [
              {
                name: 'offset',
                options: {
                  offset: [0, -20],
                },
              },
            ],
          },
        }}
      >
        <IconButton onClick={handleTooltipOpen}><HelpIcon/></IconButton>
      </Tooltip>
    </div>
</ClickAwayListener>
  );
}
