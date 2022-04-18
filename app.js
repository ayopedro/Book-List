//Book constructor
function Book(title, author, isbn){
  this.title = title;
  this.author = author;
  this.isbn = isbn;
};

//UI constructor
function UI(){};

UI.prototype.addBookToList = function(book){
  const list = document.getElementById('book-list');
  //create tr element
  const row = document.createElement('tr');
  //Insert columns
  row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href="#" class="delete">🗑</a></td>
  `;

  list.appendChild(row);
}

//Show Alert
UI.prototype.showAlert = function(message, className){
  //Create a div
  const div = document.createElement('div');
  //add class name
  div.className = `alert ${className}`;
  //add text
  div.appendChild(document.createTextNode(message));
  //Get  Parent
  const container = document.querySelector('.container');
  //Get form
  const form = document.querySelector('#book-form');
  //Insert Alert
  container.insertBefore(div, form);
  //set  timeout
  setTimeout(function(){
    document.querySelector('.alert').remove();
  }, 3000);
}
//delete book
UI.prototype.deleteBook = function(target){
  if(target.className === 'delete'){
    target.parentElement.parentElement.remove();
  }
}
//Clear fields function
UI.prototype.clearFields = function(){
  document.getElementById('title').value = "";
  document.getElementById('author').value = "";
  document.getElementById('isbn').value = '';
}
//Add event listeners

//event listener for add book
document.getElementById('book-form').addEventListener('submit', function(e){
  //get form values
  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const isbn = document.getElementById('isbn').value;

  //Instansiate the book
  const book = new Book(title, author, isbn);

  //Instantiate UI
  const ui = new UI();

  //Validate
  if(title === '' || author === '' || isbn === ''){
    //Show error
    ui.showAlert('Please fill in all fields', 'error');
  } else {
    //Add book to list
    ui.addBookToList(book);
    //show success
    ui.showAlert('Your entry has been added successfully!', 'success');

    //clear fields
    ui.clearFields();
  }
  e.preventDefault();
});

//Event listener for delete
document.getElementById('book-list').addEventListener('click', function(e){

  //Instantiate UI
  const ui = new UI();

  //delete book
  ui.deleteBook(e.target);

  //show message
  ui.showAlert('Delete Complete!', 'success');

  e.preventDefault();
})
