let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let categ = document.getElementById("categ");
let submit = document.getElementById("submit");
let Ii;
let btnmood = 'create';
//get total
function gettotal() {
    if (price.value != "" && taxes.value != "" && ads.value != "") {
        let result = +price.value + +taxes.value + +ads.value - +discount.value;
        total.innerHTML = result;
        total.style.background = "green";
    } else {
        total.style.background = "red";
    }
}

//create product
let dataar;
if (localStorage.data != null) {
    dataar = JSON.parse(localStorage.data)
} else {
    dataar = []
}


submit.onclick = function (i) {
    title.focus();
    let dataob = {
        title: title.value,
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML,
        count: count.value,
        categ: categ.value,
    }
    //save localstorage
    if (btnmood == 'create') {
        if (price.value != '' && title.value != '') {
            if (count.value > 1) {
                for (let i = 0; i < count.value; i++) {
                    dataar.push(dataob);
                }
            } else {
                dataar.push(dataob);
            }
            localStorage.setItem('data', JSON.stringify(dataar))
            read()
        } else {
            alert(" مش ناقصه غباوه    .   .   .    اكتب زفت داتا")
        }
    } else {
        dataar[Ii] = dataob;
        submit.innerHTML = 'create'
        count.style.display = 'block'
        read();
        tbnmood = 'create'

    }
    claerdata();

}

//clear inputs
function claerdata() {
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value = '';
    total.innerHTML = '';
    count.value = '';
    categ.value = '';
}

// //read
function read() {
    let table = '';
    for (let i = 0; i < dataar.length; i++) {
        table += `
            <tr>
                <td>${i}</td>
                <td>${dataar[i].title}</td>
                <td>${dataar[i].price}</td>
                <td>${dataar[i].taxes}</td>
                <td>${dataar[i].ads}</td>
                <td>${dataar[i].discount}</td>
                <td>${dataar[i].total}</td>
                <td>${dataar[i].categ}</td>
                <td><button onclick="updata(${i})" id="update">update</button></td>
                <td><button onclick="deletedata(${i})" id="delete">delete</button></td>
            </tr>`
    }
    document.getElementById('tbody').innerHTML = table;
    if (dataar.length > 0) {
        let deletall = document.getElementById("deletall")
        deletall.innerHTML = `<button onclick="deletall()" >deletall(${dataar.length})</button>`
    }
}
read()

//count
//delete

function deletedata(i) {
    dataar.splice(i, 1);
    localStorage.data = JSON.stringify(dataar);
    read()
}

function deletall() {
    localStorage.clear();
    dataar.splice(0)
    location.reload()

    // read()
}
//update
function updata(i) {
    title.value = dataar[i].title;
    price.value = dataar[i].price;
    taxes.value = dataar[i].taxes;
    ads.value = dataar[i].ads;
    discount.value = dataar[i].discount;
    total.innerHTML = dataar[i].total;
    categ.value = dataar[i].categ;
    submit.innerHTML = 'updata';
    count.style.display = 'none'
    gettotal();
    Ii = i;
    btnmood = 'update';
    title.focus();


}
//search

let serchMood = 'titel';
function getsearchmood(id) {
    let serch =document.getElementById("search")
    if (id == 'searchtital') {
        serchMood = 'title';
        serch.placeholder="title";
    } else {
        serchMood = 'categ';
        serch.placeholder="categ";
    }
    serch.focus()
}
function searchdata(value){
    console.log(value)
}


//clean data
