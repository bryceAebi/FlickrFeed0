'use strict';

// Register the `photoFeed` component on the `photoFeed` module
angular.module('photoFeed').component('photoFeed', {
    templateUrl: 'photo-feed/photo-feed.template.html',
    controller: function PhotoFeedController(
        $http, $scope, flickrEndpoint, refreshRate) {

        // Columns of photos shown on the feed.
        // We want the same photos no matter the
        // column count
        this.oneColumn = [[]];
        this.twoColumns = [[],[]];
        this.threeColumns =[[],[],[]];
        this.fourColumns = [[],[],[],[]];

        // The columns reflected in the view
        this.columns = null;
        this.numColumns = null;

        // Keep track of downloaded photos for deduping
        this.photoIds = new Set();

        // Endpoint from which to fetch photos
        this.flickrAPI = flickrEndpoint;

        /**
         * Fetch and store new flickr photos.
         */
        this.fetchPhotos = function() {
            $http.jsonp(flickrEndpoint + '&jsoncallback=JSON_CALLBACK')
                .success(this.fetchPhotosHandler)}.bind(this);

        /**
         * Handles photo data after it is fetched from Flickr.
         */
        this.fetchPhotosHandler = function(data) {
            if (!data) {
                return;
            }
            var oneColIdx = 0;
            var twoColIdx = 0;
            var threeColIdx = 0;
            var fourColIdx = 0;
            for (var itemIdx in data.items) {
                var item = data.items[itemIdx];

                // Dedup photos from endpoint
                if (!this.photoIds.has(item.media.m)) {
                    this.photoIds.add(item.media.m);

                    // trim off nobody@flickr.com from the start of the
                    // author name and remove the final parenthesis
                    var author = item.author;
                    var formatted_author = author.substring(
                        19, author.length - 1);

                    var photoData = {
                        title: item.title,
                        author: formatted_author,
                        dateTaken: item.date_taken,
                        published: item.published,
                        link: item.link,
                        img: item.media.m,
                        favorited: false
                    }

                    // Add a pointer to the photoData for each
                    // set of columns. We do this so that new photos
                    // are at the top of the feed whether we have
                    // 1, 2, 3, or 4 columns. This method proves to be
                    // much faster than trying to reshuffle photos into
                    // the appropriate number of colmuns when the number
                    // of columns changes
                    this.oneColumn[oneColIdx].unshift(photoData);
                    this.twoColumns[twoColIdx].unshift(photoData);
                    this.threeColumns[threeColIdx].unshift(photoData);
                    this.fourColumns[fourColIdx].unshift(photoData);

                    twoColIdx = twoColIdx == 1 ? 0 : twoColIdx + 1;
                    threeColIdx = threeColIdx == 2 ? 0 : threeColIdx + 1;
                    fourColIdx = fourColIdx == 3 ? 0 : fourColIdx + 1;
                }
            }
        }.bind(this);

        /**
         * Calc # of columns to show and switch view to that # of columns.
         */
        this.setColumns = function() {
            var width = window.innerWidth;
            if (width > 1264 && this.numColumns != 4) {
                this.columns = this.fourColumns;
                this.numColumns = 4;
            } else if (width <= 1264 && window.innerWidth > 960 && this.numColumns != 3) {
                this.columns = this.threeColumns;
                this.numColumns = 3;
            } else if (width <= 960 && window.innerWidth > 625 && this.numColumns != 2) {
                this.columns = this.twoColumns;
                this.numColumns = 2;
            } else if (width <= 625 && this.numColumns != 1) {
                this.columns = this.oneColumn;
                this.numColumns = 1;
            }
        }.bind(this);

        /**
         * Toggle a photo's `favorited` field.
         */
        this.toggleFavorite = function(photo) {
            photo.favorited = !photo.favorited;
        };

        // Initialize feed
        this.setColumns();
        this.fetchPhotos();

        // Setup listeners to update feed layout and content
        window.setInterval(this.fetchPhotos, refreshRate);
        $(window).resize(function() {
            this.setColumns();
            $scope.$apply();
        }.bind(this));
    }
});
