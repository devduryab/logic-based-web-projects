document
  .getElementById("imageUpload")
  .addEventListener("change", previewImages);
document.getElementById("convertBtn").addEventListener("click", convertToPDF);
document.getElementById("clear").addEventListener("click", clearImages);

function previewImages() {
  const previewSection = document.getElementById("previewSection");
  previewSection.innerHTML = ""; // Clear previous previews
  const files = document.getElementById("imageUpload").files;

  Array.from(files).forEach((file) => {
    const imgElement = document.createElement("img");
    imgElement.src = URL.createObjectURL(file);
    previewSection.appendChild(imgElement);
  });
}

function convertToPDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  const files = document.getElementById("imageUpload").files;

  if (files.length === 0) {
    alert("Please upload some images first.");
    return;
  }

  const loadImageToPDF = (file, doc, index) => {
    return new Promise((resolve) => {
      const img = new Image();
      const imgURL = URL.createObjectURL(file);

      img.onload = () => {
        doc.addImage(img, "JPEG", 10, 10, 180, 160); // Adjust width/height as needed
        URL.revokeObjectURL(imgURL); // Revoke the URL after use

        if (index < files.length - 1) {
          doc.addPage(); // Add a new page for the next image
        }
        resolve(); // Resolve the promise when done
      };

      img.src = imgURL; // Set image source to the object URL
    });
  };

  // Sequentially load and add each image
  (async function () {
    for (let i = 0; i < files.length; i++) {
      await loadImageToPDF(files[i], doc, i);
    }

    // After all images are processed, create the download link
    const downloadSection = document.getElementById("downloadSection");
    const downloadLink = document.createElement("a");
    downloadLink.href = doc.output("bloburl");
    downloadLink.download = "images.pdf";
    downloadLink.textContent = "Download PDF";
    downloadSection.innerHTML = "";
    downloadSection.appendChild(downloadLink);
  })();
}

function clearImages() {
  const previewImages = document.getElementById("previewSection");
  const imageUpload = document.getElementById("imageUpload");

  imageUpload.value = "";
  previewImages.innerHTML = "";
}
