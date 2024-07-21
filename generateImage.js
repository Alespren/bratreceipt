import * as PImage from 'pureimage'
import * as fs from 'fs'

/**
 * Generates a png with the specified text.
 * @param {string} headerText Text that appears center align at the top of the image.
 * @param {string} leftColumnText Left align text
 * @param {string} rightColumnText Right align text
 * @param {number} width The width of the image. Default 1000.
 * @param {number} height The height of the image. Default 1000.
 * @param {string} outputFile The name of the file for the output image.
 */
export async function generateImage(
    headerText = 'brat',
    leftColumnText,
    rightColumnText,
    width = 1000,
    height = 1000,
    outputFile = 'out.png'
) {
    // make image
    const img1 = PImage.make(width, height)

    // get canvas context
    const ctx = img1.getContext('2d')

    // fill with green
    ctx.fillStyle = '#8acf00'
    ctx.fillRect(0, 0, width, height)

    // set font paramaters
    const fnt = PImage.registerFont(
        'C:/Windows/Fonts/ArialN.ttf',
        'Arial Narrow'
    )
    fnt.loadSync()

    ctx.font = "40pt 'Arial Narrow'"
    ctx.fillStyle = 'black'
    ctx.textBaseline = 'middle'

    // Title text
    writeTextMultiline(ctx, headerText, width / 2, 60, 'center')

    // Left column
    writeTextMultiline(ctx, leftColumnText, 25, 250, 'left')

    // Right column
    writeTextMultiline(ctx, rightColumnText, width - 25, 250, 'right')

    // Footer text
    writeTextMultiline(ctx, 'last.fm', width / 2, height - 50, 'center')

    //write to 'out.png'
    PImage.encodePNGToStream(img1, fs.createWriteStream(outputFile))
        .then(() => {
            console.log('wrote out the png file to out.png')
        })
        .catch((e) => {
            console.log('there was an error writing')
        })
}

function writeTextMultiline(ctx, text, x, y, textAlign, lineheight = 60) {
    ctx.textAlign = textAlign
    const lines = text.split('\n')

    for (let i = 0; i < lines.length; i++)
        ctx.fillText(lines[i], x, y + i * lineheight)
}
