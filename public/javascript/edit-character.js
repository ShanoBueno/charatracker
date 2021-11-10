async function characterEditFormHandler(event) {
  event.preventDefault();

  const characters = [];
  const allEditForms = document.querySelectorAll(".edit-form");
  allEditForms.forEach((singleForm) => {
    const name = singleForm
      .querySelector('input[name="char-name"]')
      .value.trim();
    const notes = singleForm
      .querySelector('textarea[name="char-update"]')
      .value.trim();
    const book_id = singleForm
      .querySelector('input[name="book-edit-id"] ')
      .value.trim();
    const id = singleForm
      .querySelector('input[name="char-edit-id"]')
      .value.trim();
    //debugger
    //create an array of character objects
    characters.push({notes, book_id, id, name});

    if (name && notes) {
      fetch(`/api/characters/${id}`, {
        method: "PUT",
        body: JSON.stringify({
          name,
          notes,
          book_id,
          id,
        }),
        headers: { "Content-Type": "application/json" },
      })
      .then(response => {
        if (!response.ok){
          //collect all the response
          //display them later
          console.log(response.statusText)
        }
      })
      
      /*
      if (response.ok) {
      } else {
        alert(response.statusText);
      }
      */
    }
  });

  console.log(characters)

  //const characters = this.children;
  //debugger;

  //   var characters = this.children
  //  for (var i = 0; i < characters.length; i++){

  //   const name = document.querySelector('input[name="char-name"]').value.trim();
  //   const notes = document.querySelector('textarea[name="char-update"]').value.trim();
  //   const book_id = document.querySelector('input[name="book-edit-id"] ').value.trim();
  //   const id = document.querySelector('input[name="char-edit-id"]').value.trim();

  //   if (name && notes) {

  //     const response = await fetch(`/api/characters/${id}`, {
  //       method: 'PUT',
  //       body: JSON.stringify({
  //         name,
  //         notes,
  //         book_id,
  //         id
  //       }),
  //       headers: { 'Content-Type': 'application/json' }
  //     });

  //     if (response.ok) {

  //     } else {
  //       alert(response.statusText);
  //     }
  //   }
  //   }
}

const allButtons = document.querySelectorAll(".save");
allButtons.forEach((singleButton) => {
  singleButton.addEventListener("click", characterEditFormHandler);
});

/*
document
  .getElementById("parent-list")
  .addEventListener("click", characterEditFormHandler);
*/