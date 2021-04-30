CREATE TABLE IF NOT EXISTS talent (
    id_talent   INTEGER(11) PRIMARY KEY,
    nom         TEXT(140),
    description TEXT(990),
    effet       TEXT(990),
    deleted     INTEGER(1) DEFAULT 0
);

CREATE TABLE IF NOT EXISTS talent_specialisation (
    id_talent_specialisation INTEGER(11) PRIMARY KEY,
    id_talent                INTEGER(11) FOREIGN KEY
        REFERENCES talent (id_talent),
    nom                      TEXT(140),
    deleted                  INTEGER(1) DEFAULT 0
);

CREATE TABLE IF NOT EXISTS talent_bonus (
    id_talent_bonus INTEGER(11) PRIMARY KEY,
    id_talent       INTEGER(11) FOREIGN KEY
        REFERENCES talent (id_talent),
    capacite_combat INTEGER(10) DEFAULT 0,
    capacite_tir    INTEGER(10) DEFAULT 0,
    force           INTEGER(10) DEFAULT 0,
    endurance       INTEGER(10) DEFAULT 0,
    agilite         INTEGER(10) DEFAULT 0,
    intelligence    INTEGER(10) DEFAULT 0,
    force_mentale   INTEGER(10) DEFAULT 0,
    sociabilite     INTEGER(10) DEFAULT 0,
    attaques        INTEGER(10) DEFAULT 0,
    blessures       INTEGER(10) DEFAULT 0,
    mouvement       INTEGER(10) DEFAULT 0,
    magie           INTEGER(10) DEFAULT 0,
    fortune         INTEGER(10) DEFAULT 0,
    destin          INTEGER(10) DEFAULT 0,
    deleted         INTEGER(1)  DEFAULT 0
);