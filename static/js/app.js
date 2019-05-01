// from data.js
var tableData = data;

// YOUR CODE HERE!
const filter_table = d3.select("#filter-btn");
const inputField1 = d3.select("#datetime");
const inputField2 = d3.select("#city");
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
  const inputDate = inputField1.property("value").toLowerCase();
  const inputCity = inputField2.property("value").toLowerCase();

  // Use the form input to filter the data by date
  const filterDate = tableData.filter(tableData => {
    return tableData.datetime === inputDate;
  });
  console.log(filterDate);

  const filterCity = tableData.filter(tableData => {
    return tableData.city === inputCity;
  });
  console.log(filterCity);
  // Add filtered sighting to table
  tbody.html("");

  let multiple = {
    filterDate,
    filterCity
  };

  if (multiple.filterDate.length !== 0) {
    populate(filterDate);
  } else if (
    multiple.filterDate.length === 0 &&
    (multiple.filterCity.length !== 0 || multiple.filterDate.length !== 0)
  ) {
    populate(filterCity) || populate(filterDate);
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
