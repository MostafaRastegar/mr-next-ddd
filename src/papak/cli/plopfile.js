// const plopJs = require('src/papakcli/plopfile');
// module.exports = plopJs;

const { readdirSync } = require('fs');

module.exports = function (plop) {
  plop.setHelper('firstCharToUpper', (arg) => {
    const entityName = arg.charAt(0).toUpperCase() + arg.slice(1);

    if (!entityName) {
      console.error('Please provide a name for the entity');
      return process.exit(1);
    }

    return entityName;
  });

  plop.setHelper('charToUpper', (arg) => {
    const entityName = arg.toUpperCase();
    if (!entityName) {
      console.error('Please provide a name for the entity');
      return process.exit(1);
    }
    return entityName;
  });

  plop.setPartial('module_name', '{{firstCharToUpper moduleName}}');
  plop.setPartial('module_name_upper', '{{charToUpper moduleName}}');
  plop.setPartial('module_name_small_case', '{{moduleName}}');

  plop.setPartial('partial_name', '{{partialName}}');
  plop.setPartial('router_path', '{{routerPath}}');
  plop.setPartial('component_partial_name', '{{firstCharToUpper partialName}}');

  plop.setGenerator('module', {
    description: 'Generate new module in "/src/modules" directory',
    prompts: [
      {
        type: 'input',
        name: 'moduleName',
        message: 'Enter the module name:',
      },
    ],
    actions: [
      {
        type: 'add',
        path: 'src/modules/{{moduleName}}/domains/I{{firstCharToUpper moduleName}}Service.ts',
        templateFile: 'src/papak/cli/templates/domain/IService.ts.hbs',
      },
      {
        type: 'add',
        path: 'src/modules/{{moduleName}}/domains/models/{{firstCharToUpper moduleName}}.ts',
        templateFile: 'src/papak/cli/templates/domain/model.ts.hbs',
      },
      {
        type: 'add',
        path: 'src/modules/{{moduleName}}/{{firstCharToUpper moduleName}}.service.ts',
        templateFile: 'src/papak/cli/templates/service.ts.hbs',
      },
      {
        type: 'add',
        path: 'src/modules/{{moduleName}}/{{firstCharToUpper moduleName}}.presentation.ts',
        templateFile: 'src/papak/cli/templates/presentation.ts.hbs',
      },
    ],
  });

  plop.setGenerator('app-router', {
    description:
      'Generate app router in "/src/app/[locale]/dashboard" directory',
    prompts: [
      {
        type: 'input',
        name: 'routerPath',
        message: 'Enter the app-router path:',
      },
      {
        type: 'input',
        name: 'partialName',
        message: 'Enter the router-file-name:',
      },
      {
        type: 'list',
        name: 'moduleName',
        message: 'Which episode do you want to add notes to?',
        choices: () => {
          // get all the directories within the current folder
          return readdirSync('./src/modules', { withFileTypes: true })
            .filter((dirent) => dirent.isDirectory())
            .map((dirent) => dirent.name);
        },
      },
    ],
    actions: [
      {
        type: 'add',
        path: 'src/app/[locale]/dashboard/{{routerPath}}/page.tsx',
        templateFile: 'src/papak/cli/templates/route/page.ts.hbs',
      },
      {
        type: 'add',
        path: 'src/app/[locale]/dashboard/{{routerPath}}/_viewModule/{{partialName}}.context.tsx',
        templateFile: 'src/papak/cli/templates/route/viewModule/context.ts.hbs',
      },
      {
        type: 'add',
        path: 'src/app/[locale]/dashboard/{{routerPath}}/_viewModule/{{partialName}}.view.tsx',
        templateFile: 'src/papak/cli/templates/route/viewModule/view.ts.hbs',
      },
      {
        type: 'add',
        path: 'src/app/[locale]/dashboard/{{routerPath}}/_viewModule/{{partialName}}.vm.ts',
        templateFile: 'src/papak/cli/templates/route/viewModule/vm.ts.hbs',
      },
    ],
  });

  plop.setGenerator('add-endpoint', {
    description: 'Add member to the endpoints file',
    prompts: [
      {
        type: 'input',
        name: 'moduleName',
        message: 'Enter the endpoint name:',
      },
    ],
    actions: [
      {
        type: 'modify',
        path: 'src/constants/endpoints.ts', // Change this to the actual path
        pattern: /(};\s*export default endpoints;)/,
        template: `
  {{charToUpper moduleName}}: {
    GET_{{charToUpper moduleName}}: () => \`\${HOST_URL_API}/{{moduleName}}/\`,
    POST_{{charToUpper moduleName}}: () => \`\${HOST_URL_API}/{{moduleName}}/\`,
    GET_{{charToUpper moduleName}}_ID: (id: string) => \`\${HOST_URL_API}/{{moduleName}}/\${id}/\`,
    PUT_{{charToUpper moduleName}}_ID: (id: string) => \`\${HOST_URL_API}/{{moduleName}}/\${id}/\`,
    DELETE_{{charToUpper moduleName}}_ID: (id: string) => \`\${HOST_URL_API}/{{moduleName}}/\${id}/\`,
  },
$1`,
      },
    ],
  });
};
