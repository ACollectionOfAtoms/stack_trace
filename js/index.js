var stackList = [],
    mainQueryField = $('mainTextField');
    stackUIList = $('.list-group'),
    stackItemField = $('#stackItemField'),
    addButton = $('#addToStackList');
    addToStack = function() {
      var stackItem = stackItemField.val();
      stackList.push(stackItem);
      stackUIList.append("<li class='list-group-item'>" + stackItem + "</li>")
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
