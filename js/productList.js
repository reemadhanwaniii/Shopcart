document.addEventListener('DOMContentLoaded',async () => {
    async function fetchProducts() {
        const response = await axios.get('https://fakestoreapi.com/products');
        return response.data;
    }


    async function fetchCategories() {
        const response = await axios.get('https://fakestoreapi.com/products/categories');
        return response.data;
    }

    const downloadedProducts = await fetchProducts();

    async function fetchProductsByCategory(category) {
        const response = await axios.get(`https://fakestoreapi.com/products/category/${category}`);
        return response.data;
    }

    async function populateProducts(flag,customProducts) {

        let products = customProducts;
        const queryParams = new URLSearchParams(window.location.search);
        const queryParamsObject = Object.fromEntries(queryParams.entries());

        if(flag == false) {
            if(queryParamsObject['category']) {
                products = await fetchProductsByCategory(queryParamsObject['category']);
            } else {
                products  = downloadedProducts;
            }
            
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
            productPrice.textContent = `$ ${product.price}`;

            const imgInsideProductImage = document.createElement('img');
            imgInsideProductImage.src = product.image;
            productImage.appendChild(imgInsideProductImage);
            productItem.appendChild(productImage);
            productItem.appendChild(productName);
            productItem.appendChild(productPrice);
            productList.appendChild(productItem);
        })
    }


    async function populateCategories() {
        const categories = await fetchCategories();
        const categoryList = document.getElementById('category-list');

        categories.forEach((category) => {
            const categoryLink = document.createElement('a');
            categoryLink.classList.add('d-flex', 'text-decoration-none');
            categoryLink.textContent = category;
            categoryLink.href = `productList.html?category=${category}`;

            categoryList.appendChild(categoryLink);
        })
    }

    populateProducts(false);
    populateCategories();


    const filterSearch = document.getElementById('search');
    filterSearch.addEventListener('click', async () => {
        const productList = document.getElementById('product-list');
        const minPrice = Number(document.getElementById('min-price').value);
        const maxPrice = Number(document.getElementById('max-price').value);
        const products = downloadedProducts;
        filteredProducts = products.filter((product) => product.price>=minPrice && product.price <= maxPrice)
        productList.innerHTML = '';
        populateProducts(true,filteredProducts);
    })


    const resetFilter = document.getElementById('clear');
    resetFilter.addEventListener('click',()=> {
        window.location.reload();
    })
})