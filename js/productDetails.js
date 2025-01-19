document.addEventListener('DOMContentLoaded',() => {
    async function populateProduct() {
        const queryParams = fetchQueryParams();
        if(queryParams['id']) {
            const productId = queryParams['id'];
            const product = await fetchProductById(productId);
            console.log(product);

            const productName = document.getElementById('product-name');
            const productImage = document.getElementById('product-img');
            const productPrice = document.getElementById('product-price');
            const productDescription = document.getElementById('product-description-data');


            productName.textContent = product.title;
            productPrice.textContent = "$" + product.price;
            productDescription.textContent = product.description;
            productImage.src = product.image;

            removeLoader();
        }
    }

    populateProduct();
});