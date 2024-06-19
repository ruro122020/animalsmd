import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid'
import Pets from './Pets';
import EditForm from '../../protectedPages/dashboard/EditForm';

//This component is helping the bottom component render
function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index &&
        <Grid container columnGap={2} rowGap={2} sx={{ p: 2 }}>
          {children}
        </Grid>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

//This is the component being displayed
export default function BasicTabs() {
  const [value, setValue] = React.useState(0);
  const [showEditForm, setShowEditForm] = useState(false)
  const [pet, setPet] = useState(null)
  const form = useRef()

  const handleChange = (event, newValue) => {
    setValue(newValue);
  }

  //animation for this page is in useGSAP
  //refer to gsap docs for more info on dependencies https://gsap.com/resources/React/
  useGSAP(() => {
    if (form && form.current && !isLoading) {
      gsap.from(form.current, {
        duration: 1,
        opacity: 0,
        y: -40,
        stagger: 0.1,
        ease: "back.in"
      })
    }
  }, { dependencies: [form] }) //these dependencies are needed for when form and isLoading state changes

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Pets" {...a11yProps(0)} />
          <Tab label="Medications" {...a11yProps(1)} />
          {/* <Tab label="Item Three" {...a11yProps(2)} /> */}
        </Tabs>
      </Box>

      <CustomTabPanel value={value} index={0} >
        <div style={{ display: 'felx', flexDirection: 'column' }}>
          {showEditForm && <EditForm pet={pet} setShowEditForm={setShowEditForm} setPet={setPet} />}
          <Pets setShowEditForm={setShowEditForm} setPet={setPet} updatedPet={pet} />
        </div>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        Medications
      </CustomTabPanel>

    </Box>
  );
}
