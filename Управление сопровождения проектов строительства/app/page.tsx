"use client";

import { useEffect, useRef, useState } from "react";

const ADDRESS =
  "196233, г. Санкт-Петербург, ул. Орджоникидзе, д. 52, литер А, пом. 92-Н, офис 1";

const facts = [
  {
    index: "01",
    eyebrow: "Юридическая основа",
    title: "Организация зарегистрирована в 2006 году",
    text: "ООО «Управление сопровождения проектов строительства» зарегистрировано 24 июля 2006 года. На сайте собраны основные сведения о компании и её участии в жилищно-строительной кооперации.",
    tone: "paper",
    mark: "24·07·06",
  },
  {
    index: "02",
    eyebrow: "Документы",
    title: "Порядок в информации и документах",
    text: "Для кооперативного взаимодействия важны точные сведения, понятные основания и доступность официальной информации. На этой странице всё необходимое собрано в одном месте.",
    tone: "ink",
    mark: "ПОРЯДОК",
  },
  {
    index: "03",
    eyebrow: "Участие",
    title: "Участие в жилищно-строительном кооперативе",
    text: "Компания является членом ЖСК. Такой формат объединяет участников вокруг общих организационных и имущественных вопросов на основе установленных правил.",
    tone: "blue",
    mark: "ЖСК",
  },
  {
    index: "04",
    eyebrow: "Официальная связь",
    title: "Корреспонденция — по юридическому адресу",
    text: "Для письменных обращений и официальной корреспонденции используйте юридический адрес организации в Санкт-Петербурге.",
    tone: "clay",
    mark: "196233",
  },
];

const Arrow = ({ direction = "right" }: { direction?: "left" | "right" }) => (
  <svg aria-hidden="true" viewBox="0 0 24 24" className={direction === "left" ? "arrow arrow--left" : "arrow"}>
    <path d="M5 12h14M14 6l6 6-6 6" />
  </svg>
);

export default function Home() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const onWheel = (event: WheelEvent) => {
      if (window.innerWidth <= 820 || Math.abs(event.deltaY) <= Math.abs(event.deltaX)) return;
      const atStart = track.scrollLeft <= 2 && event.deltaY < 0;
      const atEnd = track.scrollLeft + track.clientWidth >= track.scrollWidth - 2 && event.deltaY > 0;
      if (atStart || atEnd) return;
      event.preventDefault();
      track.scrollLeft += event.deltaY;
    };

    const onScroll = () => {
      const cards = Array.from(track.querySelectorAll<HTMLElement>("[data-story]"));
      if (!cards.length) return;
      const center = track.scrollLeft + track.clientWidth / 2;
      let nearest = 0;
      let distance = Number.POSITIVE_INFINITY;
      cards.forEach((card, index) => {
        const currentDistance = Math.abs(center - (card.offsetLeft + card.offsetWidth / 2));
        if (currentDistance < distance) {
          nearest = index;
          distance = currentDistance;
        }
      });
      setActive(nearest);
    };

    track.addEventListener("wheel", onWheel, { passive: false });
    track.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      track.removeEventListener("wheel", onWheel);
      track.removeEventListener("scroll", onScroll);
    };
  }, []);

  const move = (direction: number) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector<HTMLElement>("[data-story]");
    track.scrollBy({ left: direction * ((card?.offsetWidth ?? track.clientWidth) + 18), behavior: "smooth" });
  };

  const copyAddress = async () => {
    try {
      let copiedWithApi = false;
      if (navigator.clipboard?.writeText) {
        try {
          await navigator.clipboard.writeText(ADDRESS);
          copiedWithApi = true;
        } catch {
          copiedWithApi = false;
        }
      }
      if (!copiedWithApi) {
        const field = document.createElement("textarea");
        field.value = ADDRESS;
        field.setAttribute("readonly", "");
        field.style.position = "fixed";
        field.style.opacity = "0";
        document.body.appendChild(field);
        field.select();
        const succeeded = document.execCommand("copy");
        field.remove();
        if (!succeeded) throw new Error("Copy is unavailable");
      }
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="УСПС — на главную">
          <span className="brand__mark">У</span>
          <span className="brand__name">Управление сопровождения<br />проектов строительства</span>
        </a>
        <nav className="nav" aria-label="Основная навигация">
          <a href="#status">О компании</a><a href="#facts">Основное</a><a href="#details">Реквизиты</a>
        </nav>
        <a className="header-link" href="#contacts">Адрес для связи <Arrow /></a>
      </header>

      <section className="hero" id="top">
        <div className="hero__grid" aria-hidden="true">
          <span className="hero__axis hero__axis--x" /><span className="hero__axis hero__axis--y" />
          <span className="hero__square hero__square--one" /><span className="hero__square hero__square--two" />
          <span className="hero__dot" />
        </div>
        <div className="hero__status"><span className="status-dot" />Участник жилищно-строительного кооператива</div>
        <h1>Участие.<br /><span>Порядок.</span><br />Диалог.</h1>
        <div className="hero__bottom">
          <p>ООО «Управление сопровождения проектов строительства» — член ЖСК. Здесь собраны основные сведения об организации и данные для официальной связи.</p>
          <a className="circle-link" href="#facts" aria-label="Перейти к информации"><span>Подробнее</span><Arrow /></a>
        </div>
        <div className="hero__ticker" aria-label="Краткий статус">
          <span>Санкт-Петербург</span><span>·</span><span>с 2006 года</span><span>·</span><span>член ЖСК</span><span>·</span><strong>официальная информация</strong>
        </div>
      </section>

      <section className="statement" id="status">
        <p className="section-kicker">01 / О компании</p>
        <div className="statement__content">
          <h2>Участие в ЖСК — это понятный порядок и общая ответственность.</h2>
          <div className="statement__copy">
            <p>Жилищно-строительная кооперация объединяет участников для решения общих организационных и имущественных вопросов в рамках установленных правил.</p>
            <p>На сайте представлены сведения об ООО «Управление сопровождения проектов строительства», руководителе, участии в ЖСК и адресе для обращений.</p>
          </div>
        </div>
      </section>

      <section className="stories" id="facts">
        <div className="stories__head">
          <div><p className="section-kicker section-kicker--light">02 / Коротко о главном</p><h2>Основное<br />о компании.</h2></div>
          <div className="stories__tools">
            <p>Листайте карточки или используйте стрелки</p>
            <div className="stories__counter" aria-live="polite"><strong>{String(active + 1).padStart(2, "0")}</strong><span>/ {String(facts.length).padStart(2, "0")}</span></div>
            <div className="stories__buttons">
              <button onClick={() => move(-1)} aria-label="Предыдущий факт"><Arrow direction="left" /></button>
              <button onClick={() => move(1)} aria-label="Следующий факт"><Arrow /></button>
            </div>
          </div>
        </div>
        <div className="story-track" ref={trackRef} tabIndex={0}>
          {facts.map((fact) => (
            <article className={`story-card story-card--${fact.tone}`} data-story key={fact.index}>
              <div className="story-card__meta"><span>{fact.index}</span><span>{fact.eyebrow}</span></div>
              <div className="story-card__body"><h3>{fact.title}</h3><p>{fact.text}</p></div>
              <div className="story-card__visual" aria-hidden="true">
                <span className="story-card__mark">{fact.mark}</span>
                <span className="building building--a" /><span className="building building--b" /><span className="building building--c" />
              </div>
            </article>
          ))}
          <div className="track-end" aria-hidden="true"><span>Дальше — реквизиты</span><Arrow /></div>
        </div>
      </section>

      <section className="details" id="details">
        <div className="details__title">
          <p className="section-kicker">03 / Реквизиты</p>
          <h2>Карточка<br />организации</h2>
          <p>Основные регистрационные сведения в компактном и привычном формате.</p>
        </div>
        <div className="details__document">
          <div className="details__document-head"><span>ООО · Санкт-Петербург</span><span>Регистрационные сведения</span></div>
          <h3>Управление сопровождения<br />проектов строительства</h3>
          <dl className="details__grid">
            <div className="details__wide"><dt>Полное наименование</dt><dd>ООО «Управление сопровождения проектов строительства»</dd></div>
            <div><dt>ОГРН</dt><dd>5067847173906</dd></div>
            <div><dt>ИНН</dt><dd>7842339446</dd></div>
            <div><dt>КПП</dt><dd>781001001</dd></div>
            <div><dt>Дата регистрации</dt><dd>24.07.2006</dd></div>
            <div className="details__wide"><dt>Генеральный директор</dt><dd>Штеллер Дмитрий Эрнестович</dd></div>
            <div><dt>Участие</dt><dd>Член ЖСК</dd></div>
            <div><dt>Категория</dt><dd>Микропредприятие</dd></div>
            <div><dt>Налоговый режим</dt><dd>УСН</dd></div>
          </dl>
        </div>
      </section>

      <section className="contact" id="contacts">
        <div className="contact__inner">
          <div className="contact__heading">
            <p className="section-kicker">04 / Контакты</p>
            <h2>Связаться<br />с организацией</h2>
            <p>Для официальной корреспонденции используйте юридический адрес компании.</p>
          </div>
          <div className="contact__card">
            <div className="contact__pin" aria-hidden="true">
              <svg viewBox="0 0 24 24"><path d="M12 21s7-5.4 7-12a7 7 0 1 0-14 0c0 6.6 7 12 7 12Z" /><circle cx="12" cy="9" r="2.5" /></svg>
            </div>
            <div className="contact__address">
              <span>Юридический адрес</span>
              <address>196233, г. Санкт-Петербург,<br />ул. Орджоникидзе, д. 52, литер А,<br />пом. 92-Н, офис 1</address>
            </div>
            <div className="contact__actions">
              <a href="https://yandex.ru/maps/?text=Санкт-Петербург%2C%20улица%20Орджоникидзе%2C%2052" target="_blank" rel="noreferrer">Открыть на карте <Arrow /></a>
              <button onClick={copyAddress}>{copied ? "Адрес скопирован" : "Скопировать адрес"}</button>
            </div>
          </div>
        </div>
      </section>

      <footer>
        <a className="brand brand--footer" href="#top"><span className="brand__mark">У</span><span className="brand__name">Управление сопровождения<br />проектов строительства</span></a>
        <p>Информация на сайте не является публичной офертой.</p><p>© 2006–2026</p>
      </footer>
    </main>
  );
}
