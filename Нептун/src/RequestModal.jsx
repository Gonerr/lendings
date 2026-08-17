import { useEffect, useState } from 'react'
import { company } from './data.js'

const initial = {
  name: '',
  contact: '',
  topic: 'callback',
  message: '',
}

export function RequestModal({ onClose }) {
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
    const topic = form.topic === 'email' ? 'Письмо с сайта' : 'Обратный звонок'
    const body = [
      `Имя: ${form.name}`,
      `Контакт: ${form.contact}`,
      `Тема: ${topic}`,
      '',
      form.message || 'Комментарий не указан.',
    ].join('\n')
    const href = `mailto:${company.email}?subject=${encodeURIComponent(topic + ' — ' + company.name)}&body=${encodeURIComponent(body)}`
    window.location.href = href
    setSent(true)
  }

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
          Выберите обратный звонок или письмо на почту. Серверной части нет: заявка откроется
          в вашем почтовом клиенте.
        </p>
        {sent ? (
          <div className="success">Заявка сформирована. Если клиент не открылся, напишите на {company.email}.</div>
        ) : null}
        <form onSubmit={submit}>
          <label className="field">
            <span>Как к вам обращаться</span>
            <input required value={form.name} onChange={update('name')} name="name" autoComplete="name" />
          </label>
          <label className="field">
            <span>Телефон или e-mail</span>
            <input required value={form.contact} onChange={update('contact')} name="contact" />
          </label>
          <label className="field">
            <span>Как удобнее ответить</span>
            <select value={form.topic} onChange={update('topic')} name="topic">
              <option value="callback">Обратный звонок</option>
              <option value="email">Написать на почту</option>
            </select>
          </label>
          <label className="field">
            <span>Комментарий</span>
            <textarea rows="4" value={form.message} onChange={update('message')} name="message" placeholder="Абонемент, секция, аренда зала…" />
          </label>
          <div className="modal-actions">
            <button className="btn btn-primary" type="submit">
              Отправить заявку
            </button>
            <a className="btn btn-ghost" href={`mailto:${company.email}`}>
              Сразу на почту
            </a>
            <button className="btn btn-ghost" type="button" onClick={onClose}>
              Закрыть
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
