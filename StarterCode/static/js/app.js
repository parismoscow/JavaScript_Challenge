// from data.js
var tableData = data;

// YOUR CODE HERE!
const filter_table = d3.select("#filter-btn");
const inputField1 = d3.select("#datetime");
const tbody = d3.select("tbody");
var resetbtn = d3.select("#reset-btn");
const columns = [
  "datetime",
  "city",
  "state",
  "country",
  "shape",
  "durationMinutes",
  "comments"
];

const populate = dataInput => {
  dataInput.forEach(ufo_sightings => {
    const row = tbody.append("tr");
    columns.forEach(column => row.append("td").text(ufo_sightings[column]));
  });
};
//Populate table
populate(data);
// Complete the click handler for the form
filter_table.on("click", function() {
  // Prevent the page from refreshing
  d3.event.preventDefault();
  // Select the input element and get the raw HTML node
  // Get the value property of the input element
  const inputDate = inputField1.property("value");

  // Use the form input to filter the data by date
  const filterDate = tableData.filter(tableData => {
    return tableData.datetime === inputDate;
  });
  console.log(filterDate);

  // Add filtered sighting to table
  tbody.html("");

  let response = {
    filterDate
  };

  if (response.filterDate.length !== 0) {
    populate(filterDate);
  } else {
    tbody
      .append("tr")
      .append("td")
      .text("No results found!");
  }
});
resetbtn.on("click", () => {
  tbody.html("");
  populate(data);
  console.log("Table reset");
});
