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
    <button class ='like-btn' id='${toy.name}'> Like </button>`
    document.querySelector('#toy-collection').appendChild(toyDiv);
    
  }



const submitBtn = document.querySelector('.submit');
submitBtn.addEventListener('click', (e)=> addNewToy(e));

function addNewToy(e){
    e.preventDefault();
    console.log(formData)
}

let formData = document.querySelectorAll('.input-text').value

