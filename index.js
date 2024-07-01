import { getTopTracks } from './getData.js'
import { generateImage } from './generateImage.js'

const username = process.argv[2] ?? 'alespren'
const imageWidth = 1000
const imageHeight = 1100

const tracks = await getTopTracks(username)

const leftColumn = []
const rightColumn = []

for (let i = 0; i < tracks.length; i++) {
    const track = tracks[i]

    leftColumn.push(`${(i + 1).toString().padStart(2, '0')}`)

    // if artist + track name are too long, insert new line char
    const maxLineLength = ~~(imageWidth / 21) // estimate how long a line can be
    let re = new RegExp(String.raw`.{1,${maxLineLength}}`, 'g')
    console.log(re)
    const arr = `${track.artist.name} - ${track.name}`.match(re)

    for (let i = 0; i < arr.length; i++) {
        if (i > 0) leftColumn.push(' ')
    }

    rightColumn.push(arr.join('-\n'))
}

generateImage(
    `${username} xcx\nlast month`,
    leftColumn.join('\n'),
    rightColumn.join('\n'),
    imageWidth,
    imageHeight
)

function fancyTimeFormat(duration) {
    // Hours, minutes and seconds
    const hrs = ~~(duration / 3600)
    const mins = ~~((duration % 3600) / 60)
    const secs = ~~duration % 60

    // Output like "1:01" or "4:03:59" or "123:03:59"
    let ret = ''

    if (hrs > 0) {
        ret += '' + hrs + ':' + (mins < 10 ? '0' : '')
    }

    ret += '' + mins + ':' + (secs < 10 ? '0' : '')
    ret += '' + secs

    return ret
}
