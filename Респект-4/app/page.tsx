"use client";

import { FormEvent, useEffect, useState } from "react";
import { ADDRESS, EMAIL, PHONE, PHONE_LINK, services, steps } from "./data";

export default function Home() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [phone, setPhone] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    kind: "success" | "error";
    text: string;
  } | null>(null);

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsFormOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, []);

  const submitRequest = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const message = [
      `Объект: ${data.get("object") || "не указан"}`,
      "",
      `${data.get("message") || "Прошу связаться со мной."}`,
    ].join("\n");

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: String(data.get("name") || ""),
          phone: String(data.get("phone") || ""),
          message,
          website: "",
        }),
      });

      if (!response.ok) throw new Error("Contact request failed");

      form.reset();
      setPhone("");
      setSubmitStatus({
        kind: "success",
        text: "Спасибо! Заявка отправлена, мы свяжемся с вами.",
      });
    } catch {
      setSubmitStatus({
        kind: "error",
        text: "Не удалось отправить заявку. Попробуйте ещё раз.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const openForm = () => {
    setSubmitStatus(null);
    setIsFormOpen(true);
  };

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
        <a
          className="brand"
          href="#top"
          aria-label="ООО Респект-4 — на главную"
        >
          <span className="brand__mark" aria-hidden="true">
            <span>R4</span>
          </span>
          <span className="brand__text">
            <strong>РЕСПЕКТ-4</strong>
            <small>контроль доступа и охрана</small>
          </span>
        </a>
        <nav className="site-nav" aria-label="Основная навигация">
          <a href="#services">Услуги</a>
          <a href="#work">Порядок работы</a>
          <a href="#details">Реквизиты</a>
          <a href="#contacts">Контакты</a>
        </nav>
        <button
          className="button button--small"
          type="button"
          onClick={openForm}
        >
          Обратная связь
        </button>
      </header>

      <section className="hero" id="top">
        <div className="hero__content section-shell">
          <div className="hero__copy">
            <p className="eyebrow eyebrow--light">
              ООО «Респект-4» · Санкт-Петербург
            </p>
            <h1>
              Контроль доступа.
              <br />
              Порядок на объекте.
            </h1>
            <p className="hero__lead">
              Обеспечиваем работу постов охраны на строительных объектах и в
              офисах Л1. Контролируем проход посетителей, въезд транспорта и
              соблюдение установленного режима.
            </p>
            <div className="hero__actions">
              <button
                className="button button--accent"
                type="button"
                onClick={openForm}
              >
                Обсудить объект
              </button>
              <a className="phone-link" href={`tel:${PHONE_LINK}`}>
                {PHONE}
              </a>
            </div>
          </div>

          <aside
            className="duty-panel"
            aria-label="Основные направления работы"
          >
            <p className="duty-panel__label">Зона ответственности</p>
            <ul>
              <li>
                <span>01</span>Строительные площадки
              </li>
              <li>
                <span>02</span>Офисные пространства
              </li>
              <li>
                <span>03</span>Входные группы и КПП
              </li>
              <li>
                <span>04</span>Прилегающая территория
              </li>
            </ul>
            <div className="duty-panel__status">
              <span aria-hidden="true" />
              Работа по регламенту объекта
            </div>
          </aside>
        </div>
      </section>

      <section className="scope" aria-label="Ключевые направления">
        <div className="section-shell scope__inner">
          <div>
            <strong>Объекты строительства</strong>
            <span>контроль прохода и въезда</span>
          </div>
          <div>
            <strong>Офисы Л1</strong>
            <span>порядок во входной зоне</span>
          </div>
          <div>
            <strong>Посты охраны</strong>
            <span>понятные обязанности смены</span>
          </div>
        </div>
      </section>

      <section className="section services" id="services">
        <div className="section-shell">
          <div className="section-heading">
            <p className="eyebrow">Наши услуги</p>
            <h2>Физическая охрана без лишней сложности</h2>
            <p>
              Организуем контроль на объекте так, чтобы сотрудники, подрядчики и
              посетители понимали порядок доступа, а ответственное лицо получало
              актуальную информацию.
            </p>
          </div>
          <div className="service-list">
            {services.map((service) => (
              <article className="service-row" key={service.number}>
                <span className="service-row__number">{service.number}</span>
                <h3>{service.title}</h3>
                <p>{service.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section work" id="work">
        <div className="section-shell work__layout">
          <div className="work__intro">
            <p className="eyebrow eyebrow--light">Порядок работы</p>
            <h2>От заявки до стабильной работы поста</h2>
            <p>
              Без длинных согласований и скрытых этапов. Сначала разбираемся в
              задаче, затем закрепляем понятный порядок работы.
            </p>
            <button
              className="button button--white"
              type="button"
              onClick={openForm}
            >
              Оставить заявку
            </button>
          </div>
          <ol className="step-list">
            {steps.map(([title, text], index) => (
              <li key={title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section principles">
        <div className="section-shell principles__layout">
          <div className="section-heading section-heading--compact">
            <p className="eyebrow">В ежедневной работе</p>
            <h2>Что важно на объекте</h2>
          </div>
          <div className="principles__text">
            <p>
              <strong>Дисциплина.</strong> Сотрудники работают по утверждённым
              инструкциям и правилам конкретного объекта.
            </p>
            <p>
              <strong>Связь.</strong> Ответственные лица получают информацию о
              нештатных ситуациях и важных событиях.
            </p>
            <p>
              <strong>Внимание.</strong> Контроль доступа дополняется
              наблюдением за входной зоной и прилегающей территорией.
            </p>
          </div>
        </div>
      </section>

      <section className="section details" id="details">
        <div className="section-shell">
          <div className="details__header">
            <div>
              <p className="eyebrow">Официальные сведения</p>
              <h2>Реквизиты компании</h2>
            </div>
            <p>
              Общество с ограниченной ответственностью «Респект-4»
              зарегистрировано 26 января 2007 года.
            </p>
          </div>
          <dl className="details__grid">
            <div>
              <dt>Полное наименование</dt>
              <dd>ООО «Респект-4»</dd>
            </div>
            <div>
              <dt>Генеральный директор</dt>
              <dd>Березина Олеся Александровна</dd>
            </div>
            <div>
              <dt>ОГРН</dt>
              <dd>1079847051602</dd>
            </div>
            <div>
              <dt>ИНН</dt>
              <dd>7842350400</dd>
            </div>
            <div>
              <dt>КПП</dt>
              <dd>781001001</dd>
            </div>
            {/* <div><dt>Налоговый режим</dt><dd>УСН · малое предприятие</dd></div> */}
            <div className="details__wide">
              <dt>Юридический адрес</dt>
              <dd>{ADDRESS}</dd>
            </div>
          </dl>
        </div>
      </section>

      <section className="contacts" id="contacts">
        <div className="section-shell contacts__layout">
          <div>
            <p className="eyebrow eyebrow--light">Контакты</p>
            <h2>Обсудим задачу по вашему объекту</h2>
            <p className="contacts__lead">
              Оставьте контактные данные или позвоните — уточним формат объекта
              и необходимый режим работы.
            </p>
          </div>
          <div className="contacts__data">
            <a href={`tel:${PHONE_LINK}`}>{PHONE}</a>
            <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
            <address>{ADDRESS}</address>
            <button
              className="button button--accent"
              type="button"
              onClick={openForm}
            >
              Заказать обратный звонок
            </button>
          </div>
        </div>
      </section>

      <footer>
        <div className="section-shell footer__inner">
          <span>© {new Date().getFullYear()} ООО «Респект-4»</span>
          <span>Контроль доступа и охрана объектов</span>
        </div>
      </footer>

      {isFormOpen && (
        <div
          className="modal"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setIsFormOpen(false);
          }}
        >
          <div
            className="modal__dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="request-title"
          >
            <button
              className="modal__close"
              type="button"
              aria-label="Закрыть форму"
              onClick={() => setIsFormOpen(false)}
            >
              ×
            </button>
            <p className="eyebrow">Обратная связь</p>
            <h2 id="request-title">Оставьте заявку</h2>
            <p>
              Заполните форму — заявка сразу поступит нашей команде.
            </p>
            {submitStatus && (
              <p role={submitStatus.kind === "error" ? "alert" : "status"}>
                {submitStatus.text}
              </p>
            )}
            <form onSubmit={submitRequest}>
              <label>
                Ваше имя
                <input name="name" type="text" autoComplete="name" required />
              </label>
              <label>
                Телефон
                <input
                  name="phone"
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
                Объект
                <input
                  name="object"
                  type="text"
                  placeholder="Например, офис или стройплощадка"
                />
              </label>
              <label>
                Комментарий
                <textarea name="message" rows={4} />
              </label>
              <button
                className="button button--accent button--full"
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Отправляем…" : "Отправить заявку"}
              </button>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}
