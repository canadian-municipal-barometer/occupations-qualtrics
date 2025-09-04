Qualtrics.SurveyEngine.addOnload(function()
{
  const s = document.createElement("script");
  s.src = "https://rafaelgottardo.github.io/occupations-qualtrics/occupations_fr.js";
  document.head.appendChild(s);
});

Qualtrics.SurveyEngine.addOnReady(function() {
    jQuery(function() {

        // Decode Unicode characters
        function decodeUnicode(str) {
            return str.replace(/\\u[\dA-F]{4}/gi, function(match) {
                return String.fromCharCode(parseInt(match.replace(/\\u/g, ''), 16));
            });
        }

        // Normalize Unicode to remove accents and lower case 
        function normalizeString(str) {
            return decodeUnicode(str).normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase(); 
        }

        // Prepare data for Select2
        var select2Data = occupation_names.map(function(name, index) {
            var decodedName = decodeUnicode(name);
            var decodedCategory = decodeUnicode(occupation_category[index]); 
            return {
                id: occupation_codes[index], // Use code as the id
                text: decodedName, // Display name with decoded Unicode
                category: decodedCategory // Display decoded category
            };
        });

       // console.log("Select2 Data:", select2Data); 

        // Ensure Select2 library is included before initialization
        if (typeof jQuery.fn.select2 === 'function') {
            jQuery(".QR-QID1").each(function() {
                jQuery(this).select2({
                    data: select2Data,
                    minimumInputLength: 3,
                    language: {
                        inputTooShort: function() {
                            return "Veuillez entrer 3 caractères ou plus"; 
                        },
                        noResults: function() {
                            return "Aucun résultat trouvé"; 
                        }
                    },
                    matcher: function(params, data) {
                        var normalizedParams = normalizeString(params.term);
                        var normalizedDataText = normalizeString(data.text);
                        if (normalizedDataText.indexOf(normalizedParams) > -1) {
                            return data;
                        }
                        return null;
                    },
                    templateResult: function(item) {
                        return item.text;
                    },
                    templateSelection: function(item) {
                        return item.text;
                    }
                });
            });
        } else {
            console.error("Select2 library is not loaded.");
        }
    });
});



    Qualtrics.SurveyEngine.addOnPageSubmit(function() {
        var selectedData = jQuery(".QR-QID1").select2('data')[0]; 
        if (selectedData) {
            // Set embedded data
            Qualtrics.SurveyEngine.setEmbeddedData('occupation-name', selectedData.text);
            Qualtrics.SurveyEngine.setEmbeddedData('occupation-code', selectedData.id);
            Qualtrics.SurveyEngine.setEmbeddedData('occupation-category', selectedData.category);


        }
    });
