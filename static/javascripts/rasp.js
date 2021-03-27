if(document.readyState=='loading'){
    document.addEventListener('DOMContentLoaded',ready)
}else{
    ready()
}

function ready(){
    burger = document.querySelector('.burger')
    navbar = document.querySelector('.navbar')
    navList = document.querySelector('.nav-list')
    rightNav = document.querySelector('.rightNav')
    burger.addEventListener('click', ()=>{
        rightNav.classList.toggle('v-class-resp');
        navList.classList.toggle('v-class-resp');
        navbar.classList.toggle('h-nav-resp');
    })
}
        