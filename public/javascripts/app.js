var app = (function (window, $, ko, undefined) {

	'use strict';
	/**
	 * app{} is initialized to be the main object literal.
	 *
	*/
	var config = {
		url : {
			json : {
				global : '../../data/_global.json',
				users : ''
			}
		},
		modules : {
			global : {
				cookie : {
					auth : 'auth',
					uname : 'uname',
					upass : 'upass'
				}
			}
		},
		messages : {
			error : {
				connectionError : 'Connection error.'
			}
		},
		menu : {
			active : ''
		}
	};

	var observables = {
		globalJSON : ko.observable()
	}

	/**
	 * viewModels{} object is initialized to be the main view-model wrapper.
	 *
	*/
	var viewModels = {};
		
	/**
	 * setViewModel() sets the given view-model into the main app view-model wrapper.
	 *
	*/
	function setViewModel (VM) {
		app.viewModels[VM] = VM;
	};

	/**
	 * getViewModel() returns the given view-model.
	 *
	*/
	function getViewModel (VM) {
		return app.viewModels[VM];
	};

	/**
	 * applyBindings() binds view-models the whole.
	 *
	*/
	function applyBindings () {
		var VMs = app.viewModels;
		for (var _vms in VMs) {
			ko.applyBindings(VMs[_vms]);
		} 
	};

	/**
	 * applyBinding() binds view-model.
	 *
	*/
	function applyBinding (name, _VM, el) {
		if (!app.viewModels[_VM]) {
			app.viewModels[name] = _VM;
			ko.applyBindings(_VM, el);
		}
	}

	/**
   * init can be used to init other view-models which is not initialized. 
	*/
	function init () {
		app.utils.log('app initialized...');
	}

	/**
	 * utils contains utility functions for general usage.
	 *
	*/
	var utils = {
		
		/**
		 * isNull() returns if the given object is null or not.
		 *
		*/
		isNull : function (obj) {
	    return (null == obj ? true : false);
		},
		
		/**
		 * isUndefined() returns if the given object is undefined or not.
		 *
		*/
		isUndefined : function (obj) {
		  return (typeof obj == 'undefined' ? true : false);
		},
		
		/**
		 * log() writes the given message down on the console.
		 *
		*/
		log : function (msg) {
			console.log(msg);
		},
		
		/**
		 * isArrayEmpty() checks if the given array is empty or not.
		 *
		*/
		isArrayEmpty : function (_arr) {
			return (_arr.length == 0);
		},
		
		/**
		 * setContext() sets the context of the current viewmodel's context into the given view-model.
		 * TODO : this function will be initialized in the future.
		 *
		*/
		setContext : function (_viewModel) {
			_viewModel.self = _viewModel;
		}

	}

	window.addEventListener("DOMContentLoaded", function() {
		init();
  }, false);

	return {
		config : config,
		viewModels : viewModels,
		observables : observables,
		setViewModel : setViewModel,
		getViewModel : getViewModel,
		applyBindings : applyBindings,
		applyBinding : applyBinding,
		utils : utils
	}

}(window, jQuery, ko));
