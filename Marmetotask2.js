document.addEventListener('DOMContentLoaded', function() {
    const productDataUrl = 'https://cdn.shopify.com/s/files/1/0564/3685/0790/files/multiProduct.json';

    // Fetch product data from API
    fetch(productDataUrl)
        .then(response => response.json())
        .then(data => {
            displayProducts('men', data.categories);
            displayProducts('women', data.categories);
            displayProducts('kids', data.categories);
        })
        .catch(error => console.error('Error fetching product data:', error));

    function displayProducts(category, allCategories) {
        const categoryData = allCategories.find(cat => cat.category_name.toLowerCase() === category.toLowerCase());
        if (!categoryData) {
            console.error(`Category not found: ${category}`);
            return;
        }

        const container = document.getElementById(`${category}Products`);
        container.innerHTML = ''; // Clear previous products

        categoryData.category_products.forEach(product => {
            const discount = ((product.compare_at_price - product.price) / product.compare_at_price) * 100;

            const productCard = document.createElement('div');
            productCard.className = 'product-card';

            productCard.innerHTML = `
                    <div class="container">
                        <img src="${product.image}" alt="${product.title}" class="product-image" >
                        <div class="top-left">${product.badge_text}</div>
                    </div>
                    <div class="product-details">
                        <div class="product-content">
                          <h3 class="product-title">${product.title}</h3>
                          <p class="vendor">${product.vendor}</p>
                        </div>
                        <div class="product-content">
                          <p class="price">Rs ${product.price}</p>
                          <p class="compare-at-price">Rs ${product.compare_at_price}</p>
                          <p class="discount">${discount.toFixed(2)}% Off</p>
                        </div>
                        <button class="add-to-cart-button">Add to Cart</button>
                    </div>
      `;

            container.appendChild(productCard);
        });
    }
});

function showProducts(category) {
    const allContainers = document.querySelectorAll('.product-container');
    allContainers.forEach(container => container.style.display = 'none');

    const selectedContainer = document.getElementById(`${category}Products`);
    selectedContainer.style.display = 'flex';
}



// ...