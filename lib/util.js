module.exports = {
  snakeToCamel: function (str) {
    var str2 = "";
    for (var a = 0; a < str.length; a++) {
      if (str[a] === "_") {
        str2 += str[a + 1].toUpperCase();
        a++;
      } else {
        str2 += str[a];
      }
    }

    return str2;
  },
};
