/*home View-Model*/
var home = (function (window, $, ko, app, undefined) {
	
	'use strict';
	
	/**
	 * view{} is initialized to be the main object literal of home view.
	 *
	*/	
	var view = {

		observables : {
			initial : {
				content : {
					h1 : {text : 'SPA Prototyping Boilerplate for KnockoutJS / Index'},
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
			wrapper : document.getElementById('js-vm-index')
		},

		/**
		 * applyBinding() binds view-model for the specific view.
		 *
		*/
		applyBinding : function () {
			app.applyBinding('index', view, view.el.wrapper);
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