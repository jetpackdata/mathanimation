// set the dimensions and margins of the graph
var margin = {top: 20, right: 20, bottom: 30, left: 50},
    width = 800 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

// x and y ranges
var x = d3.scaleLinear().range([0,width]);
var y = d3.scaleLinear().range([height, 0]);

// The line
var line = d3.line()
    .x(function(d) { return x(d.x); })
    .y(function(d) { return y(d.y); });

// x axis - gridlines
function gridX() {		
    return d3.axisBottom(x)
    .ticks(20)
}

// y axis - gridlines
function gridY() {		
    return d3.axisLeft(y)
    .ticks(20)
}


// adds svg element
var svg =   d3
            .select("#chart").append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
                .attr("transform",
                "translate(" + margin.left + "," + margin.top + ")");

var data = [
    {
        'x': 2,
        'y': 10    
    },
    {
        'x': 2,
        'y': 10    
    }
];

var absX = Math.abs(d3.max(data, function(d) { return d.x; })),
absY = Math.abs(d3.max(data, function(d) { return d.y; }));

x.domain([-d3.max([absX,absY]),d3.max([absX,absY])]);
y.domain([-d3.max([absX,absY]),d3.max([absX,absY])]);


// add the X gridlines to the svg
svg.append("g")			
    .attr("class", "grid")
    .attr("transform", "translate(0," + height + ")")
    .call(gridX()
        .tickSize(-height)
        .tickFormat("")
    )

// add the Y gridlines to the svg
svg.append("g")			
    .attr("class", "grid")
    .call(gridY()
        .tickSize(-width)
        .tickFormat("")
    )

// add the X Axis
svg.append("g")
    .attr("transform", "translate(0," + height/2 + ")")
    .call(d3.axisBottom(x));

// add the Y Axis
svg.append("g")
    .attr("transform", "translate(" + width/2 + ",0)")
    .call(d3.axisLeft(y));


// // Get the data
// d3.csv("data.csv", function(error, data) {
//   if (error) throw error;

//   // format the data
//   data.forEach(function(d) {
//       d.date = parseTime(d.date);
//       d.close = +d.close;
//   });

//   // Scale the range of the data
//   x.domain(d3.extent(data, function(d) { return d.date; }));
//   y.domain([0, d3.max(data, function(d) { return d.close; })]);

//   // add the X gridlines
//   svg.append("g")			
//       .attr("class", "grid")
//       .attr("transform", "translate(0," + height + ")")
//       .call(make_x_gridlines()
//           .tickSize(-height)
//           .tickFormat("")
//       )

//   // add the Y gridlines
//   svg.append("g")			
//       .attr("class", "grid")
//       .call(make_y_gridlines()
//           .tickSize(-width)
//           .tickFormat("")
//       )

//   // add the valueline path.
//   svg.append("path")
//       .data([data])
//       .attr("class", "line")
//       .attr("d", valueline);

//   // add the X Axis
//   svg.append("g")
//       .attr("transform", "translate(0," + height + ")")
//       .call(d3.axisBottom(x));

//   // add the Y Axis
//   svg.append("g")
//       .call(d3.axisLeft(y));

// });