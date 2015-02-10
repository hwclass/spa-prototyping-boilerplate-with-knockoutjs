/*header View-Model*/
var header = (function (window, $, ko, app, undefined) {
	
	'use strict';
	
	/**
	 * view{} is initialized to be the main object literal of header view.
	 *
	*/		
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
			isUserLoggedIn : ko.observable(false),
			isLoginValid : ko.observable(false),
		},

		el : {
			wrapper : document.getElementById('js-vm-header')
		},

		/**
		 * applyBinding() binds view-model for the specific view.
		 *
		*/
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
			var userid = this.observables.user.id();
			var userpass = this.observables.user.password();
			var userData = ko.toJS(app.observables.globalJSON());
			if($.cookie('auth') !== 'true') {
				for (var count = 0, len = userData.user.length; count < len; count++) {
					if (userid == userData.user[count].id && userpass == userData.user[count].passWord) {
						this.fillUserInstance(userData.user[count]);
						this.setAuthentication(true);
					}
				}
			} else {
				this.injectAuthCookieIntoAuthState();
			}
			
		},

		/**
		 * fillUserInstance() sets the current user's info into the viewmodel.
		 *
		*/
		fillUserInstance : function (obj) {
			this.observables.user.name(obj.name);
			this.observables.user.id(obj.id);
			this.observables.user.score(obj.puan);
			this.observables.user.balance(obj.bakiye);
			this.observables.user.nickname(obj.nickName);
			this.observables.user.twitter(obj.twitter);
			this.observables.user.experience(obj.experience);			
			this.observables.user.login(obj.login);
		},

		/**
		 * setAuthentication() sets the state and cookie state of
		 * current user information throughout the application
		 *
		*/
		setAuthentication : function (auth) {
			this.observables.isLoginValid(auth);
			this.setAuthenticationState(auth);
			this.setAuthenticationIntoCookie(auth);
		},

		/**
		 * setAuthenticationState() sets the current user's authentication
		 * state around knockoutJS
		 *
		*/
		setAuthenticationState : function (auth) {
			this.observables.isUserLoggedIn(auth);
		},

		/**
		 * setAuthenticationIntoCookie() sets the current user's authentication
		 * state around cookies.
		 *
		*/
		setAuthenticationIntoCookie : function (authenticationState) {
			if (authenticationState) {
				$.cookie('auth', true, {path : '/', expires: 60});
				$.cookie('name', this.observables.user.name(), {path : '/', expires: 60});
				$.cookie('password', this.observables.user.password(), {path : '/', expires: 60});
				$.cookie('id', this.observables.user.id(), {path : '/', expires: 60});
				$.cookie('nickname', this.observables.user.nickname(), {path : '/', expires: 60});
				$.cookie('twitter', this.observables.user.twitter(), {path : '/', expires: 60});
				$.cookie('balance', this.observables.user.balance(), {path : '/', expires: 60});
				$.cookie('score', this.observables.user.score(), {path : '/', expires: 60});
				$.cookie('experience', this.observables.user.experience(), {path : '/', expires: 60});
				$.cookie('login', this.observables.user.login(), {path : '/', expires: 60});
			} else {
				$.cookie('auth', false, { path: '/' });
				$.cookie("name", null, { path: '/' });
				$.cookie('password', null, { path: '/' });
				$.cookie('id', null, { path: '/' });
				$.cookie('nickname', null, { path: '/' });
				$.cookie('twitter', null, { path: '/' });
				$.cookie('balance', null, { path: '/' });
				$.cookie('score', null, { path: '/' });
				$.cookie('experience', null, { path: '/' });
			}
		},

		/**
		 * injectAuthCookieIntoAuthState() imports the state of
		 * current user information into cookies.
		 *
		*/
		injectAuthCookieIntoAuthState : function () {
			this.observables.user.name($.cookie('name'));
			this.observables.user.password($.cookie('password'));
			this.observables.user.id($.cookie('id'));
			this.observables.user.nickname($.cookie('nickname'));
			this.observables.user.twitter($.cookie('twitter'));
			this.observables.user.balance($.cookie('balance'));
			this.observables.user.score($.cookie('score'));
			this.observables.user.experience($.cookie('experience'));
			this.observables.user.login($.cookie('login'));
			this.setAuthentication(true);
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
	   * init() can be used to init other view-models which is not initialized. 
		*/
		init : function () {
			app.applyBinding('header', view, view.el.wrapper);
			this.getRemoteJSON(app.config.url.json.global);
			this.checkAuthentication();
		}
		
	};

	/**
	 * DOMContentLoaded waits until the whole content loaded.
	 *
	*/
	window.addEventListener("DOMContentLoaded", function() {
		view.init();
  }, false);

	return {
		view : view
	}

})(window, jQuery, ko, app);