// spinner control
const toogleSpinner = displayStyle => {
    document.getElementById('spinner').style.display = displayStyle;
};
const toogleSearchResult = displayStyle => {
    document.getElementById('display-result').style.visibility = displayStyle;
};
// search phone
const searchPhone = () => {
    const searchText = document.getElementById('search-field').value;
    toogleSpinner('block');
    toogleSearchResult('hidden');
    document.getElementById('search-field').value = '';
    loadPhone(searchText);
};
// load phone
const loadPhone = async searchText => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    const res = await fetch(url);
    const data = await res.json();
    displayPhone(data.data);
};
// display result
const displayPhone = phones => {
    const displayContainer = document.getElementById('display-result');
    displayContainer.textContent = '';
    // error handling
    if (!phones) {
        document.getElementById('error').style.display = 'block';
    }
    else {
        document.getElementById('error').style.display = 'none';
    };
    // display for 20 phones
    const phones20 = phones.slice(0, 20);
    console.log(phones);
    phones20.forEach(phone => {
        const item = document.createElement('div');
        item.classList.add('col');
        item.innerHTML = `
                <div class="card h-100 rounded-3">
                    <img src="${phone.image}" class="card-img-top p-3" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">${phone.phone_name}</h5>
                        <p class="card-text">${phone.brand}</p>
                        <div class="d-grid col-6 mx-auto">
                            <button onclick="loadDetails('${phone.slug}')" class="btn btn-info" type="button">Show Details</button>
                        </div>
                    </div>
                </div>
        `;
        displayContainer.appendChild(item);
    });
    if (phones.length > 20) {
        document.getElementById('show-all').style.display = 'block';
        const showAll = () => {
            phones.forEach(phone => {
                const item = document.createElement('div');
                item.classList.add('col');
                item.innerHTML = `
                        <div class="card h-100 rounded-3">
                            <img src="${phone.image}" class="card-img-top p-3" alt="...">
                            <div class="card-body">
                                <h5 class="card-title">${phone.phone_name}</h5>
                                <p class="card-text">${phone.brand}</p>
                                <div class="d-grid col-6 mx-auto">
                                    <button onclick="loadDetails('${phone.slug}')" class="btn btn-info" type="button">Show Details</button>
                                </div>
                            </div>
                        </div>
                `;
                displayContainer.appendChild(item);
            });
        };
    }
    else {
        document.getElementById('show-all').style.display = 'none';
    };
    toogleSpinner('none');
    toogleSearchResult('visible');
};
// load details
const loadDetails = async phoneId => {
    const url = `https://openapi.programming-hero.com/api/phone/${phoneId}`;
    const res = await fetch(url);
    const data = await res.json();
    showDetails(data.data);
};
// display details
const showDetails = phone => {
    console.log(phone);
    const detailsContainer = document.getElementById('display-details');
    const details = document.createElement('div');
    details.classList.add('card');
    details.innerHTML = `
                <img src="${phone.image}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">Name: ${phone.name}</h5>
                    <p class="card-title">Id: ${phone.releaseDate}</p>
                    <p class="card-title">Type: ${phone.brand}</p>
                    <p class="card-text">${phone.slug}</p>
                </div>
            `;
    detailsContainer.appendChild(details);
};