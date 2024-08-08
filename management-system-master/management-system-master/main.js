//ID Shortcut
const id = (id) => document.getElementById(id);

// ID Elements
let title = id("title");
let price = id("price");
let taxes = id("taxes");
let ads = id("ads");
let discount = id("discount");
let count = id("count");
let category = id("category");
let total = id("total");
let create = id("create");
let update = id("update");
let del = id("delete");
let searchInput = id("searchinp");

//variables
let mood = "create";
let temp;

// Calculate the total price
function calc() {
  if (price.value != "") {
    let totalprice = +price.value + +taxes.value + +ads.value - +discount.value;
    total.innerText = totalprice + "$";
    total.style.backgroundColor = "green";
    total.style.color = "white";
  } else {
    total.innerText = "$0";
    total.style.backgroundColor = "red";
    total.style.color = "white";
  }
}
//read all the data and push them in an array
let products = [];
if (localStorage.getItem("product") != null) {
  products = JSON.parse(localStorage.getItem("product"));
}

//create products
function createProducts() {
  count.style.display = "block";
  let newProduct = {
    title: title.value,
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    total: total.innerHTML,
    count: count.value,
    category: category.value,
  };

  if (mood == "create") {
    if (count.value > 1) {
      if (count.value <= 100) {
        for (let i = 0; i < count.value; i++) {
          products.push(newProduct);
        }
        clearInputs();
      } else {
        alert("too many items");
      }
    } else {
      products.push(newProduct);
      clearInputs();
    }

    total.style.backgroundColor = "red";
    total.innerHTML = "$0";
  }
  //end create
  else {
    products[temp] = newProduct;
    mood = "create";
    create.innerHTML = "create";
    create.style.backgroundColor = "rgb(22, 44, 246)";
    clearInputs();
  }
  addDataToLocalStorage();
}

function clearInputs() {
  (title.value = ""),
    (price.value = ""),
    (taxes.value = ""),
    (ads.value = ""),
    (discount.value = ""),
    (total.value = ""),
    (count.value = ""),
    (category.value = "");
}
create.addEventListener("click", () => {
  if (!title.value) {
    alert("please enter title of the product  ");
    return;
  }
  if (!price.value) {
    alert("please enter price of the product  ");
    return;
  }
  if (!category.value) {
    alert("please enter category of the product  ");
    return;
  }

  createProducts();
  showProducts();
});

//show our products dynamically in our table
function showProducts() {
  deleteAllbtn();

  let body = "";
  for (let i = 0; i < products.length; i++) {
    body += ` 
        <tr>
            <td>${i}</td>
            <td>${products[i].title}</td>
            <td>${products[i].price}</td>
            <td>${products[i].ads}</td>
            <td>${products[i].taxes}</td>
            <td>${products[i].discount}</td>
            <td>${products[i].total}</td>
            <td>${products[i].category}</td>
            <td><button  onclick ='updatefunc(${i})'  class="update" id="update">update</button></td>
            <td><button  onclick='deletefunc(${i})' class="delete" id="delete">delete</button></td>
        </tr>`;
  }

  document.querySelector("tbody").innerHTML = body;
  // console.log(body);
}
showProducts();

//delete functions
function deletefunc(index) {
  products.splice(index, 1);
  addDataToLocalStorage();
  showProducts();
}

// update function
function updatefunc(index) {
  title.value = products[index].title;
  price.value = products[index].price;
  ads.value = products[index].ads;
  category.value = products[index].category;
  discount.value = products[index].discount;
  taxes.value = products[index].taxes;
  total.innerHTML = products[index].total;
  scroll({
    top: 0,
    behavior: "smooth",
  });

  count.style.display = "none";
  create.innerHTML = "Update";
  create.style.backgroundColor = "green";
  mood = "update";

  temp = index;
}

//add data to local storage
function addDataToLocalStorage() {
  localStorage.setItem("product", JSON.stringify(products));
}

//delete all button
function deleteAllbtn() {
  if (products.length > 0) {
    id("da").style.display = "block";
    id("da").innerHTML = `DeleteAll (${products.length}Products)`;
  } else {
    id("da").style.display = "none";
  }
}

id("da").onclick = function () {
  products.splice(0);
  addDataToLocalStorage();
  showProducts();
};

//searching
let searchstat = "stitle";

//searching function
function searching(id) {
  // console.log(id);
  if (id == "stitle") {
    searchstat = "stitle";
    searchInput.placeholder = "search by title";
  } else {
    searchInput.placeholder = "search by category";
    searchstat = "ctitle";
  }

  searchInput.focus();
}

// search input 
function getsearchdata(value) {
  let body = "";
  if (searchstat == "stitle") {
    for (let i = 0; i < products.length; i++) {
      if (products[i].title.toLowerCase().includes(value.toLowerCase())) {
        body += ` 
                <tr>
                <td>${i}</td>
            <td>${products[i].title}</td>
            <td>${products[i].price}</td>
            <td>${products[i].ads}</td>
            <td>${products[i].taxes}</td>
            <td>${products[i].discount}</td>
            <td>${products[i].total}</td>
            <td>${products[i].category}</td>
            <td><button  onclick ='updatefunc(${i})'  class="update" id="update">update</button></td>
            <td><button  onclick='deletefunc(${i})' class="delete" id="delete">delete</button></td>
            </tr>`;
      }
    }
  } else {
    for (let i = 0; i < products.length; i++) {
      if (products[i].category.toLowerCase().includes(value.toLowerCase())) {
        body += ` 
            <tr>
            <td>${i}</td>
        <td>${products[i].title}</td>
        <td>${products[i].price}</td>
        <td>${products[i].ads}</td>
        <td>${products[i].taxes}</td>
        <td>${products[i].discount}</td>
        <td>${products[i].total}</td>
        <td>${products[i].category}</td>
        <td><button  onclick ='updatefunc(${i})'  class="update" id="update">update</button></td>
        <td><button  onclick='deletefunc(${i})' class="delete" id="delete">delete</button></td>
        </tr>`;
      }
    }
  }
  document.querySelector("tbody").innerHTML = body;
}
