const mealDetailsContent = document.querySelector('.meal-details-content');
const recipeCloseBtn = document.getElementById('recipe-close-btn');
const mealList = document.getElementById("meal");

// *********************************    Event Listener    **************************************//
mealList.addEventListener('click', getMealRecipe);
recipeCloseBtn.addEventListener('click', () => {
    mealDetailsContent.parentElement.classList.remove('show-recipe');
});

document.addEventListener("DOMContentLoaded", getFavouriteMeals);

function getFavouriteMeals() {
  console.log("getfavourite function");
  let favouriteMealsId;
  if (localStorage.getItem("favourites") == null) {
    return;
  } else {
    favouriteMealsId = JSON.parse(localStorage.getItem("favourites"));
  }
  // **************************    Fetch Meal Detail *********************************************//
  favouriteMealsId.forEach((mealid) => {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealid}`)
      .then((response) => response.json())
      .then((data) => {
        let html = "";
        if (data.meals) {
          let meal = data.meals[0];
          //   data.meals.forEach((meal) => {
          let html = "";
          if (data.meals) {
            data.meals.forEach((meal) => {
              html += `
                        <div class = "meal-item  shadow " data-id="${meal.idMeal}">
                            <div class = "meal-img p-3 ">
                                <img  src = "${meal.strMealThumb}" class="img-fluid rounded "  alt = "food">
                            </div>
                            <div class = "meal-name justify-content-center mb-2">
                                <h3 class"mb-3">${meal.strMeal}</h3>
                               <!----------- More Detail page------ -->
                               <div class="meal-button  d-flex justify-content-evenly mb-1">
                               
                               <a href = "#" class = "detail-btn btn btn-outline-primary">View Recipe</a>
                               <input type="button" onclick="removeFav(this); openPopup()" value="UnFavourite" class="btn btn-outline-primary" id="${meal.idMeal}" >
        
                            </div>
                           </div>
                        </div>
                      `;
            });
          } else {
            html = `<h3>Sorry we could not find your meal ! </h3>`;
          }
          var parent = document.getElementById("meal");
          var newChild = html;
          parent.insertAdjacentHTML("beforeend", newChild);
          // console.log(data);
        }
      });
  });
}
        


//*********************************   Remove favourite from local stroage  ************************//
function removeFav(btn){
    console.log(btn.parentNode);
    let remove_id = btn.id ;
    var old_data = JSON.parse(localStorage.getItem('favourites')); 
    var index = old_data.indexOf(remove_id);  
    old_data.splice(index , 1) ; 
    localStorage.setItem('favourites' , JSON.stringify(old_data)) ; 
    console.log(remove_id);
    btn.parentNode.parentNode.parentNode.remove() ;

}


// ***************************************  Get Meal Recipe  *********************************//
function getMealRecipe(e){
    e.preventDefault();
    if(e.target.classList.contains('detail-btn')){
        let mealItem = e.target.parentElement.parentElement.parentElement;
        console.log(e.target.parentElement.parentElement.parentElement)
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`)
        .then(response => response.json())
        .then(data => mealRecipe(data.meals));
    }
}
// **********************************  Meal Detail Information **************************************//
function mealRecipe(meal){
    console.log(meal);
    meal = meal[0];
    let html = `
        <h2 class = "recipe-title">${meal.strMeal}</h2>
        <p class = "recipe-category">${meal.strCategory}</p>
      
             <div class="row g-3">
                <div class="col-md-5 col-lg-4 order-md-2 order-2">
                    <h4 class="d-flex justify-content-between align-items-center mb-3">
                        <h3 class=" text-center">INGREDIENTS</h3>
                    </h4>
                    <ul class="list-group mb-3">
                        <div class="recipe-ingredient ">
                            <div class="list-group margin-auto d-flex  justify-content-center">
                                <label class="list-group-item">
                                    <input class="form-check-input me-1" type="checkbox" value="">
                                    ${meal.strIngredient1}
                                </label>
                                <label class="list-group-item">
                                    <input class="form-check-input me-1" type="checkbox" value="">
                                    ${meal.strIngredient2}
                                </label>
                                <label class="list-group-item">
                                    <input class="form-check-input me-1" type="checkbox" value="">
                                    ${meal.strIngredient3}
                                </label>
                                <label class="list-group-item">
                                    <input class="form-check-input me-1" type="checkbox" value="">
                                    ${meal.strIngredient4}
                                </label>
                                <label class="list-group-item">
                                    <input class="form-check-input me-1" type="checkbox" value="">
                                    ${meal.strIngredient5}
                                </label>
                            </div>
                    </ul>

                </div>
                <div class="col-md-5 col-lg-6  order-md-1 order-1 mb-3 ">
                    <div class="cart">
                        <div class="cart-body">
                        <img src = "${meal.strMealThumb}" class="rounded" alt = ""width="300px" height="300px">
                        </div>
                    </div>
                   
                </div>
            </div>
        
    </div>
   
        <div class = "recipe-instruct">
            <h3>Instructions:</h3>
            <p>${meal.strInstructions}</p>
        </div>

       <div class="row justify-content-evenly ">
        <div class="col-sm-3 mt-4 ">
          <div class="d-grid ">
            <!-- --------------------------- Watch  The YouTube Video----------------------- -->
            <a class="btn btn-outline-primary" href="${meal.strYoutube}" target = "_blank" role="button">Watch Video<a>
          </div>
        </div>
        <div class="col-sm-3 mt-4 ">
          <div class="d-grid ">
            <!-- ---------------------------------- Visit Website Link------------------------- -->
            <a class="btn btn-outline-primary" href="${meal.strSource}" target = "_blank" role="button">Visit Website<a>
          </div>
        </div>
        <div class="col-sm-3 mt-4 ">
          <div class="d-grid ">
            <!-- ---------------------------------- Place Order Link--------------------------- -->
            <a class="btn btn-warning" href ="./OrderPage.html" target="_blank" role="button">Place Order<a>
          </div>
        </div>
        </div>
    `;
    mealDetailsContent.innerHTML = html;
    mealDetailsContent.parentElement.classList.add('show-recipe');
}
// ***********************  Show A popUp item is succesfully remove from your cart  ****************
let popupRem =document.getElementById("popupRem");

    function openPopup(){
      
        popupRem.classList.add("open-popup");
        console.log("open")
    }
    
    function closePopup(){
        popupRem.classList.remove("open-popup");
        console.log("close")
    }
