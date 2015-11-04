/* feedreader.js
*
* This is the spec file that Jasmine will read and contains
* all of the tests that will be run against your application.
*/

/* We're placing all of our tests within the $() function,
* since some of these tests may require DOM elements. We want
* to ensure they don't run until the DOM is ready.
*/
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty.
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* Test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('contains valid url', function() {

            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);

            allFeeds.forEach(function(item) {
                expect(item.url).toBeDefined();
                expect(item.url).not.toBeNull();
                expect(item.url).not.toEqual("");
            });

        });

        /* Test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
          it('contains valid name', function() {

            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);

            allFeeds.forEach(function(item) {
                expect(item.name).toBeDefined();
                expect(item.name).not.toBeNull();
                expect(item.name).not.toEqual("");
            });

        });
    });

    describe('The menu', function() {

        /* Test that ensures the menu element is
         * hidden by default.
         */
        it('menu hidden', function() {
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });

         /* Test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
        it('change visibility upon click', function() {
            //trigger click event - should toggle off menu-hidden
            $('.menu-icon-link').trigger('click');
            expect($('body').hasClass('menu-hidden')).not.toBe(true);

            //trigger click event - should toggle menu-hidden back
            $('.menu-icon-link').trigger('click');
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });
    });

    describe('Initial Entries', function() {
        beforeEach(function(done) {
            loadFeed(0, function() {
                done();
            });
        });

        /* Test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         */
        it('contains at least 1 element', function(done) {
            expect($('.feed a').hasClass('entry-link')).toBe(true);
            done();
        });
    });

    describe('New Feed Selection', function() {
        var oldVal;
        beforeEach(function(done) {
            oldVal = $('.feed').html();
            loadFeed(1, function() {
                done();
            });
        });

        //reset to original feed
        afterEach(function(done){
            loadFeed(0, function(){
                done();
            });
        });

        /* Test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * loadFeed with a value of 1 is called in beforeEach so the
         * current value should be different from oldVal
         */
       it('content changes', function() {
            var curVal = $('.feed').html();
            expect(curVal).not.toEqual(oldVal);
        });
    });
}());
