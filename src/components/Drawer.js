import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import Typography from 'material-ui/styles/typography';

const useStyles = makeStyles(theme => ({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
    padding: '20px',
    display: 'block',
  },
}));

export default function DirectionDrawer({ direct, title, children }) {
  const classes = useStyles();

  const [state, setState] = React.useState(false);

  const toggleDrawer = (side, open) => event => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setState(open);
  };

  const fullList = side => (
    <div
      className={classes.fullList}
      role="presentation"
      onClick={toggleDrawer(side, false)}
      onKeyDown={toggleDrawer(side, false)}
    >
      <div style={{ display: 'block', overflow: 'hidden' }}>
        <span style={{ float: 'left', paddingTop: '12px', fontSize: '18px' }}>
          {title}
        </span>
        <IconButton
          style={{ float: 'right' }}
          onClick={toggleDrawer(side, false)}
        >
          <CloseIcon />
        </IconButton>
      </div>
      <div>{children}</div>
    </div>
  );

  return (
    <div>
      <Button onClick={toggleDrawer(`${direct}`, true)}>
        <MenuIcon />
      </Button>
      <Drawer
        anchor={direct}
        open={state}
        onClose={toggleDrawer(`${direct}`, false)}
      >
        {fullList(direct)}
      </Drawer>
    </div>
  );
}
