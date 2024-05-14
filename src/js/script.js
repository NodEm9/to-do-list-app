$(document).ready(function () {
  let form = $("#todo-form");

  form.on("submit", function (e) {
    e.preventDefault();
    let inputValue = $("#todo-input").val();
    inputValue = inputValue.trim();
    inputValue = inputValue.charAt(0).toUpperCase() + inputValue.slice(2);
    inputValue = inputValue.replace(/\s+/g, " ");

    // create a li element and add the input value to it
    let li = $("<li></li>");

    // if the input value is empty, alert the user
    if (inputValue === "") {
      return alert("Please enter a value");
    } else {
      $("#todo-list").append(li);
      // clear the input field after adding the value to the list
      $("#todo-input").val("");
    }

    // mark the list item as completed when double clicked
    let checkbox = $("<input></input>");
    checkbox.attr("type", "checkbox");
    checkbox.attr("id", "checkbox");
    checkbox.attr("class", "checkbox");
    checkbox.prependTo(li);
    checkbox.on("click", function () {
      li.toggleClass("strike");
    });

    // add a strike class to the list item when clicked
    li.on("dblclick", function () {
      $(this).toggleClass("strike");
    });

    // create a buttons container
    let btnContainer = $("<div></div>");

    // create edit todo button
    let edit = $("<button></button>");
    edit.addClass("btn-primary");
    edit.text("Edit");

    // create a remove button
    let remove = $("<button></button>");
    remove.addClass("btn-danger");
    remove.text("Delete");
    // remove the list item when the remove button is clicked
    remove.on("click", function () {
      if (!checkbox.prop("checked")) {
        // alert the user to mark the task as completed before deleting it
        alert("Please mark the task as completed before deleting it");
      } else if (checkbox.prop("checked")) {
        // confirm the deletion of the task
        if (confirm("Are you sure you want to delete this task?") === true) {
          li.remove();
          localStorage.removeItem("todoList", JSON.stringify(inputValue));
        }

      } else {
        // create an AbortController instance to handle the abort signal
        AbortController();
      }
    });

    // append the remove and edit button to the list item
    btnContainer.append(edit);
    btnContainer.append(remove);

    // make the list items draggable
    li.attr("draggable", true);
    li.on("dragstart", function (event) {
      event.originalEvent.dataTransfer.setData("text/plain", li.index());
    });

    // save the todo list to local storage
    let todoListItems = $("#todo-list li");
    let todoListArray = [];
    for (let i = 0; i < todoListItems.length; i++) {
      if (i === todoListItems.length - 1) {
        todoListArray.push(inputValue);
      } else {
        todoListArray.push(todoListItems[i].innerText.slice(0, -10));
      }
    }
    localStorage.setItem("todoList", JSON.stringify(todoListArray));
    li.append(inputValue);
    li.append(btnContainer);
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
  let retrievedTodoList = JSON.parse(localStorage.getItem("todoList"));
  // $("#todo-list").empty();
  let retrievedTodoListButton = $(".button");
  retrievedTodoListButton.on("click", function () {
    for (let i = 0; i < retrievedTodoList.length; i++) {
      let li = $("<li></li>");
      li.append(retrievedTodoList[i]);
      $("#todo-list").append(li);
      li.on("dblclick", function () {
        $(this).toggleClass("strike");
      });

      // mark the list item as completed when double clicked
      let checkbox = $("<input></input>");
      checkbox.attr("type", "checkbox");
      checkbox.attr("id", "checkbox");
      checkbox.attr("class", "checkbox");
      checkbox.prependTo(li);
      checkbox.on("click", function () {
        li.toggleClass("strike");
      });

      // create a buttons container
      let btnContainer = $("<div></div>");

      // create edit todo button
      let edit = $("<button></button>");
      edit.addClass("btn-primary");
      edit.text("Edit");

      // create a remove button
      let remove = $("<button></button>");
      remove.addClass("btn-danger");
      remove.text("Delete");
      // remove the list item when the remove button is clicked
      remove.on("click", function () {
        if (!checkbox.prop("checked")) {
          alert("Please mark the task as completed before deleting it");

        } else if (checkbox.prop("checked")) {
          // confirm the deletion of the task
          if (confirm("Are you sure you want to delete this task?") === true) {
            li.remove();
            localStorage.removeItem("todoList", JSON.stringify(retrievedTodoList[0]));
          }
          
        } else {
          //call the AbortController instance to handle the abort signal
          AbortController();
          location.replace(location.href.split('#')[0]);
        }
      });

      edit.on("click", function () {
        let modal = $("<div></div>");
        modal.addClass("modal");
        modal.attr("id", "edit-modal");

        let modalHeader = $("<div></div>");
        modalHeader.addClass("modal-header");
        let modalTitle = $("<h2></h2>");
        modalTitle.text("Edit Todo");

        let modalBody = $("<div></div>");
        modalBody.addClass("modal-body text-center");
        let modalContent = $("<div></div>");
        modalContent.addClass("modal-content");
        let modalFooter = $("<div></div>");
        modalFooter.addClass("modal-footer");

        let close = $("<span></span>");
        close.addClass("close");
        close.text("X");

        let editInput = $("<input></input>");
        editInput.attr("type", "text");
        editInput.attr("id", "edit-input");
        editInput.val(li.text().slice(0, -10));

        // create a save button
        let save = $("<button></button>");
        save.addClass("btn-primary");
        save.text("Save");

        modalHeader.append(modalTitle);
        modalHeader.append(close);
        modalBody.append(editInput);
        modalFooter.append(save);
        modalContent.append(modalHeader);
        modalContent.append(modalBody);
        modalContent.append(modalFooter);
        modal.append(modalContent);
        $("body").append(modal);

        $("#edit-modal").css("display", "block");
        // close the modal when the close button is clicked
        close.on("click", function () {
          $("#edit-modal").css("display", "none");
        });

        // save the edited value to the list item when the save button is clicked
        save.on("click", function () {
          let editedValue = $("#edit-input").val();
          editedValue = editedValue.trim();
          editedValue = editedValue.charAt(0).toUpperCase() + editedValue.slice(1);
          editedValue = editedValue.replace(/\s+/g, " ");
          let editedItem = $("#edit-input").val();
          let editedItemIndex = $("#todo-list li").index(li);
          let todoListItems = $("#todo-list li");
          let todoListArray = [];
          for (let i = 0; i < todoListItems.length; i++) {
            if (i === editedItemIndex) {
              todoListArray.push(editedItem);
            } else {
              todoListArray.push(todoListItems[i].innerText.slice(0, -10));
            }
          }
          localStorage.setItem("todoList", JSON.stringify(todoListArray));
          li.text(editedValue);
          li.append(btnContainer);
          $("#edit-modal").css("display", "none");
        });
        // close the modal when click outside the modal
        modal.on("click", function (event) {
          if (event.target === modal[0]) {
            modal.css("display", "none");
          }
        });

        // close the modal when the escape key is pressed
        window.addEventListener("keydown", function (event) {
          if (event.key === "Escape") {
            modal.css("display", "none");
          }
        });
      });

      // append the remove and edit button to the list item

      btnContainer.append(edit);
      btnContainer.append(remove);
      li.append(btnContainer);

      // make the list items draggable
      li.attr("draggable", true);
      li.on("dragstart", function (event) {
        event.originalEvent.dataTransfer.setData("text/plain", li.index());
      });
    }
  });
});










