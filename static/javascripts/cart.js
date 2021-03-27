if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}

function ready() {
    var removeCartItemButtons = document.getElementsByClassName('remove')
    for (var i = 0; i < removeCartItemButtons.length; i++) {
        var button = removeCartItemButtons[i]
        button.addEventListener('click', removeCartItem)
    }
    var addToCartButtons = document.getElementsByClassName('fav-btn')
    for (var i = 0; i < addToCartButtons.length; i++) {
        var buttonCart = addToCartButtons[i]
        buttonCart.addEventListener('click', addToCartClicked)
    }

    var cancelCartbutton = document.getElementById('cart-cancel');
    if (cancelCartbutton)
        cancelCartbutton.addEventListener('click', cancelCart)
}

function addToCartClicked(event) {
    var button = event.target
    var mainItem = button.parentElement.parentElement
    var price = mainItem.getElementsByClassName('heading-h1')[0].innerText
    var imgsrc = mainItem.getElementsByClassName('product-image-img')[0].src
    cartNumbers()
    addItemToCart(imgsrc, price)
}

function addItemToCart(imgsrc, price) {
    var cartRow = document.createElement("div")
    cartRow.classList.add('cart-row')
    var cartItems = document.getElementsByClassName('cart-items')[0]
    var cartRowContents = `<img src="${imgsrc}"/>
    <div class="cart-price"> 
      <h1>${price}</h1>
    </div>
    <div class="button-item"> 
      <button class="remove">Remove</button>
    </div>`
    cartRow.innerHTML = cartRowContents
    cartItems.append(cartRow)
    cartRow.getElementsByClassName('remove')[0].addEventListener('click', removeCartItem)
}
function onloadCartNumbers() {
    var productNumbers = localStorage.getItem('cartNumbers')
    productNumbers = parseInt(productNumbers)
    if (productNumbers) {
        document.querySelector('.nav-list .span-cart').innerText = productNumbers + 1;
    }
}

function cartNumbers() {
    var productNumbers = localStorage.getItem('cartNumbers')
    productNumbers = parseInt(productNumbers)
    if (productNumbers) {
        localStorage.setItem('cartNumbers', productNumbers + 1)
        document.querySelector('.nav-list .span-cart').innerText = productNumbers + 1;
    }
    else {
        localStorage.setItem('cartNumbers', 1)
        document.querySelector('.nav-list .span-cart').innerText = productNumbers + 1;
    }
}

onloadCartNumbers()

function cancelCart(event) {
    var cartItems = document.getElementsByClassName('cart-items')[0]
    while (cartItems.hasChildNodes()) {
        cartItems.removeChild(cartItems.firstChild)
    }
}

function removeCartItem(event) {
    var button = event.target
    button.parentElement.parentElement.remove()
}