async function bookFormHandler(event) {
  event.preventDefault();

  const title = document.querySelector('textarea[name="book-title"]').value.trim();

 if (title) {
    const response = await fetch('/api/books', {
      method: 'post',
      body: JSON.stringify({
        title
      }),
      headers: { 'Content-Type': 'application/json' }
    });

    if (response.ok) {
      document.location.replace('/');
    } else {
      alert(response.statusText);
    }
  }
  
}

document.querySelector('.book-form').addEventListener('submit', bookFormHandler);