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
    console.log(data);
}

