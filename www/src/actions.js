
var AppDispatcher = require('./dispatcher');
var ActionTypes = require('./constants').ActionTypes;

module.exports = {

  loadPokemon: function() {
    AppDispatcher.dispatch({
      actionType: ActionTypes.LOAD_POKEMON,
    });
  },

  filterPokemonByText: function(text) {
    AppDispatcher.dispatch({
      actionType: ActionTypes.FILTER_POKEMON,
      text: text
    });
  },

  sortBy: function(sortBy) {
    AppDispatcher.dispatch({
      actionType: ActionTypes.SORT_BY,
      sortBy: sortBy
    });
  },

};
