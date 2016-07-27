var React = require('react');
var _ = require('underscore');

var Actions = require('./actions');
var SortBy = require('./constants').SortBy;
var utils = require('./utils');

var SearchBar = require('./SearchBar');

var NavBar = React.createClass({

  propTypes: {
    sortBy: React.PropTypes.string.isRequired,
  },

  render: function() {

    var sortByItems = _.map(SortBy, function(value, key) {

      var isActive = this.props.sortBy == value;
      var classes = utils.classnames("dropdown-item", {'active': isActive});
      return (
        <a key={key} className={classes} data-target="#" onClick={this._changeSort(value)}>{value}</a>
      );
    }, this);

    return (
      <nav className="navbar">
        <div className="nav navbar-nav">

            <div className="navbar-brand">Pokemon Storage System</div>

            <div className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" role="button" id="sortby-dropdownmenu" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Sort By
              </a>
              <div className="dropdown-menu" aria-labelledby="sortby-dropdownmenu">
                {sortByItems}
              </div>
            </div>

            <div className="nav-item pull-xs-right">
              <SearchBar />
            </div>
        </div>

      </nav>
    );

  },

  _changeSort: function(option) {
    return (function() {

      Actions.sortBy(option);

    }).bind(this);
  },

});


module.exports = NavBar
