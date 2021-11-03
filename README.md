# Songs-like-that

Give the Songs/ Artists that you like , 
Discover new songs based on these seeds
[live version](https://songs-like-that.vercel.app/)

## Setup
You will require spotify api clientid and secret in order for app to work.
get it from [here](developer.spotify.com).

I have created a small express server to return the token, using the credentials.
that way api SECRET remain safe.

hence you will need to setup something similar if you are planning to deploy, although if you are just exploring for learning purpose, you can implement token fetching in 
init() method in spotifyApi.js here on frontend.
 
## Stack
React 
Redux for state Management
Material Ui
