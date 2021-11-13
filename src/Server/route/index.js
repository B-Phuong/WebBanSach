
const bookRouter = require('./book');
const userRouter = require('./user');
const hoadonRouter = require('./HoaDon');
const adminRouter = require('./admin');
const cartRouter = require('./cart');
const authRouter = require('./auth')
const adminauthRouter = require('./admin/auth')
function route(app) {
    app.use('/book', bookRouter);
    app.use('/user', userRouter);
    app.use('/admin', adminRouter);
    app.use('/hoadon', hoadonRouter);
    app.use('/cart', cartRouter);
    app.use('/auth', authRouter);
    app.use('/auth',adminauthRouter);

}

module.exports = route;