import { getTopTracks } from './getData.js'
import { generateImage } from './generateImage.js'

const tracks = await getTopTracks()

let outputString = 'Top Monthly Tracks\n\n'

for (let i = 0; i < tracks.length; i++) {
  const track = tracks[i]

  console.log(
    `${track.playcount} | ${track.name} | ${fancyTimeFormat(track.duration)}`
  )

  outputString = outputString.concat(
    `${track.playcount} | ${track.name} | ${fancyTimeFormat(track.duration)}\n`
  )
}

generateImage(outputString)

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
