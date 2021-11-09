
const bookRouter = require('./book');
const userRouter = require('./user');
const hoadonRouter = require('./HoaDon');
const adminRouter = require('./admin');
const cartRouter = require('./cart');

const signupRouter = require('./signup');
const signinRouter = require('./signin');


function route(app) {
    app.use('/book', bookRouter);
    app.use('/user', userRouter);
    app.use('/admin', adminRouter);
    app.use('/hoadon', hoadonRouter);
    app.use('/signup', signupRouter);
    app.use('/signin', signinRouter);
    app.use('/cart', cartRouter);

}

module.exports = route;