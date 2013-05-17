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

Copyright (C) 2013 by Shutterstock Images, LLC

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
