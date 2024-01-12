#!/usr/bin/env node

const yaml = require('yaml')
const { readFileSync } = require('node:fs')
const path = require('node:path')
const fs = require('node:fs')
const { program } = require('commander')

let rootPath = ''

const readYaml = (dir) => {
    const file = readFileSync(dir, 'utf8')
    const yamlFile = yaml.parse(file)
    return yamlFile
}

const realPath = (dir) => {
    return path.join(process.cwd(), dir)
}


const genFolderFun = (...args) => {
    const _path = path.join(...args)
    if(!fs.existsSync(_path)){
        fs.mkdirSync(_path)
    }
}
const genFileFun = (_path, module) => {
    if(!fs.existsSync(_path)){
        const cw = fs.createWriteStream(_path)
        cw.write(module)
        cw.close()
    }
}

const startGen = (config, rootPath) => {
    const { genFolder, genkey, folderConfig } = config
    const _path = path.join(rootPath, genFolder)
    genFolderFun(rootPath, genFolder)
    const module = fs.readFileSync(path.join(rootPath, genkey))
    const fun = (folders, rootPath) => {
        for(const i in folders){
            const val = folders[i]
            console.log(val);
            genFolderFun(rootPath, i)
            for(const j in val.folders){
                genFolderFun(rootPath, i, j)
                genFileFun(path.join(rootPath, i, j, val.folders[j].key + '.tsx'), module)
            }
        }
    }
    fun(folderConfig, _path)
}


program.command('gen <name>')
    .description('generate file')
    .action((name) => {
        rootPath = realPath(name)
        const config = readYaml(rootPath)
        startGen(config, path.join(rootPath, '../'))
    })

program.parse(process.argv)