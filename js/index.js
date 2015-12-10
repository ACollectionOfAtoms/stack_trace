var stackList = [],
    mainQuery = '',
    mainQueryField = $('mainTextField');
    stackUIList = $('.list-group'),
    stackItemField = $('#stackItemField'),
    addButton = $('#addToStackList');
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
$(document).ready( function() {
  addButton.click(function() {
    addToStack();
  });
  stackItemField.keyup(function(event){
    if(event.keyCode == 13){
      addButton.click();
    }
  });
});
