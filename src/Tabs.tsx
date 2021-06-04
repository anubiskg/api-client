import React, { useEffect, useState } from 'react';
import Select from './Select';
import axios from 'axios';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, Theme, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import ReactJson from 'react-json-view';

interface TabPanelProps {
  children?: React.ReactNode;
  dir?: string;
  index: any;
  value: any;
}


function TabPanel(props: TabPanelProps) {
  const { children, value, index } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: any) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: 600,
  },
}));

export default function FullWidthTabs() {

  const baseUrl = "https://localhost:5001/api/newsweather/history";
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = useState(0);
  const [dataHistory, setDataHistory] = useState([]);

  const peticionGetHistory = async () => {
    await axios.get(baseUrl)
      .then(response => {
        setDataHistory(response.data);
      }).catch(error => {
        setDataHistory(error.data);
      })
  }
  useEffect(() => {
    peticionGetHistory();
  }, [])

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
    peticionGetHistory();
  };

  const handleChangeIndex = (index: number) => {
    setValue(index);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <div>
          <h6>CHECK THE NEWS AND WEATHER BY A SPECIFIED COUNTRY</h6>
          <hr></hr>
        </div>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab label="Check country" {...a11yProps(0)} />
          <Tab label="Check History" {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
          <Select />
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          <div id="global">
            <div id="text">
              <ReactJson src={dataHistory} theme="monokai" collapsed={true} />
            </div>
          </div>
        </TabPanel>
      </SwipeableViews>
    </div>
  );
}
