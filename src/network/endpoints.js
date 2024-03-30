
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
        GET:'categories/:categoryTitle',
        ADD:'categories',
        UPDATE:'categories/:categoryTitle',
        DELETE:'categories/:categoryTitle',
    },
}