if(document.readyState =='loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}


function ready () {
    var removeCartItemsBtn = document.getElementsByClassName('btn-danger')
    console.log(removeCartItemsBtn)
    for(var i = 0; i <removeCartItemsBtn.length; i++) {
    var button = removeCartItemsBtn[i];
    button.addEventListener('click', removeCartItem)
    }

    var quantityInputs = document.getElementsByClassName('cart-quantity-input')
    for(var i = 0; i < quantityInputs.length; i++){
        var input = quantityInputs[i]
        input.addEventListener('change', quantChanged)
    }

    var orderButtons = document.getElementsByClassName('menu-btn')
    for (i = 0; i < orderButtons.length; i++ ){
        var order = orderButtons[i]
        order.addEventListener('click', addOrderClick)
    }

    document.getElementsByClassName('btn-purchase')[0].addEventListener('click',purchaseClicked)

    
}

function purchaseClicked(event) {
    alert('Thank you! for the order.')
    var cartItems = document.getElementsByClassName('cart-items')[0]
    while(cartItems.hasChildNodes()){
        cartItems.removeChild(cartItems.firstChild)
    }
    updateCartTotal()
}

function removeCartItem(event) {
    var btnClicked = event.target
        btnClicked.parentElement.parentElement.remove()
        updateCartTotal()
}

function quantChanged(event) {
    var input = event.target
    if(isNaN(input.value) || input.value <= 0) {
        input.value =1
    }
    updateCartTotal()
}

function addOrderClick(event) {
    var button = event.target
    var shopItem = button.parentElement.parentElement
    var title = shopItem.getElementsByClassName('menu-name')[0].innerText
    var price = shopItem.getElementsByClassName('menu-price')[0].innerText
    var imgSrc = shopItem.getElementsByClassName('menu-image')[0].src
    addToCart(title, price, imgSrc)
    updateCartTotal()
}

function addToCart(title, price, imgSrc) {
    var cartRow = document.createElement('div')
    cartRow.classList.add('cart-row')
    var cartItems = document.getElementsByClassName('cart-items')[0]
    var cartItemsName = cartItems.getElementsByClassName('cart-item-title')
    for (var i = 0; i < cartItemsName.length; i++) {
        if(cartItemsName[i].innerText == title){
            alert('Item already added to cart')
            return
        }
    }
    var cartRowContents = `
    <div class="cart-item cart-column">
        <img class="cart-item-image" src="${imgSrc}" width="100" height="100">
        <span class="cart-item-title" >${title}</span>
    </div>
    <span class="cart-price cart-column">${price}</span>
    <div class="cart-quantity cart-column">
        <input class="cart-quantity-input" type="number" value="1">
        <button class="btn btn-danger cart-quant-btn" role="button">REMOVE</button>
    </div>`
    cartRow.innerHTML = cartRowContents
    cartItems.append(cartRow)
    cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem)
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantChanged)
}
function updateCartTotal() {
var cartItemContainer = document.getElementsByClassName('cart-items')[0]
var cartRows = cartItemContainer.getElementsByClassName('cart-row')
var total = 0   
    for(var i = 0; i < cartRows.length; i++) {
            var cartRow = cartRows[i]
            var priceElement = cartRow.getElementsByClassName('cart-price')[0]
            var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]
            //console.log(priceElement, quantityElement)
            var price = parseFloat(priceElement.innerText.replace('AED', ''));
            //var price = priceElement.innerText
            //console.log(price)
            var quantity = quantityElement.value 
            //console.log(price * quantity)
            total = total + (price* quantity)
        }
        total = Math.round(total*100)/100
    document.getElementsByClassName('cart-total-price')[0].innerText = 'AED ' + total

}