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
				]
			},
			menu : [
				{content : 'Home', link : '/'},
				{content : 'About', link : '/about'},
				{content : 'Contact', link : '/contact'}
			]
		},	

		el : {
			wrapper : document.getElementById('header')
		},

		applyBinding : function () {
			app.applyBinding('header', view, view.el.wrapper);
		},

		init : function () {
			view.applyBinding();
		}
		
	};

	window.addEventListener("DOMContentLoaded", function() {
		view.init();
  }, false);

	return {
		view : view
	}

})(window, jQuery, ko, app);