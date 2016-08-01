'use strict';

describe('photoFeed', function() {

    beforeEach(module('virtaApp'));

    // Load the module that contains the `photoFeed` component before each test
    beforeEach(module('photoFeed'));

    // Test the controller
    describe('PhotoFeedController', function() {
        var $httpBackend, ctrl, photoData0, photoData1, photoData2;

        beforeEach(inject(function($componentController, _$httpBackend_, flickrEndpoint) {
            photoData0 = {
                title: 'Title0',
                author: 'nobody@flickr.com (Bryce)',
                date_taken: 'datestring',
                published: 'datestring2',
                link: 'www.google.com',
                media: {m: 'photourl'}
            };
            photoData1 = {
                title: 'Title1',
                author: 'nobody@flickr.com (Bryce)',
                date_taken: 'datestring',
                published: 'datestring2',
                link: 'www.google.com',
                media: {m: 'photourl1'}
            };

            // duplicate of photoData0
            photoData2 = {
                title: 'Title0',
                author: 'nobody@flickr.com (Bryce)',
                date_taken: 'datestring',
                published: 'datestring2',
                link: 'www.google.com',
                media: {m: 'photourl'}
            };
            $httpBackend = _$httpBackend_;
            $httpBackend.expectJSONP(flickrEndpoint + '&jsoncallback=JSON_CALLBACK').respond(
                {items: [photoData0, photoData1, photoData2]});

            ctrl = $componentController('photoFeed');
        }));

        it('should set photo columns upon instantiation', function() {
            expect(ctrl.oneColumn).toEqual([[]]);
            expect(ctrl.twoColumns).toEqual([[],[]]);
            expect(ctrl.threeColumns).toEqual([[],[],[]]);
            expect(ctrl.fourColumns).toEqual([[],[],[],[]]);

            $httpBackend.flush();

            expect(ctrl.oneColumn[0].length).toEqual(2);
            expect(ctrl.twoColumns[0].length).toEqual(1);
            expect(ctrl.twoColumns[1].length).toEqual(1);
            expect(ctrl.threeColumns[0].length).toEqual(1);
            expect(ctrl.threeColumns[1].length).toEqual(1);
            expect(ctrl.threeColumns[2].length).toEqual(0);
            expect(ctrl.fourColumns[0].length).toEqual(1);
            expect(ctrl.fourColumns[1].length).toEqual(1);
            expect(ctrl.fourColumns[2].length).toEqual(0);
            expect(ctrl.fourColumns[3].length).toEqual(0);
        });

        it('should dedup photos', function() {
            expect(ctrl.photoIds.size).toEqual(0);
            $httpBackend.flush();
            expect(ctrl.photoIds.size).toEqual(2);
        });

        it('should toggle favorited field', function() {
            $httpBackend.flush();
            expect(ctrl.oneColumn[0][0].favorited).toEqual(false);
            ctrl.toggleFavorite(ctrl.oneColumn[0][0]);
            expect(ctrl.oneColumn[0][0].favorited).toEqual(true);
            ctrl.toggleFavorite(ctrl.oneColumn[0][0]);
            expect(ctrl.oneColumn[0][0].favorited).toEqual(false);
        });

        it('should strip the author name into a reasonable format', function() {
            $httpBackend.flush();
            expect(ctrl.oneColumn[0][0].author).toEqual('Bryce');
        });
    });
});
