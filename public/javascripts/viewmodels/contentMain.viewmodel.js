/*contentMain View-Model*/
var contentMain = (function (window, $, ko, app, undefined) {
	
	'use strict';
	
	/**
	 * view{} is initialized to be the main object literal of contentMain view.
	 *
	*/		
	var view = {

		observables : {
			initial : {
				content : {
					h1 : {text : 'SPA Prototyping Boilerplate for KnockoutJS'},
					p : {text : 'This is a KnockoutJS boilerplate code for Prototyping a Single-Page Application.'},
					a : {text : 'Go Home'}
				}
			},
			content : {
				h1 : {text : ''},
				p : {text : ''},
				a : {text : ''}
			}
		},	

		el : {
			wrapper : document.getElementById('content-main')
		},

		/**
		 * applyBinding() binds view-model for the specific view.
		 *
		*/
		applyBinding : function () {
			app.applyBinding('contentMain', view, view.el.wrapper);
		},

		/**
		 * init() can be used to initialize any module, invoke a method or function and etc. 
		 *
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