DROP TABLE IF EXISTS `Utilisateurs`;

CREATE TABLE `Utilisateurs` (
    `id` INT PRIMARY KEY AUTO_INCREMENT,
    `pseudo` VARCHAR(50) NOT NULL,
    `hashed_password` VARCHAR(280) NOT NULL,
    `email` VARCHAR(100),
    `dateInscription` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

DROP TABLE IF EXISTS `SujetsForum`;

CREATE TABLE `SujetsForum` (
    `id` INT PRIMARY KEY AUTO_INCREMENT,
    `titreSujet` VARCHAR(255) NOT NULL,
    `auteurId` INT,
    `dateCreation` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (`auteurId`) REFERENCES `Utilisateurs`(`id`) ON DELETE CASCADE
);

DROP TABLE IF EXISTS `Messages`;

CREATE TABLE `Messages` (
    `id` INT PRIMARY KEY AUTO_INCREMENT,
    `titre` VARCHAR(255),
    `contenuMessage` TEXT NOT NULL,
    `categorie` VARCHAR(255),
    `utilisateurId` INT,
    `sujetId` INT,
    `dateEnvoi` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (`utilisateurId`) REFERENCES `Utilisateurs`(`id`) ON DELETE CASCADE,
    FOREIGN KEY (`sujetId`) REFERENCES `SujetsForum`(`id`) ON DELETE CASCADE
);

-- Insertion dans la table Utilisateurs
INSERT INTO `Utilisateurs` (`pseudo`, `hashed_password`, `email`) VALUES
('Utilisateur1', 'motdepasse1', 'utilisateur1@email.com'),
('Utilisateur2', 'motdepasse2', 'utilisateur2@email.com'),
('Utilisateur3', 'motdepasse3', 'utilisateur3@email.com');

-- Insertion dans la table SujetsForum
INSERT INTO `SujetsForum` (`titreSujet`, `auteurId`) VALUES
('Sujet1', 1),
('Sujet2', 2),
('Sujet3', 3);

-- Insertion dans la table Messages
INSERT INTO `Messages` (`titre`, `contenuMessage`, `utilisateurId`, `sujetId`, `categorie`) VALUES
('Problème fourche', 'ma fourche fuit aidez-moi', 1, 1, 'Entretien et réparation'),
('Sorti à Nantes', 'je souhaite faire une balade à nantes qui veut suivre ?', 2, 1, 'Balade et rencontre'),
('Triumph ?', 'Mes', 2, 2, 'Les motos'),
('Problème avec mon pneu', 'Messaton', 3, 2, 'Entretien et réparation'),
('Sorti ciné', 'Message1 du sujet 3', 3, 3, 'Balade et rencontre'),
('diavel ?', 'Message2 du sujet 3', 1, 3, 'Les motos');