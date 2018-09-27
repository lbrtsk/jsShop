/* eslint-disable no-console */
const PDFDocument = require('pdfkit');
const fs = require('fs');
const mailgunjs = require('mailgun-js');

const mailConfig = require('./mailConfig');

const mailgun = mailgunjs(mailConfig);

const userModel = require('../models/users');
const productModel = require('../models/products');
const orderModel = require('../models/orders');

module.exports = {
  async sendReportAboutYesterday() {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    yesterday.setHours(0, 0, 0, 0);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const yesterdayOrders = await orderModel.find({ issueDate: { $gte: yesterday, $lt: today } })
      .populate('product');
    const productsCount = {};
    let moneyGained = 0;
    let totalProducts = 0;
    yesterdayOrders.forEach((order) => {
      if (!productsCount[order.product.name]) {
        productsCount[order.product.name] = 1;
      } else {
        productsCount[order.product.name] += 1;
      }
      moneyGained += order.product.price;
      totalProducts += 1;
    });

    const productsArray = Object.keys(productsCount)
      .map(key => ({ name: key, count: productsCount[key] }));

    productsArray.sort((a, b) => b.count - a.count);

    const doc = new PDFDocument();
    doc.pipe(fs.createWriteStream('tmp.pdf'));
    doc.text(`Raport for ${yesterday.toLocaleDateString()}\n`);
    doc.text(`Most selling product yesterday: ${productsArray[0] && productsArray[0].name}`);
    doc.text(`Total money gained: ${moneyGained}`);
    doc.text(`Total number of products sold: ${totalProducts}`);
    doc.end();

    const data = {
      from: 'jsShop Bot <me@samples.mailgun.org>',
      subject: 'jsShop - Purchase succesful',
      text: 'Hello, your daily report is here.',
      to: 'lbrtsk@gmail.com',
      attachment: 'tmp.pdf',
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
