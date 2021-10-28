
const productRouter = require('./Product');
const userRouter = require('./User');
const hoadonRouter = require('./HoaDon');
function route(app) {
    app.use('/product', productRouter);
    app.use('/user', userRouter);
    app.use('/hoadon', hoadonRouter);
    // với re là reqiure và res là response


}

module.exports = route;