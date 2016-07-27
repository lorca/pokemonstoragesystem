var React = require('react');
var ReactDOM = require('react-dom');
var $ = require('jquery');

var Store = require('./store');
var SortBy = require('./constants').SortBy;

var Page = require('./Page');
var Sorting = require('./Sorting');
var NavBar = require('./NavBar');
var Empty = require('./Empty');


var getWholePageState = function () {
  return {
    pokemon: Store.getPokemon(),
    sortBy: Store.getSortBy(),
    nameFilter: Store.getPokemonFilterText(),
    lastUpdatedDate: Store.getLastUpdatedDate(),
    doneInitialLoad: Store.hasDoneInitialLoad(),
  };
}

var getSectionsSortClass = function(pokemon, sortBy, filterFunction) {
  switch (sortBy) {
    case SortBy.RECENT: return <Sorting.Recent pokemon={pokemon} filterFunction={filterFunction} />;
    case SortBy.IVS: return <Sorting.IndividualValues pokemon={pokemon} filterFunction={filterFunction} />;
    default: return <Sorting.Normal pokemon={pokemon} filterFunction={filterFunction} />;
  }
}

var getFilterFunction = function(filterText, sortBy) {
  if (!filterText) {
    return function() { return true; }
  } else {
    return function(pokemon) {
      return pokemon.name.toLowerCase().startsWith(filterText);
    };
  }
};


var wholePage = React.createClass({

  getInitialState: function() { return getWholePageState(); },

  componentDidMount: function() { Store.addChangeListener(this._onChange); },
  componentWillUnmount: function() { Store.removeChangeListener(this._onChange); },
  _onChange: function () { this.setState(getWholePageState()); },

  render: function() {

    var topMargin = '0px';

    var filterFunction = getFilterFunction(this.state.nameFilter);

    var mainContent = null;
    if (this.state.pokemon.length > 0 || !this.state.doneInitialLoad) {
      mainContent = (
        <div className="tmalloy-card">
          {getSectionsSortClass(this.state.pokemon, this.state.sortBy, filterFunction)}
        </div>
      );
    } else {
      mainContent = <Empty />;
    }


    return (
      <Page numPokemon={this.state.pokemon.length} lastUpdatedDate={this.state.lastUpdatedDate}>
        <div className="container" style={{marginTop: topMargin}}>
          <NavBar sortBy={this.state.sortBy} />
          {mainContent}
        </div>
      </Page>
    );
  },

});


$( document ).ready(function() {
  ReactDOM.render(
    React.createElement(wholePage),
    document.getElementById('main')
  );
});

