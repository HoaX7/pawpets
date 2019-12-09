var path = require('path');


// @ COPYRIGHT 2019 CREATED BY HoaX



require('sql-migrations').run({
        migrationsDir: path.resolve(__dirname, 'migrations'), // This is the directory that should contain your SQL migrations.
        host: 'localhost', // Database host
        port: 5432, // Database port
        db: 'pawpets', // Database name
        user: 'postgres', // Database username
        password: '', // Database password
        adapter: 'pg', // Database adapter: pg, mysql
        // Parameters are optional. If you provide them then any occurrences of the parameter (i.e. FOO) in the SQL scripts will be replaced by the value (i.e. bar).
        parameters: {
            "FOO": "bar"
        },
        minMigrationTime: new Date('2018-01-01').getTime() // Optional. Skip migrations before this time.
});