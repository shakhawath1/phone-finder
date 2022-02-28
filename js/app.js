// spinner control
const toogleSpinner = displayStyle => {
    document.getElementById('spinner').style.display = displayStyle;
};
const toogleSearchResult = displayStyle => {
    document.getElementById('display-result').style.display = displayStyle;
};
// search phone
const searchPhone = () => {
    const searchText = document.getElementById('search-field').value;
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
    const phones20 = phones.slice(0, 20);
    console.log(phones);
    const displayContainer = document.getElementById('display-result');
    phones20.forEach(phone => {
        const item = document.createElement('div');
        item.classList.add('col');
        item.innerHTML = `
                <div class="card h-100 rounded-3">
                    <img src="${phone.image}" class="card-img-top p-3" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">${phone.phone_name}</h5>
                        <p class="card-text">${phone.brand}</p>
                        <div class="d-grid gap-2 col-6 mx-auto">
                            <button class="btn btn-primary" type="button">Button</button>
                        </div>
                    </div>
                </div>
        `;
        displayContainer.appendChild(item);
    });
    if (phones.length > 20) {
        console.log('I am here');
    }
};
