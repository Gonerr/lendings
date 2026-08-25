import { useEffect, useState } from "react";

const initial = {
  name: "",
  contact: "",
  topic: "callback",
  message: "",
};

export function RequestModal({ onClose }) {
  const [form, setForm] = useState(initial);
  const [sent, setSent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  useEffect(() => {
    const onKey = (event) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const update = (field) => (event) => {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: name === "contact" ? formatPhone(value) : value,
    }));
  };

  const submit = async (event) => {
    event.preventDefault();
    const topic = form.topic === "email" ? "Письмо с сайта" : "Обратный звонок";
    setIsSubmitting(true);
    setSubmitError("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          phone: form.contact,
          message: [
            `Тема: ${topic}`,
            "",
            form.message || "Комментарий не указан.",
          ].join("\n"),
          website: "",
        }),
      });

      if (!response.ok) throw new Error("Contact request failed");

      setForm(initial);
      setSent(true);
    } catch {
      setSubmitError("Не удалось отправить заявку. Попробуйте ещё раз.");
    } finally {
      setIsSubmitting(false);
    }
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
    <div className="overlay" role="presentation" onClick={onClose}>
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="request-title"
        onClick={(event) => event.stopPropagation()}
      >
        <h2 id="request-title">Связаться с нами</h2>
        <p>
          Выберите удобный способ ответа — заявка сразу поступит нашей команде.
        </p>
        {sent ? (
          <div className="success">
            Спасибо! Заявка отправлена, мы свяжемся с вами.
          </div>
        ) : null}
        {submitError ? <div className="success" role="alert">{submitError}</div> : null}
        <form onSubmit={submit}>
          <label className="field">
            <span>Как к вам обращаться</span>
            <input
              required
              value={form.name}
              onChange={update("name")}
              name="name"
              autoComplete="name"
            />
          </label>
          <label className="field">
            <span>Телефон или e-mail</span>
            <input
              name="contact"
              placeholder="+7 (900) 000 00 00"
              maxLength={18}
              pattern="\+7 \(\d{3}\) \d{3} \d{2} \d{2}"
              title="Введите телефон в формате +7 (900) 000 00 00"
              required
              onFocus={() => {
                if (!form.contact) {
                  setForm((current) => ({
                    ...current,
                    contact: "+7 (",
                  }));
                }
              }}
              value={form.contact}
              onChange={update("contact")}
            />
          </label>
          <label className="field">
            <span>Как удобнее ответить</span>
            <select value={form.topic} onChange={update("topic")} name="topic">
              <option value="callback">Обратный звонок</option>
              <option value="email">Написать на почту</option>
            </select>
          </label>
          <label className="field">
            <span>Комментарий</span>
            <textarea
              rows="4"
              value={form.message}
              onChange={update("message")}
              name="message"
              placeholder="Абонемент, секция, аренда зала…"
            />
          </label>
          <div className="modal-actions">
            <button className="btn btn-primary" type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Отправляем…" : "Отправить заявку"}
            </button>
            <button className="btn btn-ghost" type="button" onClick={onClose}>
              Закрыть
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
