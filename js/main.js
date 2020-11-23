'use strict';

// When the user scrolls the page, execute myFunction
window.onscroll = _ => {
    progressBar()
};

function progressBar() {
    let winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    let height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    let scrolled = (winScroll / height) * 100;
    if (scrolled > 13) {
        document.querySelector("#navbar").style.top = 0;
    } else {
        document.querySelector("#navbar").style.top = "auto";
    }

    if (scrolled == 0) {
        document.querySelector(".progress-container").style.display = 'none';

    } else {
        document.querySelector(".progress-container").style.display = 'block';
        document.getElementById("myBar").style.width = scrolled + "%";
        document.getElementById("myBar").style.background = hsl(scrolled, 50, 50);
    }

}

window.onload = function () {
    init();
}

function init() {
    let title = document.getElementById("title");
    let titleChange;
    titleChange = setInterval(function () {
        title.innerText = titleRandom();
    }, 2000);
    title.addEventListener("mousemove", function () {
        title.innerText = "Alan Ren";
        clearInterval(titleChange);
    });
    title.addEventListener("mouseout", function () {
        titleChange = setInterval(function () {
            title.innerText = titleRandom();
        }, 4000);
    })

    const copyright = `Made by <a href="mailto:alan.ren@lan.codes">@Junhao Ren</a> &copy;` +
        new Date().getFullYear();
    document.getElementById('copyright').innerHTML = copyright;




}

function titleRandom() {
    let random = Math.floor(Math.random() * 6);
    switch (random) {
        case 0:
            return "a University Student"
            break;

        case 1:
            return " an UI/UX Designer & Developer"
            break;

        case 2:
            return " a Gamer"
            break;

        case 3:
            return " a Programmer"
            break;

        case 4:
            return " an Art Lover"
            break;


        case 5:
            return " Alan Ren"
            break;
    }
}