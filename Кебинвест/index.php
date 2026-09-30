<?php
declare(strict_types=1);

$company = [
    'name' => 'ООО «КЕБИНВЕСТ»',
    'email' => 'kebinvest1@yandex.ru',
    'address' => '194291, Санкт-Петербург, ул. Кустодиева, д. 7, к. 2, стр. 1, помещ. 17-Н',
    'ogrn' => '1217800062347',
    'inn' => '7841093775',
    'kpp' => '780201001',
    'registered' => '16 апреля 2021 года',
    'rkn' => '78-25-184143',
    'person' => 'Иванчук Олеся Витальевна',
];

function e(string $value): string
{
    return htmlspecialchars($value, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
}
?>
<!doctype html>
<html lang="ru">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="theme-color" content="#f7f5ee">
    <meta name="description" content="Физкультурно-оздоровительный комплекс на улице Кустодиева в Санкт-Петербурге. Пространство для движения и информация о компании ООО «КЕБИНВЕСТ».">
    <title>ФОК на Кустодиева — пространство для движения</title>
    <link rel="icon" href="favicon.svg" type="image/svg+xml">
    <link rel="stylesheet" href="styles.css">
</head>
<body id="top">
    <a class="skip-link" href="#main">К содержимому</a>

    <header class="site-header">
        <div class="container header-inner">
            <a class="brand" href="#top" aria-label="ФОК на Кустодиева — на главную">
                <span class="brand-mark" aria-hidden="true"><span></span></span>
                <span class="brand-copy"><strong>ФОК</strong><small>на Кустодиева</small></span>
            </a>
            <nav class="desktop-nav" aria-label="Основная навигация">
                <a href="#about">О пространстве</a>
                <a href="#gallery">Атмосфера</a>
                <a href="#company">О компании</a>
                <a href="#contacts">Контакты</a>
            </nav>
            <a class="header-link" href="mailto:<?= e($company['email']) ?>">Написать нам <span aria-hidden="true">↗</span></a>
            <details class="mobile-menu">
                <summary aria-label="Открыть меню"><span></span><span></span></summary>
                <nav aria-label="Мобильная навигация"><a href="#about">О пространстве</a><a href="#gallery">Атмосфера</a><a href="#company">О компании</a><a href="#contacts">Контакты</a></nav>
            </details>
        </div>
    </header>

    <main id="main">
        <section class="hero" aria-labelledby="hero-title">
            <div class="container hero-grid">
                <div class="hero-copy">
                    <p class="eyebrow"><span class="dot"></span> Санкт-Петербург · Кустодиева, 7</p>
                    <h1 id="hero-title">Здесь начинается <em>движение.</em></h1>
                    <p class="hero-lead">Физкультурно-оздоровительный комплекс — пространство, в котором легко найти время для активности и сменить ритм повседневного дня.</p>
                    <div class="hero-actions"><a class="round-link" href="#about"><span aria-hidden="true">↘</span></a><span>Узнать о пространстве</span></div>
                    <span class="hero-index">01 <span></span> 04</span>
                </div>
                <figure class="hero-photo">
                    <img src="https://images.unsplash.com/photo-1730244548329-4ae2f4fcaa7c?auto=format&amp;fit=crop&amp;w=1600&amp;q=82" alt="Иллюстративная фотография крытого бассейна с дорожками" fetchpriority="high">
                    <figcaption><span>Пространство для себя</span><small>Фото: Mariusz Smenzyk / Unsplash</small></figcaption>
                </figure>
            </div>
        </section>

        <div class="marquee" aria-hidden="true"><div class="container"><span>ДВИЖЕНИЕ</span><i>✳</i><span>ЭНЕРГИЯ</span><i>✳</i><span>СВОЙ РИТМ</span><i>✳</i><span>ПРОСТРАНСТВО</span></div></div>

        <section class="intro section-space" id="about" aria-labelledby="about-title">
            <div class="container">
                <div class="section-heading"><span class="section-number">01 / О ПРОСТРАНСТВЕ</span><span class="section-line"></span></div>
                <div class="intro-grid"><h2 id="about-title">Больше, чем точка <em>на карте.</em></h2><div class="intro-copy"><p class="intro-lead">Место, куда можно прийти за движением, переключиться и уделить время себе.</p><p>ФОК расположен в Выборгском районе Санкт-Петербурга на улице Кустодиева. Спортивное пространство становится частью привычного городского маршрута — рядом с домом, работой и повседневными делами.</p><a class="text-link" href="#gallery">Посмотреть атмосферу <span aria-hidden="true">↗</span></a></div></div>
            </div>
        </section>

        <section class="gallery section-space" id="gallery" aria-labelledby="gallery-title">
            <div class="container">
                <div class="section-heading"><span class="section-number">02 / АТМОСФЕРА</span><span class="section-line"></span></div>
                <div class="gallery-heading"><h2 id="gallery-title">Пространство<br><em>в движении.</em></h2><p>Свет, воздух и энергия спортивной среды. Фотографии передают настроение и не изображают помещения этого комплекса.</p></div>
                <div class="gallery-grid">
                    <figure class="gallery-photo gallery-large"><img src="https://images.unsplash.com/photo-1570829460005-c840387bb1ca?auto=format&amp;fit=crop&amp;w=1400&amp;q=80" alt="Иллюстративное фото тренажёрного зала" loading="lazy"><figcaption><span>01 / Энергия движения</span><small>Фото: Rodrigo S / Unsplash</small></figcaption></figure>
                    <figure class="gallery-photo gallery-small"><img src="https://images.unsplash.com/photo-1775993167284-8e6a6e56ab69?auto=format&amp;fit=crop&amp;w=1100&amp;q=80" alt="Иллюстративное фото спортивного зала" loading="lazy"><figcaption><span>02 / Простор для занятий</span><small>Фото: Palak Pitroda / Unsplash</small></figcaption></figure>
                </div>
                <p class="photo-note">Фотографии носят иллюстративный характер и не изображают помещения этого комплекса.</p>
            </div>
        </section>

        <section class="quote" aria-label="О движении"><div class="container quote-inner"><span aria-hidden="true">✳</span><p>Найти свой темп.<br><em>Оставаться в движении.</em></p><small>ФОК / САНКТ-ПЕТЕРБУРГ</small></div></section>

        <section class="company section-space" id="company" aria-labelledby="company-title">
            <div class="container">
                <div class="section-heading"><span class="section-number">03 / О КОМПАНИИ</span><span class="section-line"></span></div>
                <div class="company-grid"><div class="company-copy"><h2 id="company-title">Информация<br><em>о компании.</em></h2><p>ООО «КЕБИНВЕСТ» — собственник коммерческих помещений физкультурно-оздоровительного комплекса. Ниже опубликованы регистрационные сведения и контакт для обращений к компании.</p></div><dl class="details-list"><div><dt>Полное наименование</dt><dd><?= e($company['name']) ?></dd></div><div><dt>Дата регистрации</dt><dd><?= e($company['registered']) ?></dd></div><div><dt>ОГРН</dt><dd><?= e($company['ogrn']) ?></dd></div><div><dt>ИНН / КПП</dt><dd><?= e($company['inn']) ?> / <?= e($company['kpp']) ?></dd></div><div><dt>Налоговый режим / категория</dt><dd>УСН / микропредприятие</dd></div><div><dt>Юридический адрес</dt><dd><?= e($company['address']) ?></dd></div></dl></div>
            </div>
        </section>

        <section class="contacts section-space" id="contacts" aria-labelledby="contacts-title"><div class="container"><div class="section-heading light"><span class="section-number">04 / КОНТАКТЫ</span><span class="section-line"></span></div><div class="contacts-grid"><div><p class="contact-kicker">ДЛЯ ОБРАЩЕНИЙ К ООО «КЕБИНВЕСТ»</p><h2 id="contacts-title">Давайте<br><em>на связи.</em></h2></div><div class="contact-side"><p>По вопросам, связанным с компанией и принадлежащими ей помещениями, напишите нам на электронную почту.</p><a class="contact-email" href="mailto:<?= e($company['email']) ?>"><?= e($company['email']) ?><span aria-hidden="true">↗</span></a><div class="contact-address"><span>ЮРИДИЧЕСКИЙ АДРЕС</span><p><?= e($company['address']) ?></p></div></div></div></div></section>
    </main>

    <footer class="footer"><div class="container footer-grid"><div class="footer-brand">ФОК <span>на Кустодиева</span></div><div><p>© <?= date('Y') ?> <?= e($company['name']) ?><br>ОГРН <?= e($company['ogrn']) ?> · ИНН <?= e($company['inn']) ?></p><p class="footer-registry">Реестр операторов персональных данных № <?= e($company['rkn']) ?>. Ответственная за организацию обработки персональных данных — <?= e($company['person']) ?>. Обращения: <a href="mailto:<?= e($company['email']) ?>"><?= e($company['email']) ?></a>.</p></div><a class="back-top" href="#top">Наверх ↑</a></div><div class="container footer-bottom"><span>Фотографии на странице иллюстративные, лицензия Unsplash. <a href="https://unsplash.com/license" target="_blank" rel="noopener noreferrer">Об условиях использования ↗</a></span></div></footer>
</body>
</html>
