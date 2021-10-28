
const bookRouter = require('./book');
const userRouter = require('./user');
function route(app) {
    app.use('/book', bookRouter);
    app.use('/user', userRouter);
 
    // với re là reqiure và res là response


}

module.exports = route;