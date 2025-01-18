document.addEventListener('DOMContentLoaded',() => {
    async function fetchProducts() {
        const response = await axios.get('https://fakestoreapi.com/products');
        return response.data;
    }

    async function populateProducts(flag,customProducts) {

        let products = customProducts;
        if(flag == false) {
            products  = await fetchProducts();
        }

        
        const productList = document.getElementById('product-list');
        products.forEach((product) => {
            const productItem = document.createElement('a');
            productItem.target = '_blank';
            productItem.classList.add('product-item', 'text-decoration-none', 'd-inline-block');
            productItem.href = 'productDetails.html';


            const productImage = document.createElement('div');
            const productName = document.createElement('div');
            const productPrice = document.createElement('div');

            productImage.classList.add('product-img');
            productName.classList.add('product-name' , 'text-center');
            productPrice.classList.add('product-price', 'text-center');

            productName.textContent = product.title.substring(0,12) + "...";
            productPrice.textContent = `&#8377; ${product.price}`;

            const imgInsideProductImage = document.createElement('img');
            imgInsideProductImage.src = product.image;
            productImage.appendChild(imgInsideProductImage);
            productItem.appendChild(productImage);
            productItem.appendChild(productName);
            productItem.appendChild(productPrice);
            productList.appendChild(productItem);
        })
    }

    populateProducts(false);


    const filterSearch = document.getElementById('search');
    filterSearch.addEventListener('click', async () => {
        const productList = document.getElementById('product-list');
        const minPrice = Number(document.getElementById('min-price').value);
        const maxPrice = Number(document.getElementById('max-price').value);
        const products = await fetchProducts();
        filteredProducts = products.filter((product) => product.price>=minPrice && product.price <= maxPrice)
        productList.innerHTML = '';
        populateProducts(true,filteredProducts);
    })


    const resetFilter = document.getElementById('clear');
    resetFilter.addEventListener('click',()=> {
        window.location.reload();
    })
})