let title=document.getElementById("title")
let price=document.getElementById("price")
let taxes=document.getElementById("taxes")
let ads=document.getElementById("ads")
let discount=document.getElementById("discount")
let total=document.getElementById("total")
let count=document.getElementById("count")
let category=document.getElementById("category")
let deleteAll=document.getElementById("deleteAll");
let addBtn=document.getElementById("Add");
let search=document.getElementById('search');
let mood='Add';
let productContainer=[];
if(localStorage.getItem("product") !==null){
    productContainer=JSON.parse(localStorage.getItem("product"))
    displayData();
}


//get total
function getTotal(){
    if(price.value!=""){
        const result=(+price.value + +taxes.value + +ads.value)- +discount.value;
        total.innerHTML=result;
        total.style.background='#040';
    }
    else{
        total.innerHTML='';
        total.style.background='rgb(164, 11, 0)';
    }
}
//addProduct
function addProduct(){
let newProduct ={
    title:title.value,
    price:price.value,
    taxes:taxes.value,
    ads:ads.value,
    discount:discount.value,
    total:total.innerHTML,
    count:count.value,
    category:category.value,
}
if(title.value !=''&&price.value!=''&&category.value!=''&&newProduct.count<100){
    if(mood === 'Add'){
        if(newProduct.count>1){
            for(let i=0;i < newProduct.count;i++){
                productContainer.push(newProduct);
            }
        }
        else{
            productContainer.push(newProduct);
        }
    }
    else{
         productContainer[updatedIndex]=newProduct;
         mood='Add';
         addBtn.innerHTML='Add';
         count.style.display='block'
    }
    clearData();
}
localStorage.setItem("product",JSON.stringify(productContainer))
displayData();
}
function clearData(){
    title.value=null;
    price.value=null;
    taxes.value=null;
    ads.value=null;
    discount.value=null;
    total.innerHTML=null;
    count.value=null;
    category.value=null;
}
function displayData(){
    getTotal();
    let box=``;
    for(let i=0;i<productContainer.length;i++){
        box+=`   <tr>
                    <td>${i+1}</td>
                    <td>${productContainer[i].title}</td>
                    <td>${productContainer[i].price}</td>
                    <td>${productContainer[i].taxes}</td>
                    <td>${productContainer[i].ads}</td>
                    <td>${productContainer[i].discount}</td>
                    <td>${productContainer[i].total}</td>
                    <td>${productContainer[i].category}</td>
                    <td><button onclick="UpdateProduct(${i})" id="update">update</button></td>
                    <td><button onclick="deleteProduct(${i})" id="delete">delete</button></td>
                </tr>`
    }
    document.getElementById('tbody').innerHTML=box;
    if(productContainer.length>0){
    deleteAll.innerHTML=`<button onclick="deleteAllProducts()"  id="delete-all">delete All(${productContainer.length})</button>`;
    }
    else{
        deleteAll.innerHTML=''; 
    }
}
function deleteProduct(index){
productContainer.splice(index,1);
localStorage.setItem("product",JSON.stringify(productContainer));
displayData();
}
function deleteAllProducts(){
localStorage.clear();
productContainer.splice(0);
displayData();
}
let updatedIndex;
function UpdateProduct(index){
    updatedIndex=index;
title.value=productContainer[index].title;
price.value=productContainer[index].price;
taxes.value=productContainer[index].taxes;
ads.value=productContainer[index].ads;
discount.value=productContainer[index].discount;
total.value=productContainer[index].total;
getTotal();
count.style.display='none';
category.value=productContainer[index].category;
addBtn.innerHTML='Update'
mood='Update'
scroll({
    top:0,
    behavior:"smooth",
})
}
let searchMood='title';
function getSearchMood(id){
    
    if(id == 'searchTitle'){
        searchMood='title'
    }
    else{
    searchMood='category';
    }
    search.setAttribute('Placeholder','Search By '+searchMood)
    search.focus()
    search.value='';
    displayData();
}
function searchProduct(value){
    let box=``;
    for(let i=0;i<productContainer.length;i++){
        if(searchMood == 'title'){
        
            if(productContainer[i].title.toLowerCase().includes(value.toLowerCase())){
                box+=`   <tr>
                <td>${i}</td>
                <td>${productContainer[i].title}</td>
                <td>${productContainer[i].price}</td>
                <td>${productContainer[i].taxes}</td>
                <td>${productContainer[i].ads}</td>
                <td>${productContainer[i].discount}</td>
                <td>${productContainer[i].total}</td>
                <td>${productContainer[i].category}</td>
                <td><button onclick="UpdateProduct(${i})" id="update">update</button></td>
                <td><button onclick="deleteProduct(${i})" id="delete">delete</button></td>
            </tr>`
            }
        }
    
    else{
        
            if(productContainer[i].category.toLowerCase().includes(value.toLowerCase())){
                box+=`   <tr>
                <td>${i}</td>
                <td>${productContainer[i].title}</td>
                <td>${productContainer[i].price}</td>
                <td>${productContainer[i].taxes}</td>
                <td>${productContainer[i].ads}</td>
                <td>${productContainer[i].discount}</td>
                <td>${productContainer[i].total}</td>
                <td>${productContainer[i].category}</td>
                <td><button onclick="UpdateProduct(${i})" id="update">update</button></td>
                <td><button onclick="deleteProduct(${i})" id="delete">delete</button></td>
            </tr>`
            }
        }
    }

    
    document.getElementById('tbody').innerHTML=box;
}
