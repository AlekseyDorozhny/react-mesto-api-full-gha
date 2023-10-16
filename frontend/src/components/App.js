import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import React from "react";
import {Route, Routes, useNavigate} from 'react-router-dom';
import ImagePopup from './ImagePopup'
import api from '../utils/API.js'
import {CurrentUserContext} from '../contexts/CurrentUserContext.js';
import {CardsDataContext} from '../contexts/CardsDataContext.js';
import Login from './Login';
import Register from "./Register";
import InfoTooltip from "./InfoTooltip";
import authApi from "../utils/AuthAPU";
import ProtectedRouteElement from "./ProtectedRoute";

function App() {
  const [isEditProfilePopupOpen, onEditProfile] = React.useState(false);
  const [isAddPlacePopupOpen, onAddPlace] = React.useState(false);
  const [isEditAvatarPopupOpen, onEditAvatar] = React.useState(false);
  const [isInfoTooltipPopupOpen, onAuth] = React.useState(false)
  const [selectedCard, handleCardClick] = React.useState({name: '', link: ''});
  const [currentUser, getUserInfo] = React.useState({})
  const [cards, getCardsData] = React.useState([])
  const [loggedIn, changeLoggedStatus] = React.useState(false)
  const [registerStatus, changeRegisterStatus] = React.useState(false)
  const [activeEmail, changeActiveEmail] = React.useState('')

  const navigate = useNavigate();

  React.useEffect(() => {
    tokenCheck();
  }, [])

  React.useEffect(() => {
    if (loggedIn){
      Promise.all([api.getInitialCards(), api.getUserInfo()])
    .then((res)=> {
      getCardsData(res[0])
      getUserInfo(res[1])
      })
      .catch((err) => {console.log(err)})
    } else {
      return
    }
  }, [loggedIn])

  function tokenCheck() {
    if (document.cookie.indexOf("jwt") == 0){
      authApi.tokenCheck()
      .then((res)=> {
        changeActiveEmail(res.email)
        changeLoggedStatus(true)
        navigate('/', {replace: true})
      })
        .catch((err) => {console.log(err)})
    }
  }

  function closeAllPopups() {
    onEditProfile(false)
    onAddPlace(false)
    onEditAvatar(false)
    handleCardClick({name: '', link: ''})
    onAuth(false)
  }

  function handleCardLike({likes, _id, currentUser}) {
    console.log('лайкаю')
    const isLiked = likes.some(i => i === currentUser._id);
    api.likeHendler(_id, !isLiked).then((newCard) => {
      getCardsData((state) => state.map((c) => c._id === _id ? newCard : c));
    })
    .catch((err) => {console.log(err)})
  }

  function handleCardDelete(id) {
    const cardsDataClone = cards.filter((e) => {
      if (e._id !== id) {
        return true;
      }
      return false;
    }).map(e => {return e})
    api.deleteCard(id).then(() => {
      getCardsData(cardsDataClone)
    })
    .catch((err) => {console.log(err)})
  }

  function handleUpdateUser({name, about}) {
    api.sendUserInfo(name, about).then((res) => {
      getUserInfo(res);
      closeAllPopups();
    })
    .catch((err) => {console.log(err)})
  }

  function handleUpdateAvatar(url) {
    api.sendUserAvatar(url).then((res) => {
      getUserInfo(res);
      closeAllPopups();
    })
    .catch((err) => {console.log(err)})
  }

  function handleAddCard({link, name}) {
    api.sendCard(link, name).then((newCard) => {
      getCardsData([newCard, ...cards])
      closeAllPopups();
    })
    .catch((err) => {console.log(err)})
  }

  function handleRegisterSubmit({email, password}) {
    authApi.register({email, password}).then(() => {
      changeRegisterStatus(true);
      onAuth(true);
      navigate('/sign-in', { replace: true });
    })
    .catch((err) => {
      console.log(err);
      changeRegisterStatus(false);
      onAuth(true)})
  }

  function handleLoginSubmit({email, password}) {
    authApi.authorize({email, password}).then((res) =>{
      if (res){
        console.log('захожу')
        changeLoggedStatus(true);
        navigate('/', {replace: true});
        tokenCheck()
      }
    })
    .catch((err) => {
      console.log(err)
    })
  }

  function handleLogoutSubmit() {
    console.log('ухожу')
    if (document.cookie.indexOf("jwt") == 0) {
      document.cookie = "jwt; expires=-1";
      navigate('/sign-in', { replace: true });
      changeLoggedStatus(false)
    }
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <CardsDataContext.Provider value={cards}>
          <Header
          loggedIn = {loggedIn}
          email= {activeEmail}
          onLogout = {handleLogoutSubmit}
          />
          <Routes>
            <Route path="/" element={<ProtectedRouteElement
            element={Main}
            loggedIn={loggedIn}
            onEditProfile = {onEditProfile}
            onAddPlace = {onAddPlace}
            onEditAvatar = {onEditAvatar}
            onCardClick = {handleCardClick}
            onCardLike = {handleCardLike}
            onCardDelete = {handleCardDelete}
            cards = {cards}/>}
            />
            <Route path="/sign-up"
            element={<Register
            onSubmit={handleRegisterSubmit}
            />}/>
            <Route path="/sign-in"
            element={<Login
              onSubmit={handleLoginSubmit}
            />}/>
          </Routes>
          <Footer />
          <AddPlacePopup
            isOpened={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddCard={handleAddCard}/>
          <PopupWithForm
          name = {'confirm'}
          title = {'Вы уверены?'}
          buttonText = {'Да'}
          onClose = {closeAllPopups}>
          </PopupWithForm>
          <EditProfilePopup
          isOpened={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}/>
          <EditAvatarPopup
          isOpened={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}/>
          <ImagePopup
          card = {selectedCard}
          onClose = {closeAllPopups}
          />
          <InfoTooltip
          name={'info-tooltip'}
          isOpened={isInfoTooltipPopupOpen}
          onClose={closeAllPopups}
          status={registerStatus}
          />

      </CardsDataContext.Provider>
    </CurrentUserContext.Provider>

  );
}

export default App;





