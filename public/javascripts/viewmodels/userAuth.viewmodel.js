/*userAuth View-Model*/
var userAuth = (function (window, $, ko, app, undefined) {
	
	'use strict';
		
	/**
	 * view{} is initialized to be the main object literal of userAuth view.
	 *
	*/
	var view = {

		observables : {
			initial : {
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
			}
		},	

		el : {
			wrapper : document.getElementById('member-box')
		},

		/**
		 * applyBinding() binds view-model for the specific view.
		 *
		*/
		applyBinding : function () {
			app.applyBinding('userViewModel', view, view.el.wrapper);
		},

		/**
	   * init can be used to init other view-models which is not initialized. 
		*/
		init : function () {
			view.applyBinding();
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