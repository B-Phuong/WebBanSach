
const productRouter = require('./Product');


function route(app) {
    app.use('/product', productRouter);
 
    // với re là reqiure và res là response


}

module.exports = route;