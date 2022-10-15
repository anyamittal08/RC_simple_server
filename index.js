const http = require('http');
const url = require('url');

port = 4000;
let data = {};

const server = http.createServer((req, res) => {
    const parsedURL = url.parse(req.url);

    if (parsedURL.pathname === '/set') {
        if (parsedURL.query) {
            const [key, value] = parsedURL.query.split('=');
            data[key] = value;
            res.write(JSON.stringify(data));
        } else {
            res.write('Error: no key-value pair provided');
        }
    } 
    
    else if (parsedURL.pathname === '/get') {
        if (parsedURL.query) {
            const key = parsedURL.query.split('=')[1];
            if (data[key]) res.write(data[key]);
            else res.write('Key does not exist')
        } else res.write('Error: no key provided');
    }
    res.end();
})

server.listen(port, () => {
    console.log(`Listening on port ${port}`);
})






