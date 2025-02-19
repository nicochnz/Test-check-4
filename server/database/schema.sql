USE cuisine;


CREATE TABLE users (
    id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT NOT NULL,
    username VARCHAR(255) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE ingredients (
    id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT NOT NULL,
    name VARCHAR(255) NOT NULL UNIQUE,
    quantity INT NOT NULL
);
CREATE TABLE category (
    id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    name VARCHAR(255) NOT NULL UNIQUE
);

CREATE TABLE recipes (
    id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT NOT NULL,
    name VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    instructions TEXT NOT NULL,
    cooking_time INT UNSIGNED NOT NULL,
    servings INT UNSIGNED NOT NULL,
    image VARCHAR(255) NOT NULL,
    category_id INT NOT NULL,
    FOREIGN KEY (category_id) REFERENCES category(id)
);

CREATE TABLE recipe_ingredients (
    recipe_id INT UNSIGNED NOT NULL,
    ingredients_id INT UNSIGNED NOT NULL,
    quantity INT NOT NULL,
    PRIMARY KEY (recipe_id, ingredients_id),
    FOREIGN KEY (recipe_id) REFERENCES recipes(id) ON DELETE CASCADE,
    FOREIGN KEY (ingredients_id) REFERENCES ingredients(id) ON DELETE CASCADE
);


CREATE TABLE favorites (
    id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT NOT NULL,
    users_id INT UNSIGNED NOT NULL, 
    recipe_id INT UNSIGNED NOT NULL,
    FOREIGN KEY (recipe_id) REFERENCES recipes(id) ON DELETE CASCADE
);

ALTER TABLE recipes ADD COLUMN user_id INT UNSIGNED NULL;
ALTER TABLE recipes ADD FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE;

INSERT INTO users (username, email, password) 
VALUES ('testuser', 'test@example.com', 'password123');
