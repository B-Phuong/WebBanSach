module.exports = {
    mongooseToObject: function (mongoose) {
        return mongoose ? mongoose.toObject() : mongoose;
    },
    mutipleMongoseToObject: function (mongooses) {
        return mongooses.map(mongoose => mongoose.toObject());
    }
};


