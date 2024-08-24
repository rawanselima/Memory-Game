document.querySelector(".start button").onclick = function () {
  let user_name = prompt("Enter your Name");
  if (user_name == "" || user_name == null) {
    document.querySelector(".game header .name").innerHTML = `Hello : Unknown`;
  } else {
    document.querySelector(
      ".game header .name"
    ).innerHTML = `Hello : ${user_name}`;
  }

  document.querySelector(".start").remove();
  start_timer();
};

let cards_block = document.querySelector(".cards");
let cards = document.querySelectorAll(".cards .card");
let cards_index = Array.from(cards.keys());

random_index(cards_index);

cards.forEach(function (card, index) {
  card.style.order = cards_index[index];

  card.addEventListener("click", function () {
    card.classList.add("flib");

    is_flibbed();
  });
});

function is_flibbed() {
  let card_flibbed = Array.from(cards).filter((card) =>
    card.classList.contains("flib")
  );

  if (card_flibbed.length === 2) {
    cards_block.classList.add("no-click");

    is_match(card_flibbed[0], card_flibbed[1]);
  }
}

function is_match(card_1, card_2) {
  if (card_1.querySelector("img").src == card_2.querySelector("img").src) {
    card_1.classList.remove("flib");
    card_2.classList.remove("flib");

    card_1.classList.add("match");
    card_2.classList.add("match");

    cards_block.classList.remove("no-click");
  } else {
    setTimeout(function () {
      document.querySelector(".try span").innerHTML =
        parseInt(document.querySelector(".try span").textContent) + 1;

      card_1.classList.remove("flib");
      card_2.classList.remove("flib");

      cards_block.classList.remove("no-click");
    }, 1000);
  }
}

function random_index(array) {
  let current = array.length,
    temp,
    random;

  while (current > 0) {
    let random_num = Math.floor(Math.random() * current);
    current--;
    temp = array[current];
    array[current] = array[random_num];
    array[random_num] = temp;
  }

  return array;
}

let timer = document.querySelector("footer .timer");
let minutes = 3;
let seconds = 0;
let check = false;

function start_timer() {
  let time = setInterval(function () {
    timer.innerHTML = `0${minutes}: ${seconds < 10 ? `0${seconds}` : seconds}`;

    if (minutes == 0 && seconds == 0) {
      clearInterval(time);
      cards.forEach(function (card) {
        if (!card.classList.contains("match")) {
          document.querySelector(".fail").style.display = "block";
          check = true;
        }
      });

      if (check == false) {
        document.querySelector(".good").style.display = "block";
      }
    } else {
      if (seconds == 0) {
        minutes -= 1;
        seconds = 59;
      } else {
        seconds--;
      }
    }
  }, 1000);
}
