
const bookRouter = require('./book');
const userRouter = require('./user');
const hoadonRouter = require('./HoaDon');
const adminRouter = require('./admin');
const cartRouter = require('./cart');
const authRouter = require('./auth')


function route(app) {
    app.use('/book', bookRouter);
    app.use('/user', userRouter);
    app.use('/admin', adminRouter);
    app.use('/hoadon', hoadonRouter);
    app.use('/auth', authRouter);
    app.use('/cart', cartRouter);

}

module.exports = route;