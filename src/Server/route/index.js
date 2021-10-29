
const bookRouter = require('./book');
const userRouter = require('./user');
const hoadonRouter = require('./HoaDon');
const adminRouter = require('./admin');
const signupRouter = require('./signup');
function route(app) {
    app.use('/book', bookRouter);
    app.use('/user', userRouter);
    app.use('/admin', adminRouter);
    app.use('/hoadon', hoadonRouter);
    app.use('/signup', signupRouter);
    // với re là reqiure và res là response


}

module.exports = route;