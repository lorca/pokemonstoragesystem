var React = require('react');

var Empty = React.createClass({

  render: function() {
    return (
      <div className="jumbotron">
        <h1 className="display-3">No Pokemon!</h1>

        <p className="lead">We are unable to find any of your pokemon.</p>

        <hr className="m-y-2" />

        <p>Please take a look at the GitHub page to make sure everything's setup correctly.</p>

        <p className="lead">
          <a className="btn btn-primary btn-lg" href="https://github.com/tmalloy/pokemonstoragesystem" role="button">Help!</a>
        </p>
      </div>
    );

  },

});

module.exports = Empty
