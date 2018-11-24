// Create and export config variables

// General container for the ENV
const environments = {
    // Staging (default)
    staging: {
        httpPort: 3000,
        httpsPort: 3001,
        envName: 'Staging',
        hashingSecret: 'thisisasecret',
    },

    // Production
    production: {
        httpPort: 5000,
        httpsPort: 5001,
        envName: 'Production',
        hashingSecret: 'thisisalsoasecret',
    },
};

// Determine which environment was passed as a commandline argument
const currentEnvironment = typeof(process.env.NODE_ENV) === 'string' ? process.env.NODE_ENV.toLowerCase() : '';

// Make sure env is one of the above; if not, default to staging
const environmentExport = typeof(environments[currentEnvironment]) === 'object' ? environments[currentEnvironment] : environments.staging;

module.exports = environmentExport;
