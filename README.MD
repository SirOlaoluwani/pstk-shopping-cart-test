# Small Shopping cart application

This is a paystack Nodejs Test.

## Task

To build a small shopping cart application. Assume that you have a list of products in a category (eg. food or clothing) which contain a set of standard attributes (sku, selling price, stock level, expiration date etc.) which a user can add to, remove from and edit inside a cart.

## Code structure

The project is structured with an MVC pattern in mind.

## Installation

```
yarn install
cp .env.example .env
yarn start
```

## How does it work?

Since this is a simple application, the following actions can be performed with this API

- Create user
- List users
- Create category
- List categories
- Delete category
- Create product
- Update product
- Delete product
- List products
- Add product to cart per user.
- list products in cart per user.
- remove product from cart
- edit product quantity in cart

There are no forms of authentication as this is just a simple test application and does not require any form of authentication to manage.

## Things to know

When working with this API, one must do the following...
1. Create a demo user - the user will be needed when adding to cart - https://github.com/SirOlaoluwani/pstk-shopping-cart-test#create-demo-user
2. Create atleast one category - the category will be needed when adding a product. 
3. Create atleast one product  with the necessary information as described in the create product section - https://github.com/SirOlaoluwani/pstk-shopping-cart-test#create-product. The category ids are needed in an array because a product can belong to multiple categories. The system associates the category with the product via an association table - `product_category`.
4. Add product to cart - the cart requires the product_id and the quantity, the quantity can be changed at any time. Checkout - https://github.com/SirOlaoluwani/pstk-shopping-cart-test#add-to-cart

## Usage

The following shows a list of routes and their requirements.

### Create Demo User

_Route_
`/api/users/store`

_method:_
POST

_body:_

```
{
    "name": "oladele", //required
    "email":"oladele@yopmail.com", //required
    "phone": "0816048902" //optional
}
```

#

### List Users

_Route:_
`/api/users`

_method:_
GET

#

### Create Category

_Route_
`/api/categories/store`

_method:_
POST

_body:_

```
{
    "name": "Ladies wears",
    "slug": "ladies-wears"
}
```

#

### List Categories

_Route:_
`/api/categories`

_method:_
GET

#

### Delete Category

_Route:_
`/api/categories/delete/:categoryId`

_method:_
DELETE

#

### Create Product

_Route_
`/api/products/store`

_method:_
POST

_body:_

```
{
    "name": "Guy Leaf", //required
    "description": "Guy sensei", //required
    "manufacturer": "Naruto Ltd.", //optional
    "price": "100000.00", //required
    "sku": "a1201a1ds", //required
    "stockLevel": 10, //required
    "expirationDate": "2022-03-10", //required
    "categories": [1, 2] //required
}
```

#

### List products

_Route:_
`/api/products`

_method:_
GET

#

### Update product

_Route_
`/api/products/update/:productId`

_method:_
PUT

_body:_

```
{
    "name": "Arizona Leaf",
    "description": "Leaf made only for gods. With Arizona you can fly higher than the everest.",
    "manufacturer": "Arizona and Sons.",
    "price": "100000.00",
    "stockLevel": 10,
    "expirationDate": "2022-03-10",
    "categories": [1, 5]
}
```

#

### Delete product

_Route:_
`/api/products/delete/:productId`

_method:_
DELETE

#

### Add to cart

_Route_
`/api/cart/:userId/add`

_method:_
POST

_body:_

```
{
    "product_id": 5,
    "quantity": 20
}
```

#

### List products in cart

_Route_
`/api/cart/:userId`

_method:_
GET

#

### Edit product in cart

_Route_
`/api/cart/update/:cartId`

_method:_
PUT

_body:_

```
{
    "quantity": 30
}
```

#

### Remove product from cart

_Route_
`/api/cart/delete/:cartId`

_method:_
DETELE

#
