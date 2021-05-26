CREATE TABLE IF NOT EXISTS competence (
    id_competence   INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    caracteristique TEXT,
    nom             TEXT,
    description     TEXT,
    effet           TEXT,
    basique         INTEGER DEFAULT 0,
    deleted         INTEGER DEFAULT 0
);

CREATE TABLE IF NOT EXISTS competence_specialisation (
    id_competence_specialisation INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    id_competence                INTEGER NOT NULL,
    nom                          TEXT,
    description                  TEXT,
    effet                        TEXT,
    deleted                      INTEGER DEFAULT 0,
    FOREIGN KEY (id_competence)
        REFERENCES competence (id_competence)
);