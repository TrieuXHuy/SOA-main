import React from 'react';
import { AppBar, Tabs, Tab, Box, Toolbar, IconButton } from '@mui/material';

import {
  ArrowRightAlt as ArrowRight,
  Menu as MenuIcon,
} from '@mui/icons-material';

import useStyles from '../../styles';

//components
import Widget from '../../../Widget';
import { Typography, Link, Button } from '../../../Wrappers';
import Code from '../../../Code';

const WidgetPage = () => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const TabPanel = ({
    children,
    index,
    className = classes.tabPanel,
    value,
  }) => {
    if (index === value) {
      return <section className={className}>{children}</section>;
    }
    return null;
  };
  return (
    <Widget title={'Thanh tiêu đề (Header)'} inheritHeight disableWidgetMenu>
      <Typography variant={'body2'}>Thành phần thanh tiêu đề (Header) trên trang của bạn.</Typography>
      <Code>{`import { AppBar, Toolbar, IconButton } from '@mui/material'`}</Code>
      <AppBar position='static'>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label='typography size'
        >
          <Tab label='Ví dụ' />
          <Tab label='Mã nguồn' />
        </Tabs>
      </AppBar>
      <TabPanel index={0} value={value}>
        <AppBar position='static'>
          <Toolbar>
            <IconButton
              edge='start'
              className={classes.menuButton}
              color='inherit'
              aria-label='menu'
            >
              <MenuIcon />
            </IconButton>
            <Typography variant='h6' className={classes.title}>
              Tin tức
            </Typography>
            <Button color='inherit' style={{ marginLeft: 'auto' }}>
              Đăng nhập
            </Button>
          </Toolbar>
        </AppBar>
      </TabPanel>
      <TabPanel index={1} value={value}>
        <Code>{`
    <AppBar position="static">
    <Toolbar>
        <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
        </IconButton>
         <Typography variant="h6" className={classes.title}>
             Tin tức
         </Typography>
        <Button color="inherit" style={{marginLeft: 'auto'}}>Đăng nhập</Button>
    </Toolbar>
    </AppBar>
                `}</Code>
      </TabPanel>
      <Box mt={1}>
        <Link
          href={'https://material-ui.com/api/app-bar/'}
          color={'primary'}
          className={classes.link}
          variant={'h6'}
          target={'_blank'}
        >
          Các thuộc tính khác <ArrowRight />
        </Link>
      </Box>
    </Widget>
  );
};

export default WidgetPage;