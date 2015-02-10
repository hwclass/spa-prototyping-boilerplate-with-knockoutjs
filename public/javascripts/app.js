/**
 * app() is initialized to be the main object literal for the whole project.
 *
*/
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

	/**
	 * observables{} is the container for the observable values.
	 *
	*/
	var observables = {
		globalJSON : ko.observable()
	};

	/**
   * topics{} is the container for custom events holding them as topics.
   *
  */
  var topics = {};

  /**
   * IMPORTANT : This is a pub/sub event
   * subscribe() adds subscription to custom events.
   *
  */
  function subscribe(topic, listener) {
    // Create the topic's object if not yet created
    if(!topics[topic]) topics[topic] = { queue: [] };
    // Add the listener to queue
    var index = topics[topic].queue.push(listener);
    // Provide handle back for removal of topic
    return (function(index) {
      return {
        remove: function() {
          delete topics[index];
        }
      }
    })(index);
  };

  /**
   * IMPORTANT : This is a pub/sub event
   * publish() calls for the whole custom events to be subscripted into custom events.
   *
  */
  function publish(topic, info) {
    // If the topic doesn't exist, or there's no listeners in queue, just leave
    if(!topics[topic] || !topics[topic].queue.length) return;
    // Cycle through topics queue, fire!
    var items = topics[topic].queue;
    for(var x = 0; x < items.length; x++) {
      items[x](info || {});
    }
  };

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
   * init() can be used to init other view-models which is not initialized. 
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

	/**
	 * DOMContentLoaded waits until the whole content loaded.
	 *
	*/
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
