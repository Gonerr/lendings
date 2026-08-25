# Развёртывание сайта ООО «Первый» на IIS

В production React/Next-фронтенд и ASP.NET Core API публикуются как одно IIS-приложение. Поэтому форма использует относительный адрес `POST /api/contact`, а CORS для production не требуется.

## Что установить на сервере

- IIS с ролью **Static Content**;
- **.NET 8 Hosting Bundle** (он устанавливает ASP.NET Core Module для IIS);
- SMTP-доступ к почтовому серверу компании.

Node.js нужен только на компьютере, где формируется пакет публикации. На самом IIS-сервере он не требуется.

## Создание пакета

Откройте PowerShell в папке `Первый` и выполните:

```powershell
.\scripts\publish-iis.ps1
```

Скрипт установит frontend-зависимости, создаст статический экспорт в `out`, скопирует его в `wwwroot` API и выполнит `dotnet publish`. Готовый пакет появится в `Первый\publish-iis`.

## Настройки SMTP

Секреты не хранятся в `appsettings.json`. Для пула приложений IIS задайте следующие переменные окружения:

| Переменная | Пример |
|---|---|
| `Smtp__Host` | `smtp.example.ru` |
| `Smtp__Port` | `587` |
| `Smtp__EnableSsl` | `true` |
| `Smtp__Username` | адрес или логин SMTP |
| `Smtp__Password` | пароль приложения / SMTP-пароль |
| `Smtp__FromEmail` | адрес отправителя |
| `Smtp__FromName` | `Сайт ООО «Первый»` |
| `Smtp__RecipientEmail` | `vopros@park-mall.shop` |

После изменения переменных перезапустите пул приложений.

Альтернатива: скопируйте `appsettings.Production.example.json` в
`appsettings.Production.json` уже внутри опубликованной папки, заполните SMTP-данные
и ограничьте доступ к файлу учётной записью пула IIS. Файл с реальными секретами
добавлен в `.gitignore` и не должен попадать в GitHub.

## Настройка IIS

1. Создайте отдельный пул приложений с параметром **No Managed Code**.
2. Создайте сайт (или приложение) и укажите физический путь к папке `publish-iis`.
3. Выдайте пользователю пула права на чтение и выполнение этой папки.
4. Привяжите домен и HTTPS-сертификат.
5. Проверьте `GET /api/health`, затем отправьте тестовое обращение через форму.

## Локальная разработка

В одном терминале запустите API:

```powershell
dotnet run --project .\backend\FirstCompany.Api
```

Во втором терминале запустите frontend:

```powershell
npm run dev
```

Vite передаёт запросы `/api` на `http://localhost:5080`. Если API работает на другом адресе, задайте `VITE_DEV_API_TARGET` перед запуском frontend.

Если frontend и API всё же размещаются на разных доменах, добавьте адрес frontend
в массив `Cors:AllowedOrigins` или задайте переменную
`Cors__AllowedOrigins__0=https://frontend.example.ru` через конфигурацию IIS.
