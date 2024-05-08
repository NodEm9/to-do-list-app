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

});









