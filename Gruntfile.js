const { cp } = require('shelljs');

module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        clean: ["lib"],
        ts: {
            default : {
              outDir: "lib",
              tsconfig: './tsconfig.json'
            }
        },
        typedoc: {
            build: {
                options: {
                    module: 'commonjs',
                    out: './docs',
                    name: 'lock-screen',
                    target: 'es2018'
                },
                src: ['./src/**/*']
            }
        },
    });

    grunt.registerTask('extraDocStuff', function () {
        cp("-r", "./.docs/.*", "./.docs/*", "./docs");
    });

    grunt.loadNpmTasks('grunt-typedoc');
    grunt.loadNpmTasks("grunt-ts");
    grunt.loadNpmTasks('grunt-contrib-clean');
    
    grunt.registerTask('build', ['clean', 'ts']);
    grunt.registerTask('default', ['build']);
    grunt.registerTask('docs', ['typedoc', 'extraDocStuff']);
};