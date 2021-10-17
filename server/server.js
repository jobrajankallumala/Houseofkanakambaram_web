import express from "express";
import fs from "fs";
import path from "path";

// import React from "react";
// import ReactDOMServer from "react-dom/server";

// import App from "../src/App";
const api_helper = require('./API_helper')

const PORT = 3000;

const app = express();
const pageTitle = 'Homepage - Welcome to HOK';
const apiDomain = 'http://15.185.146.56:82/api/v1/';

// API calls
app.get('/api/hello', (req, res) => {
  res.send({ express: 'Hello From Express' });
});


app.get("/", (req, res, next) => {
  fs.readFile(path.resolve("./build/index.html"), "utf-8", (err, data) => {
    if (err) {
      return res.status(500).send("Some error happened");
    }
    return res.send(
      data.replace(
        '__PAGE_META__',
        `<title>House of kanakambaram</title>`
      )
    );
  });
});
app.get("/home", (req, res, next) => {
  fs.readFile(path.resolve("./build/index.html"), "utf-8", (err, data) => {
    if (err) {
      return res.status(500).send("Some error happened");
    }
    return res.send(
      data.replace(
        '__PAGE_META__',
        `<title>House of kanakambaram</title>`
      )
    );
  });
});
app.get("/search", (req, res, next) => {
  fs.readFile(path.resolve("./build/index.html"), "utf-8", (err, data) => {
    if (err) {
      return res.status(500).send("Some error happened");
    }
    return res.send(
      data.replace(
        '__PAGE_META__',
        `<title>Products - House of kanakambaram</title>`
      )
    );
  });
});
app.get('/product/:id', (req, res) => {
  var id = req.params.id;
  var d = api_helper.make_API_call(`${apiDomain}product/${id}/seo`)
    .then(response => {
      fs.readFile(path.resolve("./build/index.html"), "utf-8", (err, data) => {
        if (err) {
          return res.status(500).send("Some error happened");
        }
        return res.send(
          data.replace(
            '__PAGE_META__',
            `<title>${response.data.title}</title>`
          )
        );
      });

    })
    .catch(error => {
      res.send(error)
    })

})
app.get("/aboutus", (req, res, next) => {
  fs.readFile(path.resolve("./build/index.html"), "utf-8", (err, data) => {
    if (err) {
      return res.status(500).send("Some error happened");
    }
    return res.send(
      data.replace(
        '__PAGE_META__',
        `<title>About Us - House of kanakambaram</title>`
      )
    );
  });
});

app.get("/wishlist", (req, res, next) => {
  fs.readFile(path.resolve("./build/index.html"), "utf-8", (err, data) => {
    if (err) {
      return res.status(500).send("Some error happened");
    }
    return res.send(
      data.replace(
        '__PAGE_META__',
        `<title>wishlist - House of kanakambaram</title>`
      )
    );
  });
});

app.get("/cart", (req, res, next) => {
  fs.readFile(path.resolve("./build/index.html"), "utf-8", (err, data) => {
    if (err) {
      return res.status(500).send("Some error happened");
    }
    return res.send(
      data.replace(
        '__PAGE_META__',
        `<title>Cart - House of kanakambaram</title>`
      )
    );
  });
});

app.get("/contact", (req, res, next) => {
  fs.readFile(path.resolve("./build/index.html"), "utf-8", (err, data) => {
    if (err) {
      return res.status(500).send("Some error happened");
    }
    return res.send(
      data.replace(
        '__PAGE_META__',
        `<title>Contact - House of kanakambaram</title>`
      )
    );
  });
});

app.post('/payment/response/:id', (req, res) => {
  var id = req.params.id;
 console.log(id)

  // getting the details back from our font-end
  const {
    // orderCreationId,
    razorpay_payment_id,
    razorpay_order_id,
    razorpay_signature,
  } = req.body;
  var data = {
    order_id: id,
    razorpay_order_id: razorpay_order_id,
    razorpay_payment_id: razorpay_payment_id,
    razorpay_signature: razorpay_signature
  }

  var d = api_helper.make_API_post_call(`${apiDomain}checkout/order/payment/response`, data)
    .then(response => {
      fs.readFile(path.resolve("./build/index.html"), "utf-8", (err, data) => {
        if (err) {
          return res.status(500).send("Some error happened");
        }
        return res.send(
          data.replace(
            '__PAGE_META__',
            `<title>Payment response</title>`
          )
        );
      });

    })
    .catch(error => {
      res.send(error)
    })

});

app.use(express.static(path.resolve(__dirname, '..', 'build')));

// Handle React routing, return all requests to React app
app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, '../build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`App launched on ${PORT}`);
});



// https://www.freecodecamp.org/news/how-to-make-create-react-app-work-with-a-node-backend-api-7c5c48acb1b0/
// https://codehandbook.org/how-to-make-rest-api-calls-in-express-web-app/
// https://dillionmegida.com/p/how-to-configure-meta-tags-in-react-app-dynamically/#how-to-configure-meta-tags-from-a-server
// https://stackoverflow.com/questions/25623041/how-to-configure-dynamic-routes-with-express-js



// app.get('/about', function(request, response) {
//   console.log('About page visited!');
//   const filePath = path.resolve(__dirname, './build', 'index.html')
//   fs.readFile(filePath, 'utf8', function (err,data) {
//     if (err) {
//       return console.log(err);
//     }
//     data = data.replace(/\$OG_TITLE/g, 'About Page');
//     data = data.replace(/\$OG_DESCRIPTION/g, "About page description");
//     result = data.replace(/\$OG_IMAGE/g, 'https://i.imgur.com/V7irMl8.png');
//     response.send(result);
//   });
// });