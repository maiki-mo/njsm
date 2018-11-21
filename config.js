// Create and export config variables

// General container for the ENV
const environments = {
    // Staging (default)
    staging: {
        port: 3000,
        envName: 'Staging',
    },

    // Proudction
    production: {
        port: 5000,
        envName: 'Production',
    },
};

// Determine which environment was passed as a commandline argument
const currentEnvironment = typeof(process.env.NODE_ENV) === 'string' ? process.env.NODE_ENV.toLowerCase() : '';

// Make sure env is one of the above; if not, default to staging
const environmentExport = typeof(environments[currentEnvironment]) === 'object' ? environments[currentEnvironment] : environments.staging;

module.exports = environmentExport;
