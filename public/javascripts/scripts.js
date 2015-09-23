
var path = $(location).attr('href');
var course = path.split('courses/');
coursePath = course[1];
$("#myHiddenId").val(coursePath)

$(function(){

  $.ajax({
    url: '/courses/' + coursePath + '/data',
    method: 'GET',
    success: function (data) {
      console.log('success', data[0].lastround)
      var input = [];
      var output = data[0].lastround
      for (var i = 0; i < output.length; i++){
        input.push(Number(output[i]))
      }
      console.log(input);
      var x = d3.scale.linear()
          .domain([0, d3.max(input)])
          .range([0, 420]);

      d3.select(".chart")
        .selectAll("div")
          .data(input)
        .enter().append("div")
          .style("width", function(d) { return x(d) + "px"; })
          .text(function(d) { return d; });
    },
    error: function (XMLHttpRequest, textStatus, errorThrown) {
      console.log('error test', errorThrown);
    }
  });
});

  // var data = [4, 8, 15, 16, 23, 42];
