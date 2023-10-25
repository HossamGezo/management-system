let title = document.querySelector(".title");
let price = document.querySelector(".price");
let taxes = document.querySelector(".taxes");
let ads = document.querySelector(".ads");
let discount = document.querySelector(".discount");
let category = document.querySelector(".category");
let total = document.querySelector(".total");
let count = document.querySelector(".count");
let create = document.querySelector(".create");
let bodyData = document.querySelector("tbody");
let form = document.querySelector(".form");
let numProduct = document.querySelector(".num-product");
let wrapper = document.querySelector("#delete-all-wrapper");
let mood = "create";
let tmp;
let search = document.querySelector(".search");

// localStorage.clear();

// ---------- Get Total
let getTotal = () => {
  if (price.value !== "") {
    total.innerText = `Total : ${(+price.value + +taxes.value + +ads.value) - +discount.value}`;
    total.style.backgroundColor = "#004300";
  } else {
    total.innerText = "Total :";
    total.style.backgroundColor = "#841113";
  }
}
price.addEventListener("input", getTotal);
taxes.addEventListener("input", getTotal);
ads.addEventListener("input", getTotal);
discount.addEventListener("input", getTotal);

// ---------- Create Product
let myProducts = [];

if (localStorage.product) {
  myProducts = JSON.parse(localStorage.product);
}

let createProduct = () => {
  let product = {
    title: title.value,
    price: +price.value,
    taxes: +taxes.value,
    ads: +ads.value,
    discount: +discount.value,
    total: total.innerText.slice(+total.innerText.indexOf(":") + 1),
    count: +count.value,
    category: category.value,
  }
  if (title.value !== "" && price.value !== "" && category.value !== "" && product.count < 100 ) {
    if (mood === "create") {
      if (product.count > 1) {
        for (let i = 0; i < product.count; ++i) {
          myProducts.push(product);
        }
      } else {
        myProducts.push(product);
      }
    } else {
      myProducts[tmp] = product;
      count.style.display = "block";
      create.innerText = "Create";
      mood = "create";
    }
    clearInputs();
  }
  addToLocalStorage();
}
create.addEventListener("click", (item) => {
  item.preventDefault();
  createProduct();
  showData();
  getTotal();
});

// ---------- Clear Inputs
let clearInputs = () => {
  title.value = "";
  price.value = "";
  taxes.value = "";
  ads.value = "";
  discount.value = "";
  count.value = "";
  category.value = "";
}

// ---------- Add Product To LocalStorage
let addToLocalStorage = () => {
  localStorage.product = JSON.stringify(myProducts);
}

// ---------- Read Data 
let showData = () => {
  bodyData.innerHTML = "";
  for (let i = 0; i < myProducts.length; ++i) {
    bodyData.innerHTML += `
      <tr class="product">
        <td>${i+1}</td>
        <td>${myProducts[i].title}</td>
        <td>${myProducts[i].price}</td>
        <td>${myProducts[i].taxes}</td>
        <td>${myProducts[i].ads}</td>
        <td>${myProducts[i].discount}</td>
        <td>${myProducts[i].total}</td> 
        <td>${myProducts[i].category}</td>
        <td><button class="update mybtn" onclick="updateProduct(${i})">update</button></td>
        <td><button class="delete mybtn" onclick="deleteProduct(${i})">delete</button></td>
      </tr>
    `;
  }
  if (myProducts.length > 0) {
    wrapper.innerHTML = `
      <button class="delete-all mybtn" onclick="deleteAll()">delete all <span class="num-product">( ${myProducts.length} )</span></button> 
    `;
  } else {
    wrapper.innerHTML = "";
  } 
}
showData();

// ---------- Delete Product
let deleteProduct = (productNumber) => {
  // Remove Element From Array
  myProducts.splice(productNumber, 1);
  // Update LocalStorage
  addToLocalStorage();
  // Show Data
  showData();
}

// ---------- Delete All Products
let deleteAll = () => {
  // Clear Products Array
  myProducts.splice(0); 
  // Update LocalStorage
  localStorage.clear(); 
  // Show Data
  showData();
}

// ---------- Update Product
let updateProduct = (productNumber) => {
  title.value = myProducts[productNumber].title;
  price.value = myProducts[productNumber].price;
  taxes.value = myProducts[productNumber].taxes;
  ads.value = myProducts[productNumber].ads;
  discount.value = myProducts[productNumber].discount;
  getTotal();
  count.style.display = "none";
  category.value = myProducts[productNumber].category;
  create.innerText = "update";
  mood = "update";
  tmp = productNumber;
  scroll({
    top: 0,
    behavior: "smooth",
  });
}

// ---------- Search Product
let searchMood = "title";

let getSearchMood = (id) => {
  if (id === "searchTitle") {
    searchMood = "title";
  } else {
    searchMood = "category";
  }
  search.placeholder = `search by ${searchMood}`;
  search.focus();
  search.value = "";
  showData();
}

let searchData = (value) => {
  bodyData.innerHTML = "";
  if (searchMood === "title") {
    for (let i = 0; i < myProducts.length; ++i) {
      if (myProducts[i].title.includes(value)) {
        bodyData.innerHTML += `
        <tr class="product">
          <td>${i+1}</td>
          <td>${myProducts[i].title}</td>
          <td>${myProducts[i].price}</td>
          <td>${myProducts[i].taxes}</td>
          <td>${myProducts[i].ads}</td>
          <td>${myProducts[i].discount}</td>
          <td>${myProducts[i].total}</td> 
          <td>${myProducts[i].category}</td>
          <td><button class="update mybtn" onclick=updateProduct(${i})>update</button></td>
          <td><button class="delete mybtn" onclick="deleteProduct(${i})">delete</button></td>
        </tr>
      `;
      }
    }
  } else {
    for (let i = 0; i < myProducts.length; ++i) {
      if (myProducts[i].category.includes(value)) {
        bodyData.innerHTML += `
        <tr class="product">
          <td>${i+1}</td>
          <td>${myProducts[i].title}</td>
          <td>${myProducts[i].price}</td>
          <td>${myProducts[i].taxes}</td>
          <td>${myProducts[i].ads}</td>
          <td>${myProducts[i].discount}</td>
          <td>${myProducts[i].total}</td> 
          <td>${myProducts[i].category}</td>
          <td><button class="update mybtn" onclick=updateProduct(${i})>update</button></td>
          <td><button class="delete mybtn" onclick="deleteProduct(${i})">delete</button></td>
        </tr>
      `;
      }
    }
  }
}

// ---------- Clean Data















