$(document).ready(function(){
  let form = $("#todo-form");

  form.on("submit", function (e) {
    e.preventDefault();
    let inputValue = $("#todo-input").val();
    let li = $("<li></li>");
    li.append(inputValue);
  
    // if the input value is empty, alert the user
    if (inputValue === "") {
      return alert("Please enter a value");
    } else {
      $("#todo-list").append(li);
  
      // clear the input field after adding the value to the list
      $("#todo-input").val("");
    }
  
    // add a strike class to the list item when clicked
    li.on("dblclick", function () {
      $(this).toggleClass("strike");
    });
  
    // create a remove button
    let remove = $("<button></button>");
    remove.addClass("btn-danger");
    remove.text("X");
    // remove the list item when the remove button is clicked
    remove.on("click", function () {
      li.remove();
    });
    // append the remove button to the list item
    li.append(remove);
  
    // madle the list item draggable
    li.attr("draggable", true)
    li.on("dragstart", function (event) { 
      event.originalEvent.dataTransfer.setData("text/plain", li.index());
    });
  });
  
    // make the list droppable
    let todoList = document.getElementById("todo-list");
    todoList.addEventListener("dragover", function (event) {
      event.preventDefault();
    });
    todoList.addEventListener("drop", function (event) {
      event.preventDefault();
      let index = event.dataTransfer.getData("text/plain");
      let draggedItem = $("#todo-list li").eq(index);
      let targetIndex = $(event.target).closest("li").index(); 

      if (index !== targetIndex.toString()) {
        // remove the dragged item and insert it at thr correct position
        draggedItem.detach();
        if (index < targetIndex) {
          $(event.target).closest("li").after(draggedItem);
        } else {
          $(event.target).closest("li").before(draggedItem);
        }
      }
    });
});










