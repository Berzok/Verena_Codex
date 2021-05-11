CREATE TABLE IF NOT EXISTS personnage (
    id_personnage  INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    id_utilisateur INTEGER,
    deleted        INTEGER DEFAULT 0,
    FOREIGN KEY (id_utilisateur)
        REFERENCES utilisateur (id_utilisateur)
);

CREATE TABLE IF NOT EXISTS personnage_profil (
    id_personnage_profil INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    id_personnage        INTEGER,
    capacite_combat      INTEGER DEFAULT NULL,
    capacite_tir         INTEGER DEFAULT NULL,
    force                INTEGER DEFAULT NULL,
    endurance            INTEGER DEFAULT NULL,
    agilite              INTEGER DEFAULT NULL,
    intelligence         INTEGER DEFAULT NULL,
    force_mentale        INTEGER DEFAULT NULL,
    sociabilite          INTEGER DEFAULT NULL,
    attaques             INTEGER DEFAULT NULL,
    blessures            INTEGER DEFAULT NULL,
    mouvement            INTEGER DEFAULT NULL,
    magie                INTEGER DEFAULT NULL,
    fortune              INTEGER DEFAULT NULL,
    destin               INTEGER DEFAULT NULL,
    deleted              INTEGER DEFAULT 0,
    FOREIGN KEY (id_personnage)
        REFERENCES personnage (id_personnage)
);

CREATE TABLE IF NOT EXISTS personnage_info (
    id_personnage_info INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    id_personnage      INTEGER,
    nom                TEXT,
    prenom             TEXT,
    id_pays            INTEGER,
    age                INTEGER,
    sexe               TEXT,
    couleur_yeux       TEXT,
    couleur_pilosite   TEXT,
    masse              INTEGER,
    membre_famille     INTEGER,
    statut_marital     TEXT,
    id_signe_astral    INTEGER,
    id_lieu_naissance  INTEGER,
    id_religion        INTEGER DEFAULT NULL,
    id_carriere        INTEGER,
    id_race            INTEGER,
    id_race_2          INTEGER DEFAULT NULL,
    FOREIGN KEY (id_personnage)
        REFERENCES personnage (id_personnage)
);

CREATE TABLE IF NOT EXISTS personnage_equipement(
    id_personnage_equipement INTEGER not NULL PRIMARY KEY AUTOINCREMENT,
    id_personnage INTEGER,
    FOREIGN KEY (id_personnage) REFERENCES personnage(id_personnage)
);