'use strict';

// Define the `flickrFeedApp` module
var flickrFeedApp = angular.module('flickrFeedApp', [
  'ngAnimate',
  'photoFeed'
]);

// Endpoint to hit for photo data
flickrFeedApp.constant(
    'flickrEndpoint',
    'https://api.flickr.com/services/feeds/photos_public.gne?format=json');

// Feed refresh rate in milliseconds
flickrFeedApp.constant(
    'refreshRate',
     12000);
