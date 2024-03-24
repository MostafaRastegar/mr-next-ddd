#!/usr/bin/env node
const fs = require("fs");
const path = require("path");

function entityNameToUpperCase(arg) {
  const entityName = arg.charAt(0).toUpperCase() + arg.slice(1);

  if (!entityName) {
    console.error("Please provide a name for the entity");
    return process.exit(1);
  }

  return entityName;
}

function directoryGenerator({ directories, entityName, scope, dirName = "" }) {
  const entityDirectory = path.join(
    process.cwd(),
    `src/modules/${entityName.toLowerCase()}/${scope}/${dirName}`
  );

  if (fs.existsSync(entityDirectory)) {
    console.error(`Directory ${entityName} already exists`);
    process.exit(1);
  }

  fs.mkdirSync(entityDirectory, { recursive: true });

  if (dirName) {
    directories[`${dirName}Path`] = entityDirectory;
  }
  return directories;
}

function nestedDirectoryGenerator(entityName, scope, arr) {
  const basePath = path.join(
    process.cwd(),
    `src/modules/${entityName.toLowerCase()}/${scope}`
  );
  const directories = {
    basePath,
  };

  if (arr?.length) {
    arr.forEach((dirName) => {
      directoryGenerator({ directories, dirName, entityName, scope });
    });
  } else {
    directoryGenerator({ directories, entityName, scope });
  }

  return directories;
}

function generateFile(files, entityName) {
  try {
    files.forEach((file) => {
      fs.writeFileSync(file.path, file.content);
      console.log(`✅ Successfully created ${file.path}`);
    });
  } catch (e) {
    console.log(`❌ Error in ${entityName}`);
  }
}

module.exports = {
  entityNameToUpperCase,
  nestedDirectoryGenerator,
  generateFile,
};
