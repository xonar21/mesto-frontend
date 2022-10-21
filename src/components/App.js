import React from 'react';
import api from '../utils/api';
import auth from './auth';
import ProtectedRoute from './ProtectedRoute';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import Login from './Login';
import Register from './Register';
import InfoTooltip from './InfoTooltip';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import DeleteCardPopup from './DeleteCardPopup';
import {CurrentUserContext} from '../context/CurrentUserContext';
import { useHistory, Route, Switch, Redirect, Link } from 'react-router-dom';
import logoSuc from '../images/successful.svg';
import logoBad from '../images/bad.svg';

function App() {
  const[currentUser, setCurrentUser] = React.useState("");
  const[isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false);
  const[isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
  const[isDeletePlacePopupOpen, setDeletePlacePopupOpen] = React.useState(false);
  const[isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
  const[isSuccessfulPopupOpen, setIsSuccessfulPopupOpen] = React.useState(false);
  const[badLoginPopupOpen, setBadLoginPopupOpen] = React.useState(false);
  const[selectedCard,setSelectedCard] = React.useState({});
  const[cards,setCards] = React.useState([ ]);
  const[cardDelete,setCardDelete] = React.useState({});
  const[saveValue,setSaveValue] = React.useState(false);
  const[loggedIn,setLoggedIn] = React.useState(false);
  const[userEmail,setUserEmail] = React.useState(' ');
  const history = useHistory();
  function getToken() {
    return localStorage.getItem("jwt");
  }

  React.useEffect(() => {
    tokenCheck();
  }, []);
  
  function tokenCheck() {
    
    const jwt = getToken();
    console.log(jwt)
    if (jwt) {
      Promise.all([api.getUserInformation(jwt), api.getCardsFromServer(jwt)])
        .then(([userInfo, initialCards]) => {
          setCurrentUser(userInfo);
          setCards(initialCards);
          setLoggedIn(true);
          history.push("/");
        })
        .catch((err) => {
          console.log(err.message);
        });
      auth.tokenCheck(jwt)
        .then((res) => { 
          setUserEmail(res.email)
          setLoggedIn(true)
        })
        .catch((err) => console.log(err))  
    }
  }

  function closeAllPopups() {
    setEditAvatarPopupOpen(false);
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setDeletePlacePopupOpen(false);
    setIsSuccessfulPopupOpen(false);
    setBadLoginPopupOpen(false);
    setSelectedCard({});
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true);
  }

  function handleDeletePlaceClick(card) {
    setCardDelete(card);
    setDeletePlacePopupOpen(true);
  }

  function handleCardLike(card) {
    

    const isLiked = card.likes.some(i => i === currentUser._id);

    const changeLike = isLiked ? api.unlikeCard(card._id) : api.likeCard(card._id)
    changeLike.then((newCard) => {
      const newCards = cards.map((c) => c._id === card._id ? newCard : c);
      setCards(newCards);
    })
    .catch(error => console.log(error));
  }

  function handleCardDelete(evt) {
    setSaveValue(true);
    const jwt = getToken();
    evt.preventDefault();
    api.delCardFromServer(cardDelete._id,jwt)
      .then(() => {
        const newCards = cards.filter((elem) => elem !== cardDelete);
        setCards(newCards);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setSaveValue(false);
      })
  }

  function handleUpdateUser(res) {
    setSaveValue(true);
    const jwt = getToken();
    api.pathEditProfile(res,jwt)
      .then((res) => {
        setCurrentUser(res.data);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setSaveValue(false);
      })
  }

  function handleUpdateAvatar(res) {
    setSaveValue(true);
    const jwt = getToken();
    api.patchAvatar(res,jwt)
      .then((res) => {
        setCurrentUser(res.data);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setSaveValue(false);
      })
  }

  function handleUpdateCards(res) {
    
    setSaveValue(true);
    const jwt = getToken();
    api.postCard(res,jwt)
      .then((card) => {
        console.log(card)
        setCards([card, ...cards]); 
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setSaveValue(false);
      })
  }

  function handleRegistrationUser(res) {
    auth.registrationUser(res)
      .then((res) => {
        history.push('./sign-in')
        setIsSuccessfulPopupOpen(true)
      })
      .catch((err) => {
        if(err === 400) {
          setBadLoginPopupOpen(true)
          console.log('Пользователь с таким email уже зарегистрирован')
        }
      })
  }

  function handleAuthorizationUser(res) {
    auth.authorizationUser(res)
      .then((res) => {
        history.push('./')
        setLoggedIn(true)
        localStorage.setItem('jwt',res.token)
        tokenCheck();
      })
      .catch((err) => {
        if(err === 401) {
          setBadLoginPopupOpen(true)
          console.log('Некорректный пароль или email')
        }
      })
     
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
        <div className="page">
        <Header user={userEmail} log={loggedIn} set={setLoggedIn}/> 
          <Switch>
          
          <ProtectedRoute
            path="/"
            loggedIn={loggedIn}
            exact
          >       
            <Main 
              popupDelete={handleDeletePlaceClick} 
              cards={cards} 
              onCardLike={handleCardLike} 
              onCardDelete={handleCardDelete} 
              onDeleteCard={handleDeletePlaceClick} 
              onCardClick={handleCardClick} 
              onEditProfile={handleEditProfileClick} 
              onAddPlace={handleAddPlaceClick} 
              onEditAvatar={handleEditAvatarClick}/
            > 
            {/* форма редактирования профиля */}
            <EditProfilePopup 
            saveValue={saveValue}
            onUpdateUser={handleUpdateUser} 
            isOpen={isEditProfilePopupOpen} 
            onClose={closeAllPopups} 
            /> 
            {/* форма создания карточки */}
            <AddPlacePopup 
            saveValue={saveValue} 
            onUpdateCards={handleUpdateCards} 
            isOpen={isAddPlacePopupOpen} 
            onClose={closeAllPopups} 
            />
            {/* форма редактирования аватара */}
            <EditAvatarPopup 
            saveValue={saveValue}  
            onUpdateAvatar={handleUpdateAvatar} 
            isOpen={isEditAvatarPopupOpen} 
            onClose={closeAllPopups} 
            />
            {/* форма удаления карточки*/}
            <DeleteCardPopup 
            saveValue={saveValue} 
            onSubmit={handleCardDelete} 
            isOpen={isDeletePlacePopupOpen} 
            onClose={closeAllPopups} 
            />
            <ImagePopup 
            card={selectedCard}
            onClose = {closeAllPopups}
            /> 
          </ProtectedRoute>
          
            <Route path="/sign-up">
              {loggedIn ? <Redirect to="/" />  : <Redirect to="/sign-in" />}
              <Register reg={handleRegistrationUser} />
              <InfoTooltip 
              onClose={closeAllPopups} 
              isOpen={badLoginPopupOpen} 
              text='Что-то пошло не так! Попробуйте ещё раз.' 
              logo={logoBad} />
              <InfoTooltip 
              onClose={closeAllPopups} 
              isOpen={isSuccessfulPopupOpen} 
              text='Вы успешно зарегистрировались!' 
              logo={logoSuc} />
            </Route>
            <Route path="/sign-in">
              {loggedIn ? <Redirect to="/" />  : <Redirect to="/sign-in" />}  
              <Login auth={handleAuthorizationUser} />
              <InfoTooltip 
              onClose={closeAllPopups} 
              isOpen={isSuccessfulPopupOpen} 
              text='Вы успешно зарегистрировались!' 
              logo={logoSuc} />
              <InfoTooltip 
              onClose={closeAllPopups} 
              isOpen={badLoginPopupOpen} 
              text='Что-то пошло не так! Попробуйте ещё раз.' 
              logo={logoBad} />
            </Route>
            <Route path="*">
              {loggedIn ? <Redirect to="/" />  : <Redirect to="/sign-in" />}
            </Route>
          </Switch>
          <Footer />
        </div>
    </CurrentUserContext.Provider>
  );
}
export default App;
