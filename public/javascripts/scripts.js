
var path = $(location).attr('href');
var course = path.split('courses/');
coursePath = course[1];
$("#myHiddenId").val(coursePath)

$(function(){
  if (coursePath !== undefined){
    $.ajax({
      url: '/courses/' + coursePath + '/data',
      method: 'GET',
      success: function (data) {
        var input = [];
        var output = data[0].lastround
        if (output !== undefined){
          for (var i = 0; i < output.length; i++){
            input.push(Number(output[i]))
          }
          var x = d3.scale.linear()
            .domain([(d3.max(input) + 2), d3.min(input)])
            .range([0, 420]);

          d3.select(".chart")
              .selectAll("div")
              .data(input)

            .enter().append("div")
              .attr('class', 'bar')
              .style("width", function(d) { return x(d) + "px"; })
              .text(function(d) { return d; })
          if (input.length > 0){
              var mean = d3.mean(input)
              var max = d3.min(input)
              var avg = d3.select('.left').append('p')
                  .attr('class','mean')
                  .text('Your mean score on this course: ' + mean.toFixed(0))

              var best = d3.select('.mean').append('p')
                  .attr('class','max')
                  .text('Your best score on this course: ' + max)
          }
        }
      },
      error: function (XMLHttpRequest, textStatus, errorThrown) {
        console.log('error test', errorThrown);
      }
    });
  }
});

// basic working bar chart
  // var data = [4, 8, 15, 16, 23, 42];
  //   var x = d3.scale.linear()
  //     .domain([0, d3.max(input)])
  //     .range([0, 420]);

  // d3.select(".chart")
  //   .selectAll("div")
  //     .data(input)
  //   .enter().append("div")
  //     .style("width", function(d) { return x(d) + "px"; })
  //     .text(function(d) { return d; });

// current attempt at vertical bar chart

      // var margin = {top: 20, left: 10, right: 10, bottom: 20},
      //   width = 700 - margin.left - margin.right,
      //   height = 500 - margin.top - margin.bottom,
      //   barPadding = 0.2;

      // var y = d3.scale.linear()
      //   .range([height, 0]);

      // var x = d3.scale.ordinal()
      //   .rangeRoundBands([0, 100], .2);

      // var xAxis = d3.svg.axis()
      //   .scale(x)
      //   .orient("bottom")
      //   .ticks(input.length);

      // var yAxis = d3.svg.axis()
      //   .scale(y)
      //   .orient("left")

      // var svg = d3.select('.chart').append('svg')
      //               .attr("width", width + margin.left + margin.right)
      //               .attr("height", height + margin.top + margin.bottom)
      //             .append("g")
      //               .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
      // x.domain([0,input.length]);
      // y.domain([0,d3.max(input)]);

      // svg.append("g")
      //     .attr("class", "x axis")
      //     .attr("transform", "translate(0," + height + ")")
      //     .call(xAxis);

      // svg.append("g")
      //     .attr("class", "y axis")
      //     .call(yAxis)

      // svg.selectAll(".bar")
      //     .data(input)
      //   .enter().append("rect")
      //     .attr("class", "bar")
      //     .attr("width", x.rangeBand())
      //     .attr('x', function(d) { return x(d)})
      //     .attr("y", function(d) { return y(d); })
      //     .attr("height", function(d) { return height - y(d); })
      //     .text(function(d) { return d; });
