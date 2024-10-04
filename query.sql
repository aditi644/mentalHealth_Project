-- CREATE TABLE users (
--   id SERIAL PRIMARY KEY,
--   email VARCHAR(255) UNIQUE NOT NULL,
--   password VARCHAR(255) NOT NULL
-- );

-- CREATE TABLE webUser (
--     id SERIAL PRIMARY KEY,
--     username VARCHAR(100),
--     email VARCHAR(100) UNIQUE NOT NULL,
--     password VARCHAR(255) NOT NULL
-- );
-- Create users table
CREATE TABLE IF NOT EXISTS myuser (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100) UNIQUE,
    password VARCHAR(255)
);


-- -- Insert initial data (optional)
-- INSERT INTO users (username, password) VALUES
-- ('admin', 'adminpassword'),
-- ('user1', 'password1');

CREATE TABLE mindfulness_sessions (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL
);
