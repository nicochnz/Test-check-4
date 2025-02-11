USE cuisine;

INSERT INTO ingredient (name) VALUES 
('Tomate'), ('Basilic'), ('Mozzarella'), ('Pâtes');

INSERT INTO recipe (title, instructions) VALUES 
('Salade Caprese', 'Tranchez la tomate et la mozzarella. Ajoutez du basilic et un filet d\'huile d\'olive.'),
('Pâtes à la sauce tomate', 'Faites cuire les pâtes. Ajoutez une sauce tomate maison.');

INSERT INTO recipe_ingredient (recipe_id, ingredient_id, quantity) VALUES 
(1, 1, '2 tomates'), 
(1, 2, 'Quelques feuilles de basilic'), 
(1, 3, '125g de mozzarella'), 
(2, 4, '200g de pâtes'), 
(2, 1, '100ml de sauce tomate');
