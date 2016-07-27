var React = require('react');

var Actions = require('./actions');

var SearchBar = React.createClass({

  getInitialState: function() { return { value: "" }; },

  render: function() {

    return (
//      <div className="row">
//        <div className="col-sm-12" style={{width: '100%', paddingLeft: '0px', paddingRight: '0px'}}>
          <input type="search"
                 className="form-control"
                 placeholder="Filter pokemon"
                 style={{borderRadius: '0px'}}
                 onChange={this._onChange}
                 value={this.state.value} />

//        </div>
//      </div>
    );
  },

  _onChange: function(event) {
    var newText = event.target.value;

    Actions.filterPokemonByText(newText);

    this.setState({
      value: newText,
    });

  },

});

module.exports = SearchBar

