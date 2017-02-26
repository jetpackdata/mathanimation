var mathAnimationApp = angular.module('mathAnimationApp',  []);

mathAnimationApp.config(function($interpolateProvider) {
    $interpolateProvider.startSymbol('[[');
    $interpolateProvider.endSymbol(']]');
});

mathAnimationApp.factory('Vector2DFunctions',function(){
    var vector2DFunc =  {}
    vector2DFunc.setupGrid = function(data){

        // set the dimensions and margins of the graph
        var margin = {top: 20, right: 20, bottom: 30, left: 20},
            width = 780 - margin.left - margin.right,
            height = 500 - margin.top - margin.bottom;

        // x and y ranges
        var x = d3.scaleLinear().range([0,width]);
        var y = d3.scaleLinear().range([height, 0]);
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


        var svg = (((d3.select('svg')||{})['_groups']||[])[0]||[])[0];

        if(!svg){
            // adds svg element
            svg =   d3
                .select("#chart").append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .append("g")
                    .attr("transform",
                    "translate(" + margin.left + "," + margin.top + ")");
            
            svg.append("g")			
            .attr("class", "x-grid")
            .attr("transform", "translate(0," + height + ")");

            svg.append("g")			
            .attr("class", "y-grid");

            // add the X Axis
            svg.append("g")
                .attr("class", "x-axis")
                .attr("transform", "translate(0," + height/2 + ")")

            // add the Y Axis
            svg.append("g")
                .attr("class", "y-axis")
                .attr("transform", "translate(" + width/2 + ",0)")
        }
        else{
            svg = d3.select('svg');
        }
        


        var absX = Math.abs(d3.max(data, function(d) { return d.x; })+2),
        absY = Math.abs(d3.max(data, function(d) { return d.y; })+2);

        x.domain([-absX,absX]);
        y.domain([-absY,absY]);


        // add the X gridlines to the svg
            svg.select('.x-grid')
            .call(gridX()
                .tickSize(-height)
                .tickFormat("")
            )

        // add the Y gridlines to the svg
        svg.select('.y-grid')
            .call(gridY()
                .tickSize(-width)
                .tickFormat("")
            )

        // add the X Axis
        svg.select('.x-axis')
            .call(d3.axisBottom(x));

        // add the Y Axis
         svg.select('.y-axis')
            .call(d3.axisLeft(y));
            

    };

    vector2DFunc.drawLine = function(data){
        var svg = d3.select('svg').select('g');

        // set the dimensions and margins of the graph
        var margin = {top: 20, right: 20, bottom: 30, left: 20},
            width = 780 - margin.left - margin.right,
            height = 500 - margin.top - margin.bottom;

        // x and y ranges
        var absX = Math.abs(d3.max(data, function(d) { return d.x; })+2),
        absY = Math.abs(d3.max(data, function(d) { return d.y; })+2);

        var x = d3.scaleLinear().domain([-absX,absX]).range([0,width]);
        var y = d3.scaleLinear().domain([-absY,absY]).range([height, 0]);

        // The line
        var lineFunc = d3.line()
            .x(function(d) { 
                console.log(d.x);
                return x(d.x); 
            })
            .y(function(d) { 
                console.log(d.y);
                return y(d.y); 
            });
            
        // svg.append("path")
        // .data([data])
        // .attr("class", "line")
        // .attr("d", line);
        
        var circles = svg.selectAll('circle').data(data);

        circles.enter()
        .append('circle')
        .attr("cx", function(d) { return x(0); })
        .attr("cy", function(d) { return y(0); })
        .attr("r", 6)
        .transition()
        .duration(500)
        .attr("cx", function(d,i) { return x(d.x); })
        .attr("cy", function(d) { return y(d.y); });

        var color = d3.scaleOrdinal(d3.schemeCategory10);

        circles
        .transition()
        .duration(500)
        .attr("cx", function(d,i) { return x(d.x); })
        .attr("cy", function(d) { return y(d.y); })
        .attr("r", 6)
        .style("fill", function(d,i) { return color(i); });

        circles
        .exit()
        .remove();

        d3.selectAll('.form-horizontal')
        .style("background-color", function(d,i) { return color(i); });


        var line_groups= svg.selectAll('.lines')
                        .data(data),

        individualLines = line_groups
            .enter()
            .append('g')
            .attr('class',function(d,i){return "line-group_" + i+ ' lines';});
        
        var line_from_origin = [];
        individualLines
        .append("path")
        .classed("line", true)
        .style("stroke", function (d, i) {
            return color(i);
        })
        .attr("fill", "none")
        .attr("stroke-width", 4.8)
        .attr("stroke-opacity", 0.0001)
        .transition()
        .duration(500)
        .attr("stroke-opacity", 1)
        .attr("stroke-width", 2.8)
        .attr("d", function(d,i){
            line_from_origin = [
                {
                    x:0,
                    y:0
                },
                {
                    x:0,
                    y:0
                }
            ];
            return lineFunc(line_from_origin);
        });

        //update selection
        line_groups
        .select('.line')
        .style("stroke", function (d, i) {
            return color(i);
        })
        .transition()
        .duration(500)
        .attr("stroke-opacity", 1)
        .attr("stroke-width", 2.8)
        .attr("d", function(d,i){
            line_from_origin = [
                {
                    x:0,
                    y:0
                },
                d
            ]
            return lineFunc(line_from_origin);
        });
        
            
        //exit selection
        line_groups.exit().remove()




    };
    return vector2DFunc;
});

mathAnimationApp.controller('Vector2DController', ['$location','Vector2DFunctions',function ($location,Vector2DFunctions) {

  console.log($location);
  
  var self= this;
  self.coord = [
      {
          x: 0,
          y: 0
      },
      {
          x: 0,
          y: 0
      },
      {
          x: 0,
          y: 0
      },

  ]


  self.updateLine = function(lineNum){
      Vector2DFunctions.setupGrid(self.coord);
      Vector2DFunctions.drawLine(self.coord);
  }

  for(var i=0;i<1;i++){
      self.updateLine(i+1);
  }
}]);


