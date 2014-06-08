/*contentMain View-Model*/
var contentMain = (function (window, $, ko, app, undefined) {
	'use strict';
		
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

		applyBinding : function () {
			app.applyBinding('contentMain', view, view.el.wrapper);
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