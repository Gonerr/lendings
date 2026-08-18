import { useEffect, useState } from "react";
import { CallbackForm, CallbackModal } from "./CallbackModal.jsx";
import {
  advantages,
  clubServices,
  company,
  directions,
  equipment,
  heroSlides,
  marqueeItems,
  nav,
  stats,
} from "./data.js";

function SportIcon({ type }) {
  if (type === "volleyball") {
    return (
      <svg viewBox="0 0 48 48" aria-hidden="true">
        <circle
          cx="24"
          cy="24"
          r="18"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
        />
        <path
          d="M12 18c6 4 18 4 24 0M12 30c6-4 18-4 24 0"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      </svg>
    );
  }
  if (type === "basketball") {
    return (
      <svg viewBox="0 0 48 48" aria-hidden="true">
        <circle
          cx="24"
          cy="24"
          r="18"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
        />
        <path
          d="M24 6v36M6 24h36M10 14c8 6 20 6 28 0M10 34c8-6 20-6 28 0"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true">
      <circle
        cx="24"
        cy="24"
        r="18"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
      />
      <path
        d="M14 30c4-10 16-10 20 0M18 18h12"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function AdvantageIcon({ type }) {
  if (type === "dumbbell") {
    return (
      <svg viewBox="0 0 48 48" aria-hidden="true">
        <rect x="4" y="20" width="8" height="8" rx="2" fill="currentColor" />
        <rect x="36" y="20" width="8" height="8" rx="2" fill="currentColor" />
        <rect x="12" y="22" width="24" height="4" rx="1" fill="currentColor" />
      </svg>
    );
  }
  if (type === "coach") {
    return (
      <svg viewBox="0 0 48 48" aria-hidden="true">
        <circle cx="24" cy="14" r="6" fill="currentColor" />
        <path
          d="M12 40c2-10 8-14 12-14s10 4 12 14"
          fill="none"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinecap="round"
        />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true">
      <path
        d="M8 22 24 10l16 12v16H8V22Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <rect x="20" y="28" width="8" height="10" fill="currentColor" />
    </svg>
  );
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [slide, setSlide] = useState(0);
  const [activeEquipment, setActiveEquipment] = useState(equipment[0].id);
  const [scrolled, setScrolled] = useState(false);

  const currentEquipment =
    equipment.find((item) => item.id === activeEquipment) ?? equipment[0];

  const mapSrc = `https://yandex.ru/map-widget/v1/?ll=${company.map.lon}%2C${company.map.lat}&z=16&pt=${company.map.lon}%2C${company.map.lat}%2Cpm2blm&l=map`;

  useEffect(() => {
    const timer = setInterval(() => {
      setSlide((value) => (value + 1) % heroSlides.length);
    }, 5500);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMenu = () => setMenuOpen(false);
  const openCallback = () => {
    closeMenu();
    setModalOpen(true);
  };

  return (
    <div id="top">
      <div className="topbar">
        <div className="container topbar-inner">
          <span>{company.hours}</span>
          <span>{company.addressShort}</span>
          <a href={`mailto:${company.email}`}>{company.email}</a>
        </div>
      </div>

      <header
        className={
          scrolled ? "site-header site-header--scrolled" : "site-header"
        }
      >
        <div className="container header-shell">
          <a href="#top" className="brand" aria-label="ПРАЙМ, на главную">
            <span className="brand-mark">P</span>
            <span className="brand-text">
              <strong>ПРАЙМ</strong>
              <small>физкультурно-оздоровительный комплекс</small>
            </span>
          </a>

          <nav
            className={menuOpen ? "main-nav main-nav--open" : "main-nav"}
            aria-label="Основная навигация"
          >
            {nav.map((item) => (
              <a key={item.href} href={item.href} onClick={closeMenu}>
                {item.label}
              </a>
            ))}
          </nav>

          <button
            className="btn btn-solid header-cta"
            type="button"
            onClick={openCallback}
          >
            Обратный звонок
          </button>

          <button
            className="menu-toggle"
            type="button"
            aria-label="Открыть меню"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((value) => !value)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </header>

      <section className="hero">
        <div className="hero-bg">
          <img src="/images/hero.avif" alt="" />
          <div className="hero-overlay" />
        </div>
        <div className="container hero-grid">
          <div className="hero-copy">
            <div className="hero-slides" aria-live="polite">
              {heroSlides.map((item, index) => (
                <article
                  key={item.title}
                  className={
                    index === slide ? "hero-slide is-active" : "hero-slide"
                  }
                >
                  <p className="hero-tag">{item.tag}</p>
                  <h1>{item.title}</h1>
                  <p>{item.text}</p>
                </article>
              ))}
            </div>
            <div className="hero-dots" role="tablist" aria-label="Слайды">
              {heroSlides.map((item, index) => (
                <button
                  key={item.title}
                  type="button"
                  role="tab"
                  aria-selected={index === slide}
                  aria-label={`Слайд ${index + 1}`}
                  className={index === slide ? "is-active" : ""}
                  onClick={() => setSlide(index)}
                />
              ))}
            </div>
            <div className="hero-actions">
              <button
                className="btn btn-solid"
                type="button"
                onClick={openCallback}
              >
                Заказать звонок
              </button>
              <a className="btn btn-line btn-line--light" href="#advantages">
                Узнать больше
              </a>
            </div>
          </div>
          <div className="hero-panel">
            <CallbackForm id="hero-callback" compact />
          </div>
        </div>
      </section>

      <section className="stats-strip" aria-label="Ключевые показатели">
        <div className="container stats-grid">
          {stats.map((item) => (
            <article className="stat-card" key={item.label}>
              <strong>{item.value}</strong>
              <span>{item.label}</span>
            </article>
          ))}
        </div>
      </section>

      <div className="marquee" aria-hidden="true">
        <div className="marquee-track">
          {[...marqueeItems, ...marqueeItems].map((item, index) => (
            <span key={`${item}-${index}`}>{item}</span>
          ))}
        </div>
      </div>

      <section className="section" id="advantages">
        <div className="container">
          <div className="section-head">
            <p className="kicker">Почему нас выбирают</p>
            <h2>Узнайте больше об особенностях и преимуществах нашего зала</h2>
          </div>
          <div className="advantages">
            {advantages.map((item) => (
              <article className="advantage-card" key={item.title}>
                <div className="advantage-icon">
                  <AdvantageIcon type={item.icon} />
                </div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--tint" id="directions">
        <div className="container">
          <div className="section-head section-head--split">
            <div>
              <p className="kicker">Направления</p>
              <h2>Что можно делать в комплексе</h2>
            </div>
            <p className="lead">
              От первой тренировки до регулярных занятий — подберём формат под
              ваш ритм жизни: самостоятельно, в группе или с тренером.
            </p>
          </div>
          <div className="directions-grid">
            {directions.map((item) => (
              <article className="direction-card" key={item.title}>
                <img src={item.image} alt="" />
                <div className="direction-card-body">
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="services">
        <div className="container">
          <div className="services-layout">
            <div className="services-copy">
              <p className="kicker">Услуги клуба</p>
              <h2>Игровой зал для командных видов спорта</h2>
              <p className="lead">{clubServices.intro}</p>
              <button
                className="btn btn-solid"
                type="button"
                onClick={openCallback}
              >
                Узнать расписание
              </button>
            </div>
            <div className="services-visual">
              <img src={clubServices.image} alt="Игровой зал комплекса ПРАЙМ" />
              <span className="services-badge">Игровой зал</span>
            </div>
          </div>
          <div className="sport-cards">
            {clubServices.sports.map((item) => (
              <article className="sport-card" key={item.id}>
                <div className="sport-card-icon">
                  <SportIcon type={item.id} />
                </div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--tint" id="equipment">
        <div className="container">
          <div className="section-head section-head--split">
            <div>
              <p className="kicker">Оборудование для фитнеса</p>
              <h2>Современные тренажёры и проверенные временем решения</h2>
            </div>
            <p className="lead">
              У нас есть всё для силовых, кардио- и групповых тренировок — от
              базовых упражнений до интенсивных программ.
            </p>
          </div>

          <div
            className="equipment-tabs"
            role="tablist"
            aria-label="Тип оборудования"
          >
            {equipment.map((item) => (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={activeEquipment === item.id}
                className={activeEquipment === item.id ? "is-active" : ""}
                onClick={() => setActiveEquipment(item.id)}
              >
                {item.title}
              </button>
            ))}
          </div>

          <div className="equipment-showcase">
            <img src={currentEquipment.image} alt={currentEquipment.title} />
            <div>
              <h3>{currentEquipment.title}</h3>
              <p>{currentEquipment.text}</p>
              <button
                className="btn btn-solid"
                type="button"
                onClick={openCallback}
              >
                Начать тренировки
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="section promo-band">
        <div className="container promo-band-inner">
          <div>
            <p className="kicker">Посмотрите наш фитнес-клуб</p>
            <h2>Присоединяйтесь к занятиям и начните с комфортного визита</h2>
          </div>
          <button
            className="btn btn-line btn-line--light"
            type="button"
            onClick={openCallback}
          >
            Записаться на визит
          </button>
        </div>
      </section>

      <section className="section" id="about">
        <div className="container about-grid">
          <div>
            <p className="kicker">О компании</p>
            <h2>ФОК «ПРАЙМ» — спорт рядом с домом</h2>
            <p className="lead">
              {company.legalName} работает с {company.founded} года как
              физкультурно-оздоровительный комплекс в Выборгском районе
              Санкт-Петербурга. Мы создаём пространство, где можно тренироваться
              регулярно, восстанавливаться и чувствовать себя уверенно.
            </p>
            <p className="lead">
              Генеральный директор — {company.director}. Команда помогает
              подобрать нагрузку, разобраться с расписанием и выбрать формат
              занятий: индивидуальные тренировки, групповые программы или
              свободные посещения зала.
            </p>
            <ul className="about-list">
              <li>Тренажёрный зал и кардио-зона с современным оборудованием</li>
              <li>Групповые и персональные программы для разного уровня</li>
              <li>Детские секции и аренда залов для мероприятий</li>
              <li>Сауна и зона восстановления после тренировки</li>
            </ul>
          </div>
          <div className="about-visual">
            <img src="/images/gym.avif" alt="Интерьер спортивного зала ПРАЙМ" />
            <div className="about-badge">
              <span>ФОК</span>
              <strong>ПРАЙМ</strong>
              <small>с {company.founded.slice(-4)} года</small>
            </div>
          </div>
        </div>
      </section>

      <section className="section cta-strip">
        <div className="container cta-strip-inner">
          <h2>Займитесь собой прямо сейчас</h2>
          <p>
            Оставьте заявку — расскажем о зале, расписании и условиях посещения.
          </p>
          <button
            className="btn btn-solid"
            type="button"
            onClick={openCallback}
          >
            Обратный звонок
          </button>
        </div>
      </section>

      <section className="section" id="contacts">
        <div className="container">
          <div className="section-head">
            <p className="kicker">Контакты</p>
            <h2>Мы на связи</h2>
          </div>
          <div className="contacts-grid">
            <div className="contact-card">
              <ul className="contact-list">
                <li>
                  <span>Адрес</span>
                  {company.address}
                </li>
                <li>
                  <span>Электронная почта</span>
                  <a href={`mailto:${company.email}`}>{company.email}</a>
                </li>
                <li>
                  <span>Режим работы</span>
                  {company.hours}
                </li>
                <li>
                  <span>Руководитель</span>
                  Генеральный директор {company.director}
                </li>
              </ul>
              <p className="legal">
                {company.legalName}. ОГРН {company.ogrn}, ИНН {company.inn}, КПП{" "}
                {company.kpp}. Вид деятельности: {company.activity}. Дата
                создания: {company.founded}. {company.tax}. Лицензия:{" "}
                {company.license}.
              </p>
            </div>
            <CallbackForm id="contacts-callback" />
            <div className="map-wrap">
              <iframe
                title="Карта: ул. Кустодиева, 7к2, Санкт-Петербург"
                src={mapSrc}
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="container footer-inner">
          <span>
            © {new Date().getFullYear()} {company.legalName}
          </span>
          <span>{company.addressShort}</span>
        </div>
      </footer>

      {modalOpen ? <CallbackModal onClose={() => setModalOpen(false)} /> : null}
    </div>
  );
}
