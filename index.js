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
  console.log(`${track.playcount} | ${track.name}`)
}
