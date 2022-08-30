import React from "react";
import CurrentUserContext from '../contexts/CurrentUserContext';
import Card from "./Card";

function Main(props) {
  const CurrentUser = React.useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <button className="profile__avatar-button" onClick={props.onEditAvatar}>
          <img className="profile__avatar" src={CurrentUser.avatar} alt="Аватар" />
        </button>
        <h1 className="profile__user-name">{CurrentUser.name}</h1>
        <p className="profile__user-job">{CurrentUser.about}</p>
        <button className="profile__edit-button" onClick={props.onEditProfile} type="button" aria-label="изменить профиль" />
        <button className="profile__add-button" onClick={props.onAddPlace} type="button" aria-label="добавить место" />
      </section>
      <section className="places">
        {props.cards.map(card => ( <Card
          card={card}
          key={card._id}
          onCardLike={props.handleCardLike}
          onCardClick={props.onCardClick}
          onCardDelete={props.handleCardDelete}
        />))}
      </section>
    </main>
  )
}
export default Main;