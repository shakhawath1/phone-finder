// spinner control
const toogleSpinner = displayStyle => {
    document.getElementById('spinner').style.display = displayStyle;
};
const toogleSearchResult = displayStyle => {
    document.getElementById('display-result').style.visibility = displayStyle;
    document.getElementById('display-details').style.visibility = displayStyle;
};
// search phone
const searchPhone = () => {
    const searchText = document.getElementById('search-field').value;
    toogleSpinner('block');
    toogleSearchResult('hidden');
    document.getElementById('error').style.display = 'none';
    document.getElementById('search-field').value = '';
    loadPhone(searchText);
};
// load phone
const loadPhone = async searchText => {
    // error handling
    if (searchText === '') {
        document.getElementById('error').style.display = 'block';
        toogleSpinner('none');
    }
    else {
        const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
        const res = await fetch(url);
        const data = await res.json();
        displayPhone(data.data);
        document.getElementById('error').style.display = 'none';
    }
};
// display result
const displayPhone = phones => {
    // clean previous result
    const detailsContainer = document.getElementById('display-details');
    detailsContainer.textContent = '';
    const displayContainer = document.getElementById('display-result');
    displayContainer.textContent = '';
    // display for 20 phones
    const phones20 = phones.slice(0, 20);
    console.log(phones);
    phones20.forEach(phone => {
        const item = document.createElement('div');
        toogleSpinner('block');
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
    // display all phones
    if (phones.length > 20) {
        document.getElementById('show-all').style.display = 'block';
        document.getElementById('show-all').addEventListener('click', function () {
            // const showAll = () => {
            const duePhone = phones.slice(20, phones.length)
            duePhone.forEach(phone => {
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
            // };
        });
        if (phones.length === phones20.length) {
            document.getElementById('show-all').style.display = 'none';
        }
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
    detailsContainer.textContent = '';
    const details = document.createElement('div');
    details.classList.add('card', 'p-3', 'rounded-3', 'mx-auto');
    details.innerHTML = `
                <img src="${phone.image}" class="card-img-top p-3" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${phone.name}</h5>
                    <p class="card-title">${phone.releaseDate}</p>
                    <h6 class="card-title">${phone.brand}</h6>
                    <p class="card-text">${phone.slug}</p>
                    <p class="card-text"><span>Display:</span> ${phone.mainFeatures.displaySize}</p>
                    <p class="card-text"><span>Chipset:</span> ${phone.mainFeatures.chipSet}</p>
                    <p class="card-text"><span>Memory:</span> ${phone.mainFeatures.memory}</p>
                    <p class="card-text"><span>Storage:</span> ${phone.mainFeatures.storage}</p>
                    <p class="card-text"><span>Sensors:</span> ${phone.mainFeatures.sensors}</p>
                    <p class="card-text"><span>Others</span></p>
                    <p class="card-text"><span>WLAN:</span> ${phone.others.WLAN}</p>
                    <p class="card-text"><span>Bluetooth:</span> ${phone.others.Bluetooth}</p>
                    <p class="card-text"><span>GPS:</span> ${phone.others.GPS}</p>
                    <p class="card-text"><span>NFC:</span> ${phone.others.NFC}</p>
                    <p class="card-text"><span>Radio:</span> ${phone.others.Radio}</p>
                    <p class="card-text"><span>USB:</span> ${phone.others.USB}</p>
                    <p class="card-text"><span>Others</span> ${phone.others.NFC}</p>
                </div>
            `;
    detailsContainer.appendChild(details);
};