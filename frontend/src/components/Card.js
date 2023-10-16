import React from 'react';
import {CurrentUserContext} from '../contexts/CurrentUserContext.js'


function Card({likes, _id, name, link, owner, onCardClick, handleDeleteClick, onCardLike, onCardDelete}) {
  const currentUser = React.useContext(CurrentUserContext)

  const likeCounter = likes.length;
  const isOwn = owner._id === currentUser._id;

  const isLiked = likes.some(i => i._id === currentUser._id);

  const cardLikeButtonClassName = (
    `element__like ${isLiked && 'element__like_status_active'}`
  );

  function handleClick() {
    onCardClick({name, link});
  }

  function handleCardLike() {
    onCardLike({likes, _id, currentUser})
  }

  function handleCardDelete() {
    onCardDelete(_id)
  }

  return(
    <article className="element">
      <div className="element__image-container">
        <img className="element__image"
        src = {link}
        alt={`Изображение добавленное пользователем: Название "${name}"`}
        onClick ={handleClick}/>
        {isOwn && <div className="element__trash"
        onClick={handleCardDelete}></div>}
      </div>
      <div className="element__plank">
        <h2 className="element__name">{name}</h2>
        <div className="element__like-container">
          <button
          className={cardLikeButtonClassName}
          type="button"
          aria-label="лайк"
          onClick={handleCardLike}></button>
          <p className="element__like-counter">{likeCounter}</p>
        </div>
      </div>
    </article>
  )
}
export default Card;
