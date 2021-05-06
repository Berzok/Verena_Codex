CREATE TABLE IF NOT EXISTS carriere (
    id_carriere INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    nom         TEXT,
    description TEXT,
    deleted     INTEGER DEFAULT 0
);

CREATE TABLE IF NOT EXISTS carriere_plan (
    id_carriere_plan INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    id_carriere      INTEGER FOREIGN KEY
        REFERENCES carriere (id_carriere),
    capacite_combat  INTEGER DEFAULT NULL,
    capacite_tir     INTEGER DEFAULT NULL,
    force            INTEGER DEFAULT NULL,
    endurance        INTEGER DEFAULT NULL,
    agilite          INTEGER DEFAULT NULL,
    intelligence     INTEGER DEFAULT NULL,
    force_mentale    INTEGER DEFAULT NULL,
    sociabilite      INTEGER DEFAULT NULL,
    attaques         INTEGER DEFAULT NULL,
    blessures        INTEGER DEFAULT NULL,
    mouvement        INTEGER DEFAULT NULL,
    magie            INTEGER DEFAULT NULL,
    fortune          INTEGER DEFAULT NULL,
    destin           INTEGER DEFAULT NULL,
    deleted          INTEGER DEFAULT 0
);