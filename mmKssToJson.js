const kss = require('kss'),
    fs = require('fs-extra'),
    argv = require('yargs').argv;

const sourceDirectory = argv.source,
    outputFilePath = argv.destination,
    options = {
        custom: argv.custom
    };

kss.traverse(sourceDirectory, options).then(styleGuide => {

    if (styleGuide) {

        let jsonSections = [],
            sections = styleGuide.sections(),
            numberOfSections = sections.length;

        for (let i = 0; i < numberOfSections; i++) {
            jsonSections.push(sections[i].toJSON(options.custom));
        }

        fs.outputJson(outputFilePath, jsonSections, function (err) {
            if (err) {
                console.log(err);
            }
        });

    } else {
        throw new Error('KssStyleGuide to create json from is not available.');
    }
});
