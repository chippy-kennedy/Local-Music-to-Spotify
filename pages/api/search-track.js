var SpotifyWebApi = require('spotify-web-api-node');

export default function handler(req, res) {
	const { song, accessToken } = req.body

	var spotifyApi = new SpotifyWebApi({
		accessToken: accessToken
	});

	spotifyApi.searchTracks(`track:${song.name} artist:i${}`)
		.then(function(data) {
			res.status(200).json(data)
		}, function(err) {
			res.status(500).json(err)
		});
}
