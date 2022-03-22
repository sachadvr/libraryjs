document.addEventListener("scroll", (event) => {
  if (window.scrollY > 0) {
    document.querySelector("nav").style.position = "relative";
    document.querySelector("nav").style.position = "sticky";
    document.querySelector("nav").style.top = "0";
    document.querySelector("nav").style.padding = ".1rem";
    document.querySelector("nav").style.opacity = ".98";
    document.querySelector("nav").style.width = "100%";
    document.querySelector("nav").style.transition = "1s ease-in-out";
    // document.querySelector("#container").top = "100px";

    return;
  }
  document.querySelector("nav").style.position = "unset";
  document.querySelector("nav").style.opacity = "1";
  document.querySelector("nav").style.padding = "0rem";
});

let array = [];

document.querySelector("#searchbar").addEventListener("input", (e) => {
  if (e.target.value.length === 0) {
    update();
  } else {
    filterupdate(e.target.value);
  }
});
function submit() {
  let url = document.querySelectorAll("input")[0].value;
  let nom = document.querySelectorAll("input")[1].value;
  let createur = document.querySelectorAll("input")[2].value;
  let duree = document.querySelectorAll("input")[3].value;
  let date = document.querySelectorAll("input")[4].value;
  let nombrej = document.querySelectorAll("input")[5].value;
  let age = document.querySelectorAll("input")[6].value;
  let genre = document.querySelectorAll("input")[7].value;

  array.push({
    id: array.length,
    url: url,
    nom: nom,
    createur: createur,
    duree: duree,
    date: date,
    nombrej: nombrej,
    age: age,
    genre: genre,
  });
  writedata();
  update();
}

let countdown = false;
let timerrun = null;
function del(e) {
  if (countdown === true && e.innerText === "Cancel?") {
    clearInterval(timerrun);
    timerrun = null;
    countdown = false;
    update();
  } else if (countdown === false && timerrun === null) {
    countdown = true;
    let timer = 2;
    timerrun = setInterval(function () {
      if (timer > 0) {
        timer--;
      }
      if (timer == 0 && countdown === true) {
        e.innerText = "Done";

        for (let nb = 0; nb < array.length; nb++) {
          if (parseInt(e.dataset.id) == nb) {
            array.splice(nb, 1);
          }
        }
        clearInterval(timerrun);
        timerrun = null;
        countdown = false;
        writedata();
        update();
      }
    }, 1000);

    e.innerText = "Cancel?";
  }
}
function filter(e, filterdata) {
  for (let i of Object.values(e)) {
    let item = String(i).toLowerCase();
    if (item.startsWith(filterdata.toLowerCase())) return true;
  }
  return false;
}
function htmlupdate(e, i) {
  if (e.url === undefined || e.url.length === 0) {
    e.url = "https://www.themeta.news/wp-content/themes/meta/img/noimage.jpg";
  }
  let x = `<a href="javascript:void(0)" class="delete" data-id="${i}" onclick="del(this)">Supprimer la ligne</a>`;
  $("table")[0].innerHTML +=
    `<tr data-id="${i}">
  <td><img src="${e.url}"></td>
  <td>${e.nom}</td>
  <td>${e.createur}</td>
  <td>${e.duree}</td>
  <td>${e.date}</td>
  <td>${e.nombrej}</td>
  <td>${e.age}</td>
  <td>${e.genre}</td></tr> ` + x;
}
function filterupdate(filterdata) {
  $("table")[0].innerHTML = "";
  let i = 0;
  array.forEach((e) => {
    if (e !== null) {
      if (filter(e, filterdata)) {
        htmlupdate(e, i);
        i++;
      }
    }
  });
}
function update() {
  fetchdata();
  $("table")[0].innerHTML = "";
  let i = 0;
  array.forEach((e) => {
    if (e !== null) {
      htmlupdate(e, i);
      i++;
    }
  });
}
// function shuffleArray(random) {
//   for (var i = random.length - 1; i > 0; i--) {
//     var j = Math.floor(Math.random() * (i + 1));
//     var temp = random[i];
//     random[i] = random[j];
//     random[j] = temp;
//   }
// }
// const isSorted = (arr) =>
//   arr.every((a, b) => ("" + a).localeCompare(b, undefined, { numeric: true }));
// const isReversedSorted = (arr) =>
//   arr.every((b, a) => ("" + a).localeCompare(b, undefined, { numeric: true }));
function isSorted(list) {
  newlist = list;
  newlist.sort((a, b) =>
    ("" + a).localeCompare(b, undefined, { numeric: true })
  );
  if (list === newlist) return true;
  return false;
}
function isReversed(list) {
  newlist = list;
  newlist.sort((b, a) =>
    ("" + a).localeCompare(b, undefined, { numeric: true })
  );
  if (list === newlist) return true;
  return false;
}

function presort(name, test = true) {
  let newarray = array;
  list = [];
  for (let i = 0; i < newarray.length; i++) {
    list.push(newarray[i][name]);
  }

  // if (isSorted(list) && test === true) {
  //   console.log("before" + list);
  //   list.sort((b, a) =>
  //     ("" + a).localeCompare(b, undefined, { numeric: true })
  //   );
  //   console.log("after" + list);
  // }
  // else if (isReversed(list) && test === true) {
  //   list.sort((a, b) =>
  //     ("" + a).localeCompare(b, undefined, { numeric: true })
  //   );
  // }
  // else {
  list.sort((a, b) => ("" + a).localeCompare(b, undefined, { numeric: true }));
  // }

  // }
  let finalarray = [];
  let notset = [];
  for (let j = 0; j < list.length; j++) {
    for (let i = 0; i < newarray.length; i++) {
      if (newarray[j][name] === list[i]) {
        if (!finalarray.includes(newarray[j])) {
          if (!notset.includes(i)) {
            notset.push(i);
            // console.log(i);
            newarray[j]["id"] = i;
            finalarray.splice(i, 0, newarray[j]);
          }
        }
      }
    }
  }

  array = finalarray;
}
function sort(name, test = true) {
  presort(name, test);
  presort("id", false);
  writedata();
  update();
}
function writedata() {
  document.cookie =
    "jsondata=" +
    JSON.stringify(array) +
    "; expires= Thu, 21 Aug 2024 20:00:00 UTC;  SameSite=None; Secure";
}

function getCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == " ") c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}
function fetchdata() {
  var x = getCookie("jsondata");
  if (x !== null) {
    array = [];
    array = JSON.parse(x);
  }
}

fetchdata();
update();
