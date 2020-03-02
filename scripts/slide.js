var slideIndex = 1;
showPicture(slideIndex);

function nextPicture(n) {
  showPicture((slideIndex += n));
}

function currentPicture(n) {
  showPicture((slideIndex = n));
}

function showPicture(n) {
  var i;
  var x = document.getElementsByClassName("slide");
  var dots = document.getElementsByClassName("dot");
  if (n > x.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = x.length;
  }
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(
      "dotsBlack",
      "dotsTransparent"
    );
  }
  x[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].className = dots[slideIndex - 1].className.replace(
    "dotsTransparent",
    "dotsBlack"
  );
}
