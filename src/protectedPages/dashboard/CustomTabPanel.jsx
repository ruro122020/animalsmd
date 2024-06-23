import PropTypes from 'prop-types';

const CustomTabPanel = (props) => {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
      className='COOOOOOOOMPONENTCUSTOMTABPANEL'
    >
      {value === index &&
        <div className='THE HIDDEN DIIIIVVVV!!!!' >
          {children}
        </div>}
    </div >
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

export default CustomTabPanel;