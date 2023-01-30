const searchBtn = document.getElementById('search-btn');
const mealList = document.getElementById('meal');
const mealDetailsContent = document.querySelector('.meal-details-content');
const recipeCloseBtn = document.getElementById('recipe-close-btn');


// ****************************  Events Listner  *******************************************//
searchBtn.addEventListener('click', getMealList);
mealList.addEventListener('click', getMealRecipe);
mealList.addEventListener("click", addFav);
recipeCloseBtn.addEventListener('click', () => {
    mealDetailsContent.parentElement.classList.remove('show-recipe');
});

// ****************************    Search Food Meal Recipe *****************************************//
function getMealList() {
    let searchInputTxt = document.getElementById('search-input').value.trim();
    console.log(searchInputTxt)
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInputTxt}`)
    
        .then(response => response.json())
        .then(data => {
            console.log(data);
            let html = "";
            if (data.meals) {
                data.meals.forEach(meal => {
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
                       <input type="button" onclick="addFav(this); openPopup()" value="Favourite" class="btn btn-outline-primary" id="${meal.idMeal}" >
                    
                    </div>
                   </div>
                </div>
              `;   });
              mealList.classList.remove('notFound');
           } 
           else{
                html = "Sorry, we didn't find any meal!";
                mealList.classList.add('notFound');
            }
            mealList.innerHTML = html;
        });
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
                        <img src = "${meal.strMealThumb}" class="rounded" alt = ""width="250px" height="250px">
                        </div>
                    </div>
                   
                </div>
            </div>
        
    </div>
   
        <div class = "recipe-instruct">
            <h3>INSTRUCTION</h3>
            <p class="para">${meal.strInstructions}</p>
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

// ************************************  Item Add To Favourite Meal ********************************//
function addFav(btn){
        let new_data = btn.id;
        // console.log(new_data);
        if (localStorage.getItem("favourites") == null) {
          localStorage.setItem("favourites", "[]");
        }
      
        var old_data = JSON.parse(localStorage.getItem("favourites"));
      
        if (!old_data.includes(new_data)) {
          old_data.push(new_data);
          localStorage.setItem("favourites", JSON.stringify(old_data));
        }
}
// ***********************  Show A popUp item is succesfully Added to your cart  ****************
let popupAdd =document.getElementById("popupAdd");

    function openPopup(){
      
        popupAdd.classList.add("open-popup");
        console.log("open")
    }
    
    function closePopup(){
        popupAdd.classList.remove("open-popup");
        console.log("close")
    }