import 'dotenv/config'

/**
 *
 * @param {string} user The username to get top tracks for.
 * @param {string} period  overall | 7day | 1month | 3month | 6month | 12month - The time period over which to retrieve top tracks for. Defaults to 1month.
 * @param {int} limit The number of tracks to fetch. Defaults to 10.
 *
 * @returns {(string|Array)} An array of tracks.
 */
export async function getTopTracks(
    user = 'alespren',
    period = '1month',
    limit = '10'
) {
    const data = await fetch(
        `https://ws.audioscrobbler.com/2.0/?method=user.gettoptracks&user=${user}&period=${period}&limit=${limit}&api_key=${process.env.LASTFM_API_KEY}&format=json`
    )
    const json = await data.json()

    return json.toptracks.track
}
