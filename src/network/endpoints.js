
export const ENDPOINTS = {
    USER:{
        DELETE:'users/:userId',
        UPDATE:'users/:userId',
        GET:'users/:userId',
        ADD:'users',
        LIST:'users'
    },
    PRODUCT:{
        LIST:'products',
        GET:'products/:productTitle',
        ADD:'products',
        UPDATE:'products/:productTitle',
        DELETE:'products/:productTitle',
        PAGINATE:'products?limit=:limit&page=:page',
    },
    CATEGORIES:{
        LIST:'categories',
        GET:'categories/:categoryId',
        ADD:'categories',
        UPDATE:'categories/:categoryId',
        DELETE:'categories/:categoryId',
    },
}