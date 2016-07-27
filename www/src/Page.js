var React = require('react');

var dateformat = require('dateformat');

var Footer = React.createClass({
  
  propTypes: {
    numPokemon: React.PropTypes.number.isRequired,
    lastUpdatedDate: React.PropTypes.object,
  },

  render: function() {

    var formattedDate = this.props.lastUpdatedDate ?
      dateformat(this.props.lastUpdatedDate, "mmmm dS, h:MM TT") :
      "unknown";

    return (
      <footer style={{ height: '3em' }}>
        <div className="container" style={{ position: 'relative', top: '50%', transform: 'translateY(-50%)' }}>
          <div className="row">
            <div className="col-md-12">
              <small className="text-muted" style={{ paddingLeft: '20px', paddingRight: '20px' }}>{this.props.numPokemon} pokemon, last updated: {formattedDate}</small>
            </div>
          </div>
        </div>
      </footer>
    );
  }
});

var Page = React.createClass({

  propTypes: {
    numPokemon: React.PropTypes.number.isRequired,
    lastUpdatedDate: React.PropTypes.object,
  },

  render: function() {
    return (
      <div style={{ height: '100%' }}>
        <div style={{ minHeight: '100%', height: 'auto !important', margin: '0 auto -3em' }}>
          { this.props.children }
          <div style={{ height: '3em' }}></div>
        </div>
        <Footer numPokemon={this.props.numPokemon} lastUpdatedDate={this.props.lastUpdatedDate} />
      </div>
    );
  },
});

module.exports = Page
