(function() {
  var comparators = {};

  comparators.basic = function (a, b) {
    if (a < b) {
      return -1;
    }
    if (a > b) {
      return 1
    }
    return 0;
  };

  comparators.reverse = function (a, b) {
    return comparators.basic(b, a);
  };

  comparators.row_increasing = function (a, b) {
    return comparators.basic(a.x, b.x);
  };

  comparators.row_decreasing = function (a, b) {
    return comparators.reverse(a.x, b.x);
  };

  comparators.col_increasing = function (a, b) {
    return comparators.basic(a.y, b.y);
  };

  comparators.col_decreasing = function (a, b) {
    return comparators.reverse(a.y, b.y);
  }

  return comparators;
})();