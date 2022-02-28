document.getElementById('error-message').style.display = 'none';
document.getElementById('error-name').style.display = 'none';


const searchPhone = () =>{
     const searchField = document.getElementById('search-field');
     const searchText = searchField.value;
     searchField.value = '';
     document.getElementById('error-message').style.display = 'none';
     document.getElementById('error-name').style.display = 'none';
     if (searchText == '') {
        // please write something to display
        // document.getElementById('error-message').style.display = 'block';
        document.getElementById('error-name').style.display = 'block';
        displaySearchResult()='';
    }
     else{
        const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
        console.log(url);
        fetch (url)
        .then(res => res.json())
        .then(data => displaySearchResult(data.data))
        .catch(error => displayError(error));
     }
}

const displayError = error => {
    document.getElementById('error-message').style.display = 'block';
    document.getElementById('error-name').style.display = 'none';
}

const displaySearchResult = meals =>{
      console.log(meals)
      const searchResult = document.getElementById('search-result');
      searchResult.textContent = '';
      if (meals.length == 0) {
        // show no result found;
        document.getElementById('error-message').style.display = 'none';
    }
    //   console.log(meals)
      meals.forEach(meal => {
          const div = document.createElement('div');
          div.classList.add('col');
          div.innerHTML = `
          <div onclick="loadMealDetail(${meal.idMeal})" class="card h-100 box">
          <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
          <div class="card-body">
            <h5 class="card-title">${meal.strMeal}</h5>
            <p class="card-text">${meal.strInstructions.slice(0, 200)}</p>
            <a target="blank" href="${meal.strYoutube}" class="btn btn-primary">See Tutorial</a>
          </div>
        </div>
          `; 
          searchResult.appendChild(div);
      })
}

const loadMealDetail = mealId => {
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayMealDetail(data.meals[0]));
}

const displayMealDetail = meal =>{
    const mealDetails = document.getElementById('meal-details');
    mealDetails.textContent ='';
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML =`
    <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
    <div class="card-body">
        <h5 class="card-title">${meal.strMeal}</h5>
        <p class="card-text">${meal.strInstructions.slice(0, 150)}</p>
        <a target="blank" href="${meal.strYoutube}" class="btn btn-primary">See Tutorial</a>
    </div>
    ` ;
    mealDetails.appendChild(div);
}