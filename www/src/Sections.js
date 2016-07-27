var React = require('react');
var _ = require('underscore');

var FlexGrow = React.createClass({
  render: function() {
    return (<div style={{flexGrow: '1'}}></div>);
  },
});

var getKeyForPokemonItem = function(pokemon) {
  return '' + pokemon.creationTimeMs + ' ' + pokemon.number + ' ' + pokemon.cp;
};

var PokemonItem = React.createClass({
  render: function() {
    return (
      <div style={{padding: '10px', textAlign: 'center'}}>
        <small>
          Cp {this.props.pokemon.cp},&nbsp;
          {Math.round(this.props.pokemon.weight * 10)/10.0} kg
        </small><br />

        <img src={images[this.props.pokemon.number]}></img><br />

        <small>{this.props.pokemon.name}</small><br />

        <small>IVs {Math.round(1000 * this.props.pokemon.ivPercentPerfect)/10.0}% </small>
      </div>
    );
  }
});

var PokemonList = React.createClass({
  
  propTypes: {
    pokemon: React.PropTypes.array.isRequired,
  },

  render: function() {

    var pokemonItems = _.map(this.props.pokemon, function(pokemon) {
      return (<PokemonItem key={getKeyForPokemonItem(pokemon)} pokemon={pokemon} />);
    })

    return (
      <div className="row">
        <div className="col-sm-12" style={{width: '100%', padding: '0px', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between'}}>
          {pokemonItems}
          <FlexGrow />
        </div>
      </div>
    );
  },
});

var SectionHeader = React.createClass({
  
  render: function() {

    return (
      <div key={this.props.text} className="row section-header">
        <div className="col-sm-12">
          {this.props.text}
        </div>
      </div>
    );
  },
});

var Sections = React.createClass({
  
  propTypes: {
    pokemon: React.PropTypes.array.isRequired,
    sortFunction: React.PropTypes.func.isRequired,
    sectionHeaderBetweenElementsFunction: React.PropTypes.func,
    filterFunction: React.PropTypes.func,
  },

  render: function() {
    var pokemonList = this.props.pokemon

    if (this.props.filterFunction) {
      pokemonList = _.filter(pokemonList, this.props.filterFunction);
    }

    if (this.props.sortFunction) {
      pokemonList = _.sortBy(pokemonList, this.props.sortFunction);
    }

    // if we have a function to split the pokemon into sections, do that, else
    // just create one giant section
    var sections = [];
    if (this.props.sectionHeaderBetweenElementsFunction) {
      var getSectionHeader = this.props.sectionHeaderBetweenElementsFunction;

      var acc = _.reduce(pokemonList, function(acc, current) {

        var sectionHeader = getSectionHeader(acc.last, current);
        if (sectionHeader && sectionHeader != acc.currentHeader) {
          if (!_.isEmpty(acc.currentPokemon)) {
            acc.allSections.push({ headerText: acc.currentHeader, pokemon: acc.currentPokemon });
          }

          acc.currentHeader = sectionHeader;
          acc.currentPokemon = [];
        }

        acc.currentPokemon.push(current);

        acc.last = current;

        return acc;
      }, { currentHeader: undefined, currentPokemon: [], last: undefined, allSections: [] });
      acc.allSections.push({ headerText: acc.currentHeader, pokemon: acc.currentPokemon });

      sections = acc.allSections;
    } else {
      sections = [{headerText: undefined, pokemon: pokemonList}];
    }

    // finally, render the generated section(s)
    var rendered = _.reduce(sections, function(acc, section) {
      if (section.headerText) {
        acc.push(<SectionHeader key={section.headerText} text={section.headerText} />);
      }

      acc.push(<PokemonList key={section.headerText + ' pokemon list'} pokemon={section.pokemon} />);

      return acc;
    }, []);

    return (
      <div className="pokemon-list">
        {rendered}
      </div>
    );
    
  },

});


var images = [
  undefined, // 1-based indexing works well for pokemon numbers
  require('./images/1.png'),
  require('./images/2.png'),
  require('./images/3.png'),
  require('./images/4.png'),
  require('./images/5.png'),
  require('./images/6.png'),
  require('./images/7.png'),
  require('./images/8.png'),
  require('./images/9.png'),
  require('./images/10.png'),
  require('./images/11.png'),
  require('./images/12.png'),
  require('./images/13.png'),
  require('./images/14.png'),
  require('./images/15.png'),
  require('./images/16.png'),
  require('./images/17.png'),
  require('./images/18.png'),
  require('./images/19.png'),
  require('./images/20.png'),
  require('./images/21.png'),
  require('./images/22.png'),
  require('./images/23.png'),
  require('./images/24.png'),
  require('./images/25.png'),
  require('./images/26.png'),
  require('./images/27.png'),
  require('./images/28.png'),
  require('./images/29.png'),
  require('./images/30.png'),
  require('./images/31.png'),
  require('./images/32.png'),
  require('./images/33.png'),
  require('./images/34.png'),
  require('./images/35.png'),
  require('./images/36.png'),
  require('./images/37.png'),
  require('./images/38.png'),
  require('./images/39.png'),
  require('./images/40.png'),
  require('./images/41.png'),
  require('./images/42.png'),
  require('./images/43.png'),
  require('./images/44.png'),
  require('./images/45.png'),
  require('./images/46.png'),
  require('./images/47.png'),
  require('./images/48.png'),
  require('./images/49.png'),
  require('./images/50.png'),
  require('./images/51.png'),
  require('./images/52.png'),
  require('./images/53.png'),
  require('./images/54.png'),
  require('./images/55.png'),
  require('./images/56.png'),
  require('./images/57.png'),
  require('./images/58.png'),
  require('./images/59.png'),
  require('./images/60.png'),
  require('./images/61.png'),
  require('./images/62.png'),
  require('./images/63.png'),
  require('./images/64.png'),
  require('./images/65.png'),
  require('./images/66.png'),
  require('./images/67.png'),
  require('./images/68.png'),
  require('./images/69.png'),
  require('./images/70.png'),
  require('./images/71.png'),
  require('./images/72.png'),
  require('./images/73.png'),
  require('./images/74.png'),
  require('./images/75.png'),
  require('./images/76.png'),
  require('./images/77.png'),
  require('./images/78.png'),
  require('./images/79.png'),
  require('./images/80.png'),
  require('./images/81.png'),
  require('./images/82.png'),
  require('./images/83.png'),
  require('./images/84.png'),
  require('./images/85.png'),
  require('./images/86.png'),
  require('./images/87.png'),
  require('./images/88.png'),
  require('./images/89.png'),
  require('./images/90.png'),
  require('./images/91.png'),
  require('./images/92.png'),
  require('./images/93.png'),
  require('./images/94.png'),
  require('./images/95.png'),
  require('./images/96.png'),
  require('./images/97.png'),
  require('./images/98.png'),
  require('./images/99.png'),
  require('./images/100.png'),
  require('./images/101.png'),
  require('./images/102.png'),
  require('./images/103.png'),
  require('./images/104.png'),
  require('./images/105.png'),
  require('./images/106.png'),
  require('./images/107.png'),
  require('./images/108.png'),
  require('./images/109.png'),
  require('./images/110.png'),
  require('./images/111.png'),
  require('./images/112.png'),
  require('./images/113.png'),
  require('./images/114.png'),
  require('./images/115.png'),
  require('./images/116.png'),
  require('./images/117.png'),
  require('./images/118.png'),
  require('./images/119.png'),
  require('./images/120.png'),
  require('./images/121.png'),
  require('./images/122.png'),
  require('./images/123.png'),
  require('./images/124.png'),
  require('./images/125.png'),
  require('./images/126.png'),
  require('./images/127.png'),
  require('./images/128.png'),
  require('./images/129.png'),
  require('./images/130.png'),
  require('./images/131.png'),
  require('./images/132.png'),
  require('./images/133.png'),
  require('./images/134.png'),
  require('./images/135.png'),
  require('./images/136.png'),
  require('./images/137.png'),
  require('./images/138.png'),
  require('./images/139.png'),
  require('./images/140.png'),
  require('./images/141.png'),
  require('./images/142.png'),
  require('./images/143.png'),
  require('./images/144.png'),
  require('./images/145.png'),
  require('./images/146.png'),
  require('./images/147.png'),
  require('./images/148.png'),
  require('./images/149.png'),
  require('./images/150.png'),
  require('./images/151.png'),
]


module.exports = Sections;

