import * as PImage from 'pureimage'
import * as fs from 'fs'

/**
 * Generates a png with the specified text.
 * @param {string} headerText Text that appears center align at the top of the image.
 * @param {string} leftColumnText Left align text
 * @param {string} rightColumnText Right align text
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

    // set font paramaters
    var fnt = PImage.registerFont('C:/Windows/Fonts/Arial.ttf', 'Arial Narrow')
    fnt.loadSync()

    ctx.font = "20pt 'Arial Narrow'"
    ctx.fillStyle = 'black'
    ctx.textBaseline = 'middle'

    // Title text
    writeTextMultiline(ctx, headerText, 250, 30, 'center')

    // Left column
    writeTextMultiline(ctx, leftColumnText, 25, 125, 'left')

    // Right column
    writeTextMultiline(ctx, rightColumnText, 475, 125, 'right')

    // Footer text
    writeTextMultiline(ctx, 'last.fm', 250, 475, 'center')

    //write to 'out.png'
    PImage.encodePNGToStream(img1, fs.createWriteStream(outputFile))
        .then(() => {
            console.log('wrote out the png file to out.png')
        })
        .catch((e) => {
            console.log('there was an error writing')
        })
}

function writeTextMultiline(ctx, text, x, y, textAlign, lineheight = 30) {
    ctx.textAlign = textAlign
    var lines = text.split('\n')

    for (var i = 0; i < lines.length; i++)
        ctx.fillText(lines[i], x, y + i * lineheight)
}
