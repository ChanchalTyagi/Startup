if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}

function ready() {
    var productNumbers = localStorage.getItem('cartNumbers')
    productNumbers = parseInt(productNumbers)
    document.querySelector('.navbar .nav-list .span-cart').innerText=productNumbers;
}



