'use strict';

// Define the `virtaApp` module
var virtaApp = angular.module('virtaApp', [
  'ngAnimate',
  'photoFeed'
]);

// Endpoint to hit for photo data
virtaApp.constant(
    'flickrEndpoint',
    'https://api.flickr.com/services/feeds/photos_public.gne?format=json');

// Feed refresh rate in milliseconds
virtaApp.constant(
    'refreshRate',
     12000);
