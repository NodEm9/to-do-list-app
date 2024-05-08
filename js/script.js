let form = $('#todo-form');

form.on('submit', function (e) {
  e.preventDefault();
  let inputValue = $('#todo-input').val();
  let li = $('<li></li>');
  li.append(inputValue);
  
  // if the input value is empty, alert the user
  if (inputValue === '') {
    return alert('Please enter a value');
  } else {
    $('#todo-list').append(li);
  }

  // clear the input field after adding the value to the list
  $('#todo-input').val('');

  // add a strike class to the list item when clicked
  li.on('click', function () {
    $(this).toggleClass('strike');
  });

  let remove = $('<button class="btn-danger">Remove</button>');
  // remove the list item when the remove button is clicked
  remove.on('click', function () {
    li.remove();
  });
  // append the remove button to the list item
  li.append(remove);

  // addd functionality to sort the list items
  $('#todo-list').sortable();
  if($('#todo-list').children().length > 0){
    $('#todo-list').css('border', '1px solid #ccc');
  }
});








// form.on('submit', function (e) {
//     e.preventDefault();
//     let value = input.val();
//     if (value) {
//         let todo = $('<li class="list-group-item "></li>').text(value);
//       let remove = $('<button class="btn btn-danger btn-sm">Remove</button>');
//         todo.each(function () {
//             $(this).on('click', function () {
//                 $(this).toggleClass('done');
//             });
//         });
//         remove.on('click', function () {
//             todo.remove();
//         });
//         ul.append(todo);
//         ul.append(remove);
//         input.val('');
//     }
// })


