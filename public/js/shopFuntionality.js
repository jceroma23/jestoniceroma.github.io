//Varuables
var addItemId = 0;

var margin = 'mb-1';
// Function
function addtocart(item) {
    addItemId += 1;
    
    //create new div at Cart
    var selectedItem = document.createElement('div');
    selectedItem.classList.add('cartImg', 'd-flex', 'mt-2', 'justify-content-evenly', 'border', 'border-1', 'm-2');
    selectedItem.setAttribute('id', addItemId);
    //create new Image at cart
    var img = document.createElement('img');
    //set attribute of created image src is item divsion 1 (children 0) which img.
    // img.setAttribute('src', item.children[0].currentSrc);
    // img.setAttribute = document.getElementById("mainImgModule").getAttribute('src');
    img.setAttribute('src', document.getElementById("mainImgModule").getAttribute('src'));
    var title = document.createElement('div');
    title.innerText = document.getElementById('buyNowModalLabel').innerText; 
    title.setAttribute('class', 'text-center');
    //title.innerText = item.children[1].innerText;
    var price = document.createElement('div');
    price.innerText = document.getElementById('totalAmount').innerText; 
    //price.innerText = item.children[2].innerText;
    //price.setAttribute('class', 'text-center');
    //var select = document.createElement('span');
    //price.append(select);
//hidden
    var hiddenTotal = document.createElement('div');
    hiddenTotal.className = ('priceRow');
    //hiddenTotal.setAttribute('class', 'priceRow');
    hiddenTotal.innerText = parseInt(document.getElementById('hidePriceTotal').innerText);
    //let cartRow = cartItemContainer
//total Amount to be Payed

    // let totalamountArr = [];
    // totalamountArr.push(hiddenTotal);
    //  let sum = totalamountArr.reduce((a, b) => a + b, 0);

    //  var totalamount = document.createElement('div');
    //  totalamount = sum;
    
    // //test
    // var arrNumberDiv = document.createElement('div');
    // arrNumberDiv.push(hiddenTotal);

    
//funtion for total amount
let newPrice = hiddenTotal.innerText;
let total = localStorage.getItem('cardPrice');
if(total != null){
//convert string to Numbers
    newPrice = parseInt(newPrice);
    total = parseInt(total);
//addition
    localStorage.setItem('cardPrice', total + newPrice);
    total = localStorage.getItem('cardPrice');
    document.getElementById("totalAmount1").innerHTML = total;
    
}else {
    newPrice = parseInt(newPrice);
    localStorage.setItem('cardPrice', newPrice);
    total = localStorage.getItem('cardPrice');
    document.getElementById("totalAmount1").innerHTML = total;
}






    var cartItems = document.getElementById('cartItems');
//Display Output on Cart
    selectedItem.append(img);
    selectedItem.append(title);
    selectedItem.append(price);
    selectedItem.append(hiddenTotal);
//to Display Items on Cart
    cartItems.append(selectedItem);

   

// localStorage.setItem('cardPrice', hiddenTotal.innerText)


    // let cartItemContainer = document.getElementsByClassName('cart')[0];
    // let cartRows = cartItemContainer.getElementsByClassName('cartImg');
    // for(let i = 0; i < cartRows.length; i++){
    //     var cartRow = cartRows[i];
    //     let priceElement = cartRow.getElementsByClassName('priceRow')[0];
    //     //var prices = priceElement.innerText;
    //     var price = priceElement.innerHTML;
    //     console.log(`Jest`, price);
    // }
}


function addtoModule(item) {
    let moduleTitle = item.children[1].innerText;
    document.getElementById("buyNowModalLabel").innerHTML = moduleTitle;

    let imgModule = document.getElementById('imgModule');
    let img1 = document.getElementById("mainImgModule");
    img1.setAttribute('src', item.children[0].currentSrc);

    let price = item.children[2].innerText;
    document.getElementById("hidePriceTotal").innerHTML = price;
    document.getElementById("hidePrice").innerHTML = price;
    document.getElementById("priceID").innerHTML = "$" + price;
    document.getElementById("totalAmount").innerHTML ="$" + price;
    let selectedItems = document.createElement('div');
    selectedItems.classList.add('imgModule');
    selectedItems.append(img1);
    imgModule.append(selectedItems);
}

function totalPrice() {
    let quantity = parseInt(document.getElementById("itemQuantity").value);
    let price = parseInt(document.getElementById("hidePrice").innerText);
    let sum = 0;
    sum = price * quantity;
    document.getElementById("totalAmount").innerHTML = "$" + sum;
    document.getElementById("hidePriceTotal").innerHTML = sum;
}