import React from 'react';
import PopupWithForm from './PopupWithForm';


function InfoTooltip(props) {
    return (
        <PopupWithForm
            src = {props.logo}
            onClose = {props.onClose}
            isOpen = {props.isOpen}
            display = {'pop-up__noneDisplay'}
            text ={props.text}
            >     
        </PopupWithForm>
    )
    
}

export default InfoTooltip