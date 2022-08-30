import React from "react";

function ImagePopup(props) {
  return (
    <div className={`popup_picture popup_type_open-picture ${props.card.link && "popup_opened"}`}>
      <div className="popup__picture-container">
        <button type="button" aria-label="Закрыть" className="popup__btn-close popup__btn-close_open-picture" onClick={props.onClose}> </button>
        <img src={props.card.link} className="popup__picture" alt={props.card.name} />
        <h3 className="popup__subtitle-picture">{props.card.name}</h3>
      </div>
    </div>

  );
}

export default ImagePopup;