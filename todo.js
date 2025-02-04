var add = document.getElementById('addToDo');
var input = document.getElementById('inputField');
var toDoContainer = document.querySelector('.to-dos'); // Changed to target the correct container

add.addEventListener('click', addItem);
input.addEventListener('keypress', function(e) {
    if (e.key == "Enter") {
        addItem();
    }
});

function addItem() {
    const item_value = input.value.trim();
    if (item_value === "") return;

    const item = document.createElement('div');
    item.classList.add('item');

    const input_item = document.createElement('input');
    input_item.classList.add('text');
    input_item.type = 'text';
    input_item.value = item_value;
    input_item.setAttribute('readonly', 'readonly');

    input_item.addEventListener('dblclick', function() {
        input_item.style.textDecoration = input_item.style.textDecoration === "line-through" ? "none" : "line-through";
    });

    const item_action = document.createElement('div');
    item_action.classList.add('actions');

    const edit_item = document.createElement('button');
    edit_item.classList.add('edit', 'btn', 'btn-warning');
    edit_item.innerText = 'Edit';

    const delete_item = document.createElement('button');
    delete_item.classList.add('delete', 'btn', 'btn-danger');
    delete_item.innerHTML = '<i class="fa fa-trash"></i>'; // Proper icon inside button

    item_action.appendChild(edit_item);
    item_action.appendChild(delete_item);
    
    item.appendChild(input_item);
    item.appendChild(item_action);
    toDoContainer.appendChild(item);

    input.value = '';

    edit_item.addEventListener('click', () => {
        if (edit_item.innerText.toLowerCase() == "edit") {
            edit_item.innerText = "Save";
            input_item.removeAttribute("readonly");
            input_item.focus();
        } else {
            edit_item.innerText = "Edit";
            input_item.setAttribute("readonly", "readonly");
        }
    });

    delete_item.addEventListener('click', () => {
        item.remove(); // More efficient way to remove item
    });
}
