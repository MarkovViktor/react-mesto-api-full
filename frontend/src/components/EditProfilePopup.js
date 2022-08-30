import React from "react";
import PopupWithForm from './PopupWithForm'
import CurrentUserContext from '../contexts/CurrentUserContext'

function EditProfilePopup(props) {
  // Подписка на контекст
  const currentUser = React.useContext(CurrentUserContext);
  // После загрузки текущего пользователя из API
  // его данные будут использованы в управляемых компонентах.
  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, props.isOpen]);

  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');

  function handleAboutChange(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();

    // Передаём значения управляемых компонентов во внешний обработчик
    props.onUpdateUser({
      name,
      about: description,
    });
  }

  function handleNameChange(e) {
    setName(e.target.value);
  }

  return (
    <PopupWithForm
      name='edit-profile'
      title='Редактировать профиль'
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      formName='Форма изменения имени'>
      <input onChange={handleNameChange} value={name || ''} id="name" name="name" required type="text" placeholder="Имя" className="popup__input popup__input_type_user-name" minLength="2" maxLength="40" />
      <span id="error-name" className="popup__input-error"></span>
      <input onChange={handleAboutChange} value={description || ''} id="about" name="about" required type="text" placeholder="О себе" className="popup__input popup__input_type_user-job" minLength="2"
        maxLength="200" />
      <span id="error-about" className="popup__input-error"></span>
    </PopupWithForm>
  )
}

export default EditProfilePopup;