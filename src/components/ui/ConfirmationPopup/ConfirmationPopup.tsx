import React from 'react';
import './ConfirmationPopup.css';

interface Props {
   isOpen: boolean;
   onConfirm: () => void;
   onCancel: () => void;
   message: string;
}

const ConfirmationPopup = (props: Props) => {
   const {isOpen, onConfirm, onCancel, message} = props; 
   if (!isOpen) return null; // Если диалог не открыт, ничего не рендерим

   return (
       <div className="confirmation-dialog-overlay">
           <div className="confirmation-dialog">
               <h3>Подтверждение действия</h3>
               <p>{message}</p>
               <div className="button-group">
                   <button className="confirm-button" onClick={onConfirm}>Удалить</button>
                   <button className="cancel-button" onClick={onCancel}>Отмена</button>
               </div>
           </div>
       </div>
   );
};


export default ConfirmationPopup;
