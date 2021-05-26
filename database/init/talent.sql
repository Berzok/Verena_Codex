CREATE TABLE IF NOT EXISTS talent (
    id_talent          INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    id_competence_liee INTEGER DEFAULT NULL,
    nom                TEXT,
    description        TEXT,
    effet              TEXT,
    deleted            INTEGER DEFAULT 0,
    FOREIGN KEY (id_competence_liee)
        REFERENCES competence (id_competence)
);

CREATE TABLE IF NOT EXISTS talent_specialisation (
    id_talent_specialisation INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    id_talent                INTEGER FOREIGN KEY
        REFERENCES talent (id_talent),
    nom                      TEXT,
    deleted                  INTEGER DEFAULT 0
);

CREATE TABLE IF NOT EXISTS talent_bonus (
    id_talent_bonus INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    id_talent       INTEGER FOREIGN KEY
        REFERENCES talent (id_talent),
    capacite_combat INTEGER DEFAULT NULL,
    capacite_tir    INTEGER DEFAULT NULL,
    force           INTEGER DEFAULT NULL,
    endurance       INTEGER DEFAULT NULL,
    agilite         INTEGER DEFAULT NULL,
    intelligence    INTEGER DEFAULT NULL,
    force_mentale   INTEGER DEFAULT NULL,
    sociabilite     INTEGER DEFAULT NULL,
    attaques        INTEGER DEFAULT NULL,
    blessures       INTEGER DEFAULT NULL,
    mouvement       INTEGER DEFAULT NULL,
    magie           INTEGER DEFAULT NULL,
    fortune         INTEGER DEFAULT NULL,
    destin          INTEGER DEFAULT NULL,
    deleted         INTEGER DEFAULT 0
);