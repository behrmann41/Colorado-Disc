// var db = require('monk')('localhost/disc-courses');
// var discCourses = db.get('courses');

//var data = discCourses.find({});
$(function(){
    $.ajax({
      url: 'http://localhost:27017/disc-courses/courses',
      method: 'GET',
      dataType: 'jsonp',
      success: function (data) {
        console.log('success', data);
      },
      error: function (XMLHttpRequest, textStatus, errorThrown) {
        console.log('error test', errorThrown);
      }
    });
  });

  // var data = [4, 8, 15, 16, 23, 42];

  // var x = d3.scale.linear()
  //     .domain([0, d3.max(data)])
  //     .range([0, 420]);

  // d3.select(".chart")
  //   .selectAll("div")
  //     .data(data)
  //   .enter().append("div")
  //     .style("width", function(d) { return x(d) + "px"; })
  //     .text(function(d) { return d; });