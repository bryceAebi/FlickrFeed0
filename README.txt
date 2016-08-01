TASK:
=====
We would like you to build a small web-based Flickr client using
the public Flickr JSON feed:

https://api.flickr.com/services/feeds/photos_public.gne?format=json

The client should:
- Load and display pictures and metadata about each picture,
  scrollable or page-able in some form
- Update the client with additional de-duplicated content by
  accessing the feed again every minute
- Allow marking of favorite photos and some sort of mode of
  the client that displays favorited photos
- Allows for un-favoriting of photos


HOW TO RUN:
===========
run `npm install` then run `npm start`. Go to localhost:8000


TESTING:
========
to run tests run `npm run test-single-run`


OTHER NOTES:
============
- Config values are set in app.module.js (refresh-rate and endpoint)
- Please note that this app is responsively designed!
  When you narrow your page, the photo columns collapse.
  Note that this doesn't affect photo ordering: new photos
  are always at the top.


FUTURE TODO:
============
- setup an asset minifier for the js and css
- add scss functionality
- deal with case where large amounts of photos are
  loaded (hide/delete old photos and data except for favorites)
- autobalance waterfall columns (sometimes columns end up having
  very different lengths)
- move favorited checkbox to fixed header so it's easier to access
  while scrolling
- add back-to-top link with animated scroll to top
- selenium tests if this were for production
