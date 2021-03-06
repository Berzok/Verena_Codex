CREATE TABLE IF NOT EXISTS talent (
    id_talent   INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    nom         TEXT,
    description TEXT,
    effet       TEXT,
    deleted     INTEGER DEFAULT 0
);

CREATE TABLE IF NOT EXISTS talent_specialisation (
    id_talent_specialisation INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    id_talent                INTEGER FOREIGN KEY
        REFERENCES talent (id_talent),
    nom                      TEXT,
    deleted                  INTEGER DEFAULT 0
);

CREATE TABLE IF NOT EXISTS talent_bonus (
    id_talent_bonus INTEGER PRIMARY KEY,
    id_talent       INTEGER FOREIGN KEY
        REFERENCES talent (id_talent),
    capacite_combat INTEGER DEFAULT 0,
    capacite_tir    INTEGER DEFAULT 0,
    force           INTEGER DEFAULT 0,
    endurance       INTEGER DEFAULT 0,
    agilite         INTEGER DEFAULT 0,
    intelligence    INTEGER DEFAULT 0,
    force_mentale   INTEGER DEFAULT 0,
    sociabilite     INTEGER DEFAULT 0,
    attaques        INTEGER DEFAULT 0,
    blessures       INTEGER DEFAULT 0,
    mouvement       INTEGER DEFAULT 0,
    magie           INTEGER DEFAULT 0,
    fortune         INTEGER DEFAULT 0,
    destin          INTEGER DEFAULT 0,
    deleted         INTEGER DEFAULT 0
);