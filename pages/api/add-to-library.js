var SpotifyWebApi = require('spotify-web-api-node');

export default function handler(req, res) {
	const { song, accessToken } = req.body

	var spotifyApi = new SpotifyWebApi({
		accessToken: accessToken
	});

	// Add tracks to the signed in user's Your Music library
	spotifyApi.addToMySavedTracks(["3VNWq8rTnQG6fM1eldSpZ0"])
		.then(function(data) {
			console.log('Added track!');
		}, function(err) {
			console.log('Something went wrong!', err);
		});

  res.status(200).json({ name: 'John Doe' })
}
