const ProductTypeURLMiddleware = (request, response, next) => {
    console.log("Course URL: ", request.url);
    next();
}

module.exports = {
    ProductTypeURLMiddleware: ProductTypeURLMiddleware
}