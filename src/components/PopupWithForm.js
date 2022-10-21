import React from 'react';
import { useLocation } from "react-router-dom";
function PopupWithForm(props) {
  const loc = useLocation()
    return (
    <div className={`pop-up pop-up_${props.name} ${props.isOpen ? 'pop-up_opened' : ""}`}>
      <div className="pop-up__container"> 
        <form 
        onSubmit={props.onSubmit} 
        className={`form form_${props.name}`} 
        name={props.name}>
          <h2 className={`form__title ${loc.pathname === '/' ? '' : props.display}`}>{props.title}</h2>
              {props.children}
          <button 
          disabled={props.isDisabled} 
          onClick={props.onClose} 
          className={`form__button form__button-edit ${loc.pathname === '/' ? '' : props.display}`} 
          type="submit">{props.saveValue ? props.buttonName+'...' : props.buttonName}
          </button>
          <img 
          src={props.src} 
          className={`pop-up__logo ${loc.pathname === '/' ? props.display : ''}`}>
          </img>
          <p className={`pop-up__title ${loc.pathname === '/' ? props.display : ''}`}>{props.text}</p>
        </form>
        <button 
        onMouseUp={props.onClose} 
        className="pop-up__exit pop-up__exit_profile" 
        type="button" 
        aria-label="Закрыть">
          </button>
      </div>
    </div>
    ) 
}
export default PopupWithForm