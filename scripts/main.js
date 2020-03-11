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
