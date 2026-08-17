"use client";

import { useMemo, useState } from "react";

const CONTACT_EMAIL = "vopros@park-mall.shop";
const CONTACT_PHONE = "+7 (812) 305-33-55";
const heroImage = "/images/alleya-vkusov-hero.jpg";

const gallery = [
  {
    src: "/images/alleya-vkusov-hall-2.jpg",
    alt: "Просторная посадочная зона фуд-холла «Аллея вкусов»",
    label: "Просторная посадочная зона",
  },
  {
    src: "/images/alleya-vkusov-corners.jpg",
    alt: "Ресторанные концепции с кухнями разных стран",
    label: "Кухни разных стран",
  },
  {
    src: "/images/alleya-vkusov-hall-3.jpg",
    alt: "Зелёная зона с диванами и столами в фуд-холле",
    label: "Зелёный интерьер",
  },
  {
    src: "/images/alleya-vkusov-hall-1.jpg",
    alt: "Ряд ресторанных корнеров и посадочные места",
    label: "Ресторанные корнеры",
  },
  {
    src: "/images/alleya-vkusov-lounge.jpg",
    alt: "Лаунж-зона фуд-холла с живыми растениями",
    label: "Зона для встреч и отдыха",
  },
  {
    src: "/images/park-mall-green-zone.jpg",
    alt: "Общественное пространство Парк Молла с зелёной зоной",
    label: "Пространство Парк Молла",
  },
];

const services = [
  {
    number: "01",
    title: "Управление пространством",
    text: "Организуем текущую работу фуд-кортной зоны и поддерживаем понятный порядок взаимодействия между участниками.",
  },
  {
    number: "02",
    title: "Координация операторов",
    text: "Сводим рабочие вопросы в единый контур: от регламентов и доступа до обращений по эксплуатации.",
  },
  {
    number: "03",
    title: "Эксплуатационные задачи",
    text: "Контролируем состояние общих зон и координируем подрядчиков по текущим вопросам объекта.",
  },
  {
    number: "04",
    title: "Работа с обращениями",
    text: "Принимаем запросы, фиксируем детали и направляем вопрос ответственному участнику процесса.",
  },
];

const details = [
  ["Полное наименование", "Общество с ограниченной ответственностью «Первый»"],
  ["Юридический адрес", "195196, Санкт-Петербург, ул. Таллинская, д. 7, лит. А, пом. 6Н, каб. 6"],
  ["Дата регистрации", "23 августа 2007 года"],
  ["ОГРН", "1077847557127"],
  ["ИНН / КПП", "7841368684 / 780601001"],
  ["Генеральный директор", "Кожемяко Людмила Михайловна"],
  ["Налоговый режим", "УСН · микропредприятие"],
];

function Arrow() {
  return <span aria-hidden="true">↗</span>;
}

export default function Home() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });

  const mailBody = useMemo(
    () =>
      [
        `Имя: ${formData.name}`,
        `Телефон: ${formData.phone}`,
        `E-mail: ${formData.email || "не указан"}`,
        "",
        formData.message || "Прошу связаться со мной.",
      ].join("\n"),
    [formData],
  );

  const mailtoHref = useMemo(
    () =>
      `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent("Обращение с сайта ООО «Первый»")}&body=${encodeURIComponent(mailBody)}`,
    [mailBody],
  );

  const closeForm = () => {
    setIsFormOpen(false);
    setSubmitted(false);
  };

  const submitRequest = async (event) => {
    event.preventDefault();

    try {
      await navigator.clipboard.writeText(mailBody);
    } catch {
      // Clipboard access is optional; the mail draft still opens below.
    }

    setSubmitted(true);
    window.location.href = mailtoHref;
  };

  const updateField = (event) => {
    setFormData((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }));
  };

  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="ООО Первый — на главную">
          <span className="brand-mark">I</span>
          <span>ПЕРВЫЙ</span>
        </a>

        <nav className="desktop-nav" aria-label="Основная навигация">
          <a href="#about">О компании</a>
          <a href="#services">Деятельность</a>
          <a href="#details">Реквизиты</a>
          <a href="#contacts">Контакты</a>
        </nav>

        <button className="header-action" type="button" onClick={() => setIsFormOpen(true)}>
          Обратный звонок <Arrow />
        </button>

        <details className="mobile-nav">
          <summary aria-label="Открыть меню">Меню</summary>
          <nav aria-label="Мобильная навигация">
            <a href="#about">О компании</a>
            <a href="#services">Деятельность</a>
            <a href="#details">Реквизиты</a>
            <a href="#contacts">Контакты</a>
          </nav>
        </details>
      </header>

      <section className="hero" id="top">
        <div className="hero-image" style={{ backgroundImage: `url(${heroImage})` }} aria-hidden="true" />
        <div className="hero-shade" aria-hidden="true" />
        <div className="hero-content shell">
          <p className="eyebrow light">Парк Молл · Аллея вкусов</p>
          <h1>
            Место, где
            <br />
            <em>встречаются вкусы</em>
          </h1>
          <p className="hero-copy">
            ООО «Первый» управляет фуд-холлом «Аллея вкусов» в Парк Молле. Более 20 гастрономических концепций,
            кухни разных стран и общее пространство для встреч, отдыха и событий.
          </p>
          <div className="hero-actions">
            <button className="button button-gold" type="button" onClick={() => setIsFormOpen(true)}>
              Оставить заявку <Arrow />
            </button>
            <a className="text-link light-link" href="#services">
              Чем мы занимаемся <span aria-hidden="true">↓</span>
            </a>
          </div>
        </div>
        <div className="hero-note">
          <span>01</span>
          <p>Более 20 концепций · 2-й этаж · ежедневно с 10:00 до 22:00</p>
        </div>
      </section>

      <section className="intro shell" id="about">
        <div>
          <p className="eyebrow">О компании</p>
          <h2>Гастрономическое пространство для всего города</h2>
        </div>
        <div className="intro-copy">
          <p>
            «Аллея вкусов» объединяет более 20 ресторанных концепций: от сербской, итальянской и японской кухни до
            вьетнамских блюд и знакомых гастрономических форматов.
          </p>
          <p>
            ООО «Первый» координирует ежедневную работу пространства, взаимодействие операторов и эксплуатационные
            вопросы, чтобы гостям было комфортно проводить здесь время каждый день.
          </p>
          <div className="facts-row">
            <div>
              <strong>20+</strong>
              <span>гастрономических концепций</span>
            </div>
            <div>
              <strong>2 этаж</strong>
              <span>Парк Молл</span>
            </div>
            <div>
              <strong>10–22</strong>
              <span>ежедневно</span>
            </div>
          </div>
        </div>
      </section>

      <section className="services-section" id="services">
        <div className="shell">
          <div className="section-heading">
            <div>
              <p className="eyebrow light">Направления работы</p>
              <h2>От общего порядка<br />до конкретной задачи</h2>
            </div>
            <p>
              Единая команда координирует рабочие процессы, помогает операторам и поддерживает пространство, в которое
              хочется возвращаться.
            </p>
          </div>

          <div className="service-grid">
            {services.map((service) => (
              <article className="service-card" key={service.number}>
                <span>{service.number}</span>
                <h3>{service.title}</h3>
                <p>{service.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="process shell">
        <div className="process-lead">
          <p className="eyebrow">Принцип работы</p>
          <h2>Один запрос — понятный маршрут</h2>
          <p>
            Не усложняем то, что можно решить прямым взаимодействием. Разбираемся в контексте, определяем ответственного
            и остаёмся на связи до результата.
          </p>
          <button className="button button-dark" type="button" onClick={() => setIsFormOpen(true)}>
            Обсудить вопрос <Arrow />
          </button>
        </div>

        <ol className="process-list">
          <li>
            <span>01</span>
            <div>
              <h3>Получаем обращение</h3>
              <p>Фиксируем контакты, суть вопроса и важные детали.</p>
            </div>
          </li>
          <li>
            <span>02</span>
            <div>
              <h3>Определяем решение</h3>
              <p>Подключаем нужного специалиста или участника процесса.</p>
            </div>
          </li>
          <li>
            <span>03</span>
            <div>
              <h3>Возвращаемся с ответом</h3>
              <p>Сообщаем статус и согласовываем дальнейшие действия.</p>
            </div>
          </li>
        </ol>
      </section>

      <section className="gallery-section" aria-label="Пространство и процессы">
        <div className="gallery-track">
          {gallery.map((image, index) => (
            <figure className={`gallery-item gallery-item-${index + 1}`} key={image.src}>
              <img src={image.src} alt={image.alt} />
              <figcaption>
                <span>0{index + 1}</span>
                {image.label}
              </figcaption>
            </figure>
          ))}
        </div>
        <p className="photo-credit">Фуд-холл «Аллея вкусов» · Парк Молл</p>
      </section>

      <section className="details-section" id="details">
        <div className="shell details-layout">
          <div className="details-intro">
            <p className="eyebrow">Официальная информация</p>
            <h2>Реквизиты компании</h2>
            <p>
              Данные об организации собраны в одном месте — удобно для договоров, счетов и деловой переписки.
            </p>
          </div>
          <dl className="details-list">
            {details.map(([term, description]) => (
              <div key={term}>
                <dt>{term}</dt>
                <dd>{description}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="contact-section" id="contacts">
        <div className="shell contact-grid">
          <div className="contact-panel">
            <p className="eyebrow light">Контакты</p>
            <h2>Есть вопрос?<br />Давайте обсудим</h2>
            <p>
              Оставьте контакты и коротко опишите задачу. Форма подготовит письмо на адрес нашей команды — вам останется
              проверить данные и отправить его в почтовом приложении.
            </p>
            <button className="button button-gold" type="button" onClick={() => setIsFormOpen(true)}>
              Оставить заявку <Arrow />
            </button>

            <div className="contact-address">
              <span>Фуд-холл</span>
              <address>
                Санкт-Петербург,<br />проспект Просвещения, 43,<br />2-й этаж · ежедневно 10:00–22:00
              </address>
              <span>Связаться</span>
              <div className="contact-links">
                <a href="tel:+78123053355">{CONTACT_PHONE}</a>
                <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
              </div>
              <a
                className="map-link"
                href="https://yandex.ru/maps/?text=Санкт-Петербург%2C%20проспект%20Просвещения%2C%2043"
                target="_blank"
                rel="noreferrer"
              >
                Открыть в картах <Arrow />
              </a>
            </div>
          </div>

          <div className="map-wrap">
            <iframe
              title="Карта: Санкт-Петербург, проспект Просвещения, 43"
              src="https://yandex.ru/map-widget/v1/?text=Санкт-Петербург%2C%20проспект%20Просвещения%2C%2043&z=16"
              allowFullScreen
            />
            <div className="map-label">
              <span>Аллея вкусов · Парк Молл</span>
              <strong>пр. Просвещения, 43</strong>
            </div>
          </div>
        </div>
      </section>

      <footer>
        <div className="shell footer-top">
          <a className="brand footer-brand" href="#top">
            <span className="brand-mark">I</span>
            <span>ПЕРВЫЙ</span>
          </a>
          <nav aria-label="Навигация в подвале">
            <a href="#about">О компании</a>
            <a href="#services">Деятельность</a>
            <a href="#details">Реквизиты</a>
            <a href="#contacts">Контакты</a>
          </nav>
          <button type="button" onClick={() => setIsFormOpen(true)}>
            Обратная связь <Arrow />
          </button>
        </div>
        <div className="shell footer-bottom">
          <span>© 2026 ООО «Первый»</span>
          <span>Информация на сайте не является публичной офертой</span>
        </div>
      </footer>

      {isFormOpen && (
        <div className="modal-backdrop" role="presentation" onMouseDown={closeForm}>
          <section
            className="request-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="request-title"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <button className="modal-close" type="button" aria-label="Закрыть форму" onClick={closeForm}>
              ×
            </button>

            {!submitted ? (
              <>
                <p className="eyebrow">Обратная связь</p>
                <h2 id="request-title">Расскажите, чем помочь</h2>
                <p className="modal-copy">
                  Заполните форму — мы подготовим письмо на {CONTACT_EMAIL} и откроем его в вашем почтовом приложении.
                </p>
                <form onSubmit={submitRequest}>
                  <label>
                    Ваше имя
                    <input name="name" value={formData.name} onChange={updateField} autoFocus required />
                  </label>
                  <label>
                    Телефон
                    <input
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={updateField}
                      placeholder="+7 900 000-00-00"
                      required
                    />
                  </label>
                  <label>
                    E-mail <span>необязательно</span>
                    <input name="email" type="email" value={formData.email} onChange={updateField} />
                  </label>
                  <label>
                    Комментарий <span>необязательно</span>
                    <textarea name="message" rows="3" value={formData.message} onChange={updateField} />
                  </label>
                  <label className="consent">
                    <input type="checkbox" required />
                    <span>Я согласен(на) на обработку указанных данных для ответа на обращение</span>
                  </label>
                  <button className="button button-dark submit-button" type="submit">
                    Отправить по e-mail <Arrow />
                  </button>
                </form>
              </>
            ) : (
              <div className="success-state">
                <span className="success-icon">✓</span>
                <p className="eyebrow">Готово</p>
                <h2 id="request-title">Обращение подготовлено</h2>
                <p>
                  Письмо адресовано {CONTACT_EMAIL}. Проверьте данные и нажмите «Отправить» в почтовом приложении.
                </p>
                <a className="button button-dark" href={mailtoHref}>Открыть почту ещё раз <Arrow /></a>
              </div>
            )}
          </section>
        </div>
      )}
    </main>
  );
}
