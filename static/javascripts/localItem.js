if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}

function ready() {
    if (localStorage.getItem('cartNumbers') === undefined) {
       localStorage.setItem('cartNumbers',0);
    }
}


