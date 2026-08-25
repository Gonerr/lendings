# C# backend для формы обратной связи

Backend принимает `POST /api/contact`, отправляет HTML-письмо через внутренний
SMTP relay `10.10.0.27:25` и раздаёт собранный React-фронтенд из `wwwroot`.

## Локальный запуск

1. В одном терминале: `dotnet run --project backend/LandingContact.Api`.
2. Во втором терминале: `npm run dev`.
3. Vite проксирует `/api` на `http://localhost:5080`.

## Публикация в IIS

На Windows запустите из корня лендинга:

```powershell
.\scripts\publish-iis.ps1
```

Скрипт собирает фронтенд, помещает его в `wwwroot` и создаёт готовую папку
`publish-iis`. Для сайта в IIS нужен Hosting Bundle для .NET 8 и доступ сервера
к `10.10.0.27:25`.

SMTP-параметры можно переопределить переменными окружения IIS вида
`Smtp__Host`, `Smtp__Port`, `Smtp__RecipientEmail` и т. д. Пока все обращения
отправляются на `aalihacheva@l1n1.ru`.
