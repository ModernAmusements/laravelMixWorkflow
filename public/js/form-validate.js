$(document).ready(function() {
  $('form').each(function(t) {
    let e = $(this),
      a = e.parsley();
    e.find('input, select').on('change keyup', () => {
      e.toggleClass('valid', a.isValid());
    });
  }),
    $(':input').inputmask();
  var e = new Date(),
    a =
      ('0' + e.getDate()).slice(-2) +
      '.' +
      ('0' + (e.getMonth() + 1)).slice(-2) +
      '.' +
      e.getFullYear();
  e.setFullYear(e.getFullYear() - 16);
  var i =
    ('0' + e.getDate()).slice(-2) +
    '.' +
    ('0' + (e.getMonth() + 1)).slice(-2) +
    '.' +
    e.getFullYear();
  e.setFullYear(e.getFullYear() - 84);
  var n =
    ('0' + e.getDate()).slice(-2) +
    '.' +
    ('0' + (e.getMonth() + 1)).slice(-2) +
    '.' +
    e.getFullYear();
  window.Parsley.addValidator('validDate', {
    validateString: t => !t.match(/[a-z]/i),
    messages: { de: 'Kein gültiges Datum', en: 'Invalid date' },
  }),
    window.Parsley.addValidator('fullAge', {
      validateString: t => parseInt(t) >= 18,
      messages: {
        de: 'Du musst mindestens 18 Jahre alt sein.',
        en: 'You have to be at least 18 years old.',
      },
    }),
    window.Parsley.addValidator('curDe', {
      validateString: function(t) {
        return (function validateCurDE(t) {
          return parseFloat(t.replace(/\./g, '')) >= 62550;
        })(t);
      },
      messages: {
        de: 'Dein Gehalt ist leider zu niedrig, um dich privat zu versichern.',
      },
    }),
    $('.birthdayMask').inputmask({
      alias: 'datetime',
      inputFormat: 'dd.mm.yyyy',
      placeholder: 'TT.MM.JJJJ',
      outputFormat: 'yyyy-mm-dd',
      autoUnmask: !0,
      min: n,
      max: a,
    }),
    $('.birthdayMask16').inputmask({
      alias: 'datetime',
      inputFormat: 'dd.mm.yyyy',
      placeholder: 'TT.MM.JJJJ',
      outputFormat: 'yyyy-mm-dd',
      autoUnmask: !0,
      min: n,
      max: i,
    }),
    $('.birthdayMaskEn').inputmask({
      alias: 'datetime',
      inputFormat: 'dd.mm.yyyy',
      placeholder: 'DD.MM.YYYY',
      outputFormat: 'yyyy-mm-dd',
      autoUnmask: !0,
      min: n,
      max: a,
    }),
    $('.dateMaskNow').inputmask({
      alias: 'datetime',
      inputFormat: 'dd.mm.yyyy',
      placeholder: 'TT.MM.JJJJ',
      outputFormat: 'yyyy-mm-dd',
      autoUnmask: !0,
      min: a,
    }),
    $('select')
      .on('change', function(t) {
        $(this).toggleClass('empty', '' === $(this).val());
      })
      .trigger('change');
  var s = { modal: null, phone: null };
});
