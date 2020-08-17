<?php 
    $message_sent = false;
    if(isset($_POST['email']) && $_POST['email'] != '') {
        if (filter_var($_POST['email'], FILTER_VALIDATE_EMAIL)) {
            $userName = $_POST['firstName'];
            $userEmail = $_POST['email'];
            $userSubject = $_POST['employment'];
            $userMessage = $_POST['interest'];
            $to = "st@zahnarzt-heldeen.de"; // wrong!
            $body = "";
            $body .= "Form: ".$userName. "\r\n"; 
            $body .= "Email: ".$userEmail. "\r\n"; 
            $body .= "Message: ".$userMessage. "\r\n"; 
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
  <script class="staticscript" type="text/javascript" src="/dist/jquery.js"></script>
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
          rel="modal:open" class="btn consultation sm white">
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
      <div id="fffModal" class="modal show">
        <a href="" class="close noTrack" rel="modal:close"></a>
        <div class="person">
          <picture>
          </picture>
        </div>
        <div class="form">
          <form action="about.php" method="POST" data-consultation="sales" data-parsley-validate>
            <div class="form-parsley firstname">
              <label>Vorname*</label>
              <input  name="firstName" type="text" class="form-field" required>
            </div>
            <div class="form-parsley lastname">
              <label>Nachname*</label>
              <input name="lastName" type="text" class="form-field" required>
            </div>
            <div class="form-parsley email">
              <label>E-Mail Adresse*</label>
              <input name="email" type="email" class="form-field" data-parsley-trigger="change" required>
            </div>
            <div class="form-parsley phone">
              <label>Telefonnummer*</label>
              <input name="phoneNumber" type="tel" class="form-field" data-parsley-pattern="^[\d\+\-\(\)\s]*$"
                data-parsley-pattern-message="Ungültig (0-9,+,-,() sind erlaubt)." required>
            </div>
            <div class="form-parsley birthday">
              <label>Geburtsdatum*</label>
              <input name="birthday" type="text" class="form-field birthdayMask" placeholder="TT.MM.JJJJ" required
                data-parsley-valid-date>
            </div>
            <div class="form-parsley employee">
              <label>Grund*</label>
              <div class="form-select">
                <select name="employment" required>
                  <option value="">Bitte wählen...</option>
                  <option value="employed">Film</option>
                  <option value="self-employed">Documentary</option>
                  <option value="civil-servant">Motion</option>
                  <option value="student">Animation</option>
                </select>
              </div>
            </div>
            <div class="form-parsley interest">
              <label>Ich interessiere mich für*</label>
              <div class="form-select">
                <select name="interest" class="interestSelect" required>
                  <option value="general" data-tracking="all.all">Typography</option>
                  <option value="comprehensive" data-tracking="comprehensive.all">Graphic Design
                  </option>
                  <option value="civil-servant" data-tracking="civil-servant.all">Documentary
                  </option>
                  <option value="dental" data-tracking="dental.zahn-premium">Motion
                  </option>
                  <option value="clinic" data-tracking="hospital.all">Film
                  </option>
                </select>
              </div>
            </div>
            <!-- <div class="form-parsley appointment">
              <label>Möchtest Du einen Termin vereinbaren?*</label>
              <div class="fields">
                <div class="form-parsley date">
                  <div class="form-select">
                    <select class="dateSelect" required>
                      <option value="">Datum wählen...</option>
                    </select>
                  </div>
                </div>
                <div class="form-parsley time">
                  <div class="form-select">
                    <select class="timeSelect" disabled>
                      <option value="">Zeit wählen...</option>
                    </select>
                  </div>
                </div>
              </div>
            </div> -->
            <small>Mit dem Abschicken meiner Daten erkläre ich meine 
              <a href="#disclaimerModal" rel="modal:open">Einwilligung</a> zur Kontaktaufnahme durch Shady Tawfik.
            </small>
            <button class="btn-1 green" type="submit">
              Termin vereinbaren
            </button>
          </form>
        </div>
        <div class="list">
        </div>
      </div>
      <div id="disclaimerModal" class="modal">
        <a href="" class="close noTrack" rel="modal:close"></a>
        <span class="h4 noTop">Einwilligungserklärung</span>
        <p>Mit der Eingabe deiner Daten erklärst du dich damit einverstanden, dass wir dich per Telefon und E-Mail
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
  <script type="text/javascript" src="/dist/main.js"></script> 
  <script type="text/javascript" src="/dist/libs.js"></script>
  <script type="text/javascript" src="/dist/scripts.js"></script> 
</body>
</html>