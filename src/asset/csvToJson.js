var fs = require('fs');
var parse = require('csv-parse');

fs.readFile('100mountain.csv', (err, dataCSV) => {
  if (err) throw err;
  parse(dataCSV, (err, dataArray) => {
    dataArray = dataArray.slice(1).map( (mountain, index) => {
      return({
        index: Number.parseInt(mountain[0]),
        name: mountain[2],
        altitude: Number.parseInt(mountain[4]),
        longitude: {
          direction: 'N',
          degrees: mountain[8].match(/\d+/g)[0],
          minutes: mountain[8].match(/\d+/g)[1],
          seconds: mountain[8].match(/\d+/g)[2]
        },
        latitude: {
          direction: 'E',
          degrees: mountain[8].match(/\d+/g)[3],
          minutes: mountain[8].match(/\d+/g)[4],
          seconds: mountain[8].match(/\d+/g)[5]
        }
      })
    })
    fs.writeFile('mountains.json', JSON.stringify(dataArray), (err) => {
      if (err) throw err;
      console.log('finished')
    })
  })
})
