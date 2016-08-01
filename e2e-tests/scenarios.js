'use strict';

/* https://github.com/angular/protractor/blob/master/docs/toc.md */


describe('Flickr Feed Application', function() {
    var photoData0, photoData1, photoData2;

    beforeEach(function() {
        var httpBackendMock = function() {
            angular.module('httpBackendMock', ['flickrFeedApp','ngMockE2E'])
                .run(function($httpBackend, flickrEndpoint) {
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

                    $httpBackend.whenJSONP(flickrEndpoint + '&jsoncallback=JSON_CALLBACK')
                        .respond(function(){
                            return {items: [photoData0, photoData1, photoData2]}});
                });
        };

        browser.addMockModule('httpBackendMock', httpBackendMock);
        browser.get('index.html');
    });

    it('should filter by favorite photos', function() {
        var photosList = element.all(by.repeater('photo in $ctrl.oneColumn[0]'));
        expect(photosList.count()).toBe(0);
    });
});
