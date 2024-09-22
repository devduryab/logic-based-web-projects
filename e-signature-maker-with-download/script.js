document.addEventListener('DOMContentLoaded', function () {
    var canvas = document.getElementById('signature-pad');
    var ctx = canvas.getContext('2d');
    var drawing = false;
    var strokes = [];

    // Helper function to get mouse/touch coordinates
    function getCoordinates(e) {
        var rect = canvas.getBoundingClientRect();
        var x, y;

        if (e.touches) { // For touch events
            x = e.touches[0].clientX - rect.left;
            y = e.touches[0].clientY - rect.top;
        } else { // For mouse events
            x = e.clientX - rect.left;
            y = e.clientY - rect.top;
        }

        return { x: x, y: y };
    }

    // Mouse events
    canvas.addEventListener('mousedown', function (e) {
        drawing = true;
        ctx.beginPath();
        var coords = getCoordinates(e);
        ctx.moveTo(coords.x, coords.y);
    });

    canvas.addEventListener('mousemove', function (e) {
        if (drawing) {
            var coords = getCoordinates(e);
            ctx.lineTo(coords.x, coords.y);
            ctx.stroke();
        }
    });

    canvas.addEventListener('mouseup', function () {
        if (drawing) {
            drawing = false;
            strokes.push(ctx.getImageData(0, 0, canvas.width, canvas.height));
        }
    });

    // Touch events
    canvas.addEventListener('touchstart', function (e) {
        e.preventDefault(); // Prevent scrolling
        drawing = true;
        ctx.beginPath();
        var coords = getCoordinates(e);
        ctx.moveTo(coords.x, coords.y);
    });

    canvas.addEventListener('touchmove', function (e) {
        e.preventDefault(); // Prevent scrolling
        if (drawing) {
            var coords = getCoordinates(e);
            ctx.lineTo(coords.x, coords.y);
            ctx.stroke();
        }
    });

    canvas.addEventListener('touchend', function () {
        if (drawing) {
            drawing = false;
            strokes.push(ctx.getImageData(0, 0, canvas.width, canvas.height));
        }
    });

    document.getElementById('clear-button').addEventListener('click', function () {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        strokes = [];
    });

    document.getElementById('undo-button').addEventListener('click', function () {
        if (strokes.length > 0) {
            ctx.putImageData(strokes.pop(), 0, 0);
        }
    });

    document.getElementById('download-button').addEventListener('click', function () {
        var dataURL = canvas.toDataURL("image/png");
        var link = document.createElement('a');
        link.href = dataURL;
        link.download = 'signature.png';
        link.click();
    });
});
