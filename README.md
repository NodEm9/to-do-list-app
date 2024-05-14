# Simple Todo Application

**This** app is a simple todo application project build as one of my school Achievement task. 

#### About This App:
To use the app is no different from any other todo app, although I tried to implement modern UI patterns that will give users fair enough user experience when they decide to use the todo application. Features such as ability to edit and delete added todo are a few.

The cool part is users can not just add a todo but will be able to save the todo to their browser's local storage where they are able to retrieve it later to either ``Edit`` or ``Delete`` it enitrely if the todo was already completed. As for the edit todo, user will be prompted with a ``Modal`` that altomatically retrieve the content of the todo and give user the ability to make changes and click the save button to confirm upon completion, the specific todo is then updated and save to the local storage.

Another cool feature is the ``ability to sort the list items by dragging up and down`` to reorder the list as the user sees fit.

 The to-do list also has a checkbox to mark a ``To-do Item`` for deletion. The app also check if the box is checked before proceeding to deleting the todo, if not the user is alerted that they need to check the box before they can proceed. If the box is checked and the user clicks the delete button, the app alerts once again to warn user to comfrim if they are sure about the action they are about to carry out, if they click ok the item is ``removed`` from the local storage and if they click cancel the action is ``aborted``.

 ## Tech Stack

 - HMTL
 - CSS
 - jQuery
