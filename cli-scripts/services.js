const fs = require('fs');

const {
  entityNameToUpperCase,
  nestedDirectoryGenerator,
  generateFile,
} = require('./utils');

const argv = process.argv[2];
const entityName = entityNameToUpperCase(argv);

const { basePath } = nestedDirectoryGenerator(entityName, 'services');

const files = [
  {
    path: `${basePath}/${entityName}Service.ts`,
    content: _generateContent1(entityName),
  },
  {
    path: `${basePath}/I${entityName}Service.ts`,
    content: _generateContent2(entityName),
  },
];

generateFile(files, entityName);

function _generateContent1(entity) {
  return `import Cookies from 'universal-cookie';
import { serviceHandler } from '@/helpers/serviceHandler';
import type {
  ${entity},
  ${entity}Create,
  ${entity}CreateParams,
  ${entity}Delete,
  ${entity}DeleteParams,
  ${entity}Update,
  ${entity}UpdateParams,
} from '../domains/models/${entity}';
import { I${entity}Repository } from '../domains/repositories/I${entity}Repository';
import { I${entity}Service } from './I${entity}Service';

const cookies = new Cookies(null, { path: '/' });

function ${entity}Service(
  ${entity}Repository: I${entity}Repository,
  redirect?: Function
): I${entity}Service {
  return {
    getCurrent${entity}: () => serviceHandler<${entity}>(${entity}Repository.find),

    update: (body: ${entity}UpdateParams) =>
      serviceHandler<${entity}Update>(() => ${entity}Repository.update(body)),

    remove: (body: ${entity}DeleteParams) =>
      serviceHandler<${entity}Delete>(() => ${entity}Repository.delete(body)),

    register: (body: ${entity}CreateParams) =>
      serviceHandler<${entity}Create>(() => ${entity}Repository.create(body), {
        onSuccess: (response) => {
          const token = response?.data.${entity.toLowerCase()}?.token;
          if (cookies && token && redirect) {
            cookies.set('access_token', token);
            redirect('/');
          }
          return response;
        },
      }),
  };
}

export default ${entity}Service;`;
}
function _generateContent2(entity) {
  return `import { ResponseObject } from '@/modules/_modulesTypes';
import type {
  ${entity},
  ${entity}Create,
  ${entity}CreateParams,
  ${entity}Delete,
  ${entity}DeleteParams,
  ${entity}Update,
  ${entity}UpdateParams,
} from '../domains/models/${entity}';

export interface I${entity}Service {
  register(body: ${entity}CreateParams): Promise<ResponseObject<${entity}Create>>;
  update(body: ${entity}UpdateParams): Promise<ResponseObject<${entity}Update>>;
  getCurrent${entity}(): Promise<ResponseObject<${entity}>>;
  remove(body: ${entity}DeleteParams): Promise<ResponseObject<${entity}Delete>>;
}`;
}
