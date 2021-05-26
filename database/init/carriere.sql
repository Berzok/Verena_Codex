CREATE TABLE IF NOT EXISTS carriere (
    id_carriere INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    nom         TEXT,
    description TEXT,
    image       TEXT,
    basique     INTEGER DEFAULT 1,
    deleted     INTEGER DEFAULT 0
);

CREATE TABLE IF NOT EXISTS carriere_dotation (
    id_carriere_dotation INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    id_carriere          INTEGER NOT NULL,
    id_objet             INTEGER NOT NULL,
    id_qualite           INTEGER,
    quantite             INTEGER DEFAULT 1,
    deleted              INTEGER DEFAULT 0,
    FOREIGN KEY (id_carriere)
        REFERENCES carriere (id_carriere),
    FOREIGN KEY (id_objet)
        REFERENCES objet (id_objet),
    FOREIGN KEY (id_qualite)
        REFERENCES qualite (id_qualite)
);

CREATE TABLE IF NOT EXISTS carriere_plan (
    id_carriere_plan INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    id_carriere      INTEGER NOT NULL,
    capacite_combat  INTEGER DEFAULT NULL,
    capacite_tir     INTEGER DEFAULT NULL,
    force            INTEGER DEFAULT NULL,
    endurance        INTEGER DEFAULT NULL,
    agilite          INTEGER DEFAULT NULL,
    intelligence     INTEGER DEFAULT NULL,
    force_mentale    INTEGER DEFAULT NULL,
    sociabilite      INTEGER DEFAULT NULL,
    attaque         INTEGER DEFAULT NULL,
    blessure        INTEGER DEFAULT NULL,
    mouvement        INTEGER DEFAULT NULL,
    magie            INTEGER DEFAULT NULL,
    fortune          INTEGER DEFAULT NULL,
    destin           INTEGER DEFAULT NULL,
    deleted          INTEGER DEFAULT 0,
    FOREIGN KEY (id_carriere)
        REFERENCES carriere (id_carriere)
);

CREATE TABLE IF NOT EXISTS carriere_competence (
    id_carriere_competence       INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    id_carriere                  INTEGER NOT NULL,
    id_competence                INTEGER NOT NULL,
    id_competence_specialisation INTEGER DEFAULT NULL,
    id_competence_exclue         INTEGER DEFAULT NULL,
    deleted                      INTEGER DEFAULT 0,
    FOREIGN KEY (id_carriere)
        REFERENCES carriere (id_carriere),
    FOREIGN KEY (id_competence)
        REFERENCES competence (id_competence),
    FOREIGN KEY (id_competence_specialisation)
        REFERENCES competence_specialisation (id_competence_specialisation),
    FOREIGN KEY (id_competence_exclue)
        REFERENCES competence (id_competence)
);

CREATE TABLE IF NOT EXISTS carriere_talent (
    id_carriere_talent       INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    id_carriere              INTEGER NOT NULL,
    id_talent                INTEGER NOT NULL,
    id_talent_specialisation INTEGER DEFAULT NULL,
    id_talent_exclu          INTEGER DEFAULT NULL,
    deleted                  INTEGER DEFAULT 0,
    FOREIGN KEY (id_carriere)
        REFERENCES carriere (id_carriere),
    FOREIGN KEY (id_talent)
        REFERENCES talent (id_talent),
    FOREIGN KEY (id_talent_specialisation)
        REFERENCES talent_specialisation (id_talent_specialisation),
    FOREIGN KEY (id_talent_exclu)
        REFERENCES talent (id_talent)
);

CREATE TABLE IF NOT EXISTS carriere_sortie (
    id_carriere_sortie    INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    id_carriere           INTEGER NOT NULL,
    id_carriere_de_sortie INTEGER DEFAULT NULL,
    deleted               INTEGER DEFAULT 0,
    FOREIGN KEY (id_carriere)
        REFERENCES carriere (id_carriere),
    FOREIGN KEY (id_carriere_de_sortie)
        REFERENCES carriere (id_carriere)
);

CREATE TABLE IF NOT EXISTS carriere_acces (
    id_carriere_acces      INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    id_carriere            INTEGER NOT NULL,
    id_carriere_pour_acces INTEGER NOT NULL,
    deleted                INTEGER DEFAULT 0,
    FOREIGN KEY (id_carriere)
        REFERENCES carriere (id_carriere),
    FOREIGN KEY (id_carriere_pour_acces)
        REFERENCES carriere (id_carriere)
);