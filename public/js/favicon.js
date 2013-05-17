var Favicon = {

	set: function(href) {

		var link = document.createElement('link');
		link.type = 'image/x-icon';
		link.rel = 'shortcut icon';
		link.href = href;
		link.id = 'favicon';

		var moribundLink = document.querySelector('link[rel="shortcut icon"]');

		if (moribundLink) {
			moribundLink.parentNode.removeChild(moribundLink);
		}

		document.querySelector('head').appendChild(link);
	},

	play: function(args) {

		args = args || {};

		var url = args.server + '/frames?src_url=' + encodeURIComponent(args.src);

		$.ajax({
			url: url,
			dataType: 'jsonp',
			success: function(frames) {

				var index = 0;
				setInterval( function() {
					var nextIndex = index + 1;
					if (nextIndex > frames.length - 1) {
						nextIndex = 0;
					}

					var dataURI = 'data:image/jpeg;base64,' + frames[nextIndex];
					Favicon.set(dataURI);

					index = nextIndex;
				}, 100);
			}
		});
	}
};
