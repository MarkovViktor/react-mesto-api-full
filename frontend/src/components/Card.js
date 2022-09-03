import React from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";

function Card(props) {
  const currentUser = React.useContext(CurrentUserContext);
  // Определяем, являемся ли мы владельцем текущей карточки
  const isOwn = props.card.owner._id === currentUser._id;
  // Создаём переменную, которую после зададим в `className` для кнопки удаления
  const cardDeleteButtonClassName = (
    `place__button_delete ${isOwn ? 'place__delete' : 'place__delete_type_hidden'}`
  );
  // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  const isLiked = props.card.likes.some(i => i._id === currentUser._id);
  // Создаём переменную, которую после зададим в `className` для кнопки лайка
  const cardLikeButtonClassName = `place__like ${isLiked ? 'place__like_type_active' : ''}`;

  function handleClick() {
    props.onCardClick(props.card);
  }
  function handleLikeClick() {
    props.onCardLike(props.card)
  }
  function handleDeleteClick() {
    props.onCardDelete(props.card)
  }

  return (
    <div className="place" >
      <img className="place__image place__picture_link" src={props.card.link} alt={props.card.name} onClick={handleClick} />
      <button type="button" aria-label="удалить" onClick={handleDeleteClick} className={cardDeleteButtonClassName}></button>
      <h2 className="place__title place__picture_name">{props.card.name}</h2>
      <button type="button" onClick={handleLikeClick} aria-label="поставить лайк" className={cardLikeButtonClassName}></button>
      <span className="place__like-count">{props.card.likes.length}</span>
    </div>
  );
}

export default Card;