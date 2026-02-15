CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  features JSONB,
  box_items JSONB,
  price NUMERIC(10,2) NOT NULL,
  stock INT DEFAULT 0,
  main_image VARCHAR(255),
  gallery_images JSONB,
  category VARCHAR(100),
  position INT DEFAULT 0
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
);


-- CART
CREATE TABLE cart (
id
token (uuid)
created_at
updated_at
);

cart_items {
id
cart_id (fk)
product_id (fk)
quantity
unit_price
}

orders {
id
customer_name
customer_email
customer_phone
amount
freight
status
created_at
}

order_items {
id
order_id (fk)
product_id (fk)
quantity
unit_price
}

CREATE TABLE order_addresses (
    id SERIAL PRIMARY KEY,
    order_id INTEGER UNIQUE REFERENCES orders(id) ON DELETE CASCADE,
    address VARCHAR(255) NOT NULL,
    number VARCHAR(20),
    complement VARCHAR(255),
    neighborhood VARCHAR(100),
    city VARCHAR(100),
    state VARCHAR(100),
    postal_code VARCHAR(20),
    country VARCHAR(100)
);





CREATE TABLE orders (
    id SERIAL PRIMARY KEY,

    -- Cliente
    customer_name VARCHAR(255) NOT NULL,
    customer_email VARCHAR(255) NOT NULL,
    customer_phone VARCHAR(20),

    -- Endereço de entrega
    address VARCHAR(255) NOT NULL,
    number VARCHAR(20),
    complement VARCHAR(255),
    neighborhood VARCHAR(100),
    city VARCHAR(100) NOT NULL,
    state VARCHAR(100) NOT NULL,
    postal_code VARCHAR(20) NOT NULL,
    country VARCHAR(100) NOT NULL,

    -- Valores
    subtotal DECIMAL(10,2) NOT NULL,
    freight DECIMAL(10,2) NOT NULL DEFAULT 0,
    total DECIMAL(10,2) NOT NULL,

    status VARCHAR(50) NOT NULL DEFAULT 'pending',
    access_token TEXT UNIQUE NOT NULL,
    payment_id VARCHAR(255),

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
