<?php 
    $message_sent = false;
    if(isset($_POST['email']) && $_POST['email'] != '') {
        if (filter_var($_POST['email'], FILTER_VALIDATE_EMAIL)) {
            $userName = $_POST['firstName'];
            $userLastName = $_POST['lastName'];
            $userEmail = $_POST['email'];
            $userPhone = $_POST['phoneNumber'];
            $userSubject = $_POST['subject'];
            $userMessage = $_POST['comments'];
            $to = "st@zahnardzt-helden.de"; // wrong!
            $body = "";
            $body .= "Name: ".$userName. "\r\n";
            $body .= "Nachname: ".$userLastName. "\r\n";  
            $body .= "Email: ".$userEmail. "\r\n"; 
            $body .= "Telefonnummer: ".$userPhone. "\r\n"; 
            $body .= "Nachricht: ".$userMessage. "\r\n"; 
            mail($to,$userSubject, $body);
            $message_sent = true;
        }
    }
?>
<html lang="de">

<head>
    <meta charset="utf-8" />
    <title>FffCorp</title>
    <meta name="description" content="" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="shortcut icon" type="image/png" href="/images/favicon.ico" />
    <link rel="stylesheet" href="dist/index.css" />
    <meta name="theme-color" content="#fafafa" />
    <script type="text/javascript" src="/dist/jquery.js"></script>
</head>

<body>
    <header>
        <a class="home">
            <label class="switch">
                <span class="sliderToggle">
                    <div id="circle"></div>
                </span>
            </label>
            <h2>
                <span id="inverted-msg">FFF</span>
            </h2>
        </a>
        <menu class="desktop-nav">
            <nav>
                <a href="/index.html">Home</a>
                <a href="/work.html">Work</a>
                <a href="/about.html">About</a>
                <a href="">Kontakt</a>
                <a href="">Blog</a>
            </nav>
        </menu>
        <div class="langToggle">
            <a href="#" class="lang">
                DE
            </a>
            <a href="#" class="lang">
                EN
            </a>
        </div>
        <menu class="mobile-display">
            <span id="burger">
                <svg viewBox="0 0 50 50">
                    <g>
                        <line class="burger-menu stroke-open" x1="49.5" y1="25" x2="0.5" y2="25" />
                        <line class="burger-menu stroke-open" x1="0.5" y1="25" x2="49.5" y2="25" />
                    </g>
                    <line class="burger-menu stroke-close" x1="0.5" y1="8.5" x2="49.5" y2="8.5" />
                    <line class="burger-menu stroke-close" x1="0.5" y1="41.5" x2="49.5" y2="41.5" />
                </svg>
            </span>
        </menu>
        <nav id="mobile-nav">
            <div class="navGridMenu">
                <a href="/index.html">Home</a>
                <a href="/work.html">Work</a>
                <a href="">About</a>
                <a href="">Kontakt</a>
                <a href="">Blog</a>
                <div class="navLang">
                    <a href="#" class="lang">
                        DE
                    </a>
                    <a href="#" class="lang">
                        EN
                    </a>
                </div>
            </div>
        </nav>
    </header>
    <main>
        <article class="pageContent">
            <div class="buttons">
                <a href="#fffModal" category="header-navigation" action="home" label="consultation-modal"
                    rel="modal:open" class="btn consultation sm">
                    HIT ME UP
                </a>
            </div>
        </article>
        <?php
    if($message_sent):
    ?>
        <div id="confirmModal" class="modal show">
            <img src="/2019/img/skeumins/letter.svg" alt="">
            <span class="h4">Vielen Dank!</span>
            <p>Deine E-Mail-Adresse wurde<br>erfolgreich bestätigt.</p>
            <a href="" rel="modal:close" class="btn center noTrack">Fenster schließen</a>
        </div>
        </div>
        <?php
    else:
    ?>
        <div class="modal-wrapper">
            <div id="fffModal" class="modal">
                <a href="" class="close noTrack" rel="modal:close"></a>
                <div class="form-img">
                <img src="content/img/fff-c-ancient-1.png" />
              </div>
                <div class="form">
                    <form action="about.php" method="POST" data-consultation="sales" data-parsley-validate>
                        <div class="form-parsley firstname">
                            <label>Vorname*</label>
                            <input name="firstName" type="text" class="form-field" data-parsley-trigger="change"
                                autocomplete="off" data-parsley-pattern="^[a-zA-z\s\-\.\üÜäÄöÖß]*$"
                                data-parsley-pattern-message="Ungültig (0-9,+,-,() nicht erlaubt)." required="">
                        </div>
                        <div class="form-parsley lastname">
                            <label>Nachname*</label>
                            <input name="lastName" type="text" class="form-field" data-parsley-trigger="change"
                                autocomplete="off" data-parsley-pattern="^[a-zA-z\s\-\.\üÜäÄöÖß]*$"
                                data-parsley-pattern-message="Ungültig (0-9,+,-,() nicht erlaubt)." required="">
                        </div>
                        <div class="form-parsley email">
                            <label>E-Mail Adresse*</label>
                            <input name="email" type="email" class="form-field" data-parsley-trigger="change"
                                required="">
                        </div>
                        <div class="form-parsley phone">
                            <label>Telefonnummer*</label>
                            <input name="phoneNumber" type="tel" class="form-field" data-parsley-trigger="change"
                                data-parsley-pattern="^[\d\+\-\.\(\)\/\s]*$"
                                data-parsley-pattern-message="Ungültig (0-9,+,-,() sind erlaubt)." required="">
                        </div>
                        <div class="form-parsley birthday">
                            <label>Geburtsdatum*</label>
                            <input name="birthday" type="text" class="form-field birthdayMask" placeholder="TT.MM.JJJJ"
                                data-parsley-valid-date required="">
                        </div>
                        <div class="form-parsley reason">
                            <label>Grund*</label>
                            <div class="form-select">
                                <select name="subject">
                                    <option value="">Bitte wählen...</option>
                                    <option value="Auftrag: Film">Film</option>
                                    <option value="Auftrag: Typografie">Typografie</option>
                                    <option value="Auftrag: Motion">Motion</option>
                                    <option value="Auftrag: Animation">Animation</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-parsley interest">
                        <label>Ich interessiere mich für*</label>
                            <div class="form-parsley">
                            <p><textarea cols="25" wrap="physical" id="msg" name="comments"></textarea></p>
                            </div>
                        </div>
                        <small>Mit dem Abschicken meiner Daten erkläre ich meine
                            <a href="#disclaimerModal" rel="modal:open">Einwilligung</a> zur Kontaktaufnahme durch Shady
                            Tawfik.
                        </small>
                        <button class="btn-1 consultation-modal" value="validate" type="submit">
                            HIT ME UP
                        </button>
                    </form>
                </div>
                <div class="list">
                </div>
            </div>
            <div id="disclaimerModal" class="modal">
                <a href="" class="close noTrack" rel="modal:close"></a>
                <span class="h4 noTop">Einwilligungserklärung</span>
                <p>Mit der Eingabe deiner Daten erklärst du dich damit einverstanden, dass wir dich per Telefon und
                    E-Mail
                    kontaktieren dürfen.</p>
                <a href="" rel="modal:close" class="btn link center noTrack">Close</a>
            </div>
        </div>
        <?php
        endif;
    ?>
    </main>
    <footer>
        <section id="mobile">
            <article class="information">
                <div class="row-1">
                    <strong>
                        <p class="medium">2020</p>
                    </strong>
                </div>
                <div class="row-2">
                    <a>
                        <p>Develop</p>
                    </a>
                    <a>
                        <p>Shady Tawfik</p>
                    </a>
                    <p>All Rights Reserved©</p>
                </div>
            </article>
            <article class="information-1">
                <div class="row-1">
                    <strong>
                        <p class="medium">Follow Me</p>
                    </strong>
                </div>
                <div class="row-2">
                    <a>
                        <p>Instagram</p>
                    </a>
                    <a>
                        <p>Behance</p>
                    </a>
                </div>
            </article>
            <article class="information-2">
                <div class="row-1">
                    <strong>
                        <p class="medium">Work with Me</p>
                    </strong>
                </div>
                <div class="row-2">
                    <a>
                        <p>info@FFFCORP.de</p>
                    </a>
                </div>
            </article>
            <article class="information-3">
                <div class="row-1">
                    <strong>
                        <p class="medium">Write about me</p>
                    </strong>
                </div>
                <div class="row-2">
                    <a>
                        <p>press@FFFCORP.de</p>
                    </a>
                </div>
            </article>
            <article class="information-4">
                <div class="row-1">
                    <strong>
                        <p class="medium">Legal</p>
                    </strong>
                </div>
                <div class="row-2">
                    <a>
                        <p>Datenschutz</p>
                    </a>
                    <a>
                        <p>Impressum</p>
                    </a>
                </div>
            </article>
        </section>
        <section id="desktop">
            <article class="information">
                <div class="row-1">
                    <strong>
                        <p class="medium">2020</p>
                    </strong>
                </div>
                <div class="row-2">
                    <a>
                        <p>Develop</p>
                    </a>
                    <a>
                        <p>Shady Tawfik</p>
                    </a>
                    <p>All Rights Reserved©</p>
                </div>
            </article>
            <article class="information-1">
                <div class="row-1">
                    <strong>
                        <p class="medium">Follow me</p>
                    </strong>
                </div>
                <div class="row-2">
                    <a>
                        <p>Instagram</p>
                    </a>
                    <a>
                        <p>Behance</p>
                    </a>
                </div>
                <br>
                <strong>
                    <p class="medium">Legal</p>
                </strong>
                </div>
                <div class="row-2">
                    <a>
                        <p>Datenschutz</p>
                    </a>
                    <a>
                        <p>Impressum</p>
                    </a>
                </div>
            </article>
            <article class="information-2">
                <div class="row-1">
                    <strong>
                        <p class="medium">Work With Me</p>
                    </strong>
                </div>
                <div class="row-2">
                    <a>
                        <p>Info@fffcorp.de</p>
                    </a>
                    <a>
                        <p>@fffcorp</p>
                    </a>
                </div>
                <br>
                <strong>
                    <p class="medium">Write About Me</p>
                </strong>
                </div>
                <div class="row-2">
                    <a>
                        <p>Press@fffcorp.de</p>
                    </a>
                </div>
            </article>
        </section>
    </footer>
    <script>
        (function () {
            if (window.localStorage && window.sessionStorage) {
                var a = window.sessionStorage.getItem('sst');
                null == a && (a = 0);
                a = parseInt(a);
                0 === a && (a = Date.now(), window.sessionStorage.setItem('sst', a));
                window.timeOnSiteTimer || (window.timeOnSiteTimer = window.setInterval(function () {
                    var b = Date.now() - a;
                    90000 <= b && 110000 >= b && window.dataLayer.push({
                        event: 'util-session-length',
                        eventValue: b
                    })
                }, 2000))
            }
        })();

    </script>
    <script type="text/javascript" src="/dist/form-validate.js"></script>
    <script type="text/javascript" src="/dist/mask.js"></script> 
    <script type="text/javascript" src="/dist/main.js"></script>
    <script type="text/javascript" src="/dist/libs.js"></script>
</body>

</html>