const env = process.env.NODE_ENV || 'dev';

var config_temp = {
    default: {
        port: 3000,
        version: '0.0.1',
        database: {
            host: 'localhost',
            dialect: 'sqlite',
            logging: false,
            storage: 'veritas_project_bdd_sqlite'
        }
    },
    dev: {
        logging_level: 10
    },
    prod: {

    }
};

var config = {
    ...config_temp.default,
    ...config_temp[env]
}

module.exports = config;