"use strict";

define(["Core/ServiceManager", "jquery"], function (ServiceManager) {

    return function () {

        var userLoggedIn = false,
            userProfile,
            that = this;

        this.init = function () {
            window.fbAsyncInit = function() {
                FB.init({
                    appId      : '546287455462961',
                    channelUrl : '//{{your-domain}/channel.html',
                    status     : true, // check login status
                    cookie     : true, // enable cookies to allow the server to access the session
                    xfbml      : true  // parse XFBML
                });

                // Here we subscribe to the auth.authResponseChange JavaScript event. This event is fired
                // for any authentication related change, such as login, logout or session refresh. This means that
                // whenever someone who was previously logged out tries to log in again, the correct case below
                // will be handled.
                FB.Event.subscribe('auth.authResponseChange', function(response) {
                    // Here we specify what we do with the response anytime this event occurs.
                    if (response.status === 'connected') {
                        // The response object is returned with a status field that lets the app know the current
                        // login status of the person. In this case, we're handling the situation where they
                        // have logged in to the app.
                        that.setUserLoggedIn(true);
                        that.fetchUserProfile();
                    } else if (response.status === 'not_authorized') {
                        // In this case, the person is logged into Facebook, but not into the app
                        that.setUserLoggedIn(false);
                    } else {
                        // In this case, the person is not logged into Facebook
                        that.setUserLoggedIn(false);
                    }
                });
            };

            // Load the SDK asynchronously
            (function(d) {
                var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
                if (d.getElementById(id)) {return;}
                js = d.createElement('script'); js.id = id; js.async = true;
                js.src = "//connect.facebook.net/en_US/all.js";
                ref.parentNode.insertBefore(js, ref);
            }) (document);
        };

        this.setUserLoggedIn = function (loggedIn) {
            var appViewModel = ServiceManager.getService("AppViewModel");
            userLoggedIn = loggedIn;
            appViewModel.isUserLoggedIn(userLoggedIn);

            $(".off-canvas-list a").click(function () {
                $(this).closest(".off-canvas-wrap").removeClass("move-right");
            });
        };

        this.login = function (callback) {
            FB.login(function(response) {
                if (response.authResponse) {
                    // The person logged into your app
                    callback();
                } else {
                    // The person cancelled the login dialog
                }
            });
        };

        this.logout = function (callback) {
            FB.logout(function(response) {
                // user is now logged out
                that.setUserLoggedIn(false);
                callback();
            });
        };

        this.isUserLoggedIn = function () {
            return userLoggedIn;
        };

        this.fetchUserProfile = function () {
            FB.api('/me', function(response) {
                userProfile = response;
            });
        };

        this.getUserProfile = function () {
            return userProfile;
        };

        this.getAvatar = function (username) {
            username == username || userProfile.username;
            return "http://graph.facebook.com/" + username + "/picture";
        };

    };

});