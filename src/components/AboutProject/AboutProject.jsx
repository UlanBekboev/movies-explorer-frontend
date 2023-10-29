import './AboutProject.css';

function AboutProject() {
  return (
    <section className="about-project" id="about-project">
      <h2 className="about-project__title">
        О проекте
      </h2>
      <ul className="about-project__content">
        <li className="about-project__description">
          <h3 className="about-project__subtitle">
            Дипломный проект включал 5 этапов
          </h3>
          <p className="about-project__text">
            Составление плана, работу над бэкендом, вёрстку, добавление
            функциональности и финальные доработки.
          </p>
        </li>
        <li className="about-project__description">
          <h3 className="about-project__subtitle">
            На выполнение диплома ушло 5 недель
          </h3>
          <p className="about-project__text">
            У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать,
            чтобы успешно защититься.
          </p>
        </li>
      </ul>
      <ul className="about-project__container">
        <li className="about-project__timeline">
          <h4 className="about-project__timeline-title">
            1 неделя
          </h4>
          <p className="about-project__text">
            Back-end
          </p>
        </li>
        <li className="about-project__timeline">
          <h4 className="about-project__timeline-title about-project__timeline-title_level-2">
            4 недели
          </h4>
          <p className="about-project__text">
            Front-end
          </p>
        </li>
      </ul>
    </section>
  )
}

export default AboutProject;