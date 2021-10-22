module.exports = class Service {
    async findAll() {
        return this.model.find()
    }

    async add(item) {
        return this.model.create(item)
    }

    async del(itemId) {
        return this.model.deleteOne({_id: itemId})
    }

    async delMany(itemName) {
        return this.model.deleteMany({name: itemName})
    }

    async find(itemId) {
        return this.model.findById(itemId)
    }
}