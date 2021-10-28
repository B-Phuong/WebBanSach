
const bookRouter = require('./book');
const userRouter = require('./user');
const hoadonRouter = require('./HoaDon');
function route(app) {
    app.use('/book', bookRouter);
    app.use('/user', userRouter);
    app.use('/hoadon', hoadonRouter);
    // với re là reqiure và res là response


}

module.exports = route;