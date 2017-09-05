# Favicon-Video

Play videos in your favicon!

## Setup

```
$ npm install
$ node app.js
```

Then visit [http://localhost:3000/index.html](http://localhost:3000/index.html) to see an example.

## Server API

##### GET /frames

Returns an array of base64-encoded 16x16 pixels video frames at 10fps.  

###### Request Parameters

| name | description |
|------|-------------|
| src_url | Source URL for the original video clip |
| callback | Callback for JSONP support |

## JavaScript client library

##### Favicon.play(options)

Play a video in the favicon. Takes the following parameters:

- __`server`__: specify the running node instance
- __`src`__:  the URL to the source video clip

##### Favicon.set(url)

Replace any existing favicon with one at the specified URL.


## License

[MIT](LICENSE) © 2013-2017 Shutterstock Images, LLC
