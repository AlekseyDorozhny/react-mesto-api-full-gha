import React from 'react';
import PopupWithForm from "./PopupWithForm.js";


function EditAvatarPopup({isOpened, onClose, onUpdateAvatar}) {
  const avatarRef = React.useRef();

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar(`${avatarRef.current.value}`);
  }

  return(
    <PopupWithForm name = {'avatar'}
    title = {'Обновить аватар'}
    buttonText = {'Сохранить'}
    isOpened = {isOpened}
    onClose = {onClose}
    onSubmit = {handleSubmit}
    >
      <label className="popup__field">
        <input type="url"
        className="popup__input popup__input_type_avatar-src"
        id="avatarSrc-input"
        placeholder="Ссылка на аватар"
        name="avatarSrcForm"
        required
        ref={avatarRef}
        defaultValue={''}/>
        <span className="popup__error avatarSrc-input-error"></span>
      </label>
    </PopupWithForm>
  )
}

export default EditAvatarPopup
