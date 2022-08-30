import React from "react";
import PopupWithForm from './PopupWithForm'

function AddPlacePopup(props) {

  const [placeName, setPlaceName] = React.useState('');
  const [placeLink, setPlaceLink] = React.useState('');

  function handlePlaceLinkAdd(e) {
    setPlaceLink(e.target.value);
  }

  function handlePlaceNameAdd(e) {
    setPlaceName(e.target.value);
  }

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();
    // Передаём значения управляемых компонентов во внешний обработчик
    props.onAddPlace({
      name: placeName,
      link: placeLink
    })
  }

  return (
    <PopupWithForm
      name='add-picture'
      title='Новое место'
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      formName='Форма добавления карточки' >
      <input onChange={handlePlaceNameAdd} value={placeName} id="img" name="name" required type="text" placeholder="Название" className="popup__input popup__input_type_place-name" minLength="2" maxLength="30" />
      <span id="error-img" className="popup__input-error"></span>
      <input value={placeLink} onChange={handlePlaceLinkAdd} id="url" name="link" required type="url" placeholder="Ссылка на картинку" className="popup__input popup__input_type_place-picture" />
      <span id="error-img" className="popup__input-error"></span>
    </PopupWithForm>
  )
}

export default AddPlacePopup;