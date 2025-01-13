import React, { useState } from 'react';
import './WelcomePage.css';

interface Props {
   setName: (name: string) => void,
}


const WelcomePage = (props: Props) => {
   const {setName} = props;
   const [chickenName, setChickenName] = useState('');

   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
       setChickenName(e.target.value);
   };

   const handleSubmit = () => {
       if (chickenName.trim()) {
           setName(chickenName);
       }
   };

   return (
      <div className="name-input-container">
            <h1 className="title">Дайте имя вашей курице!</h1>
            <input
                type="text"
                value={chickenName}
                onChange={handleInputChange}
                placeholder="Введите имя курицы"
                className="name-input"
            />
            <button onClick={handleSubmit} className="submit-button">
                Подтвердить
            </button>
        </div>
   );
}

export default WelcomePage;
