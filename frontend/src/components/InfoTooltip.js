import React from "react";

function InfoTooltip(props) {
  return (
    <div className={`popup popup_type_${props.name} ${props.isOpen && "popup_opened"}`}  >
      <div className="popup__container">
        <button onClick={props.onClose} type="button" aria-label="Закрыть" className={`popup__btn-close popup__close_type_${props.name}`}></button>
        <form onSubmit={props.onSubmit} name={props.formName} className={`popup__form form_type_${props.name}`} noValidate>
          <img className="popup__info_type_image" src={props.image} alt='Картинка' />
          <p className="popup__info_type_text">{props.text}</p>
        </form>
      </div>
    </div>
  )
};

export default InfoTooltip;