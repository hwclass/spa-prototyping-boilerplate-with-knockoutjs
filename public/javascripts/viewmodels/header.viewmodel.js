/*header View-Model*/
var header = (function (window, $, ko, app, undefined) {
	'use strict';
		
	var view = {

		observables : {
			initial : {
				menu : [
					{content : 'Home', link : '/'},
					{content : 'About', link : '/about'},
					{content : 'Contact', link : '/contact'}
				],
				user : {
					name : ko.observable('test'),
					id : ko.observable('ah&lk!197_5'),
					password : ko.observable('*****'),
					nickname : ko.observable('hwclass'),
					twitter : ko.observable('@hwclass'),
					balance : ko.observable('0.0'),
					score : ko.observable('0.0'),
					experience : ko.observable(2),
					login : ko.observable(false)
				}
			},
			menu : [
				{content : 'Home', link : '/'},
				{content : 'About', link : '/about'},
				{content : 'Contact', link : '/contact'}
			],
			user : {
				name : ko.observable(''),
				id : ko.observable(''),
				password : ko.observable(''),
				nickname : ko.observable(''),
				twitter : ko.observable(''),
				balance : ko.observable(''),
				score : ko.observable(''),
				experience : ko.observable(''),
				login : ko.observable(false)
			},
			isUserLoggedIn : ko.observable(false)
		},

		el : {
			wrapper : document.getElementById('js-vm-header')
		},

		applyBinding : function () {
			app.applyBinding('header', view, view.el.wrapper);
		},

		/**
		 * getRemoteJSON() fetches the any file from local for some infos.
		 * NOTE : this file will be replaced with an online database
		 *
		*/
		getRemoteJSON : function (url) {
			try {
				var request = new XMLHttpRequest();
				request.open('GET', url, true);
				request.onload = function() {
				  if (request.status >= 200 && request.status < 400) {
				    app.observables.globalJSON(JSON.parse(request.responseText));
				  } else {
				  	throw new new Error(request.status);
				  }
				};
				request.onerror = function() {
				  console.error(_.config.messages.error.connectionError);
				};
				request.send();
			} catch (err) {
				throw new Error(err);
			}
		},

		/**
		 * login() makes the current user logged in into current context.
		 *
		*/
		login : function () {
			/*
			* TODO 1 : current view-model observable array will be replaced by remote json file and
			* never request it again. 
			* TODO 2 : error control will be added.
			*/
			var username = this.observables.user.name();
			var userpass = this.observables.user.password();
			var userData = ko.toJS(app.observables.globalJSON());
			if($.cookie('auth') !== 'true') {
				for (var count = 0, len = userData.user.length; count < len; count++) {
					if (username == userData.user[count].id && userpass == userData.user[count].passWord) {
						this.fillUserInstance(userData.user[count]);
						this.setAuthentication(true);
					}
				}
			} else {
				this.injectAuthCookieIntoAuthState();
			}

			/*Logining with Sign-In Modal Control*/
			if ($(this.el.signInModal).length > 0 && $(this.el.signInModal).is(':visible')) {
				console.log('hide sign-in modal');
				$(this.el.signInModal).modal('hide');
				//go into triggered link after opening sign-in modal
				window.location.href = _.viewModels.memberNavViewModel.triggeredLink();
			}
			
		},

		/**
		 * checkAuthentication() checks the authentication state
		 * NOTE : this method will control the whole data stream in the future. 
		 *
		*/
		checkAuthentication : function () {
			if (!app.utils.isNull($.cookie('auth')) && !app.utils.isUndefined($.cookie('auth'))) {
				if ($.cookie('auth') == 'true') { 
					this.login();
				};
			}
		},

		/**
	   * init can be used to init other view-models which is not initialized. 
		*/
		init : function () {
			app.applyBinding('header', view, view.el.wrapper);
			this.getRemoteJSON(app.config.url.json.global);
			this.checkAuthentication();
		}
		
	};

	window.addEventListener("DOMContentLoaded", function() {
		view.init();
  }, false);

	return {
		view : view
	}

})(window, jQuery, ko, app);