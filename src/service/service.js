import http from "../http-common";

const ProductDataService = {
    getAll: () => http.get("/products"),
    search: (searchTerm) => http.get(`/products/search?searchTerm=${searchTerm}`),
    get: (id) => http.get(`/products/${id}`),
    createProduct: (data) => http.post("/productsAdd", data),
    createAccount: (data) => http.post("/signup", data),
    loginAccount: (data) => http.post("/login", data),
    createCheckOut: (data) => http.post("/createCheckOut", data),
    displayAllCheckOut: (data) => http.get("/checkOut", data),
    updateCheckoutStatus: (checkoutId, status) => http.put(`/saveCheckOut/${checkoutId}`, { status })
    };

export default ProductDataService;