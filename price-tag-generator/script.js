function generateBarcode() {
    const barcodeNumber = Math.floor(Math.random() * 1000000000000);
    document.getElementById("barcodeNumber").textContent = barcodeNumber;
    const barcodeValue = barcodeNumber;
    JsBarcode("#barcode", barcodeValue, {
        format: "CODE128",
        displayValue: false
    });


}

function generatePriceTag() {
    const productName = document.getElementById("productNameInput").value;
    const productPrice = document.getElementById("productPriceInput").value;
    const productNameElement = document.getElementById("productName");
    const productPriceElement = document.getElementById("productPrice");

    if (productName && productPrice) {
        productNameElement.textContent = productName;
        productPriceElement.textContent = "$" + productPrice;
        generateBarcode();
        document.querySelector('.input-container').style.display = 'none';
        document.querySelector('.result-container').style.display = '';
    } else {
        alert("Please enter both product name and price.");
    }
}

function downloadPriceTag() {
    const resultContainer = document.querySelector('.result');

    html2canvas(resultContainer, {
        onrendered: function(canvas) {
            const imageData = canvas.toDataURL('image/png');

            const downloadLink = document.createElement('a');
            downloadLink.href = imageData;
            downloadLink.download = 'price_tag.png';
            downloadLink.click();

            downloadLink.remove();
        }
    });
}