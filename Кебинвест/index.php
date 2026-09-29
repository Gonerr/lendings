<?php
declare(strict_types=1);

$company = [
    'name' => 'ООО «КЕБИНВЕСТ»',
    'email' => 'kebinvest1@yandex.ru',
    'phone' => '+7 (905) 215-64-84',
    'phoneHref' => '+79052156484',
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
    <meta name="theme-color" content="#17312f">
    <meta name="description" content="ООО «КЕБИНВЕСТ» — собственник коммерческих помещений в физкультурно-оздоровительном комплексе Санкт-Петербурга. Информация о компании, реквизиты и контакты.">
    <title>КЕБИНВЕСТ — недвижимость для движения</title>
    <link rel="icon" href="favicon.svg" type="image/svg+xml">
    <link rel="stylesheet" href="styles.css">
    <script src="script.js" defer></script>
</head>
<body id="top">
    <a class="skip-link" href="#main">К содержимому</a>

    <header class="site-header">
        <div class="container header-inner">
            <a class="brand" href="#top" aria-label="Кебинвест — на главную">
                <span class="brand-symbol" aria-hidden="true"><span></span><span></span><span></span></span>
                <span class="brand-name">КЕБИНВЕСТ<small>коммерческая недвижимость</small></span>
            </a>
            <button class="menu-toggle" type="button" aria-label="Открыть меню" aria-controls="main-nav" aria-expanded="false">
                <span></span><span></span>
            </button>
            <nav class="nav" id="main-nav" aria-label="Основная навигация">
                <a href="#about">О компании</a>
                <a href="#approach">Наша роль</a>
                <a href="#details">Реквизиты</a>
                <a href="#contacts">Контакты</a>
            </nav>
            <a class="header-contact" href="mailto:<?= e($company['email']) ?>">Написать нам <span aria-hidden="true">↗</span></a>
        </div>
    </header>

    <main id="main">
        <section class="hero" aria-labelledby="hero-title">
            <div class="container hero-grid">
                <div class="hero-copy">
                    <p class="eyebrow"><span class="eyebrow-line"></span> Санкт-Петербург · с 2021 года</p>
                    <h1 id="hero-title">Пространство<br>для <em>движения.</em></h1>
                    <p class="hero-lead">КЕБИНВЕСТ владеет коммерческими помещениями в физкультурно-оздоровительном комплексе. Сегодня в них работает арендатор — «Спортлайн».</p>
                    <div class="hero-actions">
                        <a class="button button-light" href="#about">О компании <span aria-hidden="true">↗</span></a>
                        <a class="quiet-link" href="#contacts">Контакты <span aria-hidden="true">↗</span></a>
                    </div>
                </div>
                <div class="hero-art" role="img" aria-label="Абстрактная архитектурная композиция спортивного пространства">
                    <div class="art-grid" aria-hidden="true"></div>
                    <div class="art-halo" aria-hidden="true"></div>
                    <div class="art-building" aria-hidden="true"><span></span><span></span><span></span></div>
                    <div class="art-window" aria-hidden="true"></div>
                    <div class="art-caption"><span>01 / 03</span><span>ПРОСТРАНСТВО В ДЕЛЕ</span></div>
                    <div class="art-side-label" aria-hidden="true">K / САНКТ-ПЕТЕРБУРГ</div>
                </div>
            </div>
            <div class="container hero-foot"><span>НЕДВИЖИМОСТЬ · ФОК</span><span>ЛИСТАЙТЕ ВНИЗ <span aria-hidden="true">↓</span></span></div>
        </section>

        <section class="intro section-pad" id="about" aria-labelledby="about-title">
            <div class="container">
                <div class="section-top"><span>01 / О КОМПАНИИ</span><span>СОБСТВЕННОСТЬ И АРЕНДА</span></div>
                <div class="intro-grid">
                    <h2 id="about-title">За каждым активным местом есть <i>пространство.</i></h2>
                    <div class="intro-text">
                        <p class="lead">Мы обеспечиваем основу, на которой работает спортивная инфраструктура.</p>
                        <p>ООО «КЕБИНВЕСТ» — собственник коммерческой недвижимости в физкультурно-оздоровительном комплексе Санкт-Петербурга. Помещения переданы в аренду компании «Спортлайн», которая сейчас ведёт там деятельность.</p>
                        <p>Вопросы посещения, тренировок и услуг комплекса относятся к деятельности арендатора. По вопросам, связанным с ООО «КЕБИНВЕСТ» и принадлежащими ему помещениями, воспользуйтесь контактами ниже.</p>
                        <a class="inline-link" href="#contacts">Перейти к контактам <span aria-hidden="true">↗</span></a>
                    </div>
                </div>
            </div>
        </section>

        <section class="role section-pad" id="approach" aria-labelledby="role-title">
            <div class="container">
                <div class="section-top"><span>02 / НАША РОЛЬ</span><span>КОММЕРЧЕСКАЯ НЕДВИЖИМОСТЬ</span></div>
                <div class="role-heading"><h2 id="role-title">У пространства<br>есть <i>назначение.</i></h2><p>Помещения комплекса используются действующим арендатором. Здесь коммерческая недвижимость служит повседневной работе спортивной площадки.</p></div>
                <div class="role-cards">
                    <article class="role-card"><span class="card-index">01 / СОБСТВЕННОСТЬ</span><div class="card-icon icon-architecture" aria-hidden="true"><span></span></div><h3>Помещения ФОКа</h3><p>КЕБИНВЕСТ владеет коммерческими помещениями в физкультурно-оздоровительном комплексе.</p></article>
                    <article class="role-card"><span class="card-index">02 / АРЕНДА</span><div class="card-icon icon-partnership" aria-hidden="true"><span></span></div><h3>Действующий арендатор</h3><p>Помещения предоставлены в аренду «Спортлайну», который ведёт деятельность на этой площадке.</p></article>
                    <article class="role-card"><span class="card-index">03 / СВЯЗЬ</span><div class="card-icon icon-contact" aria-hidden="true"><span></span></div><h3>Открытые контакты</h3><p>Для деловых и организационных вопросов доступны телефон и электронная почта компании.</p></article>
                </div>
            </div>
        </section>

        <section class="statement" aria-label="Принцип работы">
            <div class="container statement-inner"><span class="statement-star" aria-hidden="true">✳</span><p>Недвижимость, которая <em>работает.</em></p><span class="statement-caption">КЕБИНВЕСТ / САНКТ-ПЕТЕРБУРГ</span></div>
        </section>

        <section class="details section-pad" id="details" aria-labelledby="details-title">
            <div class="container">
                <div class="section-top"><span>03 / РЕКВИЗИТЫ</span><span>СВЕДЕНИЯ О КОМПАНИИ</span></div>
                <div class="details-grid">
                    <div class="details-heading"><h2 id="details-title">По делу.<br><i>Прозрачно.</i></h2><p>Основные регистрационные сведения ООО «КЕБИНВЕСТ».</p></div>
                    <dl class="details-list">
                        <div><dt>Полное наименование</dt><dd><?= e($company['name']) ?></dd></div>
                        <div><dt>Дата регистрации</dt><dd><?= e($company['registered']) ?></dd></div>
                        <div><dt>ОГРН</dt><dd><?= e($company['ogrn']) ?></dd></div>
                        <div><dt>ИНН / КПП</dt><dd><?= e($company['inn']) ?> / <?= e($company['kpp']) ?></dd></div>
                        <div><dt>Юридический адрес</dt><dd><?= e($company['address']) ?></dd></div>
                    </dl>
                </div>
            </div>
        </section>

        <section class="contacts section-pad" id="contacts" aria-labelledby="contacts-title">
            <div class="container">
                <div class="section-top"><span>04 / КОНТАКТЫ</span><span>НА СВЯЗИ ПО ДЕЛОВЫМ ВОПРОСАМ</span></div>
                <div class="contacts-grid">
                    <div><h2 id="contacts-title">Есть вопрос?<br><i>Пишите нам.</i></h2><p>По вопросам деятельности компании и принадлежащих ей помещений свяжитесь с нами напрямую.</p><a class="button button-dark" href="mailto:<?= e($company['email']) ?>">Написать письмо <span aria-hidden="true">↗</span></a></div>
                    <div class="contact-info">
                        <div><span class="contact-label">ЭЛЕКТРОННАЯ ПОЧТА</span><a href="mailto:<?= e($company['email']) ?>"><?= e($company['email']) ?> <span aria-hidden="true">↗</span></a></div>
                        <div><span class="contact-label">ТЕЛЕФОН</span><a href="tel:<?= e($company['phoneHref']) ?>"><?= e($company['phone']) ?> <span aria-hidden="true">↗</span></a></div>
                        <div><span class="contact-label">ЮРИДИЧЕСКИЙ АДРЕС</span><p><?= e($company['address']) ?></p></div>
                    </div>
                </div>
                <div class="registry-note"><span class="registry-icon" aria-hidden="true">i</span><p>ООО «КЕБИНВЕСТ» внесено в реестр операторов персональных данных Роскомнадзора, регистрационный № <?= e($company['rkn']) ?>. Ответственная за организацию обработки персональных данных — <?= e($company['person']) ?>. По вопросам обработки данных обращайтесь по указанным контактам.</p></div>
            </div>
        </section>
    </main>

    <footer class="footer"><div class="container footer-inner"><a class="footer-brand" href="#top">КЕБИНВЕСТ <span aria-hidden="true">↗</span></a><span>© <?= date('Y') ?> <?= e($company['name']) ?><br>ОГРН <?= e($company['ogrn']) ?> · ИНН <?= e($company['inn']) ?></span><a href="#top">Наверх ↑</a></div></footer>
</body>
</html>
