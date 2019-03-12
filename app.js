function getConstellations(callbackFn) {
  setTimeout(function() {
    callbackFn(MOCK_CONSTELLATIONS);
  }, 1);
}

function displayConstellations(data) {
  for (index in data.constellations) {
    $("body").append(`
    <h2>${data.constellations[index].name}</h2>
    <h3>Mythology:</h3><span>${data.constellations[index].info}</span><br>
    <h3>Locating:</h3><span>${data.constellations[index].location}</span>`);
  }
}

function getAndDisplay() {
  getConstellations(displayConstellations);
}

$(function() {
  getAndDisplay();
});
