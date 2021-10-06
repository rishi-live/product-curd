const productService = require('../service/productService');
const constants = require('../constants');

module.exports.insertProduct = async (req, res) => {
    let response = { ...constants.defaultServerResponse };
    try {
        const { category_name } = req.body;

        const responseFromService = await productService.insert(req.body);


        response.status = 201;
        response.message = constants.productMessage.PRODUCT_CREATED;
        response.body = responseFromService;
    } catch (error) {
        console.log('Something went wrong: Controller: insertProduct', error);
        response.message = error.message;
    }
    return res.status(response.status).send(response);
};

module.exports.fetchAllProduct = async (req, res) => {
    let response = { ...constants.defaultServerResponse };
    try {
        const products = await productService.searchProduct(req.query);

        if (products.length) {
            response.status = 200;
            response.message = constants.productMessage.PRODUCT_FETCHED;
            response.body = products;
        } else {
            response.status = 202;
            response.message = constants.productMessage.PRODUCT_NOT_FOUND;
        }
    } catch (error) {
        console.log('Something went wrong: Controller: fetchAllProduct', error);
        response.message = error.message;
    }
    return res.status(response.status).send(response);
};

module.exports.fetchProductById = async (req, res) => {
    let response = { ...constants.defaultServerResponse };
    try {
        const products = await productService.searchProduct({ id: req.params.id });

        if (products.length) {
            response.status = 200;
            response.message = constants.productMessage.PRODUCT_FETCHED;
            response.body = products[0];
        } else {
            response.status = 202;
            response.message = constants.productMessage.PRODUCT_NOT_FOUND;
        }
    } catch (error) {
        console.log('Something went wrong: Controller: fetchProductById', error);
        response.message = error.message;
    }
    return res.status(response.status).send(response);
};

module.exports.updateProduct = async (req, res) => {
    let response = { ...constants.defaultServerResponse };
    try {
        let info = {};
        if (req.body.category_name) info['category_name'] = req.body.category_name;
        if (req.body.status) info['status'] = req.body.status;

        if (Object.entries(info).length !== 0 && info.constructor === Object) {
            var products = await productService.update({ id: req.params.id, updateInfo: info });
        }

        if (products) {
            response.status = 200;
            response.message = constants.productMessage.PRODUCT_FETCHED;
            response.body = products;
        } else {
            response.status = 204;
            response.message = constants.productMessage.PRODUCT_NOT_FOUND;
        }
    } catch (error) {
        console.log('Something went wrong: Controller: updateProduct', error);
        response.message = error.message;
    }
    return res.status(response.status).send(response);
};

module.exports.deleteProduct = async (req, res) => {
    let response = { ...constants.defaultServerResponse };
    try {
        let products = await productService.delete({ id: req.params.id });

        if (products) {
            response.status = 200;
            response.message = constants.productMessage.PRODUCT_DELETED;
            // response.body = products;
        } else {
            response.status = 204;
            response.message = constants.productMessage.PRODUCT_NOT_FOUND;
        }
    } catch (error) {
        console.log('Something went wrong: Controller: deleteProduct', error);
        response.message = error.message;
    }
    return res.status(response.status).send(response);
};

module.exports.insertProductDetails = async (req, res) => {
    let response = { ...constants.defaultServerResponse };
    try {
        // const { category_name } = req.body;
        let fetch = await productService.searchProduct({ id: req.body.category_id });
        if (fetch.length) {
            const responseFromService = await productService.insertDetails(req.body);
            delete responseFromService.__v;

            response.status = 201;
            response.message = constants.productDetailsMessage.PRODUCT_CREATED;
            response.body = responseFromService;
        } else {
            response.message = constants.productMessage.PRODUCT_NOT_FOUND;
        }
    } catch (error) {
        console.log('Something went wrong: Controller: insertProductDetails', error);
        response.message = error.message;
    }
    return res.status(response.status).send(response);
};

module.exports.fetchTotalInfo = async (req, res) => {
    let response = { ...constants.defaultServerResponse };
    try {
        const products = await productService.searchProductInfo(req.query);

        if (products.length) {
            response.status = 200;
            response.message = constants.productMessage.PRODUCT_FETCHED;
            response.body = products;
        } else {
            response.status = 202;
            response.message = constants.productMessage.PRODUCT_NOT_FOUND;
        }
    } catch (error) {
        console.log('Something went wrong: Controller: fetchTotalInfo', error);
        response.message = error.message;
    }
    return res.status(response.status).send(response);
};