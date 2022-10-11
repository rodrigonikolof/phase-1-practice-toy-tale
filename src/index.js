let addToy = false;


document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
        addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
    });
});


fetch ('http://localhost:3000/toys')
.then(response => response.json())
.then (toys => initialiseToys(toys))
.catch(console.log('oops!'))


function initialiseToys(toys){
  toys.forEach(toy => displayCurrentToys(toy))
}

function displayCurrentToys(toy){
  let toyDiv = document.createElement('div');
  
  toyDiv.className = 'card';
  toyDiv.innerHTML = `
    <h2>${toy.name}</h2>
    <img src='${toy.image}' class='toy-avatar'/img>   
    <p>${toy.likes} Likes</p>
    <button class ='like-btn' id='${toy.id}'> Like </button>`
    document.querySelector('#toy-collection').appendChild(toyDiv);
    toyDiv.querySelector('.like-btn').addEventListener('click', ()=>{
      toy.likes += 1;
      toyDiv.querySelector('p').textContent = `${toy.likes} likes`;
      updateLikes(toy)
    } )
  }

  function updateLikes(toy){
    fetch(`http://localhost:3000/toys/${toy.id}`,{
      method: 'PATCH',
      headers: {
        'Content-Type':'application/json'
      },
      body:JSON.stringify(toy)
    })
    .then(res => res.json())
    // .then(toys => console.log(toys))
  }


const submitBtn = document.querySelector('.container');
submitBtn.addEventListener('submit', e => handleFormData(e));

function handleFormData(e){
    e.preventDefault();
    
    let formToy = {
      name: e.target.name.value,
      image: e.target.image.value,
      likes : 0,
    }
    displayCurrentToys(formToy);
    submitToy(formToy);
}

function submitToy(toy){
  fetch('http://localhost:3000/toys',{
    method: 'POST',
    headers: {
                'Content-Type': 'application/json'
    },
    body:JSON.stringify(toy)
  })
  }
