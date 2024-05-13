$(document).ready(function () {
  let form = $('#todo-form');

  form.on('submit', function (e) {
    e.preventDefault();
    let inputValue = $('#todo-input').val();
    let inputTextContent = document.createTextNode(inputValue);
    inputValue = inputTextContent.textContent;
    inputValue = inputValue.trim();
    inputValue = inputValue.charAt(0).toUpperCase() + inputValue.slice(1);
    inputValue = inputValue.replace(/\s+/g, ' ');

    // create a li element and add the input value to it
    let li = $('<li></li>');
    li.addClass('list-group-item');
    li.append(inputValue);

    // if the input value is empty, alert the user
    if (inputValue === '') {
      return alert('Please enter a value');
    } else {
      $('#todo-list').append(li);
      // clear the input field after adding the value to the list
      $('#todo-input').val('');
    }

    // add a strike class to the list item when clicked
    li.on('dblclick', function () {
      $(this).toggleClass('strike');
    });

    // create a remove button
    let remove = $('<button></button>');
    remove.addClass('btn-danger');
    remove.text('X');
    // remove the list item when the remove button is clicked
    remove.on('click', function () {
      li.remove();
    });
    // append the remove button to the list item
    li.append(remove);

    // make the list items draggable
    li.attr("draggable", true);
    li.on("dragstart", function (event) {
      event.originalEvent.dataTransfer.setData("text/plain", li.index());
    });

    // save the todo list to local storage
    let todoListItems = $('#todo-list').children();
    let todoListArray = [];
    for (let i = 0; i < todoListItems.length; i++) {
      todoListArray.push(todoListItems[i].innerText);
    }
    localStorage.setItem('todoList', JSON.stringify(todoListArray));
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
      // Remove the dragged item and insert it at the correct position
      draggedItem.detach();
      if (index < targetIndex) {
        $(event.target).closest("li").after(draggedItem);
      } else {
        $(event.target).closest("li").before(draggedItem);
      }
    }
  });

  // retrieve the todo list from local storage
  let retrievedTodoList = JSON.parse(localStorage.getItem('todoList'));
  $('#todo-list').empty();
  let retrievedTodoListButton = $('.button');
  retrievedTodoListButton.on('click', function () {
    for (let i = 0; i < retrievedTodoList.length; i++) {
      let li = $('<li></li>');
      li.addClass('list-group-item');
      li.append(retrievedTodoList[i]);
      $('#todo-list').append(li);
      li.on('dblclick', function () {
        $(this).toggleClass('strike');
      });
      let remove = $('<button></button>');
      remove.addClass('btn-danger');
      remove.text('X');
      remove.on('click', function () {
        li.remove();
      });
      li.append(remove);
      li.attr("draggable", true);
      li.on("dragstart", function (event) {
        event.originalEvent.dataTransfer.setData("text/plain", li.index());
      });
    }
  });
});










