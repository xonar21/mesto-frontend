import React from 'react';
import {CurrentUserContext} from '../context/CurrentUserContext';

function Card(props) {
    const currentUser = React.useContext(CurrentUserContext);
    
    const isOwn = props.card.owner === currentUser._id;
    
    const cardDeleteButtonClassName = (
      `element__delete-card ${isOwn ? 'element__delete-card_visible' : 'element__delete-card_hidden'}`
    ); 

    const isLiked = props.card.likes.some(i => i === currentUser._id);
    const cardLikeButtonClassName = `${isLiked ? 'element__like element__like_active' : 'element__like'}`; 
    
    function handleClick() {
      props.onCardClick(props.card); 
    } 

    function handleLikeClick() {
      props.onCardLike(props.card); 
    }
    
    function handleDeleteClick() {
      props.del(props.card);
    }

    return (
            <div className="element">
            <button onMouseUp={handleDeleteClick} className={cardDeleteButtonClassName}></button>
            <img  onMouseUp={handleClick} alt={props.card.name} src={props.card.link} className="element__image"/>
            <div className="element__group">
              <h2 className="element__title">{props.card.name}</h2>
              <div className="element__group-counts">
                <button onMouseUp={handleLikeClick} className={cardLikeButtonClassName} type="button" aria-label="Нравится"></button>
                <p className="element__like-count">{props.card.likes.length}</p>
              </div>
            </div>
          </div>   
    )


}

export default Card