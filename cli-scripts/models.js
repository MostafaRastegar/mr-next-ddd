#!/usr/bin/env node
const fs = require('fs');

const {
  entityNameToUpperCase,
  nestedDirectoryGenerator,
  generateFile,
} = require('./utils');

const argv = process.argv[2];
const entityName = entityNameToUpperCase(argv);

const { modelsPath, repositoriesPath } = nestedDirectoryGenerator(
  entityName,
  'domains',
  ['models', 'repositories']
);

const files = [
  {
    path: `${modelsPath}/${entityName}.ts`,
    content: _generateContent1(entityName),
  },
  {
    path: `${repositoriesPath}/I${entityName}Repository.ts`,
    content: _generateContent2(entityName),
  },
];

generateFile(files, entityName);

function _generateContent1(entity) {
  return `export interface ${entity} {}
export interface ${entity}Update {}
export interface ${entity}UpdateParams {
  ${entity.toLowerCase()}: { [v: string]: any };
}

export interface ${entity}Create {}
export interface ${entity}CreateParams {
  email: string;
  password: string;
}

export interface ${entity}Delete {}
export interface ${entity}DeleteParams {
  ${entity.toLowerCase()}: { [v: string]: any };
}`;
}

function _generateContent2(entity) {
  return `import { ResponseObject } from '@/modules/_modulesTypes';
import {
  ${entity},
  ${entity}Create,
  ${entity}CreateParams,
  ${entity}Delete,
  ${entity}DeleteParams,
  ${entity}Update,
  ${entity}UpdateParams,
} from '../models/${entity}';

export interface I${entity}Repository {
  update(body: ${entity}UpdateParams): Promise<ResponseObject<${entity}Update>>;
  find(): Promise<ResponseObject<${entity}>>;
  create(body: ${entity}CreateParams): Promise<ResponseObject<${entity}Create>>;
  delete(body: ${entity}DeleteParams): Promise<ResponseObject<${entity}Delete>>;
}`;
}
