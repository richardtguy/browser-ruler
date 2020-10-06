"use strict";

(function() {
  let lastClick;

  const cs = window.getComputedStyle(document.querySelector(".marker"));
  const markerWidth = parseInt(cs.width);
  const markerHeight = parseInt(cs.height);

  let updateRuler = function(ev) {
    if (!lastClick) return;
    const ruler = document.querySelector(".ruler");
    if (ruler.style.visibility != "visible") {
      ruler.style.visibility = "visible";
    }
    const dx = ev.pageX - lastClick.pageX;
    const dy = ev.pageY - lastClick.pageY;
    const d = Math.round(Math.pow(dx * dx + dy * dy, 0.5), 0);
    ruler.style.left = ev.pageX + 'px';
    ruler.style.top = ev.pageY +'px';
    ruler.querySelector("p").innerText = d + 'px';
  }

  window.addEventListener("click", function(ev) {
    lastClick = ev;
    const marker = document.querySelector(".marker");
    marker.style.left = ev.pageX - markerWidth * 0.5 + 'px';
    marker.style.top = ev.pageY - markerHeight * 0.5 + 'px';
  })

  window.addEventListener("keydown", function(ev) {
    if (ev.code == "AltLeft" || ev.code == "AltRight") {
      window.addEventListener("mousemove", updateRuler);
    }
  })

  window.addEventListener("keyup", function(ev) {
    if (ev.code == "AltLeft" || ev.code == "AltRight") {
      document.querySelector(".ruler").style.visibility = "hidden";
      window.removeEventListener("mousemove", updateRuler);
    }
  })

}) ();
