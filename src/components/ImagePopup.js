import React from 'react';

function ImagePopup(props) {

    return (
    <div className={`pop-up pop-up_img ${props.card.link && 'pop-up_opened'}`}>
      <div className="pop-up__container pop-up__container_image">
        <img className="image" src={`${props.card.link}`} alt={`${props.card.name}`}/>
        <p className="title">{props.card.name}</p>
        <button onMouseUp={props.onClose} className="pop-up__exit pop-up__exit_img" type="button" aria-label="Закрыть"></button>
      </div>
      
    </div>
    )
    
}

export default ImagePopup