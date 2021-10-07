"use strict";

function menuResposive() {
    const menu = document.querySelector("#menu");
    if (menu.className === "menu") {
        menu.className += " responsive";
    } else {
        menu.className = "menu";
    }
  }
