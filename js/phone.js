document.getElementById('error-message').style.display = 'none';
document.getElementById('error-name').style.display = 'none';


const searchPhone = () =>{
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    searchField.value = '';
    document.getElementById('error-message').style.display = 'none';
    document.getElementById('error-name').style.display = 'none';
    if (searchText == '') {
       document.getElementById('error-name').style.display = 'block';
       displaySearchResult()='';
   }
    else{
       const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
       console.log(url);
       fetch (url)
       .then(res => res.json())
       .then(data => displaySearchResult(data.data))
    //    .catch(error => displayError(error));
    }
}

const displaySearchResult = phones =>{
    console.log(phones)
    const searchResult = document.getElementById('search-result');
    searchResult.textContent = '';

    if (phones.length == 0) {
      // show no result found;
      document.getElementById('error-message').style.display = 'none';
    }
    phones.forEach(phone => {
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div class="card h-100 box">
        <img src="${phone.image}" class="card-img-top px-3 pt-3" alt="...">
        <div class="card-body text-center">
          <h5 class="card-title text-center mb-3 fw-bold">${phone.phone_name}</h5>
          <button onclick="loadPhoneDetail(${phone.idMeal})" class="btn btn-primary">See Details</button>
        </div>
      </div>
        `;
        searchResult.appendChild(div);
    })
}