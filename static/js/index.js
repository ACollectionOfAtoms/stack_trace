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
      d3.json("/data", function(error, queries) {
          console.log("We tried");
          var node = svg.selectAll('.node')
                 .data(bubble.nodes(queries)
                 .filter(function(d) { return !d.children; }))
                 .enter().append('g')
                 .attr('class', 'node')
                 .attr('transform', function(d) { return 'translate(' + d.x + ',' + d.y + ')'});

          node.append('circle')
              .attr('r', function(d) {return d.r;})
              .style('fill', function(d) { return color(d.query); });

          node.append('text')
              .attr("dy", ".3em")
              .style('text-anchor', 'middle')
              .text(function(d) {return d.query; });
              // tooltip config
              var tooltip = d3.select("body")
                .append("div")
                .style("position", "absolute")
                .style("z-index", "10")
                .style("visibility", "hidden")
                .style("color", "white")
                .style("padding", "8px")
                .style("background-color", "rgba(0, 0, 0, 0.75)")
                .style("border-radius", "6px")
                .style("font", "12px sans-serif")
                .text("tooltip");

              node.append("circle")
              .attr("r", function(d) { return d.r; })
              .style('fill', function(d) { return color(d.query); })

              .on("mouseover", function(d) {
                tooltip.text(d.name + ": $" + d.hits);
                tooltip.style("visibility", "visible");
              })
              .on("mousemove", function() {
                return tooltip.style("top", (d3.event.pageY-10)+"px").style("left",(d3.event.pageX+10)+"px");
              })
              .on("mouseout", function(){return tooltip.style("visibility", "hidden");});
        });
    };

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
    createGraph();
  });

  mainQueryField.keyup(function(event){
    if(event.keyCode == 13){
      searchButton.click();
    }
  });
});
