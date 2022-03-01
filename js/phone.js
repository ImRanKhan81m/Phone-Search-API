
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
       displayPhoneDetail()='';
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
    displaySearchResult()='';
    displayPhoneDetail()='';
    document.getElementById('error-message').style.display = 'block';
    document.getElementById('error-name').style.display = 'none';
    
}

const displaySearchResult = phones =>{
    console.log(phones)
    const searchResult = document.getElementById('search-result');
    searchResult.textContent = '';

    if (phones == 0) {
      document.getElementById('error-message').style.display = 'block';
      displayPhoneDetail()= '';
    }
    phones.slice(0, 20).forEach(phone => {
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div class="card h-100 box ">
        <img src="${phone.image}" class="card-img-top mb-4 pt-3" alt="...">
        <div class="card-body text-center">
          <h5 class="card-title text-center mb-3 fw-bold">${phone.brand} ${phone.phone_name}</h5>
          <button type="button" onclick="loadPhoneDetail('${phone.slug}')" class="btn btn-primary mb-3 ">See Details</button>
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
    <div class="card h-100 box px-lg-3 py-3">
            <img src="${phone.image}" class="card-img-top px-3 pt-3" alt="...">
            <div class="card-body text-center">
              <h4 class="card-title text-center mb-3 fw-bold">${phone.brand} ${phone.name} <br> Full Specifications</h4>
                <p>${phone.releaseDate?phone.releaseDate:'<span class="text-danger">Not found release date</span>'}</p>
                <div class="row p-1">
                    <div class="col-lg-3 col-md-4 col-4  text-start fw-bold">ChipSet</div>
                    <div class="col-lg-9 col-md-8 col-8 text-start text-md-start">: ${phone.mainFeatures.chipSet}</div>
                </div> 
                <div class="row p-1">
                    <div class="col-lg-3 col-md-4 col-4  text-start fw-bold">Brand</div>
                    <div class="col-lg-9 col-md-8 col-8 text-start text-md-start">: ${phone.brand}</div>
                </div> 
                <div class="row p-1">
                    <div class="col-lg-3 col-md-4  text-start col-4 fw-bold">Display Size</div>
                    <div class="col-lg-9 col-md-8 text-start text-md-start col-8">: ${phone.mainFeatures.displaySize}</div>
                </div> 
                <div class="row p-1">
                    <div class="col-lg-3 col-md-4  text-start col-4 fw-bold">Memory</div>
                    <div class="col-lg-9 col-md-8 text-start text-md-start col-8">: ${phone.mainFeatures.memory}</div>
                </div> 
                <div class="row p-1">
                    <div class="col-lg-3 col-md-4  text-start col-4 fw-bold">Sensors</div>
                    <div class="col-lg-9 col-md-8 text-start text-md-start col-8">: ${phone.mainFeatures.sensors}</div>
                </div> 
                <div class="row p-1">
                    <div class="col-lg-3 col-md-4 text-start col-4 fw-bold">Storage</div>
                    <div class="col-lg-9 col-md-8 text-start text-md-start col-8">: ${phone.mainFeatures.storage}</div>
                </div> 
                <div class="row p-1">
                    <div class="col-lg-3 col-md-4 text-start col-4 fw-bold">Bluetooth</div>
                    <div class="col-lg-9 col-md-8 text-start text-md-start col-8">: ${phone.others?.Bluetooth??'5.0, A2DP, LE'}</div>
                </div> 
                <div class="row p-1">
                    <div class="col-lg-3 col-md-4 text-start col-4 fw-bold">GPS</div>
                    <div class="col-lg-9 col-md-8 text-start text-md-start col-8">: ${phone.others?.GPS??'Yes'}</div>
                </div> 
                <div class="row p-1">
                    <div class="col-lg-3 col-md-4 text-start col-4 fw-bold">NFC</div>
                    <div class="col-lg-9 col-md-8 text-start text-md-start col-8">: ${phone.others?.NFC??'No'}</div>
                </div> 
                <div class="row p-1">
                    <div class="col-lg-3 col-md-4 text-start col-4 fw-bold">Radio</div>
                    <div class="col-lg-9 col-md-8 text-start text-md-start col-8">: ${phone.others?.Radio??'Yes'}</div>
                </div> 
                <div class="row p-1">
                    <div class="col-lg-3 col-md-4 text-start col-4 fw-bold">USB</div>
                    <div class="col-lg-9 col-md-8 text-start text-md-start col-8">: ${phone.others?.USB??'No'}</div>
                </div> 
                <div class="row p-1">
                    <div class="col-lg-3 col-md-4 text-start col-4 fw-bold">WLAN</div>
                    <div class="col-lg-9 col-md-8 text-start text-md-start col-8">: ${phone.others?.WLAN??'Wi-Fi 802.11 a/b/g/n/ac/6'}</div>
                </div> 
            </div>
          </div>
        `;
    phoneDetails.appendChild(div);
    
}