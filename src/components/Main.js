import React from 'react';

import Card from './Card';

import {CurrentUserContext} from '../context/CurrentUserContext';

function Main(props) {
  const currentUser = React.useContext(CurrentUserContext);
    return (
      <main className="main">
        <section className="profile">
          <div  className="profile__avatarShadow">
            <img onMouseUp={props.onEditAvatar}  className="profile__avatar" src={currentUser.avatar} alt="аватар"/>
          </div>
          <div className="profile__info">
            <div className="profile__info-text">
              <h1 className="profile__name">{currentUser.name}</h1>
              <p className="profile__subname">{currentUser.about}</p>
            </div>
            <button onMouseUp={props.onEditProfile}  className="profile__edit-button" type="button" aria-label="Изменить"></button>
          </div>
          <button onMouseUp={props.onAddPlace} className="profile__add-button" type="button" aria-label="Создать"></button>
        </section>
        <section className="elements">
        {props.cards.map(card =>
          <Card
            del={props.popupDelete}
            key={card._id}
            card={card}
            onDeleteCard={props.onDeleteCard}
            onCardClick={props.onCardClick}
            onCardLike={props.onCardLike}
            onCardDelete={props.onCardDelete}
          />
        )}
        </section>
      </main>
    )
}

export default Main