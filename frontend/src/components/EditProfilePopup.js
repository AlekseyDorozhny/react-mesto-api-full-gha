import React from 'react';
import PopupWithForm from "./PopupWithForm.js";
import {CurrentUserContext} from '../contexts/CurrentUserContext.js'


function EditProfilePopup({isOpened, onClose, onUpdateUser}) {
  const [name, setName] = React.useState('')
  const [description, setDescription] = React.useState('')
  const currentUser = React.useContext(CurrentUserContext)

  React.useEffect(() => {
    if (currentUser) {
      setName(currentUser.name);
      setDescription(currentUser.about);
    }
  }, [currentUser, isOpened]);


  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({name, about: description,});
  }

  return(
    <PopupWithForm name = {'profile'}
    title = {'Редактировать профиль'}
    buttonText = {'Сохранить'}
    isOpened = {isOpened}
    onClose = {onClose}
    onSubmit ={handleSubmit}>
      <label className="popup__field" >
        <input type="text"
        className="popup__input popup__input_type_name"
        id="name-input"
        placeholder="Имя"
        name="profileNameForm"
        minLength="2"
        maxLength="40"
        required
        value={name || ''}
        onChange={handleNameChange}/>
        <span className="popup__error name-input-error"> </span>
      </label>
      <label className="popup__field">
        <input type="text"
        className="popup__input popup__input_type_activity"
        id="activity-input"
        placeholder="О себе"
        name="profileActivityForm"
        minLength="2"
        maxLength="200"
        required
        value={description || ''}
        onChange={handleDescriptionChange}/>
        <span className="popup__error activity-input-error"> </span>
      </label>
    </PopupWithForm>
  )
}

export default EditProfilePopup


