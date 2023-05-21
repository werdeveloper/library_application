module.exports = {
    apps: [
        {
            name: "node_crud_api_server",
            script: "server.js",
            error_file: './logs/pm2/err.log',
            out_file: './logs/pm2/out.log',
            log_file: './logs/pm2/combined.log',
            node_args: "--expose-gc --max_old_space_size=5000",
            env: {
                NODE_ENV: "development"
            },
            env_sandbox: {
                NODE_ENV: "sandbox"
            },
            env_test: {
                NODE_ENV: "test"
            },
            env_staging: {
                NODE_ENV: "staging"
            },
            env_production: {
                NODE_ENV: "production"
            }
        }
    ]
}