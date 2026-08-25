"use client";

import { useEffect, useMemo, useState } from "react";

const PHONE = "+7 (812) 207-37-38";
const EMAIL = "orespekt5@yandex.ru";

const services = [
  {
    number: "01",
    title: "Охрана жилых комплексов",
    text: "Круглосуточная охрана домов и прилегающей территории, контроль входных групп и поддержание порядка во дворе.",
  },
  {
    number: "02",
    title: "Пропускной режим",
    text: "Контроль доступа людей, въезда и выезда транспорта, проверка списков парковки для жильцов и гостей.",
  },
  {
    number: "03",
    title: "Охрана строительных объектов",
    text: "Защита открытых территорий, материалов и техники, контроль сотрудников, подрядчиков и транспорта.",
  },
  {
    number: "04",
    title: "Технические средства охраны",
    text: "Установка и обслуживание технических средств силами штатных специалистов компании.",
  },
];

const advantages = [
  "Связь с клиентами 24 часа в сутки, 7 дней в неделю",
  "Пост охраны на объекте уже в день обращения",
  "Ежедневная проверка и инструктаж сотрудников",
  "Подробный и прозрачный расчёт стоимости услуг",
];

const safetyZones = [
  {
    title: "Тишина и порядок",
    text: "Решаем вопросы при конфликтных ситуациях, пресекаем хулиганство и распитие алкоголя в подъездах и во дворе.",
  },
  {
    title: "Защита от вандализма",
    text: "Предотвращаем порчу лифтов, лавочек, урн, зелёных насаждений и другого общедомового имущества.",
  },
  {
    title: "Контроль парковки",
    text: "Организуем въезд автомобилей по согласованным спискам для постоянно проживающих жильцов и их гостей.",
  },
];

const steps = [
  [
    "01",
    "Осматриваем объект",
    "Изучаем территорию, входы, движение людей и транспорта, определяем основные риски.",
  ],
  [
    "02",
    "Готовим предложение",
    "Определяем количество постов, график работы, обязанности сотрудников и порядок реагирования.",
  ],
  [
    "03",
    "Организуем охрану",
    "Выводим сотрудников на объект и контролируем выполнение согласованных требований.",
  ],
];

const requisites = [
  ["Полное наименование", "ООО «Частная охранная организация Респект-2»"],
  ["Дата регистрации", "07 октября 2004 года"],
  ["ОГРН", "1047855102888"],
  ["ИНН / КПП", "7841304024 / 781001001"],
  ["Генеральный директор", "Серобаба Василий Васильевич"],
  [
    "Юридический адрес",
    "196066, Санкт-Петербург, Московский пр., д. 183-185, литер Б, пом. 251-Н",
  ],
  //   ["Налоговый режим", "УСН · малое предприятие"],
];

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const [prepared, setPrepared] = useState(false);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    object: "",
    message: "",
  });

  const body = useMemo(
    () =>
      [
        "Заявка с сайта ООО «ЧОО Респект-2»",
        "",
        `Имя: ${form.name}`,
        `Телефон или e-mail: ${form.phone}`,
        `Тип объекта: ${form.object || "не указан"}`,
        "",
        form.message ||
          "Прошу связаться со мной для обсуждения охраны объекта.",
      ].join("\n"),
    [form]
  );

  const mailto = useMemo(
    () =>
      `mailto:${EMAIL}?subject=${encodeURIComponent(
        "Заявка на охрану объекта"
      )}&body=${encodeURIComponent(body)}`,
    [body]
  );

  useEffect(() => {
    if (!isOpen) return undefined;

    const handleKey = (event) => {
      if (event.key === "Escape") setIsOpen(false);
    };

    document.body.classList.add("modal-open");
    window.addEventListener("keydown", handleKey);

    return () => {
      document.body.classList.remove("modal-open");
      window.removeEventListener("keydown", handleKey);
    };
  }, [isOpen]);

  const openForm = () => {
    setPrepared(false);
    setIsOpen(true);
  };

  const closeForm = () => {
    setIsOpen(false);
    setPrepared(false);
  };

  const update = (event) => {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: name === "phone" ? formatPhone(value) : value,
    }));
  };

  const submit = (event) => {
    event.preventDefault();
    setPrepared(true);
    window.location.href = mailto;
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

  return (
    <main id="top">
      <div className="topbar">
        <div className="container topbar-inner">
          <span>Частная охранная организация в Санкт-Петербурге</span>
          <div>
            <a href="tel:+78122073738">{PHONE}</a>
            <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
          </div>
        </div>
      </div>

      <header className="site-header">
        <div className="container header-inner">
          <a className="logo" href="#top" aria-label="Респект-2 — на главную">
            <span className="logo-mark">Р2</span>
            <span className="logo-text">
              <strong>РЕСПЕКТ-2</strong>
              <small>Частная охранная организация</small>
            </span>
          </a>

          <nav aria-label="Основная навигация">
            <a href="#services">Услуги</a>
            <a href="#about">О компании</a>
            <a href="#work">Как мы работаем</a>
            <a href="#contacts">Контакты</a>
          </nav>

          <button
            className="button button-small"
            type="button"
            onClick={openForm}
          >
            Оставить заявку
          </button>
        </div>
      </header>

      <section className="hero">
        <div className="container hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">ООО «ЧОО Респект-2»</p>
            <h1>
              Надёжная охрана объектов <span>в Санкт-Петербурге</span>
            </h1>
            <p className="hero-lead">
              Специализируемся на физической охране многоквартирных жилых
              комплексов, дворов и строительных объектов.
            </p>
            <div className="hero-actions">
              <button className="button" type="button" onClick={openForm}>
                Получить консультацию
              </button>
              <a className="phone-link" href="tel:+78122073738">
                Позвонить: {PHONE}
              </a>
            </div>
          </div>

          <aside className="hero-card" aria-label="Кратко о компании">
            <div className="radar-panel" aria-hidden="true">
              <div className="radar-labels">
                <span>Периметр</span>
                <span>
                  <i /> Контроль активен
                </span>
              </div>
              <div className="radar-screen">
                <div className="radar-sweep" />
                <span className="radar-core">Р2</span>
                <i className="radar-point point-one" />
                <i className="radar-point point-two" />
                <i className="radar-point point-three" />
              </div>
              <div className="radar-status">
                <span>Санкт-Петербург</span>
                <strong>24 / 7</strong>
              </div>
            </div>
            <div className="hero-card-copy">
              <h2>Работаем с 2004 года</h2>
              <p>Опыт охраны объектов повышенной сложности.</p>
              <ul>
                <li>Лицензированные сотрудники</li>
                <li>Круглосуточные посты охраны</li>
                <li>Контроль территории и транспорта</li>
                <li>Технические средства охраны</li>
              </ul>
            </div>
          </aside>
        </div>
      </section>

      <section className="stats-strip" aria-label="Компания в цифрах">
        <div className="container stats-grid">
          <div>
            <strong>100+</strong>
            <span>постоянных сотрудников</span>
          </div>
          <div>
            <strong>12</strong>
            <span>жилых комплексов под охраной</span>
          </div>
          <div>
            <strong>24 / 7</strong>
            <span>связь с клиентами</span>
          </div>
        </div>
      </section>

      <section className="section" id="services">
        <div className="container">
          <div className="section-heading">
            <p className="eyebrow">Наши услуги</p>
            <h2>Что мы охраняем</h2>
            <p>
              Подбираем состав охраны и режим работы с учётом задач конкретного
              объекта.
            </p>
          </div>

          <div className="services-grid">
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

      <section className="section section-muted" id="about">
        <div className="container about-grid">
          <div>
            <p className="eyebrow">О компании</p>
            <h2>Охрана сложных объектов — наша специализация</h2>
            <p className="large-text">
              ООО «ЧОО Респект-2» организует круглосуточную физическую охрану
              жилых комплексов, строительных объектов и прилегающих территорий.
            </p>
            <p>
              Большие площади, открытые пространства, множество жильцов,
              обслуживающий персонал и дорогостоящие материалы требуют
              продуманной системы безопасности. Мы учитываем эти особенности,
              минимизируем риски хищений и заранее замечаем нюансы, способные
              повлиять на охрану объекта.
            </p>
          </div>

          <div className="advantages">
            {advantages.map((item) => (
              <div key={item}>
                <span aria-hidden="true">✓</span>
                <p>{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section safety-section" id="safety">
        <div className="container">
          <div className="section-heading">
            <p className="eyebrow">Дом и двор</p>
            <h2>Обеспечиваем зону безопасности</h2>
            <p>
              Охрана — это не только пост у входа, но и ежедневный порядок на
              всей территории жилого комплекса.
            </p>
          </div>

          <div className="safety-grid">
            {safetyZones.map((item, index) => (
              <article key={item.title}>
                <span aria-hidden="true">0{index + 1}</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="work">
        <div className="container">
          <div className="section-heading">
            <p className="eyebrow">Порядок работы</p>
            <h2>Как начинается сотрудничество</h2>
          </div>

          <div className="steps-grid">
            {steps.map(([number, title, text]) => (
              <article key={number}>
                <span>{number}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>

          <div className="center-action">
            <button className="button" type="button" onClick={openForm}>
              Обсудить охрану объекта
            </button>
          </div>
        </div>
      </section>

      <section className="contact-section" id="contacts">
        <div className="container contact-grid">
          <div>
            <p className="eyebrow light">Свяжитесь с нами</p>
            <h2>Ответим на вопросы и обсудим ваш объект</h2>
            <p>
              Позвоните, напишите на электронную почту или оставьте заявку через
              форму.
            </p>
            <button
              className="button button-light"
              type="button"
              onClick={openForm}
            >
              Оставить заявку
            </button>
          </div>

          <address className="contact-card">
            <div>
              <span>Телефон</span>
              <a href="tel:+78122073738">{PHONE}</a>
            </div>
            <div>
              <span>Электронная почта</span>
              <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
            </div>
            <div>
              <span>Адрес</span>
              <p>
                196066, г. Санкт-Петербург,
                <br />
                Московский пр., д. 183-185,
                <br />
                литер Б, пом. 251-Н
              </p>
              <a
                className="map-link"
                href="https://yandex.ru/maps/?text=Санкт-Петербург%2C%20Московский%20проспект%2C%20183-185"
                target="_blank"
                rel="noreferrer"
              >
                Открыть на карте →
              </a>
            </div>
          </address>
        </div>
      </section>

      <section className="section legal-section" id="details">
        <div className="container">
          <div className="section-heading left">
            <p className="eyebrow">Реквизиты</p>
            <h2>Сведения о компании</h2>
          </div>

          <dl className="requisites">
            {requisites.map(([term, value]) => (
              <div key={term}>
                <dt>{term}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <footer>
        <div className="container footer-main">
          <div>
            <strong>ООО «ЧОО Респект-2»</strong>
            <p>Частная охранная организация</p>
          </div>
          <a href="tel:+78122073738">{PHONE}</a>
          <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
        </div>
        <div className="container registry-note">
          <p>
            Обработка персональных данных начата 07.10.2004. Запись в реестре
            внесена на основании приказа № 403 от 25.06.2025. Условие
            прекращения обработки — ликвидация юридического лица.
          </p>
          <p>
            © 2026 ООО «ЧОО Респект-2». Информация на сайте не является
            публичной офертой.
          </p>
        </div>
      </footer>

      {isOpen && (
        <div
          className="modal-backdrop"
          onMouseDown={closeForm}
          role="presentation"
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
              onClick={closeForm}
              aria-label="Закрыть форму"
            >
              ×
            </button>
            {!prepared ? (
              <>
                <h2 id="request-title">Оставить заявку</h2>
                <p className="modal-note">
                  Заполните форму. Мы подготовим письмо на адрес {EMAIL} и
                  откроем его в вашей почтовой программе.
                </p>
                <form onSubmit={submit}>
                  <label>
                    Ваше имя
                    <input
                      name="name"
                      value={form.name}
                      onChange={update}
                      autoFocus
                      required
                    />
                  </label>
                  <label>
                    Телефон или e-mail
                    <input
                      name="phone"
                      type="tel"
                      value={form.phone}
                      onChange={update}
                      placeholder="+7 (900) 000 00 00"
                      maxLength={18}
                      pattern="\+7 \(\d{3}\) \d{3} \d{2} \d{2}"
                      title="Введите телефон в формате +7 (900) 000 00 00"
                      required
                      onFocus={() => {
                        if (!form.phone) {
                          setForm((current) => ({
                            ...current,
                            phone: "+7 (",
                          }));
                        }
                      }}
                    />
                  </label>
                  <label>
                    Тип объекта
                    <select name="object" value={form.object} onChange={update}>
                      <option value="">Выберите вариант</option>
                      <option>Жилой комплекс</option>
                      <option>Строительный объект</option>
                      <option>Двор или парковка</option>
                      <option>Технические средства охраны</option>
                      <option>Другой объект</option>
                    </select>
                  </label>
                  <label>
                    Комментарий
                    <textarea
                      name="message"
                      rows="4"
                      value={form.message}
                      onChange={update}
                    />
                  </label>
                  <label className="consent">
                    <input type="checkbox" required />
                    <span>
                      Согласен(на) на обработку указанных данных для ответа на
                      обращение
                    </span>
                  </label>
                  <button className="button form-button" type="submit">
                    Отправить по e-mail
                  </button>
                </form>
              </>
            ) : (
              <div className="prepared-state">
                <span className="prepared-icon">✓</span>
                <h2 id="request-title">Письмо подготовлено</h2>
                <p>
                  Проверьте данные и нажмите «Отправить» в почтовой программе.
                  Получатель — {EMAIL}.
                </p>
                <a className="button form-button" href={mailto}>
                  Открыть почту ещё раз
                </a>
              </div>
            )}
          </section>
        </div>
      )}
    </main>
  );
}
