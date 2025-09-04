// Decode Unicode characters (get actual decoded unicode, such as for accented letters)
function decodeUnicode(str) {
  return str.replace(/\\u[\dA-F]{4}/gi, function (match) {
    return String.fromCharCode(parseInt(match.replace(/\\u/g, ""), 16));
  });
}

// Prepare data
// occupation_names and occupation_category loaded in header
let occup_names = [];
let occup_lookup = {};
for (let i = 0; i < occupation_names.length; i++) {
  // create an occup names array, which is only for use in the selectize menu
  // because it only accepts arrays
  let decodedName = decodeUnicode(occupation_names[i]);
  let decodedCategory = decodeUnicode(occupation_category[i]);
  let occup_code = occupation_codes[i];
  occup_names.push({ id: i, title: decodedName });
  // For performance, create a lookup object that maps ids from occup_names to
  // occupation names and categories for final data storage and verification by
  // the user
  occup_lookup[i] = {
    name: decodedName,
    category: decodedCategory,
    code: occup_code,
  };
}

var $select = $("#select").selectize({
  maxItems: 1,
  valueField: "id",
  labelField: "title",
  searchField: "title",
  options: occup_names,
  create: false,
});

// clear button
var control = $select[0].selectize;
$("#button-clear").on("click", function () {
  control.clear();
});

Qualtrics.SurveyEngine.addOnPageSubmit(function () {
  let id = $("#select")[0].selectize.getValue();
  let selected = occup_lookup[id];
  if (selected) {
    // Set embedded data
    Qualtrics.SurveyEngine.setEmbeddedData("occupation_name", selected.name);
    Qualtrics.SurveyEngine.setEmbeddedData("occupation_code", selected.code);
    Qualtrics.SurveyEngine.setEmbeddedData(
      "occupation_category",
      selected.category,
    );
  }
});
