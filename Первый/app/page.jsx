"use client";

import { useState } from "react";

const CONTACT_EMAIL = "vopros@park-mall.shop";
const CONTACT_PHONE = "+7 (812) 305-33-55";
const heroImage = "/images/alleya-vkusov-hero.jpg";

const gallery = [
  {
    src: "/images/alleya-vkusov-hall-2.jpg",
    alt: "Просторная посадочная зона фуд-холла «Аллея вкусов»",
    label: "Комфортное пространство",
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
    label: "Работа с операторами",
  },
  {
    src: "/images/alleya-vkusov-lounge.jpg",
    alt: "Лаунж-зона фуд-холла с живыми растениями",
    label: "Ежедневные процессы",
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
  [
    "Юридический адрес",
    "195196, Санкт-Петербург, ул. Таллинская, д. 7, лит. А, пом. 6Н, каб. 6",
  ],
  ["Дата регистрации", "23 августа 2007 года"],
  ["ОГРН", "1077847557127"],
  ["ИНН / КПП", "7841368684 / 780601001"],
  ["Генеральный директор", "Кожемяко Людмила Михайловна"],
];

function Arrow() {
  return <span aria-hidden="true">↗</span>;
}

export default function Home() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
    website: "",
  });

  const closeForm = () => {
    setIsFormOpen(false);
    setSubmitted(false);
    setSubmitError("");
  };

  const formatPhone = (value) => {
    let digits = value.replace(/\D/g, "");

    if (digits.startsWith("8")) {
      digits = "7" + digits.slice(1);
    }

    if (!digits.startsWith("7")) {
      digits = "7" + digits;
    }

    digits = digits.slice(0, 11);

    const number = digits.slice(1);

    let result = "+7";

    if (number.length > 0) {
      result += ` (${number.slice(0, 3)}`;
    }

    if (number.length >= 3) {
      result += ")";
    }

    if (number.length > 3) {
      result += ` ${number.slice(3, 6)}`;
    }

    if (number.length > 6) {
      result += ` ${number.slice(6, 8)}`;
    }

    if (number.length > 8) {
      result += ` ${number.slice(8, 10)}`;
    }

    return result;
  };

  const submitRequest = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setSubmitError("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Request failed");
      }

      setSubmitted(true);
      setFormData({
        name: "",
        phone: "",
        email: "",
        message: "",
        website: "",
      });
    } catch {
      setSubmitError(
        "Не получилось отправить обращение. Попробуйте ещё раз или напишите нам на e-mail."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const updateField = (event) => {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: name === "phone" ? formatPhone(value) : value,
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

        <button
          className="header-action"
          type="button"
          onClick={() => setIsFormOpen(true)}
        >
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
        <div
          className="hero-image"
          style={{ backgroundImage: `url(${heroImage})` }}
          aria-hidden="true"
        />
        <div className="hero-shade" aria-hidden="true" />
        <div className="hero-content shell">
          <p className="eyebrow light">Парк Молл · с 2007 года</p>
          <h1>
            Пространство,
            <br />
            <em>в котором всё работает</em>
          </h1>
          <p className="hero-copy">
            ООО «Первый» — участник ЖСК и управляющая компания фуд-кортной зоны
            в торгово-развлекательном комплексе. Координируем ежедневные
            процессы и помогаем участникам решать рабочие вопросы без лишней
            бюрократии.
          </p>
          <div className="hero-actions">
            <button
              className="button button-gold"
              type="button"
              onClick={() => setIsFormOpen(true)}
            >
              Оставить заявку <Arrow />
            </button>
            <a className="text-link light-link" href="#services">
              Чем мы занимаемся <span aria-hidden="true">↓</span>
            </a>
          </div>
        </div>
        <div className="hero-note">
          <span>01</span>
          <p>
            Управление общими пространствами и рабочее взаимодействие с
            операторами
          </p>
        </div>
      </section>

      <section className="intro shell" id="about">
        <div>
          <p className="eyebrow">О компании</p>
          <h2>Спокойная работа сложного пространства</h2>
        </div>
        <div className="intro-copy">
          <p>
            «Аллея вкусов» объединяет более 20 ресторанных концепций: от
            сербской, итальянской и японской кухни до вьетнамских блюд и
            знакомых гастрономических форматов.
          </p>
          <p>
            ООО «Первый» координирует ежедневную работу пространства,
            взаимодействие операторов и эксплуатационные вопросы, чтобы гостям
            было комфортно проводить здесь время каждый день.
          </p>
          <div className="facts-row">
            <div>
              <strong>2007</strong>
              <span>год основания</span>
            </div>
            <div>
              <strong>20+</strong>
              <span>гастрономических концепций</span>
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
              <h2>
                От общего порядка
                <br />
                до конкретной задачи
              </h2>
            </div>
            <p>
              Единая точка координации помогает быстрее находить ответственных,
              фиксировать договорённости и не терять обращения в ежедневном
              потоке.
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
            Не усложняем то, что можно решить прямым взаимодействием.
            Разбираемся в контексте, определяем ответственного и остаёмся на
            связи до результата.
          </p>
          <button
            className="button button-dark"
            type="button"
            onClick={() => setIsFormOpen(true)}
          >
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
            <figure
              className={`gallery-item gallery-item-${index + 1}`}
              key={image.src}
            >
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
              Данные об организации собраны в одном месте — удобно для
              договоров, счетов и деловой переписки.
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
            <h2>
              Есть вопрос?
              <br />
              Давайте обсудим
            </h2>
            <p>
              Оставьте контакты и коротко опишите задачу. Обращение сразу
              поступит на почту нашей команды, и мы свяжемся с вами.
            </p>
            <button
              className="button button-gold"
              type="button"
              onClick={() => setIsFormOpen(true)}
            >
              Оставить заявку <Arrow />
            </button>

            <div className="contact-address">
              <span>Фуд-холл</span>
              <address>
                195196, Санкт-Петербург, ул. Таллинская, д. 7, лит. А, пом. 6Н,
                каб. 6 Санкт-Петербург,
                <br />
                ул. Таллинская, д. 7, лит. А,
                <br />
                пом. 6Н, каб. 6
              </address>
              <span>Связаться</span>
              <div className="contact-links">
                <a href="tel:+78123053355">{CONTACT_PHONE}</a>
                <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
              </div>
              <a
                className="map-link"
                href="https://yandex.ru/maps/?text=Санкт-Петербург%2C%20ул.%20Таллинская%2C%20д.%207%2C%20лит.%20А%2C%20пом.%206Н%2C%20каб.%206"
                target="_blank"
                rel="noreferrer"
              >
                Открыть в картах <Arrow />
              </a>
            </div>
          </div>

          <div className="map-wrap">
            <iframe
              title="Карта: Санкт-Петербург, ул. Таллинская, д. 7, лит. А, пом. 6Н, каб. 6"
              src="https://yandex.ru/map-widget/v1/?text=Санкт-Петербург%2C%20Таллинская%20улица%2C%207&amp;z=16"
              allowFullScreen
            />
            <div className="map-label">
              <span>ООО «Первый»</span>
              <strong>Таллинская ул., 7</strong>
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
        <div
          className="modal-backdrop"
          role="presentation"
          onMouseDown={closeForm}
        >
          <section
            className="request-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="request-title"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <button
              className="modal-close"
              type="button"
              aria-label="Закрыть форму"
              onClick={closeForm}
            >
              ×
            </button>

            {!submitted ? (
              <>
                <p className="eyebrow">Обратная связь</p>
                <h2 id="request-title">Расскажите, чем помочь</h2>
                <p className="modal-copy">
                  Заполните форму — обращение будет отправлено нашей команде.
                </p>
                <form onSubmit={submitRequest}>
                  <label className="request-honeypot" aria-hidden="true">
                    Сайт
                    <input
                      name="website"
                      value={formData.website}
                      onChange={updateField}
                      tabIndex="-1"
                      autoComplete="off"
                    />
                  </label>
                  <label>
                    Ваше имя
                    <input
                      name="name"
                      value={formData.name}
                      onChange={updateField}
                      autoFocus
                      required
                    />
                  </label>
                  <label>
                    Телефон
                    <input
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={updateField}
                      placeholder="+7 (900) 000 00 00"
                      maxLength={18}
                      pattern="\+7 \(\d{3}\) \d{3} \d{2} \d{2}"
                      title="Введите телефон в формате +7 (900) 000 00 00"
                      required
                      onFocus={() => {
                        if (!formData.phone) {
                          setFormData((current) => ({
                            ...current,
                            phone: "+7 (",
                          }));
                        }
                      }}
                    />
                  </label>
                  <label>
                    E-mail <span>необязательно</span>
                    <input
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={updateField}
                    />
                  </label>
                  <label className="message-field">
                    Комментарий <span>необязательно</span>
                    <textarea
                      name="message"
                      rows="3"
                      value={formData.message}
                      onChange={updateField}
                    />
                  </label>
                  <label className="consent">
                    <input type="checkbox" required />
                    <span>
                      Я согласен(на) на обработку указанных данных для ответа на
                      обращение
                    </span>
                  </label>
                  <button
                    className="button button-dark submit-button"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Отправляем…" : "Отправить обращение"}{" "}
                    <Arrow />
                  </button>
                  {submitError && (
                    <p className="form-error" role="alert">
                      {submitError}{" "}
                      <a href={`mailto:${CONTACT_EMAIL}`}>Написать напрямую</a>
                    </p>
                  )}
                </form>
              </>
            ) : (
              <div className="success-state">
                <span className="success-icon">✓</span>
                <p className="eyebrow">Готово</p>
                <h2 id="request-title">Обращение отправлено</h2>
                <p>
                  Спасибо! Обращение уже поступило нашей команде. Мы свяжемся с
                  вами по указанным контактам.
                </p>
                <button
                  className="button button-dark"
                  type="button"
                  onClick={closeForm}
                >
                  Закрыть <Arrow />
                </button>
              </div>
            )}
          </section>
        </div>
      )}
    </main>
  );
}
