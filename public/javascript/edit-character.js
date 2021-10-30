 async function characterEditFormHandler(event) {
  event.preventDefault();

  const name = document.querySelector('h3[name="char-name"]').value.trim(); 
  const notes = document.querySelector('textarea[name="char-update"]').value.trim(); 
  const book_id = document.querySelector('input[name="book-edit-id"] ').value.trim(); 
  const id = document.querySelector('input[name="char-edit-id"]').value.trim(); 

  if (name && notes) {
    
    const response = await fetch('/api/characters/${id}', {
      method: 'PUT',
      body: JSON.stringify({
        name, 
        notes,
        book_id,
        id
      }),
      headers: { 'Content-Type': 'application/json' }
    });

    if (response.ok) {
      window.location.reload(true)
    } else {
      alert(response.statusText);
    }
  }
}


document.querySelector('.edit-form').addEventListener('submit', characterEditFormHandler);