async function characterFormHandler(event) {
  event.preventDefault();

  const name = document.querySelector('textarea[name="character-name"]').value.trim();
  const notes = document.querySelector('textarea[name="character-notes]').value.trim(); 

  const book_id = window.location.toString().split('/')[
    window.location.toString().split('/').length - 1
  ];

  console.log(name, notes, book_id);
}

document.querySelector('.comment-form').addEventListener('submit', commentFormHandler);