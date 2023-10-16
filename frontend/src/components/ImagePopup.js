function ImagePopup({card, onClose}) {

  return (
    <div className={(card.link !== '') ? `popup_opened popup popup_type_image` : ` popup popup_type_image`}>
      <div className="image-popup">
        <button type="button"
        onClick={() => {onClose()}}
        className="popup__close-button popup__close-button_area_image"
        aria-label="закрыть просмотр карточки"></button>
        <img className="image-popup__image"
        src ={(card !== "") ? card.link : ''}
        alt={`Изображение добавленное пользователем: Название "${card.name}"`}/>
        <h2 className="image-popup__name">{card.name}</h2>
      </div>
    </div>
  )
}


export default ImagePopup;



