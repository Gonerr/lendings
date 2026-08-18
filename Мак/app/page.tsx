"use client";

import { FormEvent, useEffect, useState } from "react";

const PHONE_DISPLAY = "+7 (903) 092-22-10";
const PHONE_LINK = "tel:+79030922210";
const EMAIL = "org.mak21@yandex.ru";

const directions = [
  {
    number: "01",
    title: "Тренажёрный зал",
    text: "Пространство для силовых и функциональных тренировок, кардионагрузки и самостоятельных занятий.",
    color: "red",
  },
  {
    number: "02",
    title: "Водная зона",
    text: "Бассейн для тренировок и восстановления, отдельные форматы для аквафитнеса и занятий с детьми.",
    color: "blue",
  },
  {
    number: "03",
    title: "Спортивные залы",
    text: "Площадки для групповых программ, игровых видов спорта и регулярной физической активности.",
    color: "green",
  },
];

const companyDetails = [
  ["Полное наименование", "ООО «МАК»"],
  ["Дата регистрации", "28 октября 2021 года"],
  ["ОГРН", "1217800168134"],
  ["ИНН / КПП", "7802917179 / 780201001"],
  ["Генеральный директор", "Белова Наталья Александровна"],
  //   ["Налоговый режим", "УСН / микропредприятие"],
];

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 12h14M14 7l5 5-5 5" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M6 6l12 12M18 6 6 18" />
    </svg>
  );
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [formOpen, setFormOpen] = useState(false);

  useEffect(() => {
    document.body.classList.toggle("modal-open", formOpen);
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setFormOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.classList.remove("modal-open");
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [formOpen]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") || "");
    const contact = String(data.get("contact") || "");
    const topic = String(data.get("topic") || "Общий вопрос");
    const message = String(data.get("message") || "");
    const subject = encodeURIComponent(`Обращение с сайта ООО «МАК»: ${topic}`);
    const body = encodeURIComponent(
      `Имя: ${name}\nКонтакт для ответа: ${contact}\nТема: ${topic}\n\nСообщение:\n${message}`
    );
    window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;
    setFormOpen(false);
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="ООО МАК — на главную">
          <span className="brand-mark" aria-hidden="true">
            <span />
          </span>
          <span className="brand-word">МАК</span>
          <span className="brand-caption">
            физкультурно-оздоровительный комплекс
          </span>
        </a>

        <button
          className="menu-toggle"
          type="button"
          aria-label="Открыть меню"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((value) => !value)}
        >
          <span />
          <span />
        </button>

        <nav
          className={menuOpen ? "nav nav-open" : "nav"}
          aria-label="Основная навигация"
        >
          <a href="#about" onClick={closeMenu}>
            О комплексе
          </a>
          <a href="#spaces" onClick={closeMenu}>
            Пространства
          </a>
          <a href="#company" onClick={closeMenu}>
            О компании
          </a>
          <a href="#contacts" onClick={closeMenu}>
            Контакты
          </a>
        </nav>

        <button
          className="header-contact"
          type="button"
          onClick={() => setFormOpen(true)}
        >
          Связаться
          <ArrowIcon />
        </button>
      </header>

      <section className="hero" id="top">
        <div className="hero-copy">
          <p className="eyebrow">Санкт-Петербург · Кустодиева, 7</p>
          <h1>
            Движение.
            <br />
            <span>Вода.</span>
            <br />
            Сила.
          </h1>
          <p className="hero-lead">
            Физкультурно-оздоровительный комплекс для регулярных тренировок,
            активного отдыха и хорошего самочувствия.
          </p>
          <div className="hero-actions">
            <button
              className="button button-red"
              type="button"
              onClick={() => setFormOpen(true)}
            >
              Задать вопрос
              <ArrowIcon />
            </button>
            <a className="text-link" href={PHONE_LINK}>
              {PHONE_DISPLAY}
            </a>
          </div>
        </div>

        <figure className="hero-media">
          <img
            src="/images/fitness24-gym.webp"
            alt="Просторный тренажёрный зал FITNESS 24 на улице Кустодиева"
          />
          <figcaption>Спортивное пространство на Кустодиева, 7</figcaption>
        </figure>

        <div className="hero-index" aria-hidden="true">
          01 / МАК
        </div>
      </section>

      <div className="color-ribbon" aria-hidden="true">
        <span className="ribbon-red" />
        <span className="ribbon-clay" />
        <span className="ribbon-milk" />
        <span className="ribbon-sky" />
        <span className="ribbon-green" />
      </div>

      <section className="intro section-shell" id="about">
        <div className="section-kicker">
          <span>О комплексе</span>
          <span>Север Санкт-Петербурга</span>
        </div>
        <div className="intro-grid">
          <h2>Место, где спорт становится частью обычного дня.</h2>
          <div className="intro-copy">
            <p>
              ООО «МАК» работает в сфере физкультурно-оздоровительной
              деятельности. В центре внимания — понятная инфраструктура для
              движения, тренировок и восстановления рядом с домом.
            </p>
            <p>
              На площадке по адресу ул. Кустодиева, 7 расположены спортивные
              зоны FITNESS 24: тренажёрный зал, бассейны, игровые и групповые
              пространства.
            </p>
            <a
              className="source-link"
              href="https://fitnessclub24.ru/clubs/prosvet/"
              target="_blank"
              rel="noreferrer"
            >
              Подробнее о спортивной площадке
              <ArrowIcon />
            </a>
          </div>
        </div>
      </section>

      <section className="directions" id="spaces">
        <div className="section-shell">
          <div className="section-kicker light">
            <span>Пространства</span>
            <span>Для разного ритма</span>
          </div>
          <div className="directions-heading">
            <h2>Выберите свой формат движения</h2>
            <p>
              От самостоятельной тренировки до водных занятий — всё в одном
              физкультурно-оздоровительном комплексе.
            </p>
          </div>
          <div className="direction-list">
            {directions.map((item) => (
              <article
                className={`direction-card card-${item.color}`}
                key={item.number}
              >
                <span className="direction-number">{item.number}</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
                <span className="direction-dot" aria-hidden="true" />
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="photo-story">
        <div className="photo-story-image">
          <img
            src="/images/fitness24-pool.webp"
            alt="Светлый спортивный бассейн с дорожками"
            loading="lazy"
          />
        </div>
        <div className="photo-story-copy">
          <p className="eyebrow dark">Водное пространство</p>
          <h2>Тренировка и восстановление в воде</h2>
          <p>
            По информации FITNESS 24, на площадке работают 25-метровый бассейн с
            пятью дорожками, отдельный бассейн для аквафитнеса и детский
            бассейн.
          </p>
          <div className="pool-facts">
            <div>
              <strong>25 м</strong>
              <span>длина большого бассейна</span>
            </div>
            <div>
              <strong>3</strong>
              <span>бассейна для разных задач</span>
            </div>
          </div>
          <a
            className="button button-dark"
            href="https://fitnessclub24.ru/clubs/prosvet/"
            target="_blank"
            rel="noreferrer"
          >
            О площадке FITNESS 24
            <ArrowIcon />
          </a>
        </div>
      </section>

      <section className="rhythm section-shell">
        <div className="rhythm-title">
          <p className="eyebrow dark">Активный день</p>
          <h2>Не рекорды ради рекордов. Движение ради себя.</h2>
        </div>
        <figure className="rhythm-photo">
          <img
            src="/images/fitness24-equipment.webp"
            alt="Современные тренажёры в клубе FITNESS 24"
            loading="lazy"
          />
          <figcaption>Фото: FITNESS 24, клуб «Просвещения»</figcaption>
        </figure>
        <div className="rhythm-note">
          <span className="poppy-symbol" aria-hidden="true">
            <i />
          </span>
          <p>
            Сильное тело начинается с привычки: найти удобное время, выбрать
            подходящую нагрузку и возвращаться к движению снова.
          </p>
        </div>
      </section>

      <section className="company section-shell" id="company">
        <div className="section-kicker">
          <span>О компании</span>
          <span>Реквизиты</span>
        </div>
        <div className="company-grid">
          <div className="company-heading">
            <p>ООО «МАК»</p>
            <h2>Открыто и по делу.</h2>
            <span>Физкультурно-оздоровительная деятельность</span>
          </div>
          <dl className="details-list">
            {companyDetails.map(([term, description]) => (
              <div key={term}>
                <dt>{term}</dt>
                <dd>{description}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="contacts" id="contacts">
        <div className="contacts-main">
          <p className="eyebrow">Контакты</p>
          <h2>Давайте поговорим</h2>
          <p className="contacts-intro">
            По организационным вопросам свяжитесь с ООО «МАК» удобным способом.
          </p>
          <div className="contacts-links">
            <a href={PHONE_LINK}>{PHONE_DISPLAY}</a>
            <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
          </div>
          <button
            className="button button-red"
            type="button"
            onClick={() => setFormOpen(true)}
          >
            Написать нам
            <ArrowIcon />
          </button>
        </div>
        <div className="contacts-address">
          <span className="contacts-label">Адрес</span>
          <p>
            194291, Санкт-Петербург,
            <br />
            ул. Кустодиева, д. 7, к. 2, стр. 1,
            <br />
            помещ. 16-Н
          </p>
          <a
            className="map-link"
            href="https://yandex.ru/maps/?text=Санкт-Петербург%2C%20улица%20Кустодиева%2C%207%2C%20корпус%202"
            target="_blank"
            rel="noreferrer"
          >
            Открыть на карте
            <ArrowIcon />
          </a>
        </div>
      </section>

      <footer className="footer">
        <div className="footer-brand">
          <span className="brand-mark small" aria-hidden="true">
            <span />
          </span>
          <strong>МАК</strong>
        </div>
        <div className="footer-meta">
          <p>
            © {new Date().getFullYear()} ООО «МАК». Информация не является
            публичной офертой.
          </p>
          <p>
            Фотографии спортивного пространства:{" "}
            <a
              href="https://fitnessclub24.ru/clubs/prosvet/"
              target="_blank"
              rel="noreferrer"
            >
              FITNESS 24, клуб «Просвещения»
            </a>
          </p>
        </div>
        <a className="footer-up" href="#top" aria-label="Наверх">
          ↑
        </a>
      </footer>

      {formOpen && (
        <div
          className="modal-backdrop"
          role="presentation"
          onMouseDown={() => setFormOpen(false)}
        >
          <section
            className="contact-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="contact-title"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <button
              className="modal-close"
              type="button"
              onClick={() => setFormOpen(false)}
              aria-label="Закрыть форму"
            >
              <CloseIcon />
            </button>
            <p className="eyebrow dark">Связаться с нами</p>
            <h2 id="contact-title">Расскажите, чем мы можем помочь</h2>
            <p className="modal-note">
              После отправки откроется ваше почтовое приложение с готовым
              письмом на {EMAIL}.
            </p>
            <form onSubmit={handleSubmit}>
              <label>
                <span>Ваше имя</span>
                <input
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  placeholder="Как к вам обращаться"
                />
              </label>
              <label>
                <span>Телефон или e-mail</span>
                <input
                  name="contact"
                  type="text"
                  required
                  placeholder="Контакт для ответа"
                />
              </label>
              <label>
                <span>Тема</span>
                <select name="topic" defaultValue="Организационный вопрос">
                  <option>Организационный вопрос</option>
                  <option>Сотрудничество</option>
                  <option>Документы и реквизиты</option>
                  <option>Другое</option>
                </select>
              </label>
              <label>
                <span>Сообщение</span>
                <textarea
                  name="message"
                  rows={4}
                  required
                  placeholder="Коротко опишите вопрос"
                />
              </label>
              <label className="consent">
                <input type="checkbox" required />
                <span>
                  Согласен на обработку указанных в обращении персональных
                  данных.
                </span>
              </label>
              <button className="button button-red submit-button" type="submit">
                Подготовить письмо
                <ArrowIcon />
              </button>
            </form>
          </section>
        </div>
      )}
    </main>
  );
}
