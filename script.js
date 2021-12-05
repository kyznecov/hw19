'use strict';

const listItems = [];
let activeIndex = [];


const textInput = document.querySelector('#text-input');
const addBtn = document.querySelector('#add-btn');
const deleteBtn = document.querySelector('#delete-btn');
const listElem = document.querySelector('#list');

function addItems(item) {
    if (!item) return;
    listItems.push(item);

    renderList(listItems, activeIndex);
}

function deleteItem(index) {
    if (index === undefined) return;
    listItems.splice(index, 1);

    renderList(listItems);
}

listElem.addEventListener('click', (e) => {
    const listItem = e.target.closest('li');

    if (!listItem) return;
    const index = +listItem.dataset.index;

    setActiveIndex(index);
});

function setActiveIndex(index) {
    activeIndex = index === activeIndex ? undefined : index;

    renderList(listItems, activeIndex);
}

addBtn.addEventListener('click', () =>{
    const item = textInput.value;
    textInput.value = '';
    textInput.focus();

    addItems(item);
});

deleteBtn.addEventListener('click', () => {
    const index = activeIndex;

    deleteItem(index);

    activeIndex = undefined;
});

function renderList(items, activeIndex) {
    const htmlString = items
        .map((item, index) => `
            <li 
                data-index="${index}" 
                class="${activeIndex === index ? 'active' : ''}"
            >
            ${item}
            </li>
        `)
        .join('');
    listElem.innerHTML = htmlString;
}