# jsShop
Simple shop API made using Node.js, Express.js and MongoDB

## Running:
`npm install`

`npm run dev`

## Unit testing:
There are some little database tests here. They are to be considered as a placeholder for more advanced unit tests.
`npm run test`

## Endpoints:
* `/users`
  * `/authenticate` - `POST` only with `email` and `password`. Returns `token` used as `x-access-token` for authorization.
  * `/register` - usage like `/authenticate`. All newly created users have only `user` role. To create an admin you have to manually add `'admin'` role in database
* `/products`
  * `/` - `GET` - lists all products with pagination. Available query params are `search` (title contains), `category` (id), `offset` and `limit`
  * `/` - `POST` - admin only - creates a new product
  * `/:id` - `GET` - used to retrieve info about product; `PUT`, `DELETE` - admin functions
* `/categories`
  * like `/products`
* `/orders`
  * `/` - `POST` - for all users to create an order, `GET` - for admins to get list of all orders
  
## Mailgun configuration
To make email reports work, fill in your mailgun data (apiKey and domain) in `reports/mailConfig.js`
