import './InfoTool.css';

const InfoTool = ({ isOpen, onClose, message }) => {
  return (
    <div className={`popup ${isOpen && 'popup_opened'}`}>
      <div className="popup__container">
        <button type="button" className="popup__close" onClick={onClose} />
        <p>{JSON.stringify(message)}</p>
      </div>
    </div>
  );
};

export default InfoTool;