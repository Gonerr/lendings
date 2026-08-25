import { useEffect, useState } from "react";

const initial = { name: "", phone: "" };

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

const sendCallbackRequest = async (form) => {
  const response = await fetch("/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: form.name,
      phone: form.phone,
      message: "Заявка на обратный звонок с сайта ПРАЙМ.",
      website: "",
    }),
  });

  if (!response.ok) throw new Error("Contact request failed");
};

export function CallbackModal({ onClose }) {
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
      [name]: name === "phone" ? formatPhone(value) : value,
    }));
  };

  const submit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setSubmitError("");

    try {
      await sendCallbackRequest(form);
      setForm(initial);
      setSent(true);
    } catch {
      setSubmitError("Не удалось отправить заявку. Попробуйте ещё раз.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="overlay" role="presentation" onClick={onClose}>
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="callback-title"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          className="modal-close"
          type="button"
          aria-label="Закрыть"
          onClick={onClose}
        >
          ×
        </button>
        <h2 id="callback-title">Обратный звонок</h2>
        <p>
          Оставьте номер — перезвоним и ответим на вопросы о зале, расписании и
          абонементах.
        </p>
        {sent ? (
          <div className="success">
            Спасибо! Заявка отправлена, мы свяжемся с вами.
          </div>
        ) : null}
        {submitError ? <div className="success" role="alert">{submitError}</div> : null}
        <form onSubmit={submit}>
          <label className="field">
            <span>Имя</span>
            <input
              required
              value={form.name}
              onChange={update("name")}
              name="name"
              autoComplete="name"
              placeholder="Как к вам обращаться"
            />
          </label>
          <label className="field">
            <span>Телефон</span>
            <input
              required
              type="tel"
              value={form.phone}
              onChange={update("phone")}
              name="phone"
              autoComplete="tel"
              placeholder="+7 (___) ___-__-__"
              pattern="^\+7.*"
              title="Номер должен начинаться с +7"
            />
          </label>
          <p className="form-note">
            Нажимая кнопку, вы соглашаетесь на обработку персональных данных.
          </p>
          <button className="btn btn-solid" type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Отправляем…" : "Перезвоните мне"}
          </button>
        </form>
      </div>
    </div>
  );
}

export function CallbackForm({ id, compact = false }) {
  const [form, setForm] = useState(initial);
  const [sent, setSent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const update = (field) => (event) => {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: name === "phone" ? formatPhone(value) : value,
    }));
  };

  const submit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setSubmitError("");

    try {
      await sendCallbackRequest(form);
      setForm(initial);
      setSent(true);
    } catch {
      setSubmitError("Не удалось отправить заявку. Попробуйте ещё раз.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      id={id}
      className={
        compact ? "callback-form callback-form--compact" : "callback-form"
      }
      onSubmit={submit}
    >
      <h3>Заказать обратный звонок</h3>
      {submitError ? <div className="success" role="alert">{submitError}</div> : null}
      {sent ? (
        <div className="success">
          Заявка отправлена. Мы свяжемся с вами в ближайшее время.
        </div>
      ) : (
        <>
          <label className="field">
            <span>Имя</span>
            <input
              required
              value={form.name}
              onChange={update("name")}
              name="name"
              autoComplete="name"
            />
          </label>
          <label className="field">
            <span>Телефон</span>
            <input
              required
              type="tel"
              value={form.phone}
              onChange={update("phone")}
              name="phone"
              autoComplete="tel"
              placeholder="+7 (900) 000 00 00"
              pattern="\+7 \(\d{3}\) \d{3} \d{2} \d{2}"
              maxLength={18}
              title="Введите телефон в формате +7 (900) 000 00 00"
            />
          </label>
          <button className="btn btn-solid" type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Отправляем…" : "Перезвоните мне"}
          </button>
          <p className="form-note">
            Нажимая кнопку, вы соглашаетесь на обработку персональных данных.
          </p>
        </>
      )}
    </form>
  );
}
