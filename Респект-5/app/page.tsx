"use client";

import { FormEvent, useEffect, useState } from "react";
import {
  EMAIL,
  objectLocations,
  objectTypes,
  PHONE_DISPLAY,
  PHONE_LINK,
  requisites,
  services,
} from "./data";

function Arrow() {
  return <span aria-hidden="true">↗</span>;
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [formOpen, setFormOpen] = useState(false);

  const [phone, setPhone] = useState("");

  useEffect(() => {
    document.body.classList.toggle("no-scroll", formOpen);
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setFormOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.classList.remove("no-scroll");
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [formOpen]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const subject = encodeURIComponent(
      `Запрос с сайта Респект-5: ${String(data.get("objectType") || "объект")}`
    );
    const body = encodeURIComponent(
      [
        `Имя: ${String(data.get("name") || "")}`,
        `Организация: ${String(data.get("company") || "не указана")}`,
        `Контакт: ${String(data.get("contact") || "")}`,
        `Тип объекта: ${String(data.get("objectType") || "")}`,
        "",
        "Сообщение:",
        String(data.get("message") || ""),
      ].join("\n")
    );
    window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;
    setFormOpen(false);
    setPhone("");
  };

  const closeMenu = () => setMenuOpen(false);

  const formatPhone = (value: string) => {
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
    <main>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Респект-5 — на главную">
          <span className="brand-sign">
            <b>R</b>
            <i>5</i>
          </span>
          <span className="brand-name">РЕСПЕКТ—5</span>
        </a>

        <button
          className="menu-button"
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
          <a href="#services" onClick={closeMenu}>
            Услуги
          </a>
          <a href="#approach" onClick={closeMenu}>
            Подход
          </a>
          <a href="#dispatch" onClick={closeMenu}>
            Диспетчерская
          </a>
          <a href="#objects" onClick={closeMenu}>
            Объекты
          </a>
          <a href="#company" onClick={closeMenu}>
            Компания
          </a>
          <a href="#contacts" onClick={closeMenu}>
            Контакты
          </a>
        </nav>

        <button
          className="header-action"
          type="button"
          onClick={() => setFormOpen(true)}
        >
          Обсудить объект <Arrow />
        </button>
      </header>

      <section className="hero" id="top">
        <div className="hero-copy">
          <div className="hero-kicker">
            <span>Санкт-Петербург</span>
            <span>Сопровождение объектов</span>
          </div>
          <h1>
            Объект под
            <br />
            <em>контролем.</em>
            <br />
            Каждый день.
          </h1>
          <p className="hero-text">
            Круглосуточное присутствие персонала, диспетчеризация МКД,
            консьерж-сервис и административное сопровождение объектов
            управляющих компаний.
          </p>
          <div className="hero-actions">
            <button
              className="primary-button"
              type="button"
              onClick={() => setFormOpen(true)}
            >
              Получить консультацию <Arrow />
            </button>
            <a className="phone-link" href={PHONE_LINK}>
              {PHONE_DISPLAY}
            </a>
          </div>
        </div>

        <div
          className="hero-system"
          aria-label="Система круглосуточного присутствия на объекте"
        >
          <div className="system-topline">
            <span>Режим присутствия</span>
            <span className="status">
              <i /> Активен
            </span>
          </div>
          <div className="clock">
            <span className="clock-hour hour-00">00</span>
            <span className="clock-hour hour-06">06</span>
            <span className="clock-hour hour-12">12</span>
            <span className="clock-hour hour-18">18</span>
            <div className="clock-center">
              <strong>24/7</strong>
              <small>на объекте</small>
            </div>
            <div className="clock-hand" />
          </div>
          <div className="shift-grid">
            <div>
              <span>Присутствие</span>
              <strong>Непрерывно</strong>
            </div>
            <div>
              <span>Коммуникация</span>
              <strong>На месте</strong>
            </div>
            <div>
              <span>Документы</span>
              <strong>По регламенту</strong>
            </div>
          </div>
          <div className="building-lines" aria-hidden="true">
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
          </div>
        </div>
      </section>

      <section className="facts-bar" aria-label="Ключевые факты">
        <div>
          <small>Работаем</small>
          <strong>с 2021 года</strong>
        </div>
        <div>
          <small>Формат</small>
          <strong>24 часа / 7 дней</strong>
        </div>
        <div>
          <small>Партнёры</small>
          <strong>управляющие компании</strong>
        </div>
        <div>
          <small>География</small>
          <strong>Санкт-Петербург</strong>
        </div>
      </section>

      <section className="intro section-shell" id="approach">
        <div className="section-index">01 / Подход</div>
        <div className="intro-heading">
          <p className="eyebrow">Спокойствие начинается с порядка</p>
          <h2>Мы берём на себя ежедневное присутствие на объекте.</h2>
        </div>
        <div className="intro-body">
          <p className="lead">
            «Респект-5» работает по договорам с управляющими компаниями и
            обеспечивает организованную работу персонала на территории жилых,
            коммерческих и специализированных объектов.
          </p>
          <p>
            В основе услуги — не абстрактное обещание безопасности, а конкретный
            рабочий процесс: представитель находится на объекте, соблюдает
            действующий режим, ведёт документацию, решает административные
            вопросы и поддерживает связь с заказчиком.
          </p>
        </div>
      </section>

      <section className="services section-shell" id="services">
        <div className="services-title">
          <div className="section-index light">02 / Услуги</div>
          <p className="eyebrow light">В соответствии с договорными задачами</p>
          <h2>Понятная зона ответственности</h2>
        </div>
        <div className="services-showcase">
          <article className="service-focus">
            <div className="service-focus-top">
              <span>{services[0].number} / ключевая услуга</span>
              <small>{services[0].tag}</small>
            </div>
            <strong className="service-focus-time">24/7</strong>
            <h3>{services[0].title}</h3>
            <p>{services[0].text}</p>
            <div className="service-focus-status">
              <i aria-hidden="true" />
              <span>Непрерывный режим работы</span>
            </div>
          </article>

          <div className="service-list">
            {services.slice(1).map((service) => (
              <article className="service-row" key={service.number}>
                <span className="service-number">{service.number}</span>
                <div>
                  <h3>{service.title}</h3>
                  <p>{service.text}</p>
                </div>
                <small>{service.tag}</small>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="workflow section-shell">
        <div className="section-index">03 / Процесс</div>
        <div className="workflow-heading">
          <p className="eyebrow">Как строится работа</p>
          <h2>
            От задачи управляющей компании — до стабильного режима на объекте.
          </h2>
        </div>
        <div className="workflow-route">
          <div className="route-caption">
            <span>Рабочий маршрут</span>
            <strong>4 контрольные точки</strong>
          </div>
          <article>
            <span className="route-number">01</span>
            <div className="route-copy">
              <small>Обследование</small>
              <h3>Изучаем объект</h3>
              <p>
                Фиксируем режим, требования территории и круг текущих задач.
              </p>
            </div>
            <span className="route-result">План работ</span>
          </article>
          <article>
            <span className="route-number">02</span>
            <div className="route-copy">
              <small>Организация</small>
              <h3>Выводим персонал</h3>
              <p>
                Формируем присутствие представителей, охранников или консьержей.
              </p>
            </div>
            <span className="route-result">Старт смен</span>
          </article>
          <article>
            <span className="route-number">03</span>
            <div className="route-copy">
              <small>Ежедневная работа</small>
              <h3>Поддерживаем режим</h3>
              <p>
                Соблюдаем внутренний порядок, пропускной режим и требования
                безопасности.
              </p>
            </div>
            <span className="route-result">Стабильность</span>
          </article>
          <article>
            <span className="route-number">04</span>
            <div className="route-copy">
              <small>Контроль</small>
              <h3>Подтверждаем результат</h3>
              <p>
                Ведём документооборот и оформляем результаты оказанных услуг.
              </p>
            </div>
            <span className="route-result">Отчётность</span>
          </article>
        </div>
      </section>

      <section className="dispatch" id="dispatch">
        <div className="dispatch-head section-shell">
          <div className="section-index">04 / Диспетчеризация</div>
          <div className="dispatch-title">
            <p className="eyebrow">Человек остаётся частью системы</p>
            <h2>Диспетчерский контур многоквартирного дома</h2>
          </div>
          <p className="dispatch-lead">
            Технические средства обнаруживают проблему, а сотрудник принимает
            обращение, фиксирует его и передаёт профильной службе. Такой подход
            помогает управляющей компании сохранять контроль, а жителям —
            быстрее получать понятную обратную связь.
          </p>
        </div>

        <div className="dispatch-layout section-shell">
          <div className="dispatch-visual">
            <div className="dispatch-visual-top">
              <span>Контур объекта / МКД</span>
              <span className="dispatch-online">
                <i /> Связь установлена
              </span>
            </div>
            <img
              src="/security-building.svg"
              alt="Схема защищённого жилого дома, инженерных систем и диспетчерского контроля"
            />
            <div className="dispatch-monitoring">
              <div>
                <small>Обращения</small>
                <strong>приём и фиксация</strong>
              </div>
              <div>
                <small>Инженерные системы</small>
                <strong>контроль состояния</strong>
              </div>
              <div>
                <small>Реакция</small>
                <strong>передача в службу</strong>
              </div>
            </div>
          </div>

          <div className="dispatch-content">
            <div className="dispatch-flow-head">
              <span>Как проходит обращение</span>
              <strong>01—04</strong>
            </div>
            <ol className="dispatch-flow">
              <li>
                <span>01</span>
                <div>
                  <h3>Житель сообщает</h3>
                  <p>
                    По телефону, при личном визите или через переговорное
                    устройство в подъезде и лифте.
                  </p>
                </div>
              </li>
              <li>
                <span>02</span>
                <div>
                  <h3>Диспетчер фиксирует</h3>
                  <p>
                    Обращение регистрируется в журнале или электронной системе
                    учёта.
                  </p>
                </div>
              </li>
              <li>
                <span>03</span>
                <div>
                  <h3>Заявка уходит специалистам</h3>
                  <p>
                    Информация о неисправности передаётся профильной службе или
                    управляющей компании.
                  </p>
                </div>
              </li>
              <li>
                <span>04</span>
                <div>
                  <h3>Результат остаётся под контролем</h3>
                  <p>
                    Сохраняется история обращения и подтверждается выполнение
                    необходимых действий.
                  </p>
                </div>
              </li>
            </ol>
          </div>
        </div>

        <div className="dispatch-zones section-shell">
          <div className="dispatch-zones-title">
            <span>Зоны внимания</span>
            <p>То, что сотрудник видит и контролирует каждый день</p>
          </div>
          <ul>
            <li>
              <span>01</span>
              <p>
                Общее имущество, инженерные коммуникации и оборудование дома
              </p>
            </li>
            <li>
              <span>02</span>
              <p>Порядок в общих зонах и состояние придомовой территории</p>
            </li>
            <li>
              <span>03</span>
              <p>Доступ жителей, посетителей и автотранспорта на территорию</p>
            </li>
            <li>
              <span>04</span>
              <p>Оперативная реакция при аварии или угрозе её возникновения</p>
            </li>
          </ul>
        </div>
      </section>

      <section className="objects" id="objects">
        <div className="objects-head section-shell">
          <div className="section-index light">05 / Объекты</div>
          <p className="eyebrow light">Разные площадки — единый порядок</p>
          <h2>Там, где важно постоянное присутствие</h2>
        </div>
        <div className="objects-list section-shell">
          {objectTypes.map((object, index) => (
            <article className="object-card" key={object.title}>
              <span className="object-number">0{index + 1}</span>
              <div>
                <small>{object.type}</small>
                <h3>{object.title}</h3>
              </div>
              <p>{object.text}</p>
              <span className="object-arrow" aria-hidden="true">
                →
              </span>
            </article>
          ))}
        </div>

        <div className="object-locations section-shell">
          <div className="object-locations-heading">
            <div>
              <p className="eyebrow light">География работы</p>
              <h3>Объекты Респект-5</h3>
            </div>

            <p>
              Жилые комплексы, коммерческие объекты, паркинги и социальная
              инфраструктура в Сантк-Петербурге и Ленинградской области.
            </p>
          </div>

          <div className="object-locations-layout">
            <div className="locations-list">
              {objectLocations.map((location) => (
                <a
                  className="location-row"
                  key={location.number}
                  href={`https://yandex.ru/maps/?text=${encodeURIComponent(
                    location.address
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <span className="location-number">{location.number}</span>
                  <div className="location-info">
                    <h4>{location.title}</h4>
                    <address>{location.address}</address>
                  </div>

                  <span className="location-arrow" aria-hidden="true">
                    ↗
                  </span>
                </a>
              ))}
            </div>

            <div className="locations-map">
              <iframe
                src="https://yandex.ru/map-widget/v1/?um=constructor%3A93c52669c1b883708bbdb59709ca2363a73dc590f976a50df5bd51da7654ba7c&amp;source=constructor"
                width="100%"
                height="100%"
                title="Объекты Респект-5 на карте"
                loading="lazy"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </section>

      <section className="commitment section-shell">
        <div className="commitment-visual" aria-hidden="true">
          <span className="big-five">5</span>
          <div className="visual-caption">
            <b>Респект</b>
            <span>сопровождение объектов</span>
          </div>
        </div>
        <div className="commitment-copy">
          <p className="eyebrow">Рабочие принципы</p>
          <h2>Не пропадаем после подписания договора.</h2>
          <ul>
            <li>
              <span>01</span>
              <p>
                <b>Непрерывность.</b> Не приостанавливаем оказание согласованных
                услуг без предварительного согласования.
              </p>
            </li>
            <li>
              <span>02</span>
              <p>
                <b>Ответственность.</b> Работаем в пределах закреплённой
                договором зоны и требований законодательства.
              </p>
            </li>
            <li>
              <span>03</span>
              <p>
                <b>Прозрачность.</b> Поддерживаем документацию и регулярное
                подтверждение оказанных услуг.
              </p>
            </li>
          </ul>
        </div>
      </section>

      <section className="company section-shell" id="company">
        <div className="section-index">06 / Компания</div>
        <div className="company-heading">
          <p className="eyebrow">Официальные сведения</p>
          <h2>ООО «Респект-5»</h2>
          <p>Сопровождение объектов управляющих компаний в Санкт-Петербурге.</p>
        </div>
        <dl className="requisites">
          {requisites.map(([term, description]) => (
            <div key={term}>
              <dt>{term}</dt>
              <dd>{description}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="contacts" id="contacts">
        <div className="contacts-copy">
          <p className="eyebrow light">Связаться</p>
          <h2>Обсудим задачи вашего объекта</h2>
          <p>
            Расскажите о площадке и нужном формате присутствия — подготовим
            предметное предложение.
          </p>
          <button
            className="primary-button warm"
            type="button"
            onClick={() => setFormOpen(true)}
          >
            Оставить обращение <Arrow />
          </button>
        </div>
        <div className="contacts-data">
          <div>
            <small>Телефон</small>
            <a href={PHONE_LINK}>{PHONE_DISPLAY}</a>
          </div>
          <div>
            <small>Электронная почта</small>
            <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
          </div>
          <div>
            <small>Адрес</small>
            <address>
              196084, г. Санкт-Петербург, МО Московская Застава,
              <br />
              ул. Киевская, д. 3, литера А, помещ. 33-Н, офис 2А
            </address>
            <a
              className="map-link"
              href="https://yandex.ru/maps/?text=Санкт-Петербург%2C%20Киевская%20улица%2C%203"
              target="_blank"
              rel="noreferrer"
            >
              Открыть на карте <Arrow />
            </a>
          </div>
        </div>
      </section>

      <footer className="footer">
        <a className="brand footer-brand" href="#top">
          <span className="brand-sign">
            <b>R</b>
            <i>5</i>
          </span>
          <span className="brand-name">РЕСПЕКТ—5</span>
        </a>
        <div className="footer-copy">
          <p>© {new Date().getFullYear()} ООО «Респект-5»</p>
          <p>Информация на сайте не является публичной офертой.</p>
        </div>
        <a className="to-top" href="#top" aria-label="Наверх">
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
            aria-labelledby="form-title"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <button
              className="modal-close"
              type="button"
              onClick={() => setFormOpen(false)}
              aria-label="Закрыть форму"
            >
              ×
            </button>
            <p className="eyebrow">Обсудить объект</p>
            <h2 id="form-title">Расскажите о вашей задаче</h2>
            <p className="modal-intro">
              После отправки откроется почтовое приложение с готовым письмом на{" "}
              {EMAIL}.
            </p>
            <form onSubmit={handleSubmit}>
              <label>
                <span>Ваше имя</span>
                <input
                  name="name"
                  required
                  autoComplete="name"
                  placeholder="Как к вам обращаться"
                />
              </label>
              <label>
                <span>Организация</span>
                <input
                  name="company"
                  autoComplete="organization"
                  placeholder="Название компании"
                />
              </label>
              <label>
                <span>Телефон или e-mail</span>
                <input
                  name="contact"
                  type="tel"
                  value={phone}
                  onChange={(event) =>
                    setPhone(formatPhone(event.target.value))
                  }
                  onFocus={() => {
                    if (!phone) {
                      setPhone("+7 (");
                    }
                  }}
                  required
                  autoComplete="tel"
                  placeholder="+7 (900) 000 00 00"
                  maxLength={18}
                  pattern="\+7 \(\d{3}\) \d{3} \d{2} \d{2}"
                  title="Введите телефон в формате +7 (900) 000 00 00"
                />
              </label>
              <label>
                <span>Тип объекта</span>
                <select name="objectType" defaultValue="Бизнес-центр">
                  <option>Бизнес-центр</option>
                  <option>Жилой комплекс</option>
                  <option>Диспетчеризация МКД</option>
                  <option>Причальный объект</option>
                  <option>Складской объект</option>
                  <option>Другой объект</option>
                </select>
              </label>
              <label className="wide">
                <span>Сообщение</span>
                <textarea
                  name="message"
                  rows={4}
                  required
                  placeholder="Коротко опишите объект и необходимые задачи"
                />
              </label>
              <label className="consent wide">
                <input type="checkbox" required />
                <span>
                  Согласен на обработку данных, указанных в обращении.
                </span>
              </label>
              <button className="primary-button wide" type="submit">
                Подготовить письмо <Arrow />
              </button>
            </form>
          </section>
        </div>
      )}
    </main>
  );
}
