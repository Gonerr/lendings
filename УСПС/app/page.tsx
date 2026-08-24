"use client";

import { FormEvent, useEffect, useState } from "react";

const ADDRESS =
  "196233, г. Санкт-Петербург, ул. Орджоникидзе, д. 52, литер А, пом. 92-Н, офис 1";

// Добавьте подтверждённый email организации, чтобы он автоматически
// подставлялся в поле «Кому» при открытии почтовой программы.
const SITE_EMAIL = "";

const facts = [
  {
    number: "01",
    title: "Участие в ЖСК",
    text: "Компания является участником жилищно-строительного кооператива и действует в рамках установленных правил кооперативного взаимодействия.",
  },
  {
    number: "02",
    title: "Сведения об организации",
    text: "На странице собраны регистрационные данные организации, сведения о руководителе и адрес для письменных обращений.",
  },
  {
    number: "03",
    title: "Обращения",
    text: "По вопросам, связанным с деятельностью организации и участием в ЖСК, можно направить письменное обращение.",
  },
];

const visuals = [
  {
    src: "/images/l1-hero.jpg",
    alt: "Современный жилой комплекс компании Л1",
    title: "Жилая среда",
    text: "Архитектура и благоустройство жилых проектов Л1 в Санкт-Петербурге и Ленинградской области.",
    className: "visual-card visual-card--large",
  },
  {
    src: "/images/l1-courtyard.webp",
    alt: "Благоустроенный двор жилого комплекса Л1",
    title: "Благоустройство",
    text: "Дворовые пространства, озеленение и инфраструктура рядом с домом.",
    className: "visual-card",
  },
  {
    src: "/images/l1-lobby.webp",
    alt: "Интерьер парадной жилого комплекса Твой Космос компании Л1",
    title: "Общие пространства",
    text: "Парадные и входные группы как часть повседневной среды жильцов.",
    className: "visual-card",
  },
];

const articles = [
  {
    id: "away",
    label: "Памятка",
    title: "Если вы уезжаете",
    summary:
      "Короткий список дел перед поездкой: проверить начисления, передать показания и оставить контакт для экстренной связи.",
    content: [
      "Перед длительным отъездом полезно проверить последние начисления и убедиться, что обязательные платежи внесены. Если для помещения предусмотрена передача показаний приборов учёта, сделайте это в установленный срок.",
      "Перекройте воду, отключите ненужные электроприборы и оставьте близкому человеку или соседу контакт для экстренной связи. Если порядок действий по вашему дому неизвестен, заранее направьте письменный вопрос.",
    ],
  },
  {
    id: "debt",
    label: "Важно знать",
    title: "Долги за ЖКУ перед поездкой: что проверить заранее",
    summary:
      "Само наличие начисления не означает автоматического запрета на выезд, но задолженность в рамках исполнительного производства может привести к ограничениям.",
    content: [
      "Перед поездкой стоит проверить не только квитанции, но и наличие исполнительных производств. Временное ограничение на выезд устанавливается уполномоченным органом в предусмотренных законом случаях — оно не возникает автоматически из-за любой неоплаченной квитанции.",
      "Если задолженность обнаружена, уточните её основание, сумму и порядок погашения. После оплаты сохраните подтверждающие документы и проверьте обновление сведений в официальных сервисах.",
    ],
    source: "https://www.gosuslugi.ru/help/faq/bailiff/1022088",
  },
  {
    id: "appeal",
    label: "Обращения",
    title: "Как подготовить понятное обращение",
    summary:
      "Чем точнее описан вопрос, тем проще зарегистрировать его и подготовить содержательный ответ.",
    content: [
      "Укажите фамилию и имя, удобный способ связи, адрес или объект, к которому относится вопрос. Кратко опишите ситуацию, важные даты и ожидаемый результат.",
      "Если вопрос связан с документами или начислениями, перечислите их реквизиты. Не отправляйте через обычную электронную почту лишние персональные данные и сведения, которые не нужны для рассмотрения обращения.",
    ],
  },
];

const questions = [
  {
    question: "Как направить официальное обращение?",
    answer:
      "Письменную корреспонденцию можно направить по юридическому адресу организации. В обращении укажите имя, обратный контакт, адрес или объект вопроса и краткое описание ситуации.",
  },
  {
    question: "Какие данные лучше указать в сообщении?",
    answer:
      "Достаточно номера телефона, электронной почты и комментария. Если вопрос относится к конкретному помещению или документу, добавьте адрес и реквизиты без передачи избыточных персональных данных.",
  },
  {
    question: "Где посмотреть реквизиты организации?",
    answer:
      "ОГРН, ИНН, КПП, дату регистрации, сведения о руководителе и юридический адрес можно посмотреть ниже, в разделе «Реквизиты».",
  },
  {
    question: "Что проверить перед длительным отъездом?",
    answer:
      "Проверьте начисления, передайте показания приборов учёта в установленный срок, отключите ненужные приборы и оставьте контакт для экстренной связи.",
  },
];

type Article = (typeof articles)[number];

const Arrow = () => (
  <svg aria-hidden="true" viewBox="0 0 24 24" className="arrow">
    <path d="M5 12h14M14 6l6 6-6 6" />
  </svg>
);

export default function Home() {
  const [activeArticle, setActiveArticle] = useState<Article | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!activeArticle) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActiveArticle(null);
    };

    document.body.classList.add("modal-open");
    window.addEventListener("keydown", closeOnEscape);

    return () => {
      document.body.classList.remove("modal-open");
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [activeArticle]);

  const copyAddress = async () => {
    try {
      await navigator.clipboard.writeText(ADDRESS);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  const sendByEmail = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!activeArticle) return;

    const data = new FormData(event.currentTarget);
    const phone = String(data.get("phone") ?? "");
    const email = String(data.get("email") ?? "");
    const comment = String(data.get("comment") ?? "");
    const subject = `Обращение с сайта УСПС: ${activeArticle.title}`;
    const body = [
      `Тема: ${activeArticle.title}`,
      `Телефон: ${phone}`,
      `Email: ${email}`,
      "",
      "Комментарий:",
      comment,
    ].join("\n");

    window.location.href = `mailto:${SITE_EMAIL}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
  };

  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="УСПС — на главную">
          <span className="brand__mark">У</span>
          <span className="brand__name">
            Управление сопровождения проектов строительства
          </span>
        </a>

        <nav className="nav" aria-label="Основная навигация">
          <a href="#about">О компании</a>
          <a href="#environment">Среда Л1</a>
          <a href="#useful">Полезное</a>
          <a href="#details">Реквизиты</a>
        </nav>

        <a className="button button--small" href="#contacts">
          Связаться
        </a>
      </header>

      <section className="hero" id="top">
        <div className="hero__copy">
          <p className="eyebrow eyebrow--light">ООО «УСПС» · Санкт-Петербург</p>
          <h1>
            ООО «Управление сопровождения <span>проектов строительства</span>»
          </h1>
          <p className="hero__lead">
            Информация об участии организации в ЖСК, официальные сведения,
            реквизиты и материалы для участников кооператива.
          </p>

          <div className="hero__actions">
            <a className="button button--accent" href="#useful">
              Полезная информация
            </a>
            <a className="text-link text-link--light" href="#details">
              Смотреть реквизиты <Arrow />
            </a>
          </div>

          <div className="hero__meta" aria-label="Краткие сведения">
            <div>
              <strong>2006</strong>
              <span>год регистрации</span>
            </div>
            <div>
              <strong>ЖСК</strong>
              <span>участие организации</span>
            </div>
            <div>
              <strong>СПб</strong>
              <span>место регистрации</span>
            </div>
          </div>
        </div>

        <div className="hero__visual">
          <img
            src="/images/l1-hero.jpg"
            alt="Жилой комплекс компании Л1"
            className="hero__image"
          />
          <div className="hero__shade" />
          <div className="hero__floating-card">
            <span>ООО «УСПС»</span>
            <p>Участник жилищно-строительного кооператива</p>
          </div>
        </div>
      </section>

      <section className="quick-strip" aria-label="Быстрый переход">
        <a href="#about">
          <span>01</span>О компании
        </a>
        <a href="#useful">
          <span>02</span>
          Памятки
        </a>
        <a href="#details">
          <span>03</span>
          Реквизиты
        </a>
        <a href="#contacts">
          <span>04</span>
          Адрес и карта
        </a>
      </section>

      <section className="about section" id="about">
        <div className="section-heading section-heading--split">
          <div>
            <p className="eyebrow">О компании</p>
            <h2>Об организации</h2>
          </div>
          <p>
            ООО «Управление сопровождения проектов строительства» является
            участником жилищно-строительного кооператива. В этом разделе
            представлены основные сведения об организации и порядке
            взаимодействия.
          </p>
        </div>

        <div className="fact-grid">
          {facts.map((fact) => (
            <article className="fact-card" key={fact.title}>
              <div className="fact-card__top">
                <span>{fact.number}</span>
                <i aria-hidden="true" />
              </div>
              <h3>{fact.title}</h3>
              <p>{fact.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="environment section" id="environment">
        <div className="section-heading section-heading--split section-heading--light">
          <div>
            <p className="eyebrow eyebrow--light">Жилая среда · Л1</p>
            <h2>Жилые комплексы и благоустройство</h2>
          </div>
          <p>
            Жилые дома, дворовые территории и общественные пространства проектов
            компании Л1 в Санкт-Петербурге.
          </p>
        </div>

        <div className="visual-grid">
          {visuals.map((item) => (
            <article className={item.className} key={item.title}>
              <img src={item.src} alt={item.alt} loading="lazy" />
              <div className="visual-card__overlay" />
              <div className="visual-card__caption">
                <span>{item.title}</span>
                <p>{item.text}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="useful section" id="useful">
        <div className="section-heading section-heading--split">
          <div>
            <p className="eyebrow">Полезная информация</p>
            <h2>Короткие памятки для повседневных вопросов</h2>
          </div>
          <p>
            Ответы и памятки по вопросам начислений, обращений, передачи
            показаний и другим вопросам, связанным с проживанием.
          </p>
        </div>

        <div className="article-grid">
          {articles.map((article, index) => (
            <article className="article-card" key={article.id}>
              <div className="article-card__head">
                <span className="article-card__label">{article.label}</span>
                <span className="article-card__number">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>
              <h3>{article.title}</h3>
              <p>{article.summary}</p>
              <button type="button" onClick={() => setActiveArticle(article)}>
                Подробнее <Arrow />
              </button>
            </article>
          ))}
        </div>
      </section>

      <section className="faq section" id="faq">
        <div className="faq__intro">
          <p className="eyebrow">Часто задаваемые вопросы</p>
          <h2>Ответы на частые вопросы</h2>
          <p>
            Информация о направлении обращений, реквизитах организации и других
            вопросах, связанных с участием в ЖСК.
          </p>
        </div>

        <div className="faq-list">
          {questions.map((item, index) => (
            <details key={item.question} open={index === 0}>
              <summary>
                <span className="faq-list__number">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <strong>{item.question}</strong>
                <span className="faq-list__plus" aria-hidden="true">
                  +
                </span>
              </summary>
              <p>{item.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="details section" id="details">
        <div className="details__intro">
          <p className="eyebrow eyebrow--light">Реквизиты</p>
          <h2>Карточка организации</h2>
          <p>
            Основные регистрационные сведения ООО «Управление сопровождения
            проектов строительства».
          </p>
          <a className="text-link text-link--light" href="#contacts">
            Перейти к адресу <Arrow />
          </a>
        </div>

        <dl className="details__list">
          <div className="details__wide">
            <dt>Полное наименование</dt>
            <dd>ООО «Управление сопровождения проектов строительства»</dd>
          </div>
          <div>
            <dt>ОГРН</dt>
            <dd>5067847173906</dd>
          </div>
          <div>
            <dt>ИНН</dt>
            <dd>7842339446</dd>
          </div>
          <div>
            <dt>КПП</dt>
            <dd>781001001</dd>
          </div>
          <div>
            <dt>Дата регистрации</dt>
            <dd>24.07.2006</dd>
          </div>
          <div className="details__wide">
            <dt>Генеральный директор</dt>
            <dd>Штеллер Дмитрий Эрнестович</dd>
          </div>
        </dl>
      </section>

      <section className="contact section" id="contacts">
        <div className="contact__shell">
          <div className="contact__info">
            <p className="eyebrow">Контакты</p>
            <h2>Адрес для корреспонденции</h2>
            <address>{ADDRESS}</address>

            <div className="contact__note">
              <span>Перед обращением</span>
              <p>
                Укажите имя, удобный способ связи и кратко опишите вопрос. Для
                конкретного помещения добавьте адрес или реквизиты документа.
              </p>
            </div>

            <div className="contact__actions">
              <a
                className="button"
                href="https://yandex.ru/maps/?text=Санкт-Петербург%2C%20улица%20Орджоникидзе%2C%2052"
                target="_blank"
                rel="noreferrer"
              >
                Открыть маршрут
              </a>
              <button
                className="button button--outline"
                type="button"
                onClick={copyAddress}
              >
                {copied ? "Адрес скопирован" : "Скопировать адрес"}
              </button>
            </div>
          </div>

          <div className="contact__map">
            <iframe
              title="ООО УСПС на Яндекс Картах"
              src="https://yandex.ru/map-widget/v1/?um=constructor%3Abcc43538b81f6fae9de96a52cd48b9acbeea435c236512fc5647b876b5f0eb4a&amp;source=constructor"
              loading="lazy"
              allowFullScreen
            />
            <div className="contact__map-label">
              <span>Санкт-Петербург</span>
              <strong>ул. Орджоникидзе, 52</strong>
            </div>
          </div>
        </div>
      </section>

      <footer>
        <a className="brand brand--footer" href="#top">
          <span className="brand__mark">У</span>
          <span className="brand__name">
            Управление сопровождения проектов строительства
          </span>
        </a>
        <p>
          Информация на сайте носит справочный характер и не является публичной
          офертой.
        </p>
        <p>© 2006–2026</p>
      </footer>

      {activeArticle && (
        <div
          className="modal-backdrop"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setActiveArticle(null);
          }}
        >
          <section
            className="modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
          >
            <button
              className="modal__close"
              type="button"
              onClick={() => setActiveArticle(null)}
              aria-label="Закрыть окно"
            >
              ×
            </button>

            <div className="modal__article">
              <p className="eyebrow">{activeArticle.label}</p>
              <h2 id="modal-title">{activeArticle.title}</h2>
              {activeArticle.content.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
              {activeArticle.source && (
                <a
                  className="source-link"
                  href={activeArticle.source}
                  target="_blank"
                  rel="noreferrer"
                >
                  Официальная информация на Госуслугах <Arrow />
                </a>
              )}
            </div>

            <form className="request-form" onSubmit={sendByEmail}>
              <h3>Задать вопрос по теме</h3>
              <p>
                После нажатия «Отправить» откроется ваша почтовая программа с
                готовым письмом.
              </p>

              <label>
                Номер телефона
                <input
                  type="tel"
                  name="phone"
                  placeholder="+7 900 000-00-00"
                  required
                />
              </label>

              <label>
                Email
                <input
                  type="email"
                  name="email"
                  placeholder="name@example.ru"
                  required
                />
              </label>

              <label>
                Комментарий
                <textarea
                  name="comment"
                  rows={4}
                  placeholder="Опишите ваш вопрос"
                  required
                />
              </label>

              <button className="button" type="submit">
                Отправить
              </button>
            </form>
          </section>
        </div>
      )}
    </main>
  );
}
