import Swiper from 'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.mjs'

const menuBtn = document.getElementById("menu-btn")
const navUl = document.getElementById("nav-ul")
const allBtn = document.getElementById("all-btn")
const burgerBtn = document.getElementById("burger-btn")
const pizzaBtn = document.getElementById("pizza-btn")
const pastaBtn = document.getElementById("pasta-btn")
const friesBtn = document.getElementById("fries-btn")
const btnContainer = document.getElementById("btn-container")
const filterBtns = btnContainer.getElementsByClassName("button--light")
const formBook = document.getElementById("form-book")

let isMenuOpen = false

const handleMenu = ()=>{
    if(isMenuOpen == false){
        navUl.style.display = "flex"
        menuBtn.classList.remove("fa-burger")
        menuBtn.classList.add("fa-x")
        isMenuOpen = !isMenuOpen
    }else{
        navUl.style.display= "none"
        menuBtn.classList.remove("fa-x")
        menuBtn.classList.add("fa-burger")
        isMenuOpen = !isMenuOpen
    }

}   

const heroSwiper = new Swiper(".section-hero__swiper", {
    pagination: {
      el: ".swiper-pagination",
    },
    loop : true,
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
})



const filterSelection =(filterOption) =>{
  
  let cards = document.getElementsByClassName("section-menu__filter-card")
  if (filterOption == "all") filterOption = ""
  for (let i = 0; i < cards.length; i++) {
    CardRemoveClass(cards[i], "show");
    if (cards[i].className.indexOf(filterOption) > -1) CardAddClass(cards[i], "show")
  }
}

function CardAddClass(card, name) {
  let arr1 = card.className.split(" ")
  let arr2 = name.split(" ")
  for (let i = 0; i < arr2.length; i++) {
    if (arr1.indexOf(arr2[i]) == -1) {card.className += " " + arr2[i]}
  }
}

function CardRemoveClass(card, name) {
  let arr1 = card.className.split(" ")
  let arr2 = name.split(" ")
  for (let i = 0; i < arr2.length; i++) {
    while (arr1.indexOf(arr2[i]) > -1) {
      arr1.splice(arr1.indexOf(arr2[i]), 1)     
    }
  }
  card.className = arr1.join(" ")
}

for (let i = 0; i < filterBtns.length; i++) {
  filterBtns[i].addEventListener("click", function(){
    let current = document.getElementsByClassName("active")
    current[0].className = current[0].className.replace(" active", "")
    this.className += " active"
  });
}

 const validateForm= (e)=> {
  e.preventDefault()
  console.log("entro")
  const inputs = document.querySelectorAll('.section-book__input')
  const personsSelect = document.querySelector('select[name="persons"]')
  console.log(personsSelect.value)
  
  for (let i = 0; i < inputs.length; i++) {
      if (!inputs[i].value) {
          alert('Please fill in all fields.')
          return false;
      }
  }
  
  if (personsSelect.value == "How many persons?") {
      alert('Please select a number between 1 and 6 for persons.')
      return false
  }
  
  return true
}



filterSelection("all")
formBook.addEventListener("submit", validateForm)
allBtn.addEventListener("click",()=> filterSelection("all"))
burgerBtn.addEventListener("click",()=> filterSelection("burger"))
pizzaBtn.addEventListener("click",()=> filterSelection("pizza"))
pastaBtn.addEventListener("click",()=> filterSelection("pasta"))
friesBtn.addEventListener("click",()=> filterSelection("fries"))

menuBtn.addEventListener("click", handleMenu)