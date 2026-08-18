"use client";

import { useEffect, useRef, useState } from "react";

const ADDRESS =
  "196233, г. Санкт-Петербург, ул. Орджоникидзе, д. 52, литер А, пом. 92-Н, офис 1";

const facts = [
  {
    index: "01",
    eyebrow: "Основание",
    title: "Юридическое лицо с 2006 года",
    text: "ООО «Управление сопровождения проектов строительства» зарегистрировано 24 июля 2006 года. На сайте собраны актуальные сведения о юридическом лице — без рекламных обещаний и неподтверждённых проектов.",
    tone: "paper",
    mark: "24·07·06",
  },
  {
    index: "02",
    eyebrow: "Текущий статус",
    title: "Деятельность не ведётся",
    text: "Компания не осуществляет коммерческую и строительную деятельность и не предлагает услуги. Эта страница носит информационный характер и помогает быстро сверить корпоративные данные.",
    tone: "ink",
    mark: "ПАУЗА",
  },
  {
    index: "03",
    eyebrow: "Участие",
    title: "Член жилищно-строительного кооператива",
    text: "Текущая указанная роль организации — членство в ЖСК. Мы сознательно отделяем этот статус от девелоперской, подрядной или управляющей деятельности.",
    tone: "blue",
    mark: "ЖСК",
  },
  {
    index: "04",
    eyebrow: "Официальная связь",
    title: "Корреспонденция — по юридическому адресу",
    text: "Для официальных обращений используйте почтовый адрес в Санкт-Петербурге. Телефон и электронная почта в предоставленных сведениях не указаны.",
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
          <a href="#status">Статус</a><a href="#facts">Факты</a><a href="#details">Реквизиты</a>
        </nav>
        <a className="header-link" href="#contacts">Адрес для связи <Arrow /></a>
      </header>

      <section className="hero" id="top">
        <div className="hero__grid" aria-hidden="true">
          <span className="hero__axis hero__axis--x" /><span className="hero__axis hero__axis--y" />
          <span className="hero__square hero__square--one" /><span className="hero__square hero__square--two" />
          <span className="hero__dot" />
        </div>
        <div className="hero__status"><span className="status-dot" />Информационная страница юридического лица</div>
        <h1>Статус.<br /><span>Порядок.</span><br />Участие.</h1>
        <div className="hero__bottom">
          <p>ООО «Управление сопровождения проектов строительства» — член ЖСК. В настоящее время хозяйственная деятельность не осуществляется.</p>
          <a className="circle-link" href="#facts" aria-label="Перейти к фактам"><span>Смотреть</span><Arrow /></a>
        </div>
        <div className="hero__ticker" aria-label="Краткий статус">
          <span>Санкт-Петербург</span><span>·</span><span>с 2006 года</span><span>·</span><span>член ЖСК</span><span>·</span><strong>деятельность не ведётся</strong>
        </div>
      </section>

      <section className="statement" id="status">
        <p className="section-kicker">01 / О компании</p>
        <div className="statement__content">
          <h2>Название — о сопровождении. Текущий статус — без деятельности.</h2>
          <div className="statement__copy">
            <p>Сайт не является витриной строительных услуг. У организации нет заявленных активных проектов, тарифов или коммерческих предложений.</p>
            <p>Его задача проще и честнее: зафиксировать статус юридического лица, участие в ЖСК и дать корректный адрес для официальной корреспонденции.</p>
          </div>
        </div>
      </section>

      <section className="stories" id="facts">
        <div className="stories__head">
          <div><p className="section-kicker section-kicker--light">02 / Корпоративный контур</p><h2>Не кейсы.<br />Факты.</h2></div>
          <div className="stories__tools">
            <p>Прокручивайте вбок или используйте стрелки</p>
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
        <div className="details__title"><p className="section-kicker">03 / Реквизиты</p><h2>Официально<br />и по существу.</h2></div>
        <dl className="details__list">
          <div><dt>Полное наименование</dt><dd>ООО «Управление сопровождения проектов строительства»</dd></div>
          <div><dt>ОГРН</dt><dd>5067847173906</dd></div>
          <div><dt>ИНН / КПП</dt><dd>7842339446 / 781001001</dd></div>
          <div><dt>Дата регистрации</dt><dd>24 июля 2006 года</dd></div>
          <div><dt>Генеральный директор</dt><dd>Штеллер Дмитрий Эрнестович</dd></div>
          <div><dt>Налоговый режим / категория</dt><dd>УСН / микропредприятие</dd></div>
          <div><dt>Текущий статус</dt><dd>Деятельность не ведётся; член ЖСК</dd></div>
        </dl>
      </section>

      <section className="contact" id="contacts">
        <div className="contact__aside">
          <p className="section-kicker section-kicker--light">04 / Адрес</p>
          <p className="contact__note">Канал для официальной<br />почтовой корреспонденции</p>
          <span className="contact__index">196233</span>
        </div>
        <div className="contact__desk">
          <div className="contact__topline"><span>Точка связи</span><span>Орджоникидзе · 52</span></div>
          <h2>Санкт-Петербург<span>Орджоникидзе, 52</span><small>литер А · помещение 92-Н · офис 1</small></h2>
          <div className="contact__actions">
            <a href="https://yandex.ru/maps/?text=Санкт-Петербург%2C%20улица%20Орджоникидзе%2C%2052" target="_blank" rel="noreferrer">Построить маршрут <Arrow /></a>
            <button onClick={copyAddress}>{copied ? "Адрес скопирован" : "Скопировать адрес"}</button>
          </div>
          <p className="contact__legal">Телефон и электронная почта в предоставленных сведениях не указаны.</p>
        </div>
      </section>

      <footer>
        <a className="brand brand--footer" href="#top"><span className="brand__mark">У</span><span className="brand__name">Управление сопровождения<br />проектов строительства</span></a>
        <p>Информация на сайте не является публичной офертой.</p><p>© 2006–2026</p>
      </footer>
    </main>
  );
}
