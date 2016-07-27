var EventEmitter = require('events').EventEmitter;
var _ = require('underscore');
//var queryString = require('query-string');
//var moment = require('moment-timezone');

var AppDispatcher = require('./dispatcher');
var ActionTypes = require('./constants').ActionTypes;
var SortBy = require('./constants').SortBy;
var Actions = require('./actions');

var CHANGE_EVENT = 'CHANGE_EVENT';

var _doneInitialLoad = false;
var _pokemon = [];
var _candyInfo = [];
var _filterText = "";
var _sortBy = SortBy.NUMBER;
var _lastUpdatedDate = null;

var init = function() {
  Actions.loadPokemon();
}

var Store = _.defaults({

  hasDoneInitialLoad: function() { return _doneInitialLoad; },

  getPokemon: function() { return _pokemon; },

  getCandyInfo: function() { return _candyInfo; },

  getPokemonFilterText: function() { return _filterText; },

  getSortBy: function() { return _sortBy; },

  getLastUpdatedDate: function() { return _lastUpdatedDate; },

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

}, EventEmitter.prototype);

Store.dispatchToken = AppDispatcher.register(function(action) {

  switch (action.actionType) {

    case ActionTypes.LOAD_POKEMON:
      $.get('/api/pokemon').done(function(response, textStatus, jqXHR) {
        if (response.meta.isSuccess) { 
          _pokemon = response.body.pokemon;
          _candyInfo = response.body.candyInfo;
          _lastUpdatedDate = response.body.lastUpdatedDate ? new Date(response.body.lastUpdatedDate) : null;
        }
        // TODO: handle failure case here and in .fail
        _doneInitialLoad = true;

        Store.emitChange();
      }).fail(function(jqXHR, textStatus, errorThrown) {
        _doneInitialLoad = true;

        Store.emitChange();
      });

      break;

    case ActionTypes.FILTER_POKEMON:
      if (action.text !== undefined) {
        _filterText = action.text;
      }

      Store.emitChange();

      break;

    case ActionTypes.SORT_BY:
      _sortBy = action.sortBy;

      Store.emitChange();

      break;

  }
});

init();

module.exports = Store;
