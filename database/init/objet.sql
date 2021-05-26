CREATE TABLE IF NOT EXISTS objet (
    id_objet                INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    id_disponibilite_defaut INTEGER,
    nom                     TEXT,
    description             TEXT,
    prix                    INTEGER,
    deleted                 INTEGER DEFAULT 0,
    FOREIGN KEY (id_disponibilite_defaut)
        REFERENCES disponibilite (id_disponibilite)
);

CREATE TABLE IF NOT EXISTS disponibilite (
    id_disponibilite INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    nom              TEXT,
    difficulte       TEXT,
    deleted          INTEGER DEFAULT 0
);

CREATE TABLE IF NOT EXISTS qualite (
    id_qualite                 INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    nom                        TEXT,
    multiplicateur_cout        INTEGER,
    modificateur_disponibilite INTEGER,
    deleted                    INTEGER DEFAULT 0
)