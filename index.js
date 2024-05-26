import {
    mkfile, mkdir, isDirectory, isFile, map, getChildren,
    getName,
    getMeta
  } from '@hexlet/immutable-fs-trees';


const tree = mkdir('nodes-package', [
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

const changeOwner = (node, newOwner) => {
    if (isFile(node) || isDirectory(node)) {
        return map((el) => ({ ...el, meta: { ...el.meta, owner: newOwner } }), node)
    }
    return node.meta.owner
}

const showNamesOwner = (node) => {
    let res = []
    res.push(node.meta.owner)
    res.push(getName(node))
    const childs = getChildren(node)
    childs.map((el) => {
        if (isFile(el)){
            res.push(getName(el))
        }else {
            res.push(getName(el))
            res.push(showNamesOwner(el))
        }
    })
    
    return res.join(', ')
}

const sumFiles = (node) => {
    let sum = 0
    const childs = getChildren(node)
    childs.map((el) => {
        if (isFile(el)){
            sum += 1
        }else{
            sum += sumFiles(el)
        }
    })
    return sum
}

const sumDir = (node) => {
    let  sum = 1
    const childs = getChildren(node)
    childs.map((el) => {
        if (isDirectory(el)){
            sum += sumDir(el)
        }
    })
    return sum
}

const sumNodesAndLeaves = (node) => {
    let nodes = 1
    let leaves = 0

    if (node.children) {
        node.children.forEach(child => {
            if (child.type === 'directory') {
                const { nodes: childNodes, leaves: childLeaves } = countNodesAndLeaves(child)
                nodes += childNodes
                leaves += childLeaves
            } else if (child.type === 'file') {
                leaves += 1
            }
        })
    }

    return { nodes, leaves }
}

const sumFilesDir = (node) => {
    if (isFile(node)) {
        return 1
    }
    const children = getChildren(node);
    let fileCount = 0
    children.forEach((child) => {
        if (isFile(child)) {
            fileCount += 1
        } else if (isDirectory(child)) {
            fileCount += sumFilesDir(child);
        }
    })

    return fileCount
}

const printDirectoryFileCount = (node) => {
    if (isDirectory(node)) {
        const name = getName(node)
        const filesCount = sumFilesDir(node)
        console.log(`${name}: ${filesCount}`)
    }
}

map(printDirectoryFileCount, tree);

const addDirect = (node) => {
    const name = getName(node)
    const meta = getMeta(node)
    const newDir1 = mkdir('1')
    const newDir2 = mkdir('2')
    const newTree = getChildren(node).concat([newDir1, newDir2])
    return mkdir(name, newTree, meta)
}

const showDirect = (tree) => {
    const child = getChildren(tree)
    let list = []
    child.map((el) => {
        if (isDirectory(el) && getChildren(el) == []){
            list.push(getName(el))
        }
    })
    console.log(list) 
}

const newTree = addDirect(tree)
