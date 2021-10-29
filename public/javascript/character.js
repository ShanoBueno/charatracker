async function characterFormHandler(event) {
  event.preventDefault();

  const name = document.querySelector('textarea[name="character-name"]').value.trim();
  const notes = document.querySelector('textarea[name="character-notes]').value.trim(); 

  console.log(name, notes);
}

document.querySelector('.character-form').addEventListener('submit', characterFormHandler);