import resOk from '../Images/registerCheck.png'
import resError from '../Images/registerError.png'



function InfoTooltip({name, isOpened, onClose, status}) {
 return (
  <div className={isOpened ? `popup_opened popup popup_type_${name}` : `popup popup_type_${name}`}>
    <div className="popup__container">
      <button onClick={onClose}
        type="button"
        className={`popup__close-button popup__close-button_area_${name}`}
        aria-label={`закрыть  ${name}`}></button>
      <img className="info-tooltip__image"
      // style={status? {backgroundImage: `url(${resOk})`} : {backgroundImage: `url(${resError})`}}
      src={status? resOk : resError}
      alt="Статус ответа"/>
      <p className="info-tooltip__massage">{status? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз.'}</p>
    </div>
  </div>
 )
}

export default InfoTooltip

