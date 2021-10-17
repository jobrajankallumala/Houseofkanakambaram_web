// {
//     "apps": [
//         {
//             "name": "NodeServer",
//             "script": "npm",
//             "automation": false,
//             "args": "run ssr"
//             "env": {
//                 "NODE_ENV": "development"
//             },
//             "env_production": {
//                 "NODE_ENV": "production"
//             }
//         }
//     ]
// }


// pm2 start ecosystem.config.js --env production --only NodeServer

// For development environment:
// pm2 start ecosystem.config.js --only NodeServer