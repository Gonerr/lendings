"use client";

import {
  type ChangeEvent,
  type FormEvent,
  useEffect,
  useMemo,
  useState,
} from "react";

const PHONE = "+7 (812) 207-26-71";
const EMAIL = "Vlihota@fnek.ru";

const clients = [
  "ЖК «Рубин»",
  "ЖК «Топаз»",
  "ЖК «Байрон»",
  "ЖК «Гранит»",
  "ЖК «Изумруд»",
  "ЖК «Лондон парк»",
  "Л1 Строительная компания №1",
  "НПО «Пигмент»",
  "Механический завод СПб",
  "Знамя труда",
  "Инвест Строй",
  "Корпорация «ЛЭК»",
  "Завод №3",
  "Верона Менеджмент",
];

const directions = [
  {
    code: "01 / SECURITY",
    title: "Физическая охрана",
    text: "Лицензированные сотрудники охраны, круглосуточные посты, патрулирование территории и оперативная реакция на угрозы.",
    price: "от 150 ₽ / час",
  },
  {
    code: "02 / SERVICE",
    title: "Обслуживающий персонал",
    text: "Администраторы и консьержи для жилых комплексов. Контроль посетителей, обращений жильцов и порядка во входных группах.",
    price: "от 100 ₽ / час",
  },
  {
    code: "03 / AUDIT",
    title: "Аудит безопасности",
    text: "Комплексная оценка уязвимостей, пропускного режима, постов и технических средств. При заключении договора — за наш счёт.",
    price: "индивидуальный расчёт",
  },
];

const vacancies = [
  {
    title: "Лицензированный охранник",
    tag: "SECURITY",
    text: "Охрана жилых комплексов, строительных объектов и складских помещений.",
  },
  {
    title: "Администратор",
    tag: "SERVICE",
    text: "Работа во входной группе жилого комплекса, взаимодействие с жильцами и посетителями.",
  },
];

const benefits = [
  "Заработная плата дважды в месяц",
  "Официальное оформление и социальный пакет",
  "Доход от 22 000 до 43 000 рублей",
  "Гибкие и плотные графики для подработки",
  "Возможность выбрать объект рядом с домом",
  "Перспективы карьерного роста",
];

const requisites = [
  ["Полное наименование", "ООО «Респект-4»"],
  ["Дата регистрации", "26 января 2007 года"],
  ["ОГРН", "1079847051602"],
  ["ИНН / КПП", "7842350400 / 781001001"],
  ["Генеральный директор", "Березина Олеся Александровна"],
  ["Юридический адрес", "196084, Санкт-Петербург, ул. Киевская, д. 3, литер А, пом. 33-Н, офис 2"],
  ["Налоговый режим", "УСН · малое предприятие"],
];

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const [prepared, setPrepared] = useState(false);
  const [form, setForm] = useState({ name: "", contact: "", topic: "", message: "" });

  const emailBody = useMemo(
    () => [
      "Обращение с сайта ООО «Респект-4»",
      "",
      `Имя: ${form.name}`,
      `Телефон или e-mail: ${form.contact}`,
      `Тема: ${form.topic || "не указана"}`,
      "",
      form.message || "Прошу связаться со мной для уточнения деталей.",
    ].join("\n"),
    [form],
  );

  const mailto = useMemo(
    () => `mailto:${EMAIL}?subject=${encodeURIComponent("Обращение с сайта Респект-4")}&body=${encodeURIComponent(emailBody)}`,
    [emailBody],
  );

  useEffect(() => {
    if (!isOpen) return undefined;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };

    document.body.classList.add("modal-open");
    window.addEventListener("keydown", closeOnEscape);

    return () => {
      document.body.classList.remove("modal-open");
      window.removeEventListener("keydown", closeOnEscape);
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

  const update = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  };

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setPrepared(true);
    window.location.href = mailto;
  };

  return (
    <main id="top">
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Респект-4 — на главную">
          <span className="brand-mark">R4</span>
          <span className="brand-copy"><strong>РЕСПЕКТ-4</strong><small>Охрана &amp; сервис</small></span>
        </a>

        <nav aria-label="Основная навигация">
          <a href="#about">Компания</a>
          <a href="#services">Услуги</a>
          <a href="#clients">Клиенты</a>
          <a href="#jobs">Вакансии</a>
          <a href="#contacts">Контакты</a>
        </nav>

        <button className="header-action" type="button" onClick={openForm}>Связаться <span>↗</span></button>

        <details className="mobile-menu">
          <summary>Меню</summary>
          <nav aria-label="Мобильная навигация">
            <a href="#about">Компания</a>
            <a href="#services">Услуги</a>
            <a href="#clients">Клиенты</a>
            <a href="#jobs">Вакансии</a>
            <a href="#contacts">Контакты</a>
          </nav>
        </details>
      </header>

      <section className="hero">
        <div className="hero-copy">
          <div className="hero-meta"><span>Санкт-Петербург</span><span>На рынке с 2007 года</span></div>
          <p className="kicker">PRIVATE SECURITY / FACILITY SERVICE</p>
          <h1>Порядок —<br /><em>не случайность.</em></h1>
          <p className="hero-lead">Охраняем и обслуживаем жилые комплексы, строительные объекты и складские помещения. Выстраиваем систему, в которой люди, режим и техника работают вместе.</p>
          <div className="hero-actions">
            <button className="primary-action" type="button" onClick={openForm}>Обсудить объект <span>↗</span></button>
            <a href="#services">Смотреть услуги <span>↓</span></a>
          </div>
        </div>

        <div className="control-map" aria-hidden="true">
          <div className="map-head"><span>OBJECT / CONTROL MAP</span><span>R4 · SPB</span></div>
          <div className="map-stage">
            <div className="route-line" />
            <div className="route-node node-a"><i>01</i><span>Вход</span></div>
            <div className="route-node node-b"><i>02</i><span>Двор</span></div>
            <div className="route-node node-c"><i>03</i><span>Паркинг</span></div>
            <div className="route-node node-d"><i>04</i><span>Персонал</span></div>
            <div className="moving-guard">R4</div>
            <span className="map-caption">Контроль маршрута / 24 часа</span>
          </div>
          <div className="map-foot"><span>Доступ</span><span>Территория</span><span>Реагирование</span></div>
        </div>
      </section>

      <div className="ticker" aria-label="Направления работы">
        <div>
          <span>Жилые комплексы</span><i>◆</i><span>Строительные объекты</span><i>◆</i><span>Складские помещения</span><i>◆</i><span>Консьержи и администраторы</span><i>◆</i>
          <span>Жилые комплексы</span><i>◆</i><span>Строительные объекты</span><i>◆</i><span>Складские помещения</span><i>◆</i><span>Консьержи и администраторы</span><i>◆</i>
        </div>
      </div>

      <section className="about section-shell" id="about">
        <div className="section-side"><span>01</span><p>О компании</p></div>
        <div className="about-content">
          <p className="kicker dark">LONG-TERM SECURITY PARTNER</p>
          <h2>Партнёрство,<br />рассчитанное <em>надолго.</em></h2>
          <div className="about-grid">
            <p className="about-lead">ООО «Респект-4» организует круглосуточную физическую охрану объектов и прилегающих территорий, внутриобъектовый и пропускной режим, контроль въезда и выезда транспорта.</p>
            <div>
              <p>Мы специализируемся на объектах повышенной сложности: многоквартирных жилых комплексах, строительных площадках и складах. Большие площади, открытые пространства, жильцы, персонал и дорогостоящие материалы требуют не шаблонного поста, а продуманной системы.</p>
              <p>Технические средства обнаруживают угрозу, но решение принимает человек. Поэтому надёжная охрана строится на сочетании регламентов, оборудования и подготовленных сотрудников.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="services" id="services">
        <div className="services-head section-shell">
          <div className="section-side light"><span>02</span><p>Услуги</p></div>
          <div><p className="kicker">SECURITY / SERVICE / AUDIT</p><h2>Три направления.<br />Одна система контроля.</h2></div>
        </div>

        <div className="service-cards section-shell">
          {directions.map((direction) => (
            <article key={direction.code}>
              <span className="service-code">{direction.code}</span>
              <h3>{direction.title}</h3>
              <p>{direction.text}</p>
              <strong>{direction.price}</strong>
            </article>
          ))}
        </div>
        <p className="price-note section-shell">Указана ориентировочная стоимость из первоисточника. Итоговые условия и стоимость определяются после обследования объекта. Информация не является публичной офертой.</p>
      </section>

      <section className="specialization section-shell">
        <div className="statement-card">
          <span>NOT UNIVERSAL. SPECIALIZED.</span>
          <h2>Мы не охраняем всё подряд.</h2>
          <p>Наша специализация — объекты, где особенно важны дисциплина доступа, контроль больших территорий и постоянное присутствие сотрудников.</p>
        </div>
        <div className="object-list">
          <div><span>01</span><h3>Жилые комплексы</h3><p>Входные группы, дворы, паркинги, работа с управляющими компаниями и жильцами.</p></div>
          <div><span>02</span><h3>Строительные объекты</h3><p>Контроль подрядчиков, транспорта, материалов и дорогостоящей техники.</p></div>
          <div><span>03</span><h3>Складские помещения</h3><p>Защита имущества, пропускной режим и соблюдение внутренних регламентов.</p></div>
        </div>
      </section>

      <section className="clients" id="clients">
        <div className="clients-heading section-shell">
          <p className="kicker dark">TRUSTED BY / SELECTED CLIENTS</p>
          <h2>Нам доверяли жилые комплексы, производства и застройщики.</h2>
        </div>
        <div className="client-grid section-shell">
          {clients.map((client, index) => <div key={client}><span>{String(index + 1).padStart(2, "0")}</span><p>{client}</p></div>)}
        </div>
      </section>

      <section className="jobs" id="jobs">
        <div className="jobs-main section-shell">
          <div className="jobs-heading">
            <p className="kicker">CAREERS / RESPEKT-4</p>
            <h2>Работа, где важны люди.</h2>
            <p>Подбираем объект и график с учётом места проживания и возможностей сотрудника.</p>
            <button className="acid-action" type="button" onClick={openForm}>Откликнуться <span>↗</span></button>
          </div>
          <div className="vacancy-list">
            {vacancies.map((vacancy) => (
              <article key={vacancy.title}>
                <span>{vacancy.tag}</span><h3>{vacancy.title}</h3><p>{vacancy.text}</p>
              </article>
            ))}
          </div>
        </div>
        <div className="benefits section-shell">
          {benefits.map((benefit, index) => <div key={benefit}><span>{String(index + 1).padStart(2, "0")}</span><p>{benefit}</p></div>)}
        </div>
      </section>

      <section className="contacts" id="contacts">
        <div className="contact-shell section-shell">
          <div>
            <p className="kicker dark">CONTACT / START HERE</p>
            <h2>Обсудим объект<br />или вакансию.</h2>
            <button className="primary-action dark-action" type="button" onClick={openForm}>Написать нам <span>↗</span></button>
          </div>
          <address>
            <div><span>Телефон отдела кадров</span><a href="tel:+78122072671">{PHONE}</a></div>
            <div><span>Электронная почта</span><a href={`mailto:${EMAIL}`}>{EMAIL}</a></div>
            <div><span>Юридический адрес</span><p>196084, Санкт-Петербург,<br />ул. Киевская, д. 3, литер А,<br />пом. 33-Н, офис 2</p></div>
          </address>
        </div>
      </section>

      <section className="legal section-shell">
        <div className="legal-heading"><span>LEGAL / 04</span><h2>Реквизиты компании</h2></div>
        <dl>
          {requisites.map(([term, value]) => <div key={term}><dt>{term}</dt><dd>{value}</dd></div>)}
        </dl>
      </section>

      <footer>
        <div className="footer-main section-shell">
          <a className="brand footer-brand" href="#top"><span className="brand-mark">R4</span><span className="brand-copy"><strong>РЕСПЕКТ-4</strong><small>Охрана &amp; сервис</small></span></a>
          <a href="tel:+78122072671">{PHONE}</a>
          <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
          <button type="button" onClick={openForm}>Связаться ↗</button>
        </div>
        <div className="footer-bottom section-shell"><span>© 2026 ООО «Респект-4»</span><span>Информация на сайте не является публичной офертой</span></div>
      </footer>

      {isOpen && (
        <div className="modal-backdrop" onMouseDown={closeForm} role="presentation">
          <section className="request-modal" role="dialog" aria-modal="true" aria-labelledby="request-title" onMouseDown={(event) => event.stopPropagation()}>
            <button className="modal-close" type="button" onClick={closeForm} aria-label="Закрыть форму">×</button>
            {!prepared ? (
              <>
                <p className="kicker dark">CONTACT / R4</p>
                <h2 id="request-title">Начать разговор</h2>
                <p className="modal-note">Заполните форму — мы подготовим письмо на {EMAIL} и откроем его в вашей почтовой программе.</p>
                <form onSubmit={submit}>
                  <label>Ваше имя<input name="name" value={form.name} onChange={update} autoFocus required /></label>
                  <label>Телефон или e-mail<input name="contact" value={form.contact} onChange={update} required /></label>
                  <label>Тема обращения<select name="topic" value={form.topic} onChange={update} required><option value="">Выберите тему</option><option>Охрана объекта</option><option>Обслуживающий персонал</option><option>Аудит безопасности</option><option>Отклик на вакансию</option></select></label>
                  <label>Комментарий<textarea name="message" rows={4} value={form.message} onChange={update} /></label>
                  <label className="consent"><input type="checkbox" required /><span>Согласен(на) на обработку указанных данных для ответа на обращение</span></label>
                  <button className="primary-action form-action" type="submit">Отправить по e-mail <span>↗</span></button>
                </form>
              </>
            ) : (
              <div className="prepared-state">
                <span className="prepared-icon">✓</span>
                <h2 id="request-title">Письмо подготовлено</h2>
                <p>Проверьте данные и нажмите «Отправить» в почтовой программе. Получатель — {EMAIL}.</p>
                <a className="primary-action form-action" href={mailto}>Открыть почту ещё раз <span>↗</span></a>
              </div>
            )}
          </section>
        </div>
      )}
    </main>
  );
}
