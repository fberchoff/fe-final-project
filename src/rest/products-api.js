class ProductsApi {
    get = async () => {
        try {
            const resp = await fetch("http://localhost:3004/products");
            const data = await resp.json();
            return data;
        } catch (e) {
            console.log('Oops, looks like fetchProducts had an issue.', e);
        }
    }

    put = async(product) => {
        try {
            const resp = await fetch(`http://localhost:3004/products/${product.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(product)
            });
            return await resp.json();
        } catch (e) {
            console.log('Oops, looks like updating a product had an issue.', e);    
        }
    }

    post = async(product) => {
        try {
            const resp = await fetch(`http://localhost:3004/products`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(product)
            });
            return await resp.json();
        } catch (e) {
            console.log('Oops, looks like adding a product had an issue.', e);    
        }
    }

    delete = async(product) => {
        try {
            const resp = await fetch(`http://localhost:3004/products/${product.id}`, {
                method: 'DELETE'
            });
            return await resp.json();
        } catch (e) {
            console.log('Oops, looks like deleting a product had an issue.', e);    
        }
    }
}

export const productsApi = new ProductsApi();