/*footer View-Model*/
var footer = (function (window, $, ko, app, undefined) {
	
	'use strict';
	
	/**
	 * view{} is initialized to be the main object literal of footer view.
	 *
	*/		
	var view = {

		observables : {
			initial : {
				menu : [
					{content : 'Home', link : '/'},
					{content : 'About', link : '/about'},
					{content : 'Contact', link : '/contact'}
				]
			},
			menu : [
				{content : 'Home', link : '/'},
				{content : 'About', link : '/about'},
				{content : 'Contact', link : '/contact'}
			]
		},	

		el : {
			wrapper : document.getElementById('js-vm-footer')
		},

		/**
		 * applyBinding() binds view-model for the specific view.
		 *
		*/
		applyBinding : function () {
			app.applyBinding('footer', view, view.el.wrapper);
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