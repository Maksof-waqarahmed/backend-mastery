const prisma = require('../database/db');
const { sendResponse } = require('../lib');

const products = [
    { name: "Football", category: "SPORTS", price: 2000, inStock: true, tags: ["outdoor", "team"] },
    { name: "Basketball", category: "SPORTS", price: 1800, inStock: true, tags: ["indoor", "bounce"] },
    { name: "Tennis Racket", category: "SPORTS", price: 2500, inStock: false, tags: ["racket", "indoor"] },
    { name: "Cricket Bat", category: "SPORTS", price: 3200, inStock: true, tags: ["wood", "bat"] },
    { name: "Badminton Shuttle", category: "SPORTS", price: 600, inStock: true, tags: ["feather", "shuttle"] },
    { name: "Boxing Gloves", category: "SPORTS", price: 1500, inStock: false, tags: ["boxing", "gloves"] },
    { name: "Table Tennis Bat", category: "SPORTS", price: 1300, inStock: true, tags: ["table", "pingpong"] },
    { name: "Hockey Stick", category: "SPORTS", price: 2700, inStock: true, tags: ["hockey", "stick"] },
    { name: "Skateboard", category: "SPORTS", price: 2200, inStock: false, tags: ["skate", "street"] },
    { name: "Volleyball", category: "SPORTS", price: 1600, inStock: true, tags: ["net", "team"] }
];

const addProducts = async (req, res) => {
    try {
        const data = await prisma.products.createMany({
            data: products
        });

        sendResponse(true, "Products added successfully", data, 201, res);
    } catch (error) {
        console.error(error);
        sendResponse(false, "Error adding products: " + error.message, null, 500, res);
    }
};

const getProducts = async (req, res) => {
    try {
        const page = parseInt(req.query.page, 10) || 1;
        const limit = parseInt(req.query.limit, 10) || 2;
        // const inStockFilter = req.query.instock === 'true';
        const skip = (page - 1) * limit;

        // let result;
        // let totalPages = 1;

        // if (inStockFilter) {
        //     result = await prisma.products.aggregate({
        //         where: { inStock: true },
        //         _count: { _all: true },
        //         _avg: { price: true },
        //         _sum: { price: true },
        //         _min: { price: true },
        //         _max: { price: true }
        //     });
        // } else {
        //     const totalCount = await prisma.products.count();
        //     totalPages = Math.ceil(totalCount / limit);

        //     result = await prisma.products.findMany({
        //         skip,
        //         take: limit,
        //         orderBy: { price: 'asc' },
        //     });
        // }

        // return sendResponse(true, "Products fetched successfully", inStockFilter ? result : {
        //     data: result,
        //     currentPage: page,
        //     totalPages,
        //     limit
        // }, 200, res);

        // group values

        // const totalCount = await prisma.products.count();
        // totalPages = Math.ceil(totalCount / limit);

        // const result = await prisma.products.findMany({
        //     skip,
        //     take: limit,
        //     orderBy: { price: 'asc' },
        //     where: {
        //         inStock: req.query.instock === 'true' ? true : undefined
        //     },
        // });

        // return sendResponse(true, "Products fetched successfully", {
        //     data: result,
        //     currentPage: page,
        //     totalPages,
        //     limit
        // }, 200, res);

        const result = await prisma.products.groupBy({
            by: ['category'],
            _count: {
                name: true,
                price: true,
                inStock: true
            },
            _avg: {
                price: true
            },
            _sum: {
                price: true
            },
            _min: {
                price: true
            },
            _max: {
                price: true
            },
            orderBy: { category: 'asc' },
        })

        return sendResponse(true, "Products fetched successfully", result, 200, res);

    } catch (error) {
        console.error("Error fetching products:", error);
        return sendResponse(false, "Error fetching products: " + error.message, null, 500, res);
    }
};


module.exports = {
    addProducts,
    getProducts
};
