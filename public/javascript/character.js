async function characterFormHandler(event) {
  event.preventDefault();

  const name = document.querySelector('textarea[name="character-name"]').value.trim();
  const notes = document.querySelector('textarea[name="character-notes"]').value.trim(); 
  const book_id = document.querySelector('input[name="book_id"] ').value.trim(); 

  if (name && notes) {
    
    const response = await fetch('/api/characters', {
      method: 'post',
      body: JSON.stringify({
        name, 
        notes,
        book_id
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


document.querySelector('.character-form').addEventListener('submit', characterFormHandler);