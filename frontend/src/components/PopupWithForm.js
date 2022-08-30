import React from "react";

function PopupWithForm(props) {
  return (
    <div className={`popup popup_type_${props.name} ${props.isOpen && "popup_opened"}`}  >
      <div className="popup__container">
        <button onClick={props.onClose} type="button" aria-label="Закрыть" className={`popup__btn-close popup__close_type_${props.name}`}></button>
        <form name={props.formName} onSubmit={props.onSubmit} className={`popup__form popup__form_${props.name}`} noValidate>
          <h3 className="popup__title"> {props.title} </h3>{props.children}
          <button type="submit" className={`popup__btn-save popup__btn-save_${props.name}`}
            value="Сохранить">Сохранить</button>
        </form>
      </div>
    </div>

  );
}

export default PopupWithForm;