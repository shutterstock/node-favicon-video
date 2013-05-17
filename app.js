// dependencies

var fs = require('fs');
var express = require('express');
var http = require('http');
var path = require('path');
var request = require('request');
var md5 = require('MD5');
var ffmpeg = require('fluent-ffmpeg');
var Metalib = require('fluent-ffmpeg').Metadata;
var async = require('async');
var config = require('config');

var app = express();

// configuration

app.configure(function(){
	app.set('port', process.env.PORT || 3000);
	app.use(express.favicon());
	app.use(express.logger('dev'));
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(app.router);
	app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
	app.use(express.errorHandler());
});

// routes

app.get('/frames', function(req, res) {

	var src_url = req.query.src_url;
	var src_url_md5 = md5(src_url);

	var frames = [];
	var favicon_frame_dir = config.tmp_path_prefix + '-' + src_url_md5 + '-frames';

	request({
		url: src_url,
		encoding: null,

	}, function(err, response, body) {

		if (err) {
			console.warn(err);
			return res.jsonp({ error: err });
		}

		var filename = [config.tmp_path_prefix, src_url_md5].join('-');

		fs.writeFile(filename, body, { encoding: 'binary' }, function() {

			var metaObject = new Metalib(filename);
			metaObject.get(function(metadata, err) {

				var seconds = metadata.durationsec;
				var frames_count = seconds * config.output_frames_per_second;

				var proc = new ffmpeg({ source: filename })
					.withSize('16x16')
					.takeScreenshots({ count: frames_count }, favicon_frame_dir, function(err, filenames) {

						if (err) {
							console.warn(err);
							return res.jsonp({ error: err });
						}

						var files = [];
						filenames.forEach(function(f, i) { files.push({ filename: f, index: i }) });

						async.each(files, function(file, callback) {

							var filename = favicon_frame_dir + '/' + file.filename;

							fs.readFile(filename, function(err, data) {
								var base64 = new Buffer(data).toString('base64');
								frames[file.index] = base64;
								callback();
								fs.unlink(filename);
							});

						}, function() {
							res.jsonp(frames);
							fs.unlink(favicon_frame_dir);
						});

					});
			});
		});
	})
});

// run

http.createServer(app).listen(app.get('port'), function(){
	console.log("Express server listening on port " + app.get('port'));
});

