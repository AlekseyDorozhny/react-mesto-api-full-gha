import React from 'react';
import PopupWithForm from "./PopupWithForm.js";


function AddPlacePopup({isOpened, onClose, onAddCard}) {

  const [newCardName, setNewCardName] = React.useState('')
  const [newCardLink, setNewCardLink] = React.useState('')

  function handleSubmit(e) {
    e.preventDefault();
    const link = newCardLink;
    const name = newCardName;
    onAddCard({link, name});
  }

  function handleCardName(e) {
    setNewCardName(e.target.value);
  }

  function handleCardLink(e) {
    setNewCardLink(e.target.value);
  }

  React.useEffect(() => {
    setNewCardName('')
    setNewCardLink('')
  }, [isOpened]);

  return(
    <PopupWithForm name = {'add-card'}
        title = {'Новое место'}
        buttonText = {'Создать'}
        isOpened = {isOpened}
        onClose = {onClose}
        onSubmit= {handleSubmit}>
          <label className="popup__field">
            <input type="text"
            className="popup__input popup__input_type_card-name"
            id="cardName-input"
            placeholder="Название"
            name="cardNameForm"
            minLength="2"
            maxLength="30"
            required
            value={newCardName}
            onChange={handleCardName}/>
            <span className="popup__error cardName-input-error"></span>
          </label>
          <label className="popup__field">
            <input type="url"
            className="popup__input popup__input_type_card-Src"
            id="cardSource-input"
            placeholder="Ссылка на картинку"
            name="cardSrcForm"
            required
            value={newCardLink}
            onChange={handleCardLink}/>
            <span className="popup__error cardSource-input-error"></span>
          </label>
        </PopupWithForm>
  )
}

export default AddPlacePopup
