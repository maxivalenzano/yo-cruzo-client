import { useState } from 'react';

const useToggleMapsVisibility = () => {
  // maps will not be initially visible
  // set the initial value to true because this will be the value fo secureTextEntry prop
  const [mapsVisibility, setMapsVisibility] = useState(true);
  const [rightIcon, setRightIcon] = useState('location-on');

  // function that toggles maps visibility on a TextInput component on a maps field
  const handleMapsVisibility = () => {
    if (rightIcon === 'location-on') {
      setRightIcon('location-off');
      setMapsVisibility(!mapsVisibility);
    } else if (rightIcon === 'location-off') {
      setRightIcon('location-on');
      setMapsVisibility(!mapsVisibility);
    }
  };

  return {
    mapsVisibility,
    rightIcon,
    handleMapsVisibility,
  };
};

export default useToggleMapsVisibility;
