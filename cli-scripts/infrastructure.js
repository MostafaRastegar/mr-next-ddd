const fs = require('fs');

const {
  entityNameToUpperCase,
  nestedDirectoryGenerator,
  generateFile,
} = require('./utils');

const argv = process.argv[2];
const entityName = entityNameToUpperCase(argv);

const { restfulPath, basePath } = nestedDirectoryGenerator(
  entityName,
  'infrastructure',
  ['restful']
);

const files = [
  {
    path: `${restfulPath}/${entityName}RestfulRepository.ts`,
    content: _restfulRepositoryContent(entityName),
  },
  {
    path: `${basePath}/index.ts`,
    content: _restfulRepositoryInterface(entityName),
  },
];

generateFile(files, entityName);

function _restfulRepositoryContent(entity) {
  return `import endpoints from '@/constants/endpoints';
import { serviceHandler } from '@/helpers/serviceHandler';
import request, { requestWithoutAuth } from '@/utils/request';
import type {
  ${entityName},
  ${entityName}Create,
  ${entityName}CreateParams,
  ${entityName}Delete,
  ${entityName}DeleteParams,
  ${entityName}Update,
  ${entityName}UpdateParams,
} from '../../domains/models/${entityName}';
import type { I${entityName}Repository } from '../../domains/repositories/I${entityName}Repository';

function ${entityName}Repository(): I${entityName}Repository {
  return {
    find: () =>
      serviceHandler<${entityName}>(() => request.get(endpoints.${entityName.toUpperCase()}.GET_${entityName.toUpperCase()}())),

    update: (body: ${entityName}UpdateParams) =>
      serviceHandler<${entityName}Update>(() =>
        request.put(endpoints.${entityName.toUpperCase()}.PUT_${entityName.toUpperCase()}(), body)
      ),

    create: (body: ${entityName}CreateParams) =>
      serviceHandler<${entityName}Create>(() =>
        requestWithoutAuth.post(endpoints.${entityName.toUpperCase()}.POST_${entityName.toUpperCase()}(), body)
      ),
    delete: (body: ${entityName}DeleteParams) =>
      serviceHandler<${entityName}Delete>(() =>
        requestWithoutAuth.post(endpoints.${entityName.toUpperCase()}.POST_${entityName.toUpperCase()}(), body)
      ),
  };
}

export default ${entityName}Repository;`;
}
function _restfulRepositoryInterface(entity) {
  return `import ${entity}RestfulRepository from './restful/${entity}RestfulRepository';

const ${entity}Repository = ${entity}RestfulRepository();

export { ${entity}Repository };`;
}
