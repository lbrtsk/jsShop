/* eslint-disable no-console */
const apiKey = 'key-61ec9eb7cc0cb7c0f15cadaba405dbd1';
const domain = 'sandboxbd0cf22d0d1543e3bb9310ba12ab402d.mailgun.org';
const mailgun = require('mailgun-js')({ apiKey, domain });

const userModel = require('../models/users');
const productModel = require('../models/products');

module.exports = {
  async mailAdmins(subject, text) {
    const admins = await userModel.find({ roles: 'admin' });
    const adminMails = admins.map(admin => admin.email);

    const data = {
      from: 'jsShop Bot <me@samples.mailgun.org>',
      subject,
      text,
      to: adminMails,
    };

    mailgun.messages().send(data, (err, body) => {
      if (err) {
        console.log(err);
      } else {
        console.log(body);
      }
    });
  },

  async mailClientAboutOrder(order) {
    const client = await userModel.findById(order.user);
    const product = await productModel.findById(order.product);

    const data = {
      from: 'jsShop Bot <me@samples.mailgun.org>',
      subject: 'jsShop - Purchase succesful',
      text: `Hello, ${client.email}! You have bought ${product.name} for ${product.price}.`,
      to: client.email,
    };

    mailgun.messages().send(data, (err, body) => {
      if (err) {
        console.log(err);
      } else {
        console.log(body);
      }
    });
  },
};
