var stackList = [],
    stackUIList = $('.list-group'),
    stackItem = $('#stackItemField');
    addButton = $('#addToStackList');
$(document).ready( function() {
  addButton.click(function() {
    var stackItemVal = stackItem.val();
    stackList.push(stackItemVal);
    stackUIList.append("<li class='list-group-item'>" + stackItemVal + "</li>")
  });
});
