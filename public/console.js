var Typer = {
  text: null,
  accessCountimer: null,
  index: 0,
  speed: 2,
  file: '',
  finish: false,
  init: function () {
    $.get(Typer.file, function (data) {
      Typer.text = data;
      Typer.text = Typer.text.slice(0, Typer.text.length - 1);
    });
  },

  content: function () {
    return $('#console').html();
  },

  write: function (str) {
    $('#console').append(str);
    return false;
  },

  addText: function (key) {
    if (Typer.text) {
      var cont = Typer.content();
      if (cont.substring(cont.length - 1, cont.length) == '|')
        $('#console').html(
          $('#console')
            .html()
            .substring(0, cont.length - 1)
        );
      if (key.keyCode != 8) {
        Typer.index += Typer.speed;
      } else {
        if (Typer.index > 0) Typer.index -= Typer.speed;
      }
      var text = Typer.text.substring(0, Typer.index);
      var rtn = new RegExp('\n', 'g');

      $('#console').html(text.replace(rtn, '<br/>'));
      window.scrollBy(0, 50);
    }
    if (key.preventDefault && key.keyCode != 122) {
      key.preventDefault();
    }
    if (key.keyCode != 122) {
      key.returnValue = false;
    }
  },

  updLstChr: function () {
    // blinking cursor
    if ($('#cursor').css('visibility') == 'visible')
      $('#cursor').css('visibility', 'hidden');
    else $('#cursor').css('visibility', 'visible');
  },
};

Typer.speed = 3;
Typer.file = 'user.bio';
Typer.init();

var timer = setInterval('t();', 30);
function t() {
  Typer.addText({ keyCode: 123748 });
  if (Typer.text && Typer.index > Typer.text.length) {
    clearInterval(timer);
    // inizialize timer for blinking cursor
    Typer.accessCountimer = setInterval(function () {
      Typer.updLstChr();
    }, 500);
  }
}
