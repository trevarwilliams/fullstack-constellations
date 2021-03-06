let MOCK_CONSTELLATIONS = {
  "constellations": [
    {
      name: 'Capricorn',
      info: 'The Greeks associate the constellation with Pan, the god of nature. Part of Pan\'s lore was that he helped Zeus fight the Titans to earn his spot in the heavens. He escaped the monster Typhon by jumping into the Nile, but only half of his body was submerged, so he was a fish in the part of his body that remained underwater. Other spins on the tale have the constellation associated with Amalthaea, the mythical goat that acted as a foster mother to Zeus as an infant.',
      location: 'Right ascension 21.02 hours. Declination -20&#176; to -23&#176;. Visible between latitudes 60&#176; and -90&#176;.'
    },

    {
      name: 'Aquarius',
      info: 'The Greeks linked this constellation with Ganymede, the cup bearer to the gods. According to lore, Ganymede was a good-looking young man who was the object of Zeus\' affection and was brought to Mount Olympus, where he served as cup bearer to the gods and was granted eternal youth.',
      location: 'Right acension 22.71 hours. Declination -10.19&#176;. Visible between 65&#176; and -90&#176;.'
    },

    {
      name: 'Pisces',
      info: 'In the sky, Pisces is represented as two fish swimming at right angles to each other, one to the north and one to the west. They are attached by a cord. The fish themselves are apparently the Greek goddess Aphrodite and her son, Eros, who turned into fish and jumped into the Euphrates River to evade the fiery breath of the monster Typhon, "the most awful monster the world had ever seen," according to Ridpath.',
      location: 'Right ascension 0.85 hours. Declination 11.08&#176;. Visible between latitudes 90&#176; and -65&#176;.'
    },

    {
      name: 'Aries',
      info: 'In Greek mythology, Aries represents the ram whose fleece was sought by Jason and the Argonauts. When King Athamus of Boetia took a second wife, Ino, she was resentful of his existing children, especially his son, Phrixus, and she wanted him sacrificed. Zeus responded to the pleadings of Phrixus\' mother, Nephele, by sending a golden ram to save Phrixus and his sister Helle. Helle did not survive but Phrixus did and sacrificed the ram to Zeus and gave its golden fleece to King Aettes. The fleece was eventually stolen by Jason.',
      location: 'Right ascension 3 hours. Declination 20&#176;. Visible between latitudes 90&#176; and -60&#176;.'
    }
  ]
};

function getConstellations(callbackFn) {
  setTimeout(function () {
    callbackFn(MOCK_CONSTELLATIONS)
  } , 1)
}

function displayConstellations(data) {
  for (index in data.constellations) {
    $('body').append(`
    <h2>${data.constellations[index].name}</h2>
    <h3>Mythology:</h3><span>${data.constellations[index].info}</span><br>
    <h3>Locating:</h3><span>${data.constellations[index].location}</span>`
    )
  }
}

function getAndDisplay() {
  getConstellations(displayConstellations)
}

$(function () {
  getAndDisplay()
})