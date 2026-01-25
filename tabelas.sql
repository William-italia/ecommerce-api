
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    features TEXT,
    boxItems JSON,            -- Itens da caixa: [{"quantity":1,"item":"Headphone Unit"}, ...]
    price DECIMAL(10,2) NOT NULL,
    stock INT DEFAULT 0,         -- Estoque disponível
    mainImage VARCHAR(255),
    galleryImages JSON           -- Galeria de imagens: ["img1.png","img2.jpeg"]
);

-- CUSTOMERS
CREATE TABLE customers (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone_number VARCHAR(20)
);

-- CART
CREATE TABLE cart (
    id SERIAL PRIMARY KEY,
    product_id INT NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    quantity INT NOT NULL DEFAULT 1
);

-- INVOICES
CREATE TABLE invoices (
    id SERIAL PRIMARY KEY,
    customer_id INT NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
    amount DECIMAL(10,2) NOT NULL, -- total
    freight DECIMAL NOT NULL, -- Frete
    accessToken TEXT UNIQUE NOT NULL,
        address VARCHAR(255),
    postal_code VARCHAR(20),
    city VARCHAR(100),
    country VARCHAR(100),
    status VARCHAR(50) DEFAULT 'pending',
    payment_id VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- INVOICE ITEMS
CREATE TABLE invoice_items (
    id SERIAL PRIMARY KEY,
    invoice_id INT NOT NULL REFERENCES invoices(id) ON DELETE CASCADE,
    product_id INT NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    quantity INT NOT NULL DEFAULT 1,
    price DECIMAL(10,2) NOT NULL
);
