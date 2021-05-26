const SequelizeAuto = require('sequelize-auto');

const auto = new SequelizeAuto('database', 'user', 'password', {
    host: 'localhost',
    dialect: 'sqlite',
    directory: './models', // where to write files
    port: 'port',
    //caseModel: 'c', // convert snake_case column names to camelCase field names: user_id -> userId
    //caseFile: 'c', // file names created for each model use camelCase.js not snake_case.js
    additional: {
        timestamps: false
        // ...options added to each model
    },
    storage: 'veritas_project_bdd.sqlite',
    // use all tables, if omitted
    skipTables: [
        'sqlite_master',
        'sqlite_sequence',
        'carriere',
        'carriere_acces',
        'carriere_competence',
        'carriere_dotation',
        'carriere_plan',
        'carriere_sortie',
        'carriere_talent',
        'don_du_sang',
        'role',
        'talent',
        'talent_bonus',
        'talent_specialisation',
        'utilisateur'
    ]
    //...
});

auto.run();