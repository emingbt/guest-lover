const mongoose = require('mongoose')
const connectionString = process.env.MONGODB_CONNECTION_STRING

async function main() {
    await mongoose.connect(connectionString, { useUnifiedTopology: true, useNewUrlParser: true})
    console.log('connected')
}

main()