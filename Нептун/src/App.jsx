import { useState } from "react";
import { company, gallery, nav, services } from "./data.js";
import { RequestModal } from "./RequestModal.jsx";

function Logo() {
  return (
    <a href="#top" className="logo" aria-label="Нептун, на главную">
      <svg className="logo-mark" viewBox="0 0 64 64" aria-hidden="true">
        <circle
          cx="32"
          cy="32"
          r="30"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
        />
        <path
          d="M16 40c8-16 24-16 32 0"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <path
          d="M20 34c6-10 18-10 24 0"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <circle cx="32" cy="22" r="3.2" fill="currentColor" />
      </svg>
      Нептун
    </a>
  );
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const mapSrc = `https://yandex.ru/map-widget/v1/?ll=${company.map.lon}%2C${company.map.lat}&z=16&pt=${company.map.lon}%2C${company.map.lat}%2Cpm2blm&l=map`;

  const closeMenu = () => setMenuOpen(false);

  return (
    <div id="top">
      <header className="header">
        <div className="container header-inner">
          <Logo />
          <nav
            className={menuOpen ? "nav open" : "nav"}
            aria-label="Основная навигация"
          >
            {nav.map((item) => (
              <a key={item.href} href={item.href} onClick={closeMenu}>
                {item.label}
              </a>
            ))}
          </nav>
          <button
            className="btn btn-primary header-cta"
            type="button"
            onClick={() => {
              closeMenu();
              setModalOpen(true);
            }}
          >
            Оставить заявку
          </button>
          <button
            className="menu-toggle"
            type="button"
            aria-label="Открыть меню"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span />
          </button>
        </div>
      </header>

      <section className="hero">
        <div className="hero-media">
          <img
            src="https://images.unsplash.com/photo-1519315901367-f34ff9154487?auto=format&fit=crop&w=1800&q=80"
            alt="Вода в бассейне комплекса Нептун"
          />
        </div>
        <div className="container hero-content">
          <p className="eyebrow" style={{ color: "rgba(246,245,239,0.8)" }}>
            Физкультурно-оздоровительный комплекс
          </p>
          <h1>Место, где движение становится привычкой</h1>
          <p>
            «Нептун» — комплекс в Выборгском районе Санкт-Петербурга. Здесь
            собирают плавание, силовые тренировки, детские секции и спокойное
            восстановление в одном ритме города.
          </p>
          <div className="hero-actions">
            <button
              className="btn btn-primary"
              type="button"
              onClick={() => setModalOpen(true)}
            >
              Заказать звонок
            </button>
            <a className="btn btn-ghost" href="#contacts">
              Контакты и карта
            </a>
          </div>
        </div>
      </section>

      <div className="container">
        <div className="facts">
          <article className="fact">
            <strong>2021</strong>
            <span>год основания комплекса</span>
          </article>
          <article className="fact">
            <strong>07–22</strong>
            <span>часы работы без выходных</span>
          </article>
          <article className="fact">
            <strong>6</strong>
            <span>направлений для взрослых и детей</span>
          </article>
          <article className="fact">
            <strong>15-Н</strong>
            <span>пространство на ул. Кустодиева</span>
          </article>
        </div>
      </div>

      <section className="section" id="about">
        <div className="container split">
          <div className="about-copy">
            <p className="eyebrow">О нас</p>
            <h2>Тихая сила воды и ясный спортивный ритм</h2>
            <p className="lead">
              Комплекс назван в честь Нептуна не случайно: вода задаёт тон всему
              пространству. Мы исходим из простой мысли — регулярность важнее
              резких рывков, а зал должен быть местом, куда хочется
              возвращаться.
            </p>
            <p className="lead">
              ООО «Нептун» работает как физкультурно-оздоровительный комплекс с
              октября 2021 года. Здесь можно начать с нуля, вернуться после
              долгого перерыва или держать форму, не превращая спорт в отдельную
              жизнь рядом с основной.
            </p>
            <p className="lead">
              Команда помогает выбрать нагрузку, согласовать расписание и не
              потеряться среди направлений. Если нужно — расскажем о секциях,
              абонементах и аренде зала для группы.
            </p>
          </div>
          <img
            src="https://images.unsplash.com/photo-1571902943202-507ec2618e8f?auto=format&fit=crop&w=1200&q=80"
            alt="Интерьер спортивного зала"
          />
        </div>
      </section>

      <section className="section services" id="services">
        <div className="container">
          <p className="eyebrow">Что мы делаем</p>
          <h2>Направления, из которых складывается комплекс</h2>
          <p className="lead">
            Не обещаем мгновенных чудес. Предлагаем понятную среду: вода, зал,
            группа, дети и восстановление. Каждое направление можно взять
            отдельно или собрать в свой маршрут.
          </p>
          <div className="cards">
            {services.map((item) => (
              <article className="card" key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section space" id="space">
        <div className="container">
          <p className="eyebrow">Пространство</p>
          <h2>Свет, воздух и залы без лишнего шума</h2>
          <p className="lead">
            Комплекс расположен в жилом районе у проспекта Просвещения: удобно
            заехать утром, после работы или привести ребёнка на секцию.
            Интерьеры держим спокойными, чтобы внимание оставалось на движении,
            а не на декорациях.
          </p>
          <div className="gallery">
            {gallery.map((item) => (
              <figure key={item.src}>
                <img src={item.src} alt={item.alt} />
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="section contacts" id="contacts">
        <div className="container">
          <p className="eyebrow">Контакты</p>
          <h2>С нами просто договориться</h2>
          <p className="lead">
            Оставьте заявку на обратный звонок или напишите на почту. Ответим по
            расписанию, экскурсии по комплексу и записи в секции.
          </p>
          <div className="contacts-grid">
            <div className="contact-card">
              <button
                className="btn btn-primary"
                type="button"
                onClick={() => setModalOpen(true)}
              >
                Оставить заявку
              </button>
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
                создания: {company.founded}. {company.tax}.
              </p>
            </div>
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

      {modalOpen ? <RequestModal onClose={() => setModalOpen(false)} /> : null}
    </div>
  );
}
