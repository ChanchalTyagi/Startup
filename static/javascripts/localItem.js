if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}

function ready() {
    if (localStorage.getItem('cartNumbers') === null) {
       localStorage.setItem('cartNumbers',0);
    }
}

