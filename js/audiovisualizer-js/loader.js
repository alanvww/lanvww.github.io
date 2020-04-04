// Junhao Ren
// loader.js

import * as main from "./main.js";

// Windows onload event
window.onload = () => {
    console.log("window.onload called");
    main.init();
}

// Windows resize event
window.addEventListener("resize", () => {
    main.windowChange();
    console.log("Canvas Resized");
});