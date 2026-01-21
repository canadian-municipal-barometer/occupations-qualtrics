Qualtrics.SurveyEngine.addOnload(function () {
  let occup_name = Qualtrics.SurveyEngine.getEmbeddedData("occupation_name");
  console.log("'occupation_name' embedded data:", occup_name);
  let init_switch;

  if (occup_name) {
    this.showNextButton();
    init_switch = true;
  } else {
    this.hideNextButton();
  }

  var surveyLanguage = Qualtrics.SurveyEngine.getEmbeddedData("Q_Language");
  let prompt;
  let button_text;
  let occupation_names;
  let occupation_category;
  let occupation_codes;

  // occupation_names_en, etc. loaded in survey header
  if (surveyLanguage.includes("FR")) {
    prompt = "Veuillez écrire ou choisir votre profession dans la liste...";
    button_text = "Nettoyer";
    occupation_names = occupation_names_fr;
    occupation_category = occupation_category_fr;
    occupation_codes = occupation_codes_fr;
  } else {
    prompt = "Begin typing your occupation...";
    button_text = "Clear";
    occupation_names = occupation_names_en;
    occupation_category = occupation_category_en;
    occupation_codes = occupation_codes_en;
  }

  const select = document.getElementById("select");
  select.setAttribute("placeholder", prompt);

  const button = document.getElementById("button-clear");
  button.textContent = button_text;

  // Decode Unicode characters (get actual decoded unicode, such as for accented letters)
  function decodeUnicode(str) {
    return str.replace(/\\u[\dA-F]{4}/gi, function (match) {
      return String.fromCharCode(parseInt(match.replace(/\\u/g, ""), 16));
    });
  }

  // Prepare data
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
    create: true,
    createFilter: null, // optional: filter to restrict what can be created
    render: {
      option_create: function (data, escape) {
        // Custom message for the "create" option
        return '<div class="create">' + escape(data.input) + "</div>";
      },
    },
    dropdownParent: "body",
  });

  if (init_switch) {
    // Find the item in occup_names that matches the pre-filled occupation name
    let prefill_item = occup_names.find(function (item) {
      return item.title === occup_name;
    });

    if (prefill_item) {
      // Set the value of the selectize control to the found item's ID
      $select[0].selectize.setValue(prefill_item.id);
    }
  }

  // clear button
  var control = $select[0].selectize;
  $("#button-clear").on("click", function () {
    control.clear();
  });

  control.on(
    "change",
    function (id) {
      if (id && id.length > 0) {
        this.showNextButton();
      } else {
        this.hideNextButton();
      }
    }.bind(this),
  );

  Qualtrics.SurveyEngine.addOnPageSubmit(function () {
    let id = $("#select")[0].selectize.getValue();
    console.log("id:", id);
    if (occup_lookup[id]) {
      let selected = occup_lookup[id];
      // Set embedded data
      Qualtrics.SurveyEngine.setEmbeddedData("occupation_name", selected.name);
      Qualtrics.SurveyEngine.setEmbeddedData("occupation_code", selected.code);
      Qualtrics.SurveyEngine.setEmbeddedData(
        "occupation_category",
        selected.category,
      );
      Qualtrics.SurveyEngine.setEmbeddedData("occupation_match", 1);
      console.log(
        "match found.",
        selected.name,
        selected.code,
        selected.category,
      );
    } else {
      // FIX: in 2025/2026 genpop, this condition did not run even once
      let selected = id[0];
      Qualtrics.SurveyEngine.setEmbeddedData("occupation_name", selected);
      Qualtrics.SurveyEngine.setEmbeddedData("occupation_match", 0);
      console.log("match not found.", selected);
    }
  });
});
