const fsp = require('fs/promises');

async function read() {
    let data;

    try {
        data = await fsp.readFile('config.base.json', 'utf8');
    } catch {
        console.error('Error: config.base.json is missing or cannot be read.');

        return;
    };

    let config;

    try {
        config = JSON.parse(data);
    } catch(error) {
        console.error(`Error: config.base.json contains invalid JSON.`);
        console.error(error.message);

        return;
    };

    const environments = process.argv.slice(2);

    if (environments.length === 0) {
        console.log("Please provide an environment!");
        
        return;
    }

    if (environments.includes('base')) {
        console.log('Base cannot be used as an override.');

        return;
    }
    
    function isObject(value) {
        return value !== null &&
        typeof value === 'object' &&
        !Array.isArray(value);
    }

    function deepMerge (base, override) {
        let obj = {...base};
        
        for (const key in override) {
            if (isObject(base[key]) && isObject(override[key])) {
                obj[key] = deepMerge(base[key], override[key]);
            } else {
                obj[key] = override[key];
            }
        }
        
        return obj;
    }

    let result = config;

    for (const environment of environments) {
        const overrideFile = `config.${environment}.json`;

        let overrideData;

        try {
            overrideData = await fsp.readFile(overrideFile, 'utf8');
        } catch {
            console.warn(
                `Warning: ${overrideFile} does not exist. Skipping this override.`
            );
            continue;
        }

        let overrideConfig;

        try {
            overrideConfig = JSON.parse(overrideData);
        } catch (error) {
            console.error(
                `Error: ${overrideFile} contains invalid JSON.`
            );
            console.error(error.message);
            return;
        }

        result = deepMerge(result, overrideConfig);
    }
    
    const finalData = JSON.stringify(result, null, 2);

    const tmpPath = 'config.final.json.tmp';

    await fsp.writeFile(tmpPath, finalData);

    await fsp.rename(tmpPath, 'config.final.json');

    console.log('Config merged successfully.');
}

read();