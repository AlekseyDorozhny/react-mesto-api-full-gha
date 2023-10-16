function PopupWithForm({name, title, buttonText, children, isOpened, onClose, onSubmit}) {
  return (
      <div className={isOpened ? `popup_opened popup popup_type_${name}` : ` popup popup_type_${name}`}>
        <div className="popup__container">
          <button onClick={() => {onClose()}}
          type="button"
          className={`popup__close-button popup__close-button_area_${name}`}
          aria-label={`закрыть редактирование ${name}`}></button>
          <form className={`popup__form popup__form_type_${name}`}
          name={`${name}Form`}
          onSubmit={onSubmit}>
            <h2 className="popup__heading">{`${title}`}</h2>
            {children}
            <button type="submit"
          className={`popup__save-button popup__save-button_area_${name}`}
          aria-label={`сохранить ${name}`}>{`${buttonText}`}</button>
          </form>
        </div>
      </div>
  )
}

export default PopupWithForm;



