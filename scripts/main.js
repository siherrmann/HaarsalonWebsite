(function ($) {
    'use strict';

    var form = $('.contact'),
        message = $('.returnMsg'),
        form_data;

    function successFunc(response) {
        message.fadeIn().addClass('returnMsg');
        message.text(response);
        setTimeout(function () {
            message.fadeOut();
        }, 4000);
        form.find('input:not([type="submit"]), textarea').val('');
    }

    function failFunc(data) {
        message.fadeIn().addClass('returnMsg');
        message.text(data.responseText);
        setTimeout(function () {
            message.fadeOut();
        }, 4000);
    }

    form.submit(function (e) {
        e.preventDefault();
        form_data = $(this).serialize();
        $.ajax({
            type: 'POST',
            url: form.attr('action'),
            data: form_data
        })
        .done(successFunc)
        .fail(failFunc);
    });

})(jQuery);

function cookieOk() {
  var now = new Date();
  var lifetime = now.getTime(); // Variable für Millisekunden seit 1970 bis aktuelles Datum
  var deleteCookie = lifetime + 2592000000; // Macht den Cookie 30 Tage gültig.

  now.setTime(deleteCookie);
  var enddate = now.toUTCString();

  document.cookie =
    "cookiesAccepted = set; path=/; secure; expires=" + enddate;
  document.getElementById("cookiePopup").style.display = "none";
}

function languageSet() {
  if (document.getElementById("switchLanguage").checked){
    document.documentElement.lang = "de"
    var now = new Date();
    var lifetime = now.getTime(); // Variable für Millisekunden seit 1970 bis aktuelles Datum
    var deleteCookie = lifetime + 2592000000; // Macht den Cookie 30 Tage gültig.

    now.setTime(deleteCookie);
    var enddate = now.toUTCString();

    document.cookie =
      "languageSet = set; path=/; secure; expires=" + enddate;
  } else {
    document.documentElement.lang = "en"
  }
}

function dropMenu() {
  document.getElementById("droppedMenuContent").classList.toggle("drop");
}

// Close the dropdown menu if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches(".dropMenu")) {
    var links = document.getElementsByClassName("menuContent");
    var i;
    for (i = 0; i < links.length; i++) {
      var droppedLinks = links[i];
      if (droppedLinks.classList.contains("drop")) {
        droppedLinks.classList.remove("drop");
      }
    }
  }
};

window.onscroll = function() {
  var scrollPos = window.pageYOffset;
  var navbar = document.getElementById('navbar');
  var line = document.getElementById('frameLine');
  if (scrollPos >= 20) {
    line.style.display = "block";
    navbar.style.backgroundColor = "rgba(8,15,23,0.8)"
  } else {
    line.style.display = "none";
    navbar.style.backgroundColor = ""
  }
};
