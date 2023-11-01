import "./InfoTooltip.css";

function InfoTool(props) {
  return (
    <section className={`popup ${props.isOpen && "popup_opened"}`}>
      <div className="popup__container">
        <button
          className="popup__button-close"
          type="button"
          onClick={props.onClose}
        />
        <p className="popup__text">
          {props.text}
        </p>
      </div>
    </section>
  );
}

export default InfoTool;