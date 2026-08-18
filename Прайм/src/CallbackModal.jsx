import { useEffect, useState } from 'react'
import { company } from './data.js'

const initial = { name: '', phone: '' }

export function CallbackModal({ onClose }) {
  const [form, setForm] = useState(initial)
  const [sent, setSent] = useState(false)

  useEffect(() => {
    const onKey = (event) => {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  const update = (field) => (event) => {
    setForm((prev) => ({ ...prev, [field]: event.target.value }))
  }

  const submit = (event) => {
    event.preventDefault()
    const body = [
      `Имя: ${form.name}`,
      `Телефон: ${form.phone}`,
      '',
      'Заявка на обратный звонок с сайта ПРАЙМ.',
    ].join('\n')
    const href = `mailto:${company.email}?subject=${encodeURIComponent('Обратный звонок — ПРАЙМ')}&body=${encodeURIComponent(body)}`
    window.location.href = href
    setSent(true)
  }

  return (
    <div className="overlay" role="presentation" onClick={onClose}>
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="callback-title"
        onClick={(event) => event.stopPropagation()}
      >
        <button className="modal-close" type="button" aria-label="Закрыть" onClick={onClose}>
          ×
        </button>
        <h2 id="callback-title">Обратный звонок</h2>
        <p>Оставьте номер — перезвоним и ответим на вопросы о зале, расписании и абонементах.</p>
        {sent ? (
          <div className="success">
            Заявка сформирована. Если почтовый клиент не открылся, напишите на {company.email}.
          </div>
        ) : null}
        <form onSubmit={submit}>
          <label className="field">
            <span>Имя</span>
            <input
              required
              value={form.name}
              onChange={update('name')}
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
              onChange={update('phone')}
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
          <button className="btn btn-solid" type="submit">
            Перезвоните мне
          </button>
        </form>
      </div>
    </div>
  )
}

export function CallbackForm({ id, compact = false }) {
  const [form, setForm] = useState(initial)
  const [sent, setSent] = useState(false)

  const update = (field) => (event) => {
    setForm((prev) => ({ ...prev, [field]: event.target.value }))
  }

  const submit = (event) => {
    event.preventDefault()
    const body = [
      `Имя: ${form.name}`,
      `Телефон: ${form.phone}`,
      '',
      'Заявка на обратный звонок с сайта ПРАЙМ.',
    ].join('\n')
    const href = `mailto:${company.email}?subject=${encodeURIComponent('Обратный звонок — ПРАЙМ')}&body=${encodeURIComponent(body)}`
    window.location.href = href
    setSent(true)
  }

  return (
    <form
      id={id}
      className={compact ? 'callback-form callback-form--compact' : 'callback-form'}
      onSubmit={submit}
    >
      <h3>Заказать обратный звонок</h3>
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
              onChange={update('name')}
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
              onChange={update('phone')}
              name="phone"
              autoComplete="tel"
              placeholder="+7"
              pattern="^\+7.*"
              title="Номер должен начинаться с +7"
            />
          </label>
          <button className="btn btn-solid" type="submit">
            Перезвоните мне
          </button>
          <p className="form-note">
            Нажимая кнопку, вы соглашаетесь на обработку персональных данных.
          </p>
        </>
      )}
    </form>
  )
}
