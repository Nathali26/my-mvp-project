
-- Creación de tablas para un proyecto de recetas
--

-- Desactivar verificación de claves foráneas temporalmente
SET foreign_key_checks = 0;

-- Tabla para recetas
CREATE TABLE IF NOT EXISTS recipes (
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(100) NOT NULL,
    description TEXT,
    instructions TEXT,
    PRIMARY KEY (id)
);

-- Tabla para ingredientes
CREATE TABLE IF NOT EXISTS ingredients (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    PRIMARY KEY (id)
);

-- Tabla para relacionar recetas e ingredientes (receta - ingrediente / many to many )
CREATE TABLE IF NOT EXISTS recipe_ingredients (
    recipe_id INT NOT NULL,
    ingredient_id INT NOT NULL,
    PRIMARY KEY (recipe_id, ingredient_id),
    FOREIGN KEY (recipe_id) REFERENCES recipes (id),
    FOREIGN KEY (ingredient_id) REFERENCES ingredients (id)
);

-- Reactivar verificación de claves foráneas
SET foreign_key_checks = 1;
