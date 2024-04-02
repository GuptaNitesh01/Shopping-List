let inputVal = document.getElementById("item-input");
let listVal = document.getElementById("item-list");
let arr = [];
let no = 0;
var newArr = localStorage.getItem("items");
var finalNewArr = JSON.parse(newArr);

if (finalNewArr != null) {
  arr = finalNewArr;
  displayitem(finalNewArr);
}

inputVal.addEventListener("keypress", function () {
  if (event.key == "Enter") {
    event.preventDefault();
    document.getElementsByTagName("button")[0].click();
  }
});

document
  .getElementsByClassName("container")[0]
  .addEventListener("submit", function (e) {
    e.preventDefault(true);

    document.getElementsByClassName("btn")[0].innerHTML =
      '\n           <i class="fa-solid fa-plus"></i> Add Item\n          ';
    document.getElementsByTagName("button")[0].style.backgroundColor = "black";

    if (inputVal.value != "") {
      if (finalNewArr == null) {
        arr.push(inputVal.value);
        localStorage.setItem("items", JSON.stringify(arr));
        // console.log(arr);
        // removes(arr);
        listVal.innerHTML = " ";
        displayitem(arr);
      } else {
        // arr = arr.concat(finalNewArr);
        finalNewArr = [];

        arr = arr.concat(inputVal.value);
        // arr.push(inputVal.value);
        // console.log("currentarr"=arr);
        localStorage.setItem("items", JSON.stringify(arr));

        // removes(arr);
        listVal.innerHTML = " ";
        displayitem(arr);
      }
    } else {
      confirm("Please Enter Item");
    }
    inputVal.value = "";
  });

document.getElementById("clear").addEventListener("click", function (e) {
  localStorage.removeItem("items");
  arr = [];
  finalNewArr = [];
  inputVal.value = "";
  listVal.innerHTML = "";
});

function displayitem(arr) {
  // console.log(arr);
  listVal.innerHTML = "";

  arr.forEach((item, index) => {
    let list = document.createElement("li");
    list.innerText = item;
    list.addEventListener("click", updateval);
    let button = document.createElement("button");
    button.innerHTML = '<i class="fa-solid fa-xmark"></i>';
    button.className = "remove-item btn-link text-red";
    button.setAttribute("data-index", index); // Set data-index attribute
    button.addEventListener("click", removeItem); // Add event listener to remove button
    // list.id = no;
    // no++;
    list.id = index;
    list.appendChild(button);
    listVal.appendChild(list);
  });
}
function removeItem() {
  event.stopPropagation();
  let index = event.target.parentElement.getAttribute("data-index"); // Get the index from data-index attribute
  // console.log(index);
  arr.splice(index, 1); // Remove the item from arr
  localStorage.setItem("items", JSON.stringify(arr)); // Update local storage
  listVal.innerHTML = ""; // Clear the list
  displayitem(arr); // Re-display the updated list
}

function updateval() {
  event.stopPropagation();
  // console.log("hello");
  let index = event.target.getAttribute("id");
  // console.log(index);
  let aptVal = document.getElementsByTagName("li")[index].innerText;
  // console.log(aptVal);
  inputVal.value = aptVal;
  // displayitem(arr);

  // listVal.innerHTML = ""; // Clear the list
  // displayitem(arr); // Re-display the updated list
  document.getElementsByClassName("btn")[0].innerHTML =
    '\n            <i class="fa-solid fa-plus"></i> Update\n          ';
  document.getElementsByTagName("button")[0].style.backgroundColor = "green";

  arr.splice(index, 1); // Remove the item from arr
  // console.log(arr);
  localStorage.setItem("items", JSON.stringify(arr)); // Update local storage

  // console.log(arr);
}

document.getElementById("filter").addEventListener("input", filtering);

function filtering() {
  // console.log("he");
  // console.log(arr);
  // let filteringArr = arr;
  // let filteringArr = [];
  const filterValue = document.getElementById("filter").value.toUpperCase();
  // console.log(filterValue); // Filter the array based on the filter value
  let filteringArr = arr.filter((item) =>
    item.toUpperCase().includes(filterValue)
  );
  displayitem(filteringArr);

  // if (document.getElementById("filter").value != "") {
  //   console.log(filteredArr);
  //   displayitem(filteringArr);
  // } else {
  //   displayitem(arr);
  // }
}
