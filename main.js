class Book {
  constructor(title, author, numberOfPages, read) {
    this.title = title;
    this.author = author;
    this.numberOfPages = numberOfPages;
    this.read = read;
  }
  info() {
    const str = this.read ? 'have read' : 'not read yet';
    console.log(
      `${this.title} by ${this.author}, ${this.numberOfPages} pages, ${str}`
    );
  }
}

const title = document.querySelector('#title');
const author = document.querySelector('#author');
const pages = document.querySelector('#pages');
const modal = document.querySelector('#my-modal');
const read = document.querySelector('#read');
const tbody = document.querySelector('tbody');
const table = document.querySelector('table');
const errorDiv = document.querySelector('#error-div');

let library = [
  new Book('test', 'test author', 199, false),
  new Book('test 2', 'test author 2', 222, true),
];

const display = () => {
  if (library.length !== 0) {
    table.classList.remove('invisible');
    tbody.innerHTML = '';
    library.forEach((book) => {
      let tr = document.createElement('tr');
      let t = document.createElement('td');
      let a = document.createElement('td');
      let p = document.createElement('td');
      let togg = document.createElement('td');
      let deleteTh = document.createElement('td');
      let btn = document.createElement('button');
      let checkbox = document.createElement('input');

      checkbox.type = 'checkbox';
      checkbox.name = 'name';
      checkbox.classList.add('toggle');
      checkbox.classList.add('toggle-primary');
      checkbox.classList.add('toggle-lg');
      checkbox.value = book.title;

      btn.classList.add('btn');
      btn.classList.add('btn-error');
      btn.classList.add('btn-xs');
      btn.classList.add('del');

      btn.textContent = 'delete';
      t.textContent = book.title;
      a.textContent = book.author;
      p.textContent = book.numberOfPages;
      deleteTh.appendChild(btn);
      togg.appendChild(checkbox);
      deleteTh.setAttribute('data-obj', book.title);

      tr.appendChild(t);
      tr.appendChild(a);
      tr.appendChild(p);

      tr.appendChild(togg);
      tr.appendChild(deleteTh);
      tbody.appendChild(tr);
    });
    initialToggle();
    deleteEventListener();
    toggleRead();
  } else {
    table.classList.add('invisible');
  }
};

addEventListener('load', (event) => {
  display();
});

const toggleRead = () => {
  document.querySelectorAll('.toggle').forEach((i) => {
    i.addEventListener('click', (e) => {
      let val = e.target.checked;
      let t = e.target.value;
      toggleReadBook(val, t);
    });
  });
};

const deleteRow = (data) => {
  library = library.filter((i) => i.title !== data);
};

addEventListener('submit', (event) => {
  event.preventDefault();
  modal.checked = false;
  addBookToLibrary();
});

const addBookToLibrary = () => {
  const found = library.find((i) => i.title === title.value);
  if (!found) {
    library.push(
      new Book(title.value, author.value, Number(pages.value), read.checked)
    );

    display();
  } else {
    errorDiv.classList.remove('invisible');
    setTimeout(() => {
      errorDiv.classList.add('invisible');
    }, 5000);
  }
};

const initialToggle = () => {
  document.querySelectorAll('.toggle').forEach((element, index) => {
    element.checked = library[index].read;
  });
};

const deleteEventListener = () => {
  document.querySelectorAll('.del').forEach((element) => {
    element.addEventListener('click', (event) => {
      const data = event.target.parentNode.getAttribute('data-obj');
      deleteRow(data);
      display();
    });
  });
};

const toggleReadBook = (value, title) => {
  let fI = library.findIndex((x) => x.title == title);
  library[fI].read = value;
  console.log(library);
};
