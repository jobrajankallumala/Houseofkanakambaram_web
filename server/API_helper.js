const request = require('request')

module.exports = {
    /*
    ** This method returns a promise
    ** which gets resolved or rejected based
    ** on the result from the API
    */
    make_API_call: function (url) {
        return new Promise((resolve, reject) => {
            request(url, { json: true }, (err, res, body) => {
                if (err) reject(err)
                resolve(body)
            });
        })
    },
    make_API_post_call: function (url, data) {
        const options = {
            method: 'POST',
            uri: url,
            body: data,
            json: true // Automatically stringifies the body to JSON
        }
        return new Promise((resolve, reject) => {
            request(url, options, (err, res, body) => {
                if (err) reject(err)
                resolve(body)
            });
        })
    }
}