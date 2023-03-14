const managaer = new Manager();

const wDate = document.getElementById("date");
const wTime = document.getElementById("time");
let date = new Date();
wDate.textContent = date.getMyDate();
wTime.textContent = date.getMyTime();
setInterval(() => {
    date = new Date();
    wDate.textContent = date.getMyDate();
    wTime.textContent = date.getMyTime();
}, 15 * 1e3);

const swiper = new Swiper(".swiper", {
    slidesPerView: "auto",
    spaceBetween: 10,
    centeredSlides: true,
    roundLengths: true,
    slideToClickedSlide: true,
    mousewheel: {
        invert: false,
    },
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
});
