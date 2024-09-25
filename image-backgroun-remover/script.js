let imageURL;

document.getElementById("file").addEventListener("change", async function () {
  const fileInput = document.getElementById("file");
  const image = fileInput.files[0];

  document.querySelector(".custum-file-upload").style.display = "none";
  document.querySelector(".p").style.display = "none";
  document.querySelector(".removing").style.display = "";

  const formData = new FormData();
  formData.append("image_file", image);
  formData.append("size", "auto");

  const apiKey = "GZNgiu9QgNh2CAX7FVMUPiP7";

  fetch("https://api.remove.bg/v1.0/removebg", {
    method: "POST",
    headers: {
      "X-Api-Key": apiKey,
    },
    body: formData,
  })
    .then(function (response) {
      if (!response.ok) {
        console.log("Error:", response.statusText);
        alert(
          "Failed to remove background. Please check your API key or try again later."
        );
        throw new Error(response.statusText);
      }
      return response.blob();
    })
    .then(function (blob) {
      if (blob.type.startsWith("image/")) {
        const url = URL.createObjectURL(blob);
        imageURL = url;
        const resultImage = document.getElementById("resultImage");
        resultImage.src = url;
        document.querySelector(".removing").style.display = "none";
        document.querySelector(".result").style.display = "";
      } else {
        console.error("Unexpected response type:", blob.type);
        alert("The response is not an image. Please try again.");
      }
    })
    .catch(function (error) {
      console.error("Error:", error);
      alert("Failed to remove background. Please try again.");
    });
});

function downloadFile() {
  if (!imageURL) {
    alert("No image to download!");
    return;
  }
  var a = document.createElement("a");
  a.href = imageURL;
  a.download = "background-removed_image.png";
  document.body.appendChild(a);

  a.click();

  document.body.removeChild(a);
}
