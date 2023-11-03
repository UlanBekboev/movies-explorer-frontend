import React, { useEffect } from "react";
import "./InfoTooltip.css";
import successIcon from "../../images/onSuccess.svg";
import unsuccessIcon from "../../images/unSuccess.svg";
import { useLocation } from "react-router-dom";

const InfoTooltip = ({ isOpen, onClose, onSuccess }) => {
  const { pathname } = useLocation();

  const handleOverlay = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const closeByEscape = (e) => {
    if (e.key === "Escape") {
      onClose();
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", closeByEscape);
      // Закрываем попап через 2 секунды
      /* const timeoutId = setTimeout(() => {
        onClose();
      }, 2000); */

      return () => {
        document.removeEventListener("keydown", closeByEscape);
        /* clearTimeout(timeoutId); */
      };
    }
  }, [isOpen]);

  return (
    <div
      className={`popup ${isOpen ? "popup_opened" : ""} popup_type_infoTool`}
      onClick={handleOverlay}
    >
      <div className={`popup__container popup__container_type_infoTool`}>
        <>
          <img
            src={onSuccess ? successIcon : unsuccessIcon}
            alt={onSuccess ? "Операция прошла успешно" : "Операция не прошла"}
            className="popup__signup-icon"
          />
          <h3 className="popup__signup-title">
            {onSuccess
              ? "Операция прошла успешно"
              : "Что-то пошло не так! Попробуйте ещё раз."}
          </h3>
        </>
        <button
          className="popup__close"
          type="button"
          onClick={onClose}
        ></button>
      </div>
    </div>
  );
};

export default InfoTooltip;
