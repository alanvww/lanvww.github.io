// Add eventHandler
document.getElementById("closebtn").addEventListener('click', function () {
    document.getElementById("mySidenav").style.width = "0";
});

document.getElementById("sideNavOpen").addEventListener('click', function () {
    document.getElementById("mySidenav").style.width = "250px";
});