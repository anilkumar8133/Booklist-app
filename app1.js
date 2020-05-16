//book class:represent a class of book
class Book{
    constructor(title,author,isbn){
    this.title=title;
    this.author=author;
    this.isbn=isbn;}
}
// UI class:to handle ui class
class UI {
    static displayBooks()
    {
        // const storedBooks=
        // [
        //     {
        //        title:'Book one'
        //         author:'john doe'
        //         isbn:'1234'
        //    },
        //    {
        //        title:'Book one'
        //         author:'john doe'
        //         isbn:'1234'
        //    },

        // ];
        // const books=storedBooks
        const books=store.getBooks();
        // console.log(books);
        //console.log(hello+books);
        //console.log(typeof(books));
        books.forEach((book)=> UI.addBookTOList(book)); 
    }
    static addBookTOList(book)
    {
        const list=document.querySelector('#book-list');
        const row=document.createElement('tr');
        row.innerHTML=`
                    <td>${book.title}</td>
                    <td>${book.author}</td>
                    <td>${book.isbn}</td>
                    <td><a href="#" class="btn btn-danger btn-sm-delete">X</td>
        `;
        list.appendChild(row);
    } 
    static clearField()
    {
        document.querySelector('#title').value='';
        document.querySelector('#author').value='';
        document.querySelector('#isbn').value='';

    }
    static deleteBook(el)
    {
        if(el.classList.contains('delete')){
            if(confirm('are you sure to want delete this'))
                el.parentElement.parentElement.remove();

        }
    }
      //show alert....
      static showAlert(message,classname){
          const div=document.createElement('div');
          div.className=`alert alert-${classname}`;
          div.appendChild(document.createTextNode(message));
          const  container=document.querySelector('.container');
          const form=document.querySelector('#book-form');
          container.insertBefore(div, form);
          // vanish within 3 seconds
          setTimeout(
              function(){document.querySelector('.alert').remove();
            },3000 )
      }
    }

  //store class:handles storage
  class store{
      static getBooks(){
          let books;
          if(localStorage.getItem('books')===null){
            books=[];
          }
            else{
                books=JSON.parse(localStorage.getItem('books'));
            }
            return books;
          }
        static addBooks(book){
            const books=store.getBooks();
          //  Console.log(typeof books);
            books.push(book);
            localStorage.setItem('books',JSON.stringify(books));
        }
        static removeBook(isbn){
            const books=store.getBooks();
            books.forEach((book,index)=>{
                if(book.isbn===isbn)
                 books.splice(index,1);
            });
            localStorage.setItem('books',JSON.stringify(books));
        }
      }
      //event display books
      document.addEventListener('DOMContentLoaded',UI.displayBooks);
      //event add a book
      document.querySelector('#book-form').addEventListener('submit',(e)=>{
          e.preventDefault();
          const title=document.querySelector('#title').value;
          const author=document.querySelector('#author').value;
          const isbn=document.querySelector('#isbn').value;
          //validate
          if(title ===''||author ===''||isbn ===''){
        UI.showAlert('please fill  all the fields','danger');
        }
        else{
            //initiate a book
            const book = new Book(title, author, isbn);
            //add book
            UI.addBookTOList(book);
            

            store.addBooks(book);

            UI.clearField();

            UI.showAlert('book addaed succesfully', 'success');
        
        }
      })

   // event:remove a book
   document.querySelector('#book-list').addEventListener('click', (e) => {
    // delete book from UI
    UI.deleteBook(e.target);
    console.log(e.target);
    // console.log(e.target.parentElement.previousElementSibling.textContent);
    store.removeBook(e.target.parentElement.previousElementSibling.textContent);
    UI.showAlert('book deleted suuccesfully','success');

  })
    
