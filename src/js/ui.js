// Add the text to the <span>...<span> element in the element with id=table-title
function updateTableTitle(title) {
  var container = document.getElementById("table-title");
  container.querySelector("span").innerHTML = title;
}

// Add the given <tr>...</tr> element to the table body element with id=rows
function addRowToTable(row) {
  document.getElementById("rows").appendChild(row);
}

// Remove all content from the table body element with id=rows
function clearAllTableRows() {
  document.getElementById("rows").innerHTML = "";
}

// Creates and returns new table row <tr> element with the specified id value.
function createTableRow(id) {
  var row = document.createElement("tr");
  row.id = id;
  return row;
}

// Given a child element, create a <td> and add this child to it. Return the <td>.
function createTableCell(child) {
  var data = document.createElement("td");
  data.appendChild(child);
  return data;
}

// Wraps a child element in a <td>...</td> and adds it to the table row
function addContentToRow(child, row) {
  var addTd = createTableCell(child);
  row.appendChild(addTd);
}

// Given a URL src string and alt text string, create an <img> element
function createImg(src, alt) {
  var image = document.createElement("img");
  image.src = src;
  image.alt = alt;
  return image;
}

// Given a string of text, create and return a TextNode
function createText(text) {
  var textNode = document.createTextNode(text);
  return textNode;
}

// create and return an anchor element.
function createAnchor(href, innerContent) {
  var anchor = document.createElement("a");
  anchor.href = href;
  var textNode = document.createTextNode(innerContent);
  anchor.appendChild(textNode);
  return anchor;
}

// Return a proper time element with its dateTime property set
function createTime(formatted) {
  var addTime = document.createElement("Time");
  addTime.dateTime = formatted;
  addTime.innerText = formatted;
  return addTime;
}

// Given a boolean value (true/false) return a string "Yes" or "No"
function toYesNo(value) {
  var string = "No";
  if (value == true) {
    string = "Yes";
  }
  return string;
}

// Converts an Observation object into DOM nodes that produce the following HTML:
//
//  <tr id="67868131">
//    <td>
//      <a href="https://www.inaturalist.org/observations/67868131">
//        <img
//          src="https://static.inaturalist.org/photos/109319291/square.jpg?1609877680"
//          alt="Muskrat">
//      </a>
//    </td>
//    <td>
//      <time datetime="2020-09-18">2020-09-18</time>
//    </td>
//    <td>
//      <a href="http://en.wikipedia.org/wiki/Muskrat">Muskrat</a>
//    </td>
//    <td>No</td>
//    <td>Yes</td>
//    <td>No</td>
//    <td>No</td>
//  </tr>
//
// Things to note in your solution:
//
// - Give the table row an id, using the observation's id
// - Create an anchor so you can click the photo and go to the observation's uri
// - Use the observation's name as the alt text of the image, and photoUrl as its src
// - Use a proper <time> element, and format the observation's date using a locale aware format, see
//   https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleDateString
// - Use the observation's wikipediaUrl to provide a link when you click the name
// - Convert all the boolean values for endangered, native, threatened, introduced to "Yes" or "No" strings
function buildRowForObservation(observation) {
  // 1. Create the row for this observation with correct id: <tr id="67868131">...</tr>
  const row = createTableRow(observation.id);

  // 2. Create the photo, make it a link to the observation page, and put it in the first cell
  // <img src="https://static.inaturalist.org/photos/109762131/square.jpg?1610308133">
  // TODO: complete the code to create an img element using the other functions
  // in this file, and assign the return value to photo.
  // const photo = ...
  const photo = createImg(observation.photoUrl, observation.name);

  //3. <a href="https://www.inaturalist.org/observations/67868131">...</a>
  const observationLink = createAnchor(observation.uri, "");
  observationLink.appendChild(photo);
  // <td>...</td>
  addContentToRow(observationLink, row);

  // 4. Create the date and put in the second cell
  //const time = createTime(observation.date.toLocaleDateString);
  const time = createTime(observation.date.toISOString().slice(0, 10));
  addContentToRow(time, row);

  // 5. Create the name with a link to its Wikipedia page in the third cell

  const wikipediaLink = createAnchor(
    observation.wikipediaUrl,
    observation.name
  );
  addContentToRow(wikipediaLink, row);

  // 4-9. Create a Yes/No text cell for each of the characteristics in the array
  ["isEndangered", "isNative", "isThreatened", "isIntroduced"].forEach(
    (characteristic) => {
      const yesNoText = toYesNo(observation[characteristic]);
      const yesNoNode = createText(yesNoText);
      addContentToRow(yesNoNode, row);
    }
  );

  return row;
}
