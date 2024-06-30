import 'dotenv/config'

const user = 'alespren'
const period = '1month'
const limit = 10

const data = await fetch(
  `https://ws.audioscrobbler.com/2.0/?method=user.gettoptracks&user=${user}&period=${period}&limit=${limit}&api_key=${process.env.LASTFM_API_KEY}&format=json`
)
const json = await data.json()

for (let i = 0; i < json.toptracks.track.length; i++) {
  const track = json.toptracks.track[i]

  console.log(
    `${track.playcount} | ${track.name} | ${fancyTimeFormat(track.duration)}`
  )
}

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
