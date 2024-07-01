import * as PImage from 'pureimage'
import * as fs from 'fs'

// make image
const img1 = PImage.make(200, 200)

// get canvas context
const ctx = img1.getContext('2d')

// fill with green
ctx.fillStyle = '#8acf00'
ctx.fillRect(0, 0, 200, 200)

// add text
var fnt = PImage.registerFont('C:/Windows/Fonts/Arial.ttf', 'Arial Narrow')
fnt.loadSync()

ctx.font = "48pt 'Arial Narrow'"
ctx.fillStyle = 'black'
ctx.textAlign = 'center'
ctx.textBaseline = 'middle'
ctx.fillText('brat', 100, 100)

//write to 'out.png'
PImage.encodePNGToStream(img1, fs.createWriteStream('out.png'))
  .then(() => {
    console.log('wrote out the png file to out.png')
  })
  .catch((e) => {
    console.log('there was an error writing')
  })
