"use strict";

define(["knockout", "jquery"], function (ko) {

    return function () {

        this.liked = ko.observable(false);

        this.likesCount = ko.observable();

        this.like = function () {
            this.liked(true);
            this.likesCount(this.likesCount() + 1);
        };

        this.buy = function () {
            console.log("TODO");
        };

    };

});