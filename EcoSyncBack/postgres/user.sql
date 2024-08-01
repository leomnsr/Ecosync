CREATE TABLE IF NOT EXISTS users(
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS refresh_tokens
(
    id INT NOT NULL,
    refresh_token VARCHAR(255),

    FOREIGN KEY (id) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS houses
(
    userid INT NOT NULL,
    housearea INT NOT NULL,
    inhabitants INT NOT NULL,
    housetype INT NOT NULL,

    linkynumber VARCHAR(255) NOT NULL,

    FOREIGN KEY (userid) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS consumptions
(
    userid INT NOT NULL,
    electricity REAL NOT NULL,
    water REAL NOT NULL,
    citygas REAL NOT NULL,
    propanegas REAL NOT NULL,
    bottlegas REAL NOT NULL,
    bottlequantity REAL NOT NULL,

    FOREIGN KEY (userid) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS history (
    id SERIAL PRIMARY KEY,
    userid INT NOT NULL,
    electricityimpact REAL NOT NULL,
    electricitygrade INT NOT NULL,
    waterimpact REAL NOT NULL,
    watergrade INT NOT NULL,
    gasimpact REAL NOT NULL,
    gasgrade INT NOT NULL,
    grade INT NOT NULL,
    readingdate DATE NOT NULL DEFAULT CURRENT_DATE,

    FOREIGN KEY(userid) REFERENCES users(id)
);
