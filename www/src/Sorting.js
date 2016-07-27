var React = require('react');
var _ = require('underscore');

var Store = require('./store');

var Sections = require('./Sections');




var ivSort = function(pokemon) {
  return 100 - (pokemon.individualAttack + pokemon.individualDefense + pokemon.individualSpeed);
};
var normalSort = function(pokemon) {
  return pokemon.number * 100 + ivSort(pokemon); // sort by numer then by ivs
};
var recentSort = function(pokemon) {
  return 0 - pokemon.creationTimeMs; // creation time descending
};


var NormalSorting = React.createClass({

  getSectionHeader: function(last, current) {
    var candyInfo = Store.getCandyInfo(); // shouldn't have to grab this everytime
    if (!last || last.number != current.number) {
      return "#" + current.number + " " + current.name + ", " + candyInfo[current.familyId] + " candy";
    }
  },
  
  render: function() {
    return (
      <Sections pokemon={this.props.pokemon}
                sortFunction={normalSort}
                sectionHeaderBetweenElementsFunction={this.getSectionHeader}
                filterFunction={this.props.filterFunction} />
    );
  },

});

var IndividualValuesSorting = React.createClass({

  getSectionHeader: function(last, current) {
    if (current.ivPercentPerfect >= 0.9 && !last) {
      return ">= 90%";
    } else if (current.ivPercentPerfect >= 0.8 && current.ivPercentPerfect < 0.9 && (!last || last.ivPercentPerfect >= 0.9)) {
      return ">= 80%";
    } else if (current.ivPercentPerfect < 0.8 && (!last || last.ivPercentPerfect >= 0.8)) {
      return "Other";
    }
  },
  
  render: function() {
    return (
      <Sections pokemon={this.props.pokemon}
                sortFunction={ivSort}
                sectionHeaderBetweenElementsFunction={this.getSectionHeader}
                filterFunction={this.props.filterFunction} />
    );
  },

});

var ONE_DAY_MS = (1000 * 60 * 60 * 24);
var ONE_WEEK_MS = ONE_DAY_MS * 7;

var RecentSorting = React.createClass({

  getSectionHeader: function() {
    var nowMs = (new Date()).getTime();
    return function(last, current) {
      var withinXMs = function(pokemon, ms) { return pokemon && (nowMs - pokemon.creationTimeMs) < ms; }
      var fromPast24Hours = function(pokemon) { return withinXMs(pokemon, ONE_DAY_MS); }
      var fromPastWeek = function(pokemon) { return withinXMs(pokemon, ONE_WEEK_MS); }

      if (fromPast24Hours(current) && !last) {
        return "Past 24 Hours";
      } else if (fromPastWeek(current) && (!last || fromPast24Hours(last))) {
        return "Past Week";
      } else if (!fromPastWeek(current) && (!last || fromPastWeek(last))) {
        return "Earlier";
      }
    };
  },
  
  render: function() {
    return (
      <Sections pokemon={this.props.pokemon}
                sortFunction={recentSort}
                sectionHeaderBetweenElementsFunction={this.getSectionHeader()}
                filterFunction={this.props.filterFunction} />
    );
  },

});


module.exports = {
  Normal: NormalSorting,
  IndividualValues: IndividualValuesSorting,
  Recent: RecentSorting,
}

