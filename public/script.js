console.log('Script loaded');
// Function to handle editing a note
function editNote(id) {
    var noteText = document.getElementById('text-' + id);
    var currentText = noteText.innerText;

    // Check if an input element already exists for this note and remove it
    var existingInput = document.getElementById('input-' + id);
    if (existingInput) {
        existingInput.parentNode.removeChild(existingInput);
    }

    // Create and add a new input element
    var inputElement = document.createElement('input');
    inputElement.setAttribute('type', 'text');
    inputElement.setAttribute('id', 'input-' + id);
    inputElement.setAttribute('value', currentText);
    inputElement.classList.add('note-input');
    noteText.innerHTML = '';
    noteText.appendChild(inputElement);

    // Create and add a "Save" button
    var saveButton = document.createElement('button');
    saveButton.textContent = 'Save';
    saveButton.classList.add('btn', 'btn-small', 'btn-success', 'edit-button');
    saveButton.onclick = function () {
        submitEdit(id);
    };
    noteText.appendChild(saveButton);
}

// Function to handle submitting edited note
function submitEdit(id) {
    var updatedText = document.getElementById('input-' + id).value;

    fetch('/edit/note/' + id, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ note: updatedText })
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        document.getElementById('text-' + id).innerText = updatedText;
        // Remove the input and save button after saving
        var inputElement = document.getElementById('input-' + id);
        var saveButton = document.querySelector('#text-' + id + ' .edit-button');
        if (inputElement) {
            inputElement.remove();
        }
        if (saveButton) {
            saveButton.remove();
        }
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}

// Function to handle deleting a note
function deleteNote(id) {
    fetch('/delete/note/' + id, { method: 'GET' })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            var item = document.getElementById('item-' + id);
            item.parentNode.removeChild(item);
        } else {
            console.error('Failed to delete note:', data.error);
        }
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}
