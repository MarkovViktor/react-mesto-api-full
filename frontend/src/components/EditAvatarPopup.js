import React from "react";
import PopupWithForm from './PopupWithForm'

function EditAvatarPopup(props) {

  const avatarRef = React.useRef();

  React.useEffect(() => {
    avatarRef.current.value = '';
  })

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateAvatar({
      avatar: avatarRef.current.value
    });
  }

  return (
    <PopupWithForm
      name='edit-avatar'
      title='Обновить аватар'
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      formName='Форма изменения аватара'>
      <input id="avatar" name="name" ref={avatarRef} required type="url" placeholder="Ссылка на аватар" className="popup__input popup__input_type_url" />
      <span id="error-avatar" className="popup__input-error"></span>
    </PopupWithForm>
  )
}

export default EditAvatarPopup;