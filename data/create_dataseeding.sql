BEGIN;

INSERT INTO "list" ("name", "position") VALUES
( 'A FAIRE', 0),
( 'EN COURS', 1),
( 'FAIT', 2),
( 'NOT THIS TIME', 3),
( 'A CLASSER', 4);

INSERT INTO "card" ("title", "position", "color", "list_id") VALUES
( 'Aller à la boulangerie', 4, '#E9DADD', 1),
('Ranger sa chambre', 4, '#E9DADD', 1),
('Faire un gateau à l a pistache', 3, '#E9DADD', 2),
('Aller voir Fifi', 3, '#E9DADD', 2),
('Manger du chocolot', 2, '#E9DADD', 3),
('Partir en vacances', 1, '#E9DADD', 4),
('Lire un livre', 1, '#E9DADD', 5),
('Faire un potager', 0, '#E9DADD', 4),
('Faire du sport', 0, '#E9DADD', 5);


INSERT INTO "label" ("name","color", "text_color") VALUES
('urgent', '#ff0000', '#000000'),
('perso', '#008080', '#000000'),
('cuisine', '#800080', '#000000'),
('exterieur', '#0080000', '#000000');   

INSERT INTO "card_has_label"("card_id", "label_id") VALUES
(2, 3),
(3, 1),
(4, 2),
(5, 4),
(6, 1),
(7, 3),       
(8, 2),
(9, 2);

COMMIT;
