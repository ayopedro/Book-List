class Book {
  constructor(title, author, isbn){
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}


class UI {
  addBookToList(book){
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
  };
  showAlert(message, className){
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
  };
  deleteBook(target){
    if(target.className === 'delete'){
      target.parentElement.parentElement.remove();
    }
  };
  clearFields(){
    document.getElementById('title').value = "";
    document.getElementById('author').value = "";
    document.getElementById('isbn').value = '';
  }
}

//Local storage class
class Store {
  static getBooks(){
    let books;
    if(localStorage.getItem('books') === null){
      books = [];
    }else{
      books = JSON.parse(localStorage.getItem('books'));
    }
    return books;
  }
  static displayBooks(){
    const books = Store.getBooks();
    books.forEach(function(book){
      const ui = new UI;
      ui.addBookToList(book);
    })
  }
  static addBook(book){
    const books = Store.getBooks();
    books.push(book);
    localStorage.setItem('books', JSON.stringify(books));
  }
  static removeBook(isbn){
    const books = Store.getBooks();
    books.forEach(function(book, index){
      if(book.isbn === isbn){
        books.splice(index, 1);
      }
    });
    localStorage.setItem('books', JSON.stringify(books));
  }
}
//DOM load event
document.addEventListener('DOMContentLoaded', Store.displayBooks);

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
    //Add book to Local storage
    Store.addBook(book);
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

  //Remove from Local storage
  Store.removeBook(e.target.parentElement.previousElementSibling.textContent);

  //show message
  ui.showAlert('Delete Complete!', 'success');

  e.preventDefault();
})
