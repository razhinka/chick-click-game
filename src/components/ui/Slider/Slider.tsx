import React from 'react';
import './Slider.css';

interface Props {
   value: number,
   setValue: (value: number) => void,
   disabled: boolean,
   setDisabled: (disabled: boolean) => void,
   iconEnabled: any,
   iconDisabled: any, 
}

const Slider = (props: Props) => {
   const {value, setValue, disabled, setDisabled, iconEnabled, iconDisabled} = props;

   const handleValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = parseInt(event.target.value, 10);
      if (newValue === 0) {
         setDisabled(true);
         setValue(newValue)
      } else {
         setDisabled(false);
         setValue(newValue);
      }
   };

   const toggleEnabled = () => {
      let disable = !disabled;
      setDisabled(disable);
   };

   return (
      <div className='slider-container'>
         <img className='slider-icon'
            src={disabled ? iconDisabled : iconEnabled}
            alt={disabled ? 'Disabled' : 'Enabled'}
            onClick={toggleEnabled}
         />
         <input className='slider-range'
            type="range"
            min="0"
            max="100"
            value={disabled ? 0 : value}
            onChange={handleValueChange}
         />
      </div>
   );
} 

export default Slider;
