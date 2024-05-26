import {
    mkfile, mkdir, isDirectory, isFile, map,
  } from '@hexlet/immutable-fs-trees';

const a = mkdir('nodes-package', [
    mkfile('Makefile'),
    mkfile('README.md'),
    mkdir('dist'),
    mkdir('__tests__', [
        mkfile('half.test.js', {type: 'text/javascript'})
    ]),
    mkfile('babel.config.js', {type: 'text/javascript'}),
    mkdir('node_modules', [
        mkdir('@babel', [
            mkdir('cli', [
                mkfile('LICENSE')
            ])
        ])
    ], {
        owner: 'root',
        hidden: false
    })
], {hiddem: true})

console.log(a)