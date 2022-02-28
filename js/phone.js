
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
       .catch(error => displayError(error));
    }
    displayPhoneDetail()='';
}
const displayError = error => {
    document.getElementById('error-message').style.display = 'block';
    document.getElementById('error-name').style.display = 'none';
}

const displaySearchResult = phones =>{
    console.log(phones)
    const searchResult = document.getElementById('search-result');
    searchResult.textContent = '';

    if (phones.length == 0) {
      document.getElementById('error-message').style.display = 'block';
    }
    phones.slice(0, 20).forEach(phone => {
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div class="card h-100 box ">
        <img src="${phone.image}" class="card-img-top  pt-3" alt="...">
        <div class="card-body text-center">
          <h5 class="card-title text-center mb-3 fw-bold">${phone.brand} ${phone.phone_name}</h5>
          <button type="button" onclick="loadPhoneDetail('${phone.slug}')" class="btn btn-primary ">See Details</button>
        </div>
      </div>
        `;
        searchResult.appendChild(div);
    })
};
const loadPhoneDetail = phoneId =>{
      console.log(phoneId)
      const url = `https://openapi.programming-hero.com/api/phone/${phoneId}`;
      fetch(url)
      .then(res => res.json())
      .then(data => displayPhoneDetail(data.data))
}

const displayPhoneDetail = phone =>{
    console.log(phone)
    const phoneDetails = document.getElementById('phone-details');
    phoneDetails.textContent ='';
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML =`
    <div class="card h-100 box">
        <img src="${phone.image}" class="card-img-top px-3 pt-3" alt="...">
        <div class="card-body text-center">
          <h5 class="card-title text-center mb-3 fw-bold">${phone.brand} ${phone.name}</h5>
            <p>${phone.releaseDate}</p> 
        </div>
      </div>
        `;
    phoneDetails.appendChild(div);
}