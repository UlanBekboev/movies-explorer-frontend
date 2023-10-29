import './Portfolio.css';

function Portfolio() {
  return (
    <section className="portfolio">
      <h2 className="portfolio__title">
        Портфолио
      </h2>
      <ul className="portfolio__container">
        <li className="portfolio__item">
          <a className='portfolio__link'
             href='https://github.com/UlanBekboev/how-to-learn'
             target='_blank'
             rel='noreferrer'
          >
            Статичный сайт
          </a>
        </li>
        <li className="portfolio__item">
          <a
            className='portfolio__link'
            href='https://github.com/UlanBekboev/russian-travel'
            target='_blank'
            rel='noreferrer'
          >
            Адаптивный сайт
          </a>
        </li>
        <li className="portfolio__item">
          <a
            className='portfolio__link'
            href='https://github.com/UlanBekboev/react-mesto-api-full-gha'
            target='_blank'
            rel='noreferrer'
          >
            Одностраничное приложение
          </a>
        </li>
      </ul>
    </section>
  )
}

export default Portfolio;