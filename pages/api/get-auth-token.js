var SpotifyWebApi = require('spotify-web-api-node');

var credentials = {
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  redirectUri: process.env.REDIRECT_URI,
};

var spotifyApi = new SpotifyWebApi(credentials);

export default async function handler(req, res) {
	const { code } = req.query

	let response = await spotifyApi.authorizationCodeGrant(code)

	if(response.statusCode == 200 ){
		console.log(response)
		console.log('The token expires in ' + response.body['expires_in']);
		console.log('The access token is ' + response.body['access_token']);
		console.log('The refresh token is ' + response.body['refresh_token']);

		spotifyApi.setAccessToken(response.body['access_token']);
		spotifyApi.setRefreshToken(response.body['refresh_token']);

		res.writeHead(301, {
      Location: '/upload/'
    });
    res.end();

	} else {
		console.log(response)
		res.writeHead(500, {
      Location: '/upload/'
    });
    res.end();
	}
}
