export const mouseTracker = function () {

    onmousemove = function (e) {
        console.log("mouse location:", e.clientX, e.clientY)
    }
}