const app = require('./hello-world')
const http = require('http')

const server = http.createServer(app)

const port = process.env.port || 3000
server.listen(port, () => {
    console.log(`Server running on port ${port}`)
})