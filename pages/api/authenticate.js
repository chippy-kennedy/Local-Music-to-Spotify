var SpotifyWebApi = require('spotify-web-api-node');

var credentials = {
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  redirectUri: process.env.REDIRECT_URI,
};

var spotifyApi = new SpotifyWebApi(credentials);

export default async function handler(req, res) {
	var scopes = ['user-read-private', 'user-read-email'];
	var state = 'some-state-of-my-choice';
	var authorizeUrl = await spotifyApi.createAuthorizeURL(scopes, state);

	res.redirect(authorizeUrl)
}
