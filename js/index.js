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
        queries[ary[i]] = { "query": str + " " + ary[i],
                            "hits" : 0};
      };
      return queries;
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
    p = genQueries(mainQuery, stackList);
  })
  mainQueryField.keyup(function(event){
    if(event.keyCode == 13){
      searchButton.click();
    }
  })
});
