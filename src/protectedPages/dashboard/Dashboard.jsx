import React, { useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Pets from './Pets';
import EditForm from '../../protectedPages/dashboard/EditForm';
import CustomTabPanel from './CustomTabPanel'

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const BasicTabs = () => {
  const [value, setValue] = React.useState(0);
  const [showEditForm, setShowEditForm] = useState(false)
  const [pet, setPet] = useState(null)

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Pets" {...a11yProps(0)} />
          {/* <Tab label="Medications" {...a11yProps(1)} /> */}
          {/* <Tab label="Item Three" {...a11yProps(2)} /> */}
        </Tabs>
      </Box>

      <CustomTabPanel value={value} index={0} >
        {showEditForm && <EditForm pet={pet} setShowEditForm={setShowEditForm} setPet={setPet} />}
        <Pets setShowEditForm={setShowEditForm} setPet={setPet} updatedPet={pet} />
      </CustomTabPanel>
      {/* <CustomTabPanel value={value} index={1}>
        Medications
      </CustomTabPanel> */}
    </Box>
  );
}


export default BasicTabs