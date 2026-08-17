"use client";

import { useEffect, useMemo, useState } from "react";

const PHONE = "+7 (812) 207-37-38";
const EMAIL = "orespekt5@yandex.ru";

const services = [
  {
    index: "01",
    code: "RESIDENTIAL",
    title: "Жилые комплексы",
    text: "Контроль территории и входных групп, порядок во дворе, работа с парковкой и предотвращение несанкционированного доступа.",
    meta: "Дома · дворы · паркинги",
  },
  {
    index: "02",
    code: "CONSTRUCTION",
    title: "Строительные объекты",
    text: "Сохранность материалов, техники и инструмента, контроль подрядчиков, транспорта и перемещений по территории.",
    meta: "КПП · патрулирование · режим",
  },
  {
    index: "03",
    code: "INDUSTRIAL",
    title: "Склады и производства",
    text: "Физическая охрана материальных ценностей, контроль внутренних распорядков и безопасность сотрудников объекта.",
    meta: "Имущество · персонал · доступ",
  },
  {
    index: "04",
    code: "AUDIT",
    title: "Аудит безопасности",
    text: "Анализ физической охраны, видеонаблюдения, документации и действующей системы контроля доступа.",
    meta: "Анализ · риски · рекомендации",
  },
];

const requisites = [
  ["Полное наименование", "ООО «Частная охранная организация Респект-2»"],
  ["Дата регистрации", "07 октября 2004 года"],
  ["ОГРН", "1047855102888"],
  ["ИНН / КПП", "7841304024 / 781001001"],
  ["Генеральный директор", "Серобаба Василий Васильевич"],
  ["Юридический адрес", "196066, Санкт-Петербург, Московский пр., д. 183-185, стр. 2, пом. 251Н"],
  ["Налоговый режим", "УСН · малое предприятие"],
];

function Arrow() {
  return <span aria-hidden="true">↗</span>;
}

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const [prepared, setPrepared] = useState(false);
  const [form, setForm] = useState({ name: "", contact: "", object: "", message: "" });

  const body = useMemo(
    () =>
      [
        "Заявка с сайта ООО «ЧОО Респект-2»",
        "",
        `Имя: ${form.name}`,
        `Телефон или e-mail: ${form.contact}`,
        `Тип объекта: ${form.object || "не указан"}`,
        "",
        form.message || "Прошу связаться со мной для обсуждения охраны объекта.",
      ].join("\n"),
    [form],
  );

  const mailto = useMemo(
    () => `mailto:${EMAIL}?subject=${encodeURIComponent("Заявка на охрану объекта")}&body=${encodeURIComponent(body)}`,
    [body],
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
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  };

  const submit = (event) => {
    event.preventDefault();
    setPrepared(true);
    window.location.href = mailto;
  };

  return (
    <main>
      <header className="site-header">
        <a className="logo" href="#top" aria-label="Респект-2 — на главную">
          <span className="logo-box">R<span>/2</span></span>
          <span className="logo-copy">РЕСПЕКТ<span>Частная охранная организация</span></span>
        </a>

        <nav aria-label="Основная навигация">
          <a href="#about">Компания</a>
          <a href="#services">Услуги</a>
          <a href="#protocol">Подход</a>
          <a href="#contacts">Контакты</a>
        </nav>

        <button className="header-contact" type="button" onClick={openForm}>
          Связаться <Arrow />
        </button>

        <details className="mobile-menu">
          <summary aria-label="Открыть меню">Меню</summary>
          <nav aria-label="Мобильная навигация">
            <a href="#about">Компания</a>
            <a href="#services">Услуги</a>
            <a href="#protocol">Подход</a>
            <a href="#contacts">Контакты</a>
          </nav>
        </details>
      </header>

      <section className="hero" id="top">
        <div className="grid-field" aria-hidden="true" />
        <div className="scan-line" aria-hidden="true" />
        <div className="hero-shell">
          <div className="hero-topline">
            <span>Санкт-Петербург</span>
            <span>На рынке с 2004 года</span>
            <span className="status"><i /> Система активна</span>
          </div>

          <div className="hero-main">
            <div className="hero-copy">
              <p className="section-code">PRIVATE SECURITY / SPB</p>
              <h1>Режим<br /><em>безопасности</em></h1>
              <p className="hero-lead">
                Физическая охрана сложных объектов: от жилого комплекса до строительной площадки.
                Выстраиваем контроль, который работает не на бумаге, а на территории.
              </p>
              <div className="hero-actions">
                <button className="primary-button" type="button" onClick={openForm}>
                  Запросить расчёт <Arrow />
                </button>
                <a className="inline-link" href="tel:+78122073738">{PHONE}</a>
              </div>
            </div>

            <div className="radar-card" aria-hidden="true">
              <div className="radar-header"><span>SECURITY GRID</span><span>78.001 / SPB</span></div>
              <div className="radar">
                <span className="radar-core">R/2</span>
                <i className="pulse pulse-a" /><i className="pulse pulse-b" />
                <i className="target target-a" /><i className="target target-b" /><i className="target target-c" />
              </div>
              <div className="radar-footer"><span>Контроль периметра</span><strong>24 / 7</strong></div>
            </div>
          </div>

          <div className="hero-metrics">
            <div><strong>20+</strong><span>лет практического опыта</span></div>
            <div><strong>04</strong><span>основных направления</span></div>
            <div><strong>360°</strong><span>комплексный взгляд на объект</span></div>
          </div>
        </div>
      </section>

      <div className="ticker" aria-label="Направления деятельности">
        <div>
          <span>Физическая охрана</span><i>•</i><span>Пропускной режим</span><i>•</i>
          <span>Контроль территории</span><i>•</i><span>Аудит безопасности</span><i>•</i>
          <span>Физическая охрана</span><i>•</i><span>Пропускной режим</span><i>•</i>
          <span>Контроль территории</span><i>•</i><span>Аудит безопасности</span><i>•</i>
        </div>
      </div>

      <section className="mandate section-shell" id="about">
        <div className="section-index"><span>00</span><p>Компания</p></div>
        <div className="mandate-body">
          <p className="section-code dark">МАНДАТ / ФИЗИЧЕСКАЯ ЗАЩИТА</p>
          <h2>Безопасность начинается<br />с понимания объекта.</h2>
          <div className="mandate-grid">
            <p className="lead-copy">
              ООО «ЧОО Респект-2» организует круглосуточную физическую охрану объектов и прилегающих
              территорий, внутриобъектовый и пропускной режим, контроль въезда и выезда транспорта.
            </p>
            <div className="text-columns">
              <p>Компания специализируется на объектах повышенной сложности: жилых комплексах, строительных площадках и производственно-складских территориях.</p>
              <p>Технические средства дополняются работой лицензированных сотрудников, способных оценить ситуацию и оперативно отреагировать на угрозу.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="services-section" id="services">
        <div className="section-shell services-heading">
          <div className="section-index light-index"><span>01</span><p>Направления</p></div>
          <div>
            <p className="section-code">CAPABILITIES / FOUR DOMAINS</p>
            <h2>Охрана под реальную<br />конфигурацию объекта</h2>
          </div>
        </div>
        <div className="service-list section-shell">
          {services.map((service) => (
            <article className="service-row" key={service.index}>
              <div className="service-no">{service.index}</div>
              <div className="service-title"><span>{service.code}</span><h3>{service.title}</h3></div>
              <p>{service.text}</p>
              <div className="service-meta">{service.meta}</div>
            </article>
          ))}
        </div>
      </section>

      <section className="protocol section-shell" id="protocol">
        <div className="section-index"><span>02</span><p>Протокол</p></div>
        <div className="protocol-content">
          <p className="section-code dark">OPERATING MODEL / 03 STEPS</p>
          <h2>Сначала риски.<br />Потом посты.</h2>
          <p className="protocol-intro">Не начинаем с шаблонной сметы. Сначала понимаем, что именно нужно защищать, где возникают уязвимости и какой режим действительно нужен объекту.</p>
          <div className="protocol-grid">
            <article><span>01 / ANALYZE</span><div className="protocol-icon">A</div><h3>Обследуем</h3><p>Периметр, потоки людей и транспорта, действующие технические средства и регламенты.</p></article>
            <article><span>02 / CONFIGURE</span><div className="protocol-icon">C</div><h3>Проектируем</h3><p>Состав постов, маршруты патрулирования, пропускной режим и порядок реагирования.</p></article>
            <article><span>03 / CONTROL</span><div className="protocol-icon">R</div><h3>Контролируем</h3><p>Запускаем систему, фиксируем ответственность и поддерживаем рабочую дисциплину.</p></article>
          </div>
        </div>
      </section>

      <section className="statement">
        <div className="statement-grid" aria-hidden="true" />
        <div className="section-shell statement-inner">
          <span>R/2 — RESPEKT SECURITY</span>
          <blockquote>Техника обнаруживает.<br />Человек принимает решение.</blockquote>
          <p>Надёжная охрана строится как единая система: обученные сотрудники, понятные регламенты, контроль доступа и технические средства работают вместе.</p>
        </div>
      </section>

      <section className="details-section" id="details">
        <div className="section-shell details-grid">
          <div className="details-heading">
            <div className="section-index"><span>03</span><p>Реквизиты</p></div>
            <div>
              <p className="section-code dark">LEGAL / COMPANY DATA</p>
              <h2>ООО «ЧОО<br />Респект-2»</h2>
              <p>Официальные сведения для договоров и деловой переписки.</p>
            </div>
          </div>
          <dl className="requisites">
            {requisites.map(([term, value]) => <div key={term}><dt>{term}</dt><dd>{value}</dd></div>)}
          </dl>
        </div>
      </section>

      <section className="contacts" id="contacts">
        <div className="contact-grid section-shell">
          <div className="contact-main">
            <p className="section-code">CONTACT / START A CONVERSATION</p>
            <h2>Защитим то,<br />что важно.</h2>
            <p>Расскажите об объекте — подготовим обращение и свяжемся для уточнения задач, режима и состава охраны.</p>
            <button className="primary-button blue-button" type="button" onClick={openForm}>Обсудить объект <Arrow /></button>
          </div>
          <div className="contact-data">
            <div><span>Телефон</span><a href="tel:+78122073738">{PHONE}</a></div>
            <div><span>Электронная почта</span><a href={`mailto:${EMAIL}`}>{EMAIL}</a></div>
            <div>
              <span>Адрес для связи</span>
              <address>196066, Санкт-Петербург,<br />Московский пр., д. 183-185,<br />литер Б, пом. 251-Н</address>
              <a className="map-link" href="https://yandex.ru/maps/?text=Санкт-Петербург%2C%20Московский%20проспект%2C%20183-185" target="_blank" rel="noreferrer">Открыть в картах <Arrow /></a>
            </div>
          </div>
        </div>
        <div className="privacy-row section-shell">
          <span>Обработка персональных данных начата 07.10.2004</span>
          <span>Запись в реестре: приказ № 403 от 25.06.2025</span>
          <span>Условие прекращения: ликвидация юридического лица</span>
        </div>
      </section>

      <footer>
        <div className="section-shell footer-top">
          <a className="logo" href="#top"><span className="logo-box">R<span>/2</span></span><span className="logo-copy">РЕСПЕКТ<span>Частная охранная организация</span></span></a>
          <a href="tel:+78122073738">{PHONE}</a>
          <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
          <button type="button" onClick={openForm}>Запросить консультацию <Arrow /></button>
        </div>
        <div className="section-shell footer-bottom"><span>© 2026 ООО «ЧОО Респект-2»</span><span>Информация на сайте не является публичной офертой</span></div>
      </footer>

      {isOpen && (
        <div className="modal-backdrop" onMouseDown={closeForm} role="presentation">
          <section className="request-modal" role="dialog" aria-modal="true" aria-labelledby="request-title" onMouseDown={(event) => event.stopPropagation()}>
            <button className="modal-close" type="button" onClick={closeForm} aria-label="Закрыть форму">×</button>
            {!prepared ? (
              <>
                <p className="section-code dark">SECURE CONTACT / R2</p>
                <h2 id="request-title">Обсудить охрану объекта</h2>
                <p className="modal-note">Заполните форму — мы подготовим письмо на {EMAIL} и откроем его в вашем почтовом приложении.</p>
                <form onSubmit={submit}>
                  <label>Ваше имя<input name="name" value={form.name} onChange={update} autoFocus required /></label>
                  <label>Телефон или e-mail<input name="contact" value={form.contact} onChange={update} required /></label>
                  <label>Тип объекта<select name="object" value={form.object} onChange={update}><option value="">Выберите вариант</option><option>Жилой комплекс</option><option>Строительный объект</option><option>Склад или производство</option><option>Аудит безопасности</option><option>Другой объект</option></select></label>
                  <label>Комментарий<textarea name="message" rows="4" value={form.message} onChange={update} /></label>
                  <label className="consent"><input type="checkbox" required /><span>Согласен(на) на обработку указанных данных для ответа на обращение</span></label>
                  <button className="primary-button form-button" type="submit">Отправить по e-mail <Arrow /></button>
                </form>
              </>
            ) : (
              <div className="prepared-state">
                <span className="prepared-icon">✓</span>
                <p className="section-code dark">MESSAGE READY</p>
                <h2 id="request-title">Письмо подготовлено</h2>
                <p>Проверьте данные и нажмите «Отправить» в почтовом приложении. Получатель — {EMAIL}.</p>
                <a className="primary-button form-button" href={mailto}>Открыть почту ещё раз <Arrow /></a>
              </div>
            )}
          </section>
        </div>
      )}
    </main>
  );
}
