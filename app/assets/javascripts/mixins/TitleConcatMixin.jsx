// Concats a title and subtitle using the format specified here http://dissertation.laerd.com/style-guides-for-dissertation-titles-p2.php
var TitleConcatMixin = {
  titleConcat: function(title, subtitle) {
    console.log(title);
    if(subtitle)
      return title + this.titleSpacer(title) + subtitle;
    return title;
  },

  // Gets the spacer to use after the title. Will
  // be a : unless there is already a ':' or
  // there is a '?' at the end
  titleSpacer: function(title) {
    var last = title.trim().slice(-1)
    if(last == "?" || last == ":")
      return " "
    return ": "
  }
}

module.exports = TitleConcatMixin;
