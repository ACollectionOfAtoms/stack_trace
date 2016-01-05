var stackList = [],
    mainQuery = '',
    mainQueryField = $('#mainTextField'),
    stackUIList = $('.list-group'),
    stackItemField = $('#stackItemField'),
    addButton = $('#addToStackList'),
    searchButton = $('#searchButton');
    addToStack = function() {
      var stackItem = stackItemField.val();
      stackList.push(stackItem);
      stackUIList.prepend("<li class='list-group-item'>" + stackItem + "</li>")
      stackItemField.val('');
    }
    getQuery = function () {
      var query = mainQueryField.val();
      mainQuery = query;
    }
    genQueries = function (str, ary) {
      var i = 0,
          queries = {};
      for (i; i < ary.length; i++) {
        var query = str + " " + ary[i],
            hits = 0;
        queries[ary[i]] = { "query": query,
                            "hits" : hits};
      };
      return queries;
    }
    startSearch = function (str) {
        var queries = genQueries(str, stackList);
        $.ajax({
          type: "POST",
          url: "/results",
          contentType: "application/json; charset=utf-8",
          data: JSON.stringify(queries),
          dataType: "json",
        });
    }
    createGraph = function() {
      var width = 960,
          height = 700,
          format = d3.format(",d"); //convert value to integer
          color = d3.scale.category20(); // create ordinal scale with 20 colors
          sizeOfRadius = d3.scale.pow().domain([-100,100]).range([-50,50]);
      var bubble = d3.layout.pack()
          .sort(null) // disable sorting, use DOM tree traversal
          .size([width, height])
          .padding(1) //padding between circles
          .radius(function(d){return 20 + (sizeOfRadius(d) * 30); });
      var svg = d3.select("#chart").append("svg")
          .attr("width", width)
          .attr("height", height)
          .attr("class", "bubble");
    }

$(document).ready(function() {
  addButton.click(function() {
    addToStack();
  });
  stackItemField.keyup(function(event){
    if(event.keyCode == 13){
      addButton.click();
    }
  });

  searchButton.click(function() {
    getQuery();
    startSearch(mainQuery);
  })

  mainQueryField.keyup(function(event){
    if(event.keyCode == 13){
      searchButton.click();
    }
  })
});
