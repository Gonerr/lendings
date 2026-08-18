"use client";

import {
  type ChangeEvent,
  type FormEvent,
  useEffect,
  useMemo,
  useState,
} from "react";

const services = [
  {
    code: "01 / WATER",
    title: "Сантехнические работы",
    text: "Обслуживание инженерных сетей, устранение неисправностей, замена элементов и плановые работы на объектах управляющих компаний.",
    marker: "ВОДА / ТЕПЛО / СЕТИ",
  },
  {
    code: "02 / POWER",
    title: "Электротехнические работы",
    text: "Диагностика и обслуживание электрооборудования, освещения и общедомовых систем в пределах эксплуатационных задач.",
    marker: "СВЕТ / ЩИТЫ / ЛИНИИ",
  },
  {
    code: "03 / REPAIR",
    title: "Плотницкие работы",
    text: "Текущий ремонт дверей, фурнитуры, конструкций и элементов общего имущества жилых домов.",
    marker: "ДВЕРИ / ФУРНИТУРА / РЕМОНТ",
  },
];

const workflow = [
  ["01", "Заявка", "Получаем задачу от управляющей компании и фиксируем исходные данные по объекту."],
  ["02", "Распределение", "Определяем профиль работ и направляем подходящего технического специалиста."],
  ["03", "Выполнение", "Проводим диагностику и выполняем согласованный объём работ на объекте."],
  ["04", "Результат", "Передаём информацию о выполнении и необходимых дальнейших действиях."],
];

const principles = [
  "Один технический контур для нескольких профилей работ",
  "Понятное взаимодействие с управляющей компанией",
  "Специалисты по конкретным эксплуатационным задачам",
  "Последовательная работа от заявки до результата",
];

const requisites = [
  ["Полное наименование", "ООО «Респект - 3»"],
  ["Дата регистрации", "18 октября 2004 года"],
  ["ОГРН", "1047855112502"],
  ["ИНН / КПП", "7841304480 / 781001001"],
  ["Генеральный директор", "Сидорова Наталья Петровна"],
  ["Юридический адрес", "196084, Санкт-Петербург, ул. Киевская, д. 3, литера А, пом. 33-Н, офис 1"],
];

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const [prepared, setPrepared] = useState(false);
  const [copied, setCopied] = useState(false);
  const [form, setForm] = useState({ name: "", company: "", contact: "", topic: "", message: "" });

  const requestText = useMemo(
    () => [
      "Заявка для ООО «Респект-3»",
      "",
      `Контактное лицо: ${form.name}`,
      `Организация / УК: ${form.company}`,
      `Телефон или e-mail: ${form.contact}`,
      `Направление: ${form.topic || "не указано"}`,
      "",
      form.message || "Просим связаться для уточнения технической задачи.",
    ].join("\n"),
    [form],
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
    setCopied(false);
    setIsOpen(true);
  };

  const closeForm = () => {
    setIsOpen(false);
    setPrepared(false);
    setCopied(false);
  };

  const update = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  };

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setPrepared(true);
  };

  const copyRequest = async () => {
    await navigator.clipboard.writeText(requestText);
    setCopied(true);
  };

  return (
    <main id="top">
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Респект-3 — на главную">
          <span className="brand-mark">R3</span>
          <span className="brand-copy"><strong>РЕСПЕКТ-3</strong><small>Техническое сопровождение</small></span>
        </a>

        <nav aria-label="Основная навигация">
          <a href="#about">Компания</a>
          <a href="#services">Направления</a>
          <a href="#process">Как работаем</a>
          <a href="#partner">Партнёрство</a>
          <a href="#contacts">Контакты</a>
        </nav>

        <button className="header-action" type="button" onClick={openForm}>Оставить заявку <span>↗</span></button>

        <details className="mobile-menu">
          <summary>Меню</summary>
          <nav aria-label="Мобильная навигация">
            <a href="#about">Компания</a>
            <a href="#services">Направления</a>
            <a href="#process">Как работаем</a>
            <a href="#partner">Партнёрство</a>
            <a href="#contacts">Контакты</a>
          </nav>
        </details>
      </header>

      <section className="hero">
        <div className="hero-copy">
          <div className="hero-meta"><span>Санкт-Петербург</span><span>Основано в 2004 году</span></div>
          <p className="kicker">TECHNICAL FACILITY SUPPORT</p>
          <h1>Дом должен<br /><em>работать.</em></h1>
          <p className="hero-lead">ООО «Респект-3» обеспечивает техническое сопровождение объектов управляющих компаний «Континент»: сантехнические, электротехнические и плотницкие работы.</p>
          <div className="hero-actions">
            <button className="primary-action" type="button" onClick={openForm}>Поставить задачу <span>↗</span></button>
            <a href="#services">Наши направления <span>↓</span></a>
          </div>
        </div>

        <div className="system-board" aria-hidden="true">
          <div className="board-head"><span>BUILDING / SERVICE BOARD</span><span>R3 · SPB</span></div>
          <div className="building-scheme">
            <div className="building-outline">
              <div className="roof-line" />
              <div className="floor floor-top"><span>03</span><b>Электрика</b><i>●</i></div>
              <div className="floor"><span>02</span><b>Плотницкие работы</b><i>●</i></div>
              <div className="floor"><span>01</span><b>Сантехника</b><i>●</i></div>
              <div className="base-line"><span>Техническая служба</span><strong>R3</strong></div>
            </div>
            <div className="pulse-line"><span>ЗАЯВКА</span><i /><span>СПЕЦИАЛИСТ</span><i /><span>РЕЗУЛЬТАТ</span></div>
          </div>
          <div className="board-foot"><span>Инженерные системы</span><span>Общее имущество</span><span>Эксплуатация</span></div>
        </div>
      </section>

      <div className="ticker" aria-label="Направления работы">
        <div>
          <span>Сантехники</span><i>◆</i><span>Электрики</span><i>◆</i><span>Плотники</span><i>◆</i><span>Техническое сопровождение</span><i>◆</i>
          <span>Сантехники</span><i>◆</i><span>Электрики</span><i>◆</i><span>Плотники</span><i>◆</i><span>Техническое сопровождение</span><i>◆</i>
        </div>
      </div>

      <section className="about section-shell" id="about">
        <div className="section-side"><span>01</span><p>О компании</p></div>
        <div className="about-content">
          <p className="kicker dark">EVERYDAY BUILDING OPERATIONS</p>
          <h2>Техническая работа,<br />которую <em>видно по результату.</em></h2>
          <div className="about-grid">
            <p className="about-lead">Мы помогаем управляющим компаниям поддерживать общее имущество и инженерные системы жилых домов в рабочем состоянии.</p>
            <div>
              <p>Техническое сопровождение складывается из десятков регулярных и срочных задач. Для каждой из них нужен специалист нужного профиля, понятная постановка и контроль результата.</p>
              <p>«Респект-3» объединяет сантехнические, электротехнические и плотницкие работы в единый рабочий контур для управляющих компаний «Континент».</p>
            </div>
          </div>
        </div>
      </section>

      <section className="services" id="services">
        <div className="services-head section-shell">
          <div className="section-side light"><span>02</span><p>Направления</p></div>
          <div><p className="kicker">PLUMBING / ELECTRICAL / CARPENTRY</p><h2>Три профиля.<br />Одна техническая служба.</h2></div>
        </div>

        <div className="service-cards section-shell">
          {services.map((service) => (
            <article key={service.code}>
              <span className="service-code">{service.code}</span>
              <h3>{service.title}</h3>
              <p>{service.text}</p>
              <strong>{service.marker}</strong>
            </article>
          ))}
        </div>
        <p className="service-note section-shell">Конкретный состав, сроки и условия работ определяются договором с управляющей компанией и параметрами объекта.</p>
      </section>

      <section className="process section-shell" id="process">
        <div className="process-heading">
          <p className="kicker dark">FROM REQUEST TO RESULT</p>
          <h2>Понятный маршрут каждой задачи.</h2>
        </div>
        <div className="process-grid">
          {workflow.map(([number, title, text]) => (
            <article key={number}><span>{number}</span><h3>{title}</h3><p>{text}</p></article>
          ))}
        </div>
      </section>

      <section className="partner" id="partner">
        <div className="partner-shell section-shell">
          <div className="partner-mark"><span>К</span><i>ПАРТНЁРСКИЙ КОНТУР</i></div>
          <div className="partner-copy">
            <p className="kicker">MANAGEMENT COMPANY SUPPORT</p>
            <h2>Работаем для управляющих компаний «Континент».</h2>
            <p>Понимаем специфику жилых домов и ежедневной эксплуатации: большое количество параллельных заявок, разные профили работ и необходимость сохранять понятную коммуникацию между объектом, управляющей компанией и специалистом.</p>
          </div>
        </div>
      </section>

      <section className="principles section-shell">
        <div className="principles-heading"><span>04 / ПОДХОД</span><h2>Без лишнего шума.<br />По существу задачи.</h2></div>
        <div className="principle-list">
          {principles.map((principle, index) => <div key={principle}><span>{String(index + 1).padStart(2, "0")}</span><p>{principle}</p></div>)}
        </div>
      </section>

      <section className="contacts" id="contacts">
        <div className="contact-shell section-shell">
          <div>
            <p className="kicker">CONTACT / SERVICE REQUEST</p>
            <h2>Есть техническая задача?</h2>
            <button className="primary-action light-action" type="button" onClick={openForm}>Подготовить заявку <span>↗</span></button>
          </div>
          <address>
            <div><span>Организация</span><strong>ООО «Респект - 3»</strong></div>
            <div><span>Юридический адрес</span><p>196084, Санкт-Петербург,<br />ул. Киевская, д. 3, литера А,<br />пом. 33-Н, офис 1</p></div>
            <div className="contact-caveat"><span>Телефон и e-mail</span><p>Официальные публичные контакты не указаны. Заявки передаются через действующий канал управляющей компании.</p></div>
          </address>
        </div>
      </section>

      <section className="legal section-shell">
        <div className="legal-heading"><span>LEGAL / 05</span><h2>Реквизиты компании</h2></div>
        <dl>
          {requisites.map(([term, value]) => <div key={term}><dt>{term}</dt><dd>{value}</dd></div>)}
        </dl>
      </section>

      <footer>
        <div className="footer-main section-shell">
          <a className="brand footer-brand" href="#top"><span className="brand-mark">R3</span><span className="brand-copy"><strong>РЕСПЕКТ-3</strong><small>Техническое сопровождение</small></span></a>
          <p>Сантехники · Электрики · Плотники</p>
          <button type="button" onClick={openForm}>Подготовить заявку ↗</button>
        </div>
        <div className="footer-bottom section-shell"><span>© 2026 ООО «Респект-3»</span><span>Информация на сайте не является публичной офертой</span></div>
      </footer>

      {isOpen && (
        <div className="modal-backdrop" onMouseDown={closeForm} role="presentation">
          <section className="request-modal" role="dialog" aria-modal="true" aria-labelledby="request-title" onMouseDown={(event) => event.stopPropagation()}>
            <button className="modal-close" type="button" onClick={closeForm} aria-label="Закрыть форму">×</button>
            {!prepared ? (
              <>
                <p className="kicker dark">SERVICE REQUEST / R3</p>
                <h2 id="request-title">Подготовить заявку</h2>
                <p className="modal-note">Заполните поля — сайт сформирует текст обращения, который можно передать через рабочий канал управляющей компании.</p>
                <form onSubmit={submit}>
                  <label>Контактное лицо<input name="name" value={form.name} onChange={update} autoFocus required /></label>
                  <label>Организация / УК<input name="company" value={form.company} onChange={update} required /></label>
                  <label>Телефон или e-mail<input name="contact" value={form.contact} onChange={update} required /></label>
                  <label>Направление<select name="topic" value={form.topic} onChange={update} required><option value="">Выберите направление</option><option>Сантехнические работы</option><option>Электротехнические работы</option><option>Плотницкие работы</option><option>Комплексная техническая задача</option></select></label>
                  <label className="full-field">Описание задачи<textarea name="message" rows={4} value={form.message} onChange={update} required /></label>
                  <label className="consent"><input type="checkbox" required /><span>Согласен(на) на обработку указанных данных для подготовки обращения</span></label>
                  <button className="primary-action form-action" type="submit">Сформировать текст <span>↗</span></button>
                </form>
              </>
            ) : (
              <div className="prepared-state">
                <span className="prepared-icon">R3</span>
                <h2 id="request-title">Заявка готова</h2>
                <p>Скопируйте текст и отправьте его через действующий канал связи с управляющей компанией.</p>
                <pre>{requestText}</pre>
                <button className="primary-action form-action" type="button" onClick={copyRequest}>{copied ? "Скопировано ✓" : "Скопировать заявку"}</button>
              </div>
            )}
          </section>
        </div>
      )}
    </main>
  );
}
