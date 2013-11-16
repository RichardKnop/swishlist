"use strict";

define(["jquery"], function () {

    return function (options) {

        var queue = [],
            loadedImagesCount = 0,
            capacity = options.capacity,
            that = this;

        this.preloadImg = function (src, placeholderId) {
            var img = document.createElement('img');
            img.onload = function () {
                $("#" + placeholderId).replaceWith($(img));
                loadedImagesCount += 1;
            };
            img.src = src;
        }

        this.add = function (obj) {
            queue.push(obj);
        };

        this.launch = function (callback) {
            queue.forEach(function (obj) {
                callback(obj);
                that.preloadImg(obj.src, obj.id);
            });
        };

        this.reset = function () {
            loadedImagesCount = 0;
            queue = [];
        };

        this.finishedLastBatch = function () {
            return capacity === loadedImagesCount;
        };

    };

});