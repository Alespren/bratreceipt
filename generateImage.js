import * as PImage from 'pureimage'
import * as fs from 'fs'

/**
 * Generates a png with the specified text.
 * @param {string} text The text to write to the image
 * @param {string} outputFile The name of the file for the output image.
 */
export async function generateImage(
    headerText = 'brat',
    leftColumnText,
    rightColumnText,
    outputFile = 'out.png'
) {
    // make image
    const img1 = PImage.make(500, 500)

    // get canvas context
    const ctx = img1.getContext('2d')

    // fill with green
    ctx.fillStyle = '#8acf00'
    ctx.fillRect(0, 0, 500, 500)

    // add text
    var fnt = PImage.registerFont('C:/Windows/Fonts/Arial.ttf', 'Arial Narrow')
    fnt.loadSync()

    ctx.font = "30pt 'Arial Narrow'"
    ctx.fillStyle = 'black'
    ctx.textAlign = 'left'
    ctx.textBaseline = 'middle'

    // Title text

    var x = 30
    var y = 70
    var lineheight = 35
    var lines = text.split('\n')

    for (var i = 0; i < lines.length; i++)
        ctx.fillText(lines[i], x, y + i * lineheight)

    //write to 'out.png'
    PImage.encodePNGToStream(img1, fs.createWriteStream(outputFile))
        .then(() => {
            console.log('wrote out the png file to out.png')
        })
        .catch((e) => {
            console.log('there was an error writing')
        })
}
