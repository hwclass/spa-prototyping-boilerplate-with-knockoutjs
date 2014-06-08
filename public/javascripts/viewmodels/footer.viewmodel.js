/*footer View-Model*/
var footer = (function (window, $, ko, app, undefined) {
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
			wrapper : document.getElementById('js-vm-footer')
		},

		applyBinding : function () {
			app.applyBinding('footer', view, view.el.wrapper);
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