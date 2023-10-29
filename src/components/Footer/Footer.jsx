import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <h3 className="footer__title">
        Учебный проект Яндекс.Практикум х BeatFilm.
      </h3>
      <div className="footer__container">
        <p className="footer__date">{new Date().getFullYear()}</p>
        <nav className="footer__nav">
          <div className="footer__link">Яндекс.Практикум</div>
          <div className="footer__link">Github</div>
        </nav>
      </div>
    </footer>
  )
}

export default Footer;