document.addEventListener("DOMContentLoaded", function () {
  const container = document.getElementById("container");
  const fetchBtn = document.getElementById("fetch-btn");
  const toggleBtn = document.getElementById("toggle-btn");
  let contentFetched = false;

  fetchBtn.addEventListener("click", fetchContent);
  toggleBtn.addEventListener("click", toggleVisibility);

  function fetchContent() {
    if (!contentFetched) {
      fetch("https://dummyjson.com/products/1")
          .then((response) => response.json())
          .then((data) => {
              const imagesHtml = data.images
                  .map((image) => `<div class="col-6 col-md-4 col-lg-3"><img src="${image}" alt="Product Image" class="img-fluid"></div>`)
                  .join("");
              container.innerHTML = `
        <h2>${data.title}</h2>
        <p>${data.description}</p>
        <p>Price: $${data.price}</p>
        <p>Discount: ${data.discountPercentage}%</p>
        <p>Rating: ${data.rating}</p>
        <p>Stock: ${data.stock}</p>
        <p>Brand: ${data.brand}</p>
        <p>Category: ${data.category}</p>
        <div class="row">
          <h3 class="col-12">Images:</h3>
          ${imagesHtml}
        </div>
      `;
          contentFetched = true;
        })
        .catch((error) => console.error("Error fetching data:", error));
    }
    if (contentFetched) {
      window.alert("The content has already been fetched");
    }
  }

  function toggleVisibility() {
    if (!contentFetched) {
      window.alert("Please fetch content first before hiding");
      return;
    }

    if (container.style.display === "none") {
      container.style.display = "block";
      // if (!contentFetched) {
      //   fetchContent();
      // }
      toggleBtn.innerHTML=`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-eye-slash" viewBox="0 0 16 16">
      <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7 7 0 0 0-2.79.588l.77.771A6 6 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755q-.247.248-.517.486z"/>
      <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829"/>
      <path d="M3.35 5.47q-.27.24-.518.487A13 13 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7 7 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12z"/>
    </svg>   Hide Content`
       
    } else {
      container.style.display = "none";
      toggleBtn.innerHTML=`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-eye-fill" viewBox="0 0 16 16">
      <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0"/>
      <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8m8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7"/>
    </svg>  Show Content`
      contentFetched = true;
    }
  }
});
