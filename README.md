_(La version française suit)_

_This project is based on [`occupation-qualtrics`](https://github.com/RafaelGottardo/occupations-qualtrics) by Rafael Campos-Gottardo and Simon Kiss, licensed under CC BY 4.0. Changes have been made._

# Canadian Occupations in Qualtrics

This is an implementation of [`selectize.js`](https://selectize.dev/) designed to capture occupations and [National Occupation Classification](https://noc.esdc.gc.ca) (NOC) Codes to be used in Canadian Public Opinion Research. A version of this implementation was included in the [2025 Canadian Election Study](http://www.ces-eec.ca/2025-canadian-election-study/) (CES).

You can preview this module [here](https://survey.ucalgary.ca/jfe/form/SV_4N7a2cOpESu2Cqi).

For a full working example in English please see [NOC_selectize.qsf](NOC_selectize.qsf).

If you have any issues or concerns please file an _issue_ in this repository.

# Implementation in Qualtrics

1. **Edit the CSS in the custom header to implement `selectize.js`:**

The custom header is under `Survey > Look and feel > General > Header`. Copy/paste this code directly into the box, and don't use the "edit" button (it can incorrectly format the code):

```
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<link
  rel="stylesheet"
  href="https://cdnjs.cloudflare.com/ajax/libs/selectize.js/0.15.2/css/selectize.default.min.css"
  integrity="sha512-pTaEn+6gF1IeWv3W1+7X7eM60TFu/agjgoHmYhAfLEU8Phuf6JKiiE8YmsNC0aCgQv4192s4Vai8YZ6VNM6vyQ=="
  crossorigin="anonymous"
  referrerpolicy="no-referrer"
/>
<script
  src="https://cdnjs.cloudflare.com/ajax/libs/selectize.js/0.15.2/js/selectize.min.js"
  integrity="sha512-IOebNkvA/HZjMM7MxL0NYeLYEalloZ8ckak+NDtOViP7oiYzG5vn6WVXyrJDiJPhl4yRdmNAG49iuLmhkUdVsQ=="
  crossorigin="anonymous"
  referrerpolicy="no-referrer"
></script>
<script src="https://rafaelgottardo.github.io/occupations-qualtrics/occupations.js"></script>
```

2. **Create a "Text / Graphic" question** and enter the following HTML code under "HTML View" after clicking on the question text:

```
QUESTION TEXT

<select
  id="select"
  multiple
  placeholder="Begin typing your occupation..."
></select>
<button id="button-clear">Clear</button>
```

You can then edit the question text the usual way without having to enter the HTML view.

3. **Add JavaScript to the question** by pasting the contents of [question_javascript.js](question_javascript.js) into the question JavaScript for the question you just created. The occupation names, categories, and NOC codes are drawn from `occupations.js`.

The French version of the code uses an older version of the project, and to implement this question in French, you should follow the instructions in the original (repository)[https://github.com/RafaelGottardo/occupations-qualtrics]. Currently, the original repository does not output NOC codes (it only outputs the occupation name and category).

4. **Add embedded data fields.** Embedded data fields are required in order for Qualtrics to receive and store the occupation values generated for each respondent. In the "Survey flow", create the following 3 embedded data fields, leaving their values blank:

- `occupation_name`
- `occupation_category`
- `occupation_code`

5. **_(Optional)_ Add a confirmation question following the occupation question**

We include a confirmation question following the occupation question to ensure that we have acurately captured an individual's occupation and industry. The confirmation question allows respondents to see the occupation category that they were placed in to ensure that it accurately reflects their occupation. It also enables them to enter another occupation if their occupation was not listed.

> You entered ${e://Field/occupation_name} which corresponds to ${e://Field/occupation_category}. Is this correct?
> If not, go back to the previous question.
>
> If your occupation was not listed please enter it below:

6. **Download Data**

Data from the occupation question will not appear in the default question responses in Qualtrics and will only appear in the embedded data on Qualtrics or when the data is downloaded.

# Citation

If you publish results using this question please cite:

Campos-Gottardo, R. & Kiss, S. (2025). _Occupations Qualtrics Module for Canadian Political Science Surveys_. GitHub repository: [https://github.com/RafaelGottardo/occupations-qualtrics](https://github.com/RafaelGottardo/occupations-qualtrics)

This repository also contains two citation files: [CITATION.cff](CITATION.cff) and [citation.bib](citation.bib).

---

# Professions Canadiennes dans Qualtrics

Ceci est une implémentation de [`Select2`](https://select2.org) conçue pour recueillir les professions et les codes de la [Classification nationale des professions](https://noc.esdc.gc.ca) (CNP), à utiliser dans la recherche sur l’opinion publique au Canada. Une version de cette implémentation a été incluse dans la [Étude électorale canadienne de 2025](http://www.ces-eec.ca/fr/etude-electorale-canadienne-2021-2/) (EEC), permettant une comparaison entre les résultats des sondages et ceux de l’EEC.

Vous pouvez prévisualiser ce module en [anglais](https://wlu.yul1.qualtrics.com/jfe/preview/previewId/e3838849-4ee2-4cfd-ac56-39e3ac68396b/SV_74CArtrQmN7GGma?Q_CHL=preview&Q_SurveyVersionID=current) ou en [français](https://wlu.yul1.qualtrics.com/jfe/preview/previewId/0425bcf7-feba-4a98-ae55-0fac4a74ef90/SV_e2QMOhsHJbthrGC?Q_CHL=preview&Q_SurveyVersionID=current).

Si vous rencontrez des problèmes ou avez des questions, veuillez soumettre une _issue_ sur ce dépôt.

# Implémentation dans Qualtrics

1. **Modifiez l’en-tête personnalisé pour inclure le code suivant afin d’activer `Select2` :**

```html
<!-- Select2 CSS -->
<link
  href="https://cdn.jsdelivr.net/npm/select2@4.1.0-beta.1/dist/css/select2.min.css"
  rel="stylesheet"
/>
<!-- jQuery (requis par Select2) -->
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<!-- JavaScript Select2 -->
<script src="https://cdn.jsdelivr.net/npm/select2@4.1.0-beta.1/dist/js/select2.min.js"></script>
```

2. **Modifiez le pied de page personnalisé pour inclure le code suivant afin de charger les données.**

```
<script src="https://rafaelgottardo.github.io/occupations-qualtrics/occupations.js"></script>
```

3. **Créez une question de type "Entrée de texte" à ligne unique**
4. **Modifiez le JavaScript de la question "Entrée de texte"**
   Collez le contenu de [question_javascript_fr](question_javascript_fr) dans le champ JavaScript de la question. Les noms de professions et les codes CNP sont tirés de `occupations_fr.js`. Assurez-vous de remplacer **toutes** les occurrences de `QID1` par l’ID de la question sur les professions dans votre sondage.

Pour utiliser la méthode en anglais, utilisez plutôt le code de [question_javascript](question_javascript), qui utilise `occupations.js`.

5. **_(Optionnel)_ Ajouter une question de confirmation après la question sur la profession**

Nous ajoutons une question de confirmation pour s’assurer que la profession et le secteur d’activité de l’individu ont été correctement identifiés. Cette question permet aux répondants de vérifier la catégorie professionnelle qui leur a été assignée et de la corriger au besoin. Elle leur donne aussi la possibilité d’entrer une profession différente si la leur n’apparaissait pas dans la liste.

```text
Vous avez entré ${e://Field/occupation-name}, qui correspond à ${e://Field/occupation-category}. Est-ce correct ?

 Si ce n'est pas le cas, revenez à la question précédente.

 Si votre profession ne figurait pas dans la liste, veuillez l'entrer ci-dessous :
```

6. **Téléchargement des données**

Les données recueillies par la question sur la profession n’apparaîtront pas dans les réponses par défaut de Qualtrics, mais uniquement dans les _données intégrées_ ou lors du téléchargement des données.

# Citation

Si vous publiez des résultats basés sur cette question, veuillez citer :

Campos-Gottardo, R. & Kiss, S. (2025). _Occupations Qualtrics Module for Canadian Political Science Surveys_. GitHub repository: [https://github.com/RafaelGottardo/occupations-qualtrics](https://github.com/RafaelGottardo/occupations-qualtrics)

## License

This repository is dual-licensed to support both academic credit and open-source reuse.

- 📋 **Survey text, documentation, and Qualtrics content**: Licensed under the [Creative Commons Attribution 4.0 International License (CC BY 4.0)](https://creativecommons.org/licenses/by/4.0/).  
  Please **cite our work** if you use this module in a paper or public research project.

- 💻 **Code (JavaScript, R scripts, etc.)**: Licensed under the [MIT License](./LICENSE-MIT.txt), allowing for open-source reuse and modification.
