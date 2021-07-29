let addToy = false;

document.addEventListener("DOMContentLoaded", e => {
  const submitClick = document.querySelector('.add-toy-form')[2]
  
  hideAddToy(e)
  fetchToys()
  
  submitClick.addEventListener('click',e =>{
    e.preventDefault()
    newToyAdd()
  })
});

//Func to form banner to submit new toys
function hideAddToy(e){
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
}

//func to perform GET request
function fetchToys(){
  fetch('http://localhost:3000/toys')
  .then(resp => resp.json())
  .then(toys => toys.forEach(renderToys))
}

//renders toy in toy-collection div
function renderToys(toy){
  const toyCollection = document.querySelector('#toy-collection')
  const toyCard = document.createElement('div')
  const toyHeader = document.createElement('h2')
  const toyImg = document.createElement('img')
  const toyPTag = document.createElement('p')
  const toyBtn = document.createElement('button')

  toyCard.setAttribute('class','card')
  toyHeader.innerText = toy.name
  toyImg.setAttribute('src',toy.image)
  toyImg.setAttribute('class', 'toy-avatar')
  toyPTag.innerText = `${toy.likes} likes`
  toyBtn.innerText = 'Like <3'
  toyBtn.setAttribute('class','like-btn')
  toyBtn.setAttribute('id',toy.id)

  toyBtn.addEventListener('click',()=>{
    const toyPTagSplit = toyPTag.innerText.split(' ')
    let likeNumber = parseInt(toyPTagSplit[0])
    likeNumber = likeNumber+1
    toyPTag.innerText =  ''
    toyPTag.innerText = `${likeNumber} likes`
    
  })

  toyCard.append(toyHeader,toyImg,toyPTag,toyBtn)
  toyCollection.appendChild(toyCard)
}

//allows users to add new toys
function newToyAdd(e){
  const toyNameInput = document.querySelector('.add-toy-form')[0].value
  const toyImgInput = document.querySelector('.add-toy-form')[1].value
  
  if(toyNameInput.trim() && toyImgInput.trim()){
    const newToyName = toyNameInput
    const newToyImg = toyImgInput
    newToyCreate = {
      name : newToyName,
      image : newToyImg,
      likes : 0
    }
    renderToys(newToyCreate)
  } else{
    alert('Please fill all spaces')
  }
}