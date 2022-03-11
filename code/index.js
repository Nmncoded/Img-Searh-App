const getSearchUrl = (query) =>
  `https://api.unsplash.com/search/photos?query=${query}&client_id=sLAWquCazNX8hEEgc1rqWWtVA7IK4ekAUVL7sLSnjSU`;
let searchElm = document.querySelector(`#text`);
let rootElm = document.querySelector(`.rootElm-ul`);

function fetch(){
  return new Promise((resolve,reject) => {
    let xhr = new XMLHttpRequest();
    xhr.open(`GET`, getSearchUrl(searchElm.value));
    xhr.onload = () => resolve(JSON.parse(xhr.response));
    xhr.onerror = () => reject(`Something went wrong...`);
    xhr.send();
  })
}

function handleSearch(event) {
    rootElm.innerHTML = "";
//   console.log(`nmn`);
  if (event.keyCode === 13 && searchElm.value) {
    // let xhr = new XMLHttpRequest();
    // xhr.open(`GET`, getSearchUrl(searchElm.value));
    // xhr.onload = function () {
    //   let images = JSON.parse(xhr.response);
    //   images.results.forEach((image) => {
    //       let li = document.createElement(`li`);
    //       let img = document.createElement(`img`);
    //       img.src = image.urls.thumb;
    //       img.alt = image.id;
    //       li.append(img);
    //       rootElm.append(li);
    //   })
    //   console.log(images);
    // };
    // xhr.onerror = function () {
    //   console.error(`Something went wrong...`);
    // };
    // xhr.send();
    fetch().then((images) => {
      images.results.forEach((image) => {
          let li = document.createElement(`li`);
          let img = document.createElement(`img`);
          img.src = image.urls.thumb;
          img.alt = image.id;
          li.append(img);
          rootElm.append(li);
      })
    }).catch((error) => console.log(error));
    searchElm.value = '';
  }
}

searchElm.addEventListener(`keyup`, handleSearch);


