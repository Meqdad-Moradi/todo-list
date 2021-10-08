const form = document.querySelector('#todo-form')
const input = form.querySelector('#input')
const todoList = document.querySelector('.todo-list')
const listInfo = document.querySelector('#list-info')
const deleteBtn = `<i class="fas fa-trash delete" title="Delete this item"></i>`


// create the li element for the list item and display list
function createLi(value) {
    const li = document.createElement('li')
    li.setAttribute('class', 'todo-item')
    li.textContent = value[value.length - 1]
    li.innerHTML += deleteBtn
    todoList.appendChild(li)
}


// check the form
function addToDo(e) {
    e.preventDefault()
    inputValue = input.value.trim()
    if (inputValue === '' || inputValue === null) {
        error(input, 'Please insert your todo item!')
    } else {
        success(input)
        listInfo.textContent = ''
        storeData(inputValue)
    }

    input.value = ''
    input.focus()
}

// check if the input is empty
function error(input, message) {
    const inputParent = input.parentElement
    const small = inputParent.querySelector('small')

    inputParent.className = 'input-container error'
    small.textContent = message
}

// check if user inserted data
function success(input) {
    const inputParent = input.parentElement
    const small = inputParent.querySelector('small')

    inputParent.className = 'input-container success'
    small.textContent = ''
}

form.addEventListener('submit', addToDo)



function storeData(todo) {
    let items
    if (localStorage.getItem('todo') === null) {
        items = []
    } else {
        items = JSON.parse(localStorage.getItem('todo'))
    }

    items.push(todo)
    localStorage.setItem('todo', JSON.stringify(items))

    createLi(items)
}


function display() {
    let items
    if (localStorage.getItem('todo') === null) {
        items = []
    } else {
        items = JSON.parse(localStorage.getItem('todo'))
    }

    if (items.length !== 0) {
        items.forEach(item => {
            const li = document.createElement('li')
            li.setAttribute('class', 'todo-item')
            li.textContent = item
            li.innerHTML += deleteBtn
            todoList.appendChild(li)

        })

        // if there is no todo item, cleare info text
        listInfo.textContent = ''
    }
}

// delete item
todoList.addEventListener('click', e => {
    if (e.target.classList.contains('delete')) {
        const dataText = e.target.parentElement.childNodes[0].textContent
        e.target.parentElement.remove()
        removeItemFromLocalStorage(dataText)
    }
})


// delete item
function removeItemFromLocalStorage(data) {
    let items
    if (localStorage.getItem('todo') === null) {
        items = []
    } else {
        items = JSON.parse(localStorage.getItem('todo'))
    }

    items.forEach((item, index) => {
        if (item === data) {
            items.splice(index, 1)
        }
    })

    if (items.length === 0) {
        localStorage.clear()
        listInfo.textContent = 'no item added yet...'
    } else {
        localStorage.setItem('todo', JSON.stringify(items))
    }
}


document.addEventListener('DOMContentLoaded', display)