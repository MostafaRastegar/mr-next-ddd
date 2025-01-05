## mr-next-ddd

A real-world `DDD` implementation project comprises the same phases as any other software development project. These phases include:

Refine and refactor the domain model based on the design and development `(Continuous Integration (CI) of model concepts)`.
Repeat the above steps using the updated domain model `(CI of domain implementation)`.
An agile software development methodology is a great fit here because agile methodologies focus on the delivery of business value just like DDD focuses on the alignment of software system with business model. Also, using SCRUM `(for project management)` and XP `(for software development purposes)` methodologies is a good combination for managing a DDD implementation project.

# Folder structures:

```
root
├─ src
│ ├─ app
│ ├─ constants
│ │ └─ endpoints.ts
│ ├─ modules
│   └─ user
│      ├─ domains
│      │ ├─ models
│      │ │  └─ User.ts
│      │ └─ IUserRepository.ts
│      │ └─ IUserService.ts
│      │
│      ├─ User.presentation.ts
│      ├─ User.repository.ts
│      └─ User.service.ts
|
├─ .eslintrc.json
├─ .gitignore
├─ package.json
└─ tsconfig.json


```

# Domain Layer

The domain layer contains the business logic of the application.
It includes the domain model `(models)` and the `repository, service` interface . <br/>
The `domain model` encapsulates the business rules and the `repository` interface defines the contract for interacting with the data source.

```
├─ domains
│ ├─ models
│ │  └─ User.ts
│ └─ IUserRepository.ts
│ └─ IUserService.ts
```

- user/domains/models/User.ts

```ts
export interface User {
  email: string;
  username: string;
  bio?: string;
  image?: string;
  token: string;
}
```

- user/domains/IUserRepository.ts

```ts
export interface IUserRepository {
  update(body: UserUpdateParams): Promise<ResponseObject<UserUpdate>>;
  findByToken(): Promise<ResponseObject<UserCurrent>>;
  findByEmailAndPassword(
    body: UserLoginParams,
  ): Promise<ResponseObject<UserCurrent>>;
  create(body: UserCreateParams): Promise<ResponseObject<UserCreate>>;
}
```

- user/domains/IUserService.ts

```ts
import { IUserRepository } from './IUserRepository';

export interface IUserService {
  login: IUserRepository['findByEmailAndPassword'];
  register: IUserRepository['create'];
  update: IUserRepository['update'];
  getCurrentUser: IUserRepository['findByToken'];
}
```

# Infrastructure Layer

The infrastructure layer contains the infrastructure services `(infrastructure)` and the API repository `(restFull, graphQl,...)`.<br/>
The infrastructure services handle the technical concerns of the application, such as database access and network communication.<br/>
The `API repository interacts` with the API and maps the data to the domain model.

```
└─ user
  ├─ ...
  ├─ User.repository.ts
```

- user/User.repository.ts

```ts
function UserRepository(): IUserRepository {
  return {
    findByToken: () =>
      serviceHandler<UserCurrent>(() =>
        request.get(endpoints.USERS.GET_USER()),
      ),

    findByEmailAndPassword: (body: UserLoginParams) =>
      serviceHandler<UserCurrent>(() =>
        requestWithoutAuth.post(endpoints.USERS.POST_USERS_LOGIN(), body),
      ),
    update: (body: UserUpdateParams) =>
      serviceHandler<UserUpdate>(() =>
        request.put(endpoints.USERS.PUT_USER(), body),
      ),

    create: (body: UserCreateParams) =>
      serviceHandler<UserCreate>(() =>
        requestWithoutAuth.post(endpoints.USERS.POST_USERS(), body),
      ),
  };
}
```

# Application Layer

The application layer contains the application services `(services)` and the data transfer objects `(dtos)`.<br/>
The application services encapsulate the `use-cases` of the application and the data transfer objects shape the data for the client-side.

```
└─ user
  ├─ ...
  ├─ User.service.ts
```

- user/User.service.ts

```ts
function UserService(
  UserRepository: IUserRepository,
  redirect?: Function,
): IUserService {
): IUserService {
  return {
    getCurrentUser: () => serviceHandler(UserRepository.findByToken),

    login: (body: UserLoginParams) =>
      serviceHandler(() => UserRepository.findByEmailAndPassword(body), {
        onSuccess: (response) => {
          const token = response?.data?.user?.token;
          if (token) {
            cookies.set('access_token', token);
          }
        },
      }),

    update: (body: UserUpdateParams) =>
      serviceHandler(() => UserRepository.update(body)),

    register: (body: UserCreateParams) =>
      serviceHandler(() => UserRepository.create(body), {
        onSuccess: (response) => {
          const token = response?.data.user?.token;
          if (cookies && token && redirect) {
            cookies.set('access_token', token);
            redirect('/');
          }
          return response;
        },
      }),
  };
}
```

# Presentation Layer

The presentation layer contains the controllers `(presentation)` and the query library `(reactQuery, SWR, ...)`. <br/>
The controllers handle the user interactions and delegate the work to the application layer. <br/>
`For example:` the `React Query` handles the state management and the data fetching for the React components.

```
└─ user
  ├─ ...
  ├─ User.presentation.ts

```

- user/User.presentation.ts

```ts
const userService = UserService(UserRepository());

export function UserPresentation() {
  return {
    useGetCurrentUser: () =>
      useQuery({
        queryKey: ['user'],
        queryFn: () => userService.getCurrentUser(),
      }),

    useUserLogin: () => {
      const router = useRouter();
      const searchParams = useSearchParams();
      return useMutation({
        mutationFn: () => {
          const rawFormData: UserLoginParams = {
            user: {
              email: '{{EMAIL}}',

              password: '{{PASSWORD}}',
            },
          };
          return userService.login(rawFormData);
        },
        onSuccess(response) {
          console.log('onSuccess :>> ', response);
          const nextUrl = searchParams.get('next');
          router.push(nextUrl ?? '/');
        },
        onError(error) {
          console.log('error :>> ', error);
        },
      });
    },
}
```

## CLI Tools

This project utilizes `npm run cli` to automate the generation of modules, app routers, and endpoints in a structured manner. It helps streamline the development process by providing templates and predefined structures for common tasks.

## Usage

After run `npm run cli`:

### Generating Modules by `module`

Module Name: Enter the name of the module you want to create.
Generated Files:

```
src/modules/{moduleName}/domains/I{ModuleName}Service.ts
src/modules/{moduleName}/domains/models/{ModuleName}.ts
src/modules/{moduleName}/{ModuleName}.service.ts
src/modules/{moduleName}/{ModuleName}.presentation.ts
```

### Generating App Router `app-router`

#### Prompts:

- Router Path: Specify the path for the app router.
- Router File Name: Provide a name for the router file.
- Module Name: Select the module to which you want to add the router.

#### Generated Files:

```
src/app/[locale]/dashboard/{routerPath}/page.tsx
src/app/[locale]/dashboard/{routerPath}/_viewModule/{partialName}.context.tsx
src/app/[locale]/dashboard/{routerPath}/_viewModule/{partialName}.view.tsx
src/app/[locale]/dashboard/{routerPath}/_viewModule/{partialName}.vm.ts
```

### Adding Endpoints `app-endpoint`

#### Prompts:

- Endpoint Name: Enter the name of the endpoint you want to add.

#### Modification:

The endpoint will be added to src/constants/endpoints.ts with the following structure:

#### Generated Files:

```
{moduleName}: {
  GET_{moduleName}: () => `${HOST_URL_API}/{moduleName}/`,
  POST_{moduleName}: () => `${HOST_URL_API}/{moduleName}/`,
  GET_{moduleName}_ID: (id: string) => `${HOST_URL_API}/{moduleName}/${id}/`,
  PUT_{moduleName}_ID: (id: string) => `${HOST_URL_API}/{moduleName}/${id}/`,
  DELETE_{moduleName}_ID: (id: string) => `${HOST_URL_API}/{moduleName}/${id}/`,
},
```

## Getting Started

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

First, run the development server:

```bash
# install dependencies
npm i

# run develop mode
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000/login](http://localhost:3000/login) with your browser to see the result.

- username: {{EMAIL}}
- password: {{PASSWORD}}

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
