const app = require('./app')
const chalk = require('chalk')

app.listen(3000, () => {
    console.log(chalk.green('Server listening...'))
})