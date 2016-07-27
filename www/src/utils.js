var _ = require('underscore');

module.exports = {

  classnames: function() {
    var classes = ""
    _.map(arguments, function(item) {
      if (_.isString(item)) {
        classes += " " + item;
      } else if (_.isObject(item)) {
        _.map(item, function(value, key) {
          if (value) {
            classes += " " + key;
          }
        });
      }
    });
    return classes;
  },

}

