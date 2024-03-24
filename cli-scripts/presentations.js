#!/usr/bin/env node
const fs = require("fs");

const {
  entityNameToUpperCase,
  nestedDirectoryGenerator,
  generateFile,
} = require("./utils");

const argv = process.argv[2];
const entityName = entityNameToUpperCase(argv);

const { controllersPath, reactQueryPath } = nestedDirectoryGenerator(
  entityName,
  "presentations",
  ["controllers", "reactQuery"]
);

const files = [
  {
    path: `${controllersPath}/${entityName}Controller.ts`,
    content: _generateContent1(entityName),
  },
  {
    path: `${reactQueryPath}/${entityName}ReactQuery.ts`,
    content: _generateContent2(entityName),
  },
];

generateFile(files, entityName);

function _generateContent1(entity) {
  return `
import type { I${entity}Service } from "../../services/I${entity}Service";
import type {
  ${entity}CreateParams,
  ${entity}DeleteParams,
  ${entity}UpdateParams,
} from "../../domains/models/${entity}";

function ${entity}Controller(${entity}Service: I${entity}Service) {
  return {
    getCurrent${entity}: () => ${entity}Service.getCurrent${entity}(),

    register: (params: ${entity}CreateParams) => {
      return ${entity}Service.register(params);
    },

    update: (email: string) => {
      const requestBody: ${entity}UpdateParams = {
        ${entity.toLowerCase()}: { email },
      };
      return ${entity}Service.update(requestBody);
    },

    remove: (email: string) => {
      const requestBody: ${entity}DeleteParams = {
        ${entity.toLowerCase()}: { email },
      };
      return ${entity}Service.update(requestBody);
    },
  };
}

export default ${entity}Controller;
`;
}

function _generateContent2(entity) {
  return `
import { useRouter, useSearchParams } from "next/navigation";
import { useMutation, useQuery } from "@tanstack/react-query";
import { ResponseObject } from "@/modules/_modulesTypes";
import { ${entity}Repository } from "../../infrastructure";
import ${entity}Service from "../../services/${entity}Service";
import ${entity}Controller from "../controllers/${entity}Controller";
import type { ${entity}, ${entity}CreateParams } from "../../domains/models/${entity}";

const ${entity.toLowerCase()}Service = ${entity}Service(${entity}Repository);
const ${entity.toLowerCase()}Controller = ${entity}Controller(${entity.toLowerCase()}Service);

export function ${entity}ReactQuery() {
  return {
    useGetCurrent${entity}: () =>
      useQuery<ResponseObject<${entity}>>({
        queryKey: ["${entity}"],
        queryFn: ${entity.toLowerCase()}Controller.getCurrent${entity},
      }),

    use${entity}Register: () => {
      const router = useRouter();
      const searchParams = useSearchParams();
      return useMutation({
        mutationFn: () => {
          const rawFormData: ${entity}CreateParams = {
            email: "{{EMAIL}}",
            password: "{{PASSWORD}}",
          };
          return ${entity.toLowerCase()}Controller.register(rawFormData);
        },
        onSuccess(response) {
          console.log("onSuccess :>> ", response);
          const nextUrl = searchParams.get("next");
          router.push(nextUrl ?? "/");
        },
        onError(error) {
          console.log("error :>> ", error);
        },
      });
    },
  };
}

  `;
}
