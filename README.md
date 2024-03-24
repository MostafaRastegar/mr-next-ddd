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
│ ├─ hooks
│ ├─ lib
│ ├─ utils
│ ├─ constants
│ │ └─ endpoints.ts
│ ├─ modules
│   └─ user
│      ├─ applications
│      │ ├─ dtos
│      │ │  └─ UserDTO.ts
│      │ └─ services
│      │    ├─ IUserService.ts
│      │    └─ UserService.ts
│      ├─ domains
│      │ ├─ models
│      │ │  └─ User.ts
│      │ └─ repositories
│      │    └─ IUserRepository.ts
│      ├─ infrastructure
│      │ ├─ index.ts
│      │ └─ restful
│      │    └─ UserRestfulRepository.ts
│      └─ presentations
│         ├─ controllers
│         │  └─ UserController.ts
│         ├─ nextSSR
│         │  └─ UserNextSSR.ts
│         └─ reactQuery
│            └─ UserReactQuery.ts
│
├─ .eslintrc.json
├─ .gitignore
├─ package.json
└─ tsconfig.json


```

# Domain Layer

The domain layer contains the business logic of the application.
It includes the domain model `(models)` and the repository interface `(repositories)`. <br>
The `domain model` encapsulates the business rules and the `repository` interface defines the contract for interacting with the data source.

```
├─ domains
│ ├─ models
│ │ └─ User.ts
│ └─ repositories
    └─ IUserRepository.ts
```

- domains/models/User.ts

```ts
export interface User {
  email: string;
  username: string;
  bio?: string;
  image?: string;
  token: string;
}
```

- domains/repositories/IUserRepository.ts

```ts
export interface IUserRepository {
  update(body: UserUpdateParams): Promise<ResponseObject<UserUpdate>>;
  findByToken(): Promise<ResponseObject<UserCurrent>>;
  findByEmailAndPassword(
    body: UserLoginParams,
  ): Promise<ResponseObject<UserLogin>>;
  create(body: UserRegisterParams): Promise<ResponseObject<UserRegister>>;
}
```

# Infrastructure Layer

The infrastructure layer contains the infrastructure services `(infrastructure)` and the API repository `(restFull, graphQl,...)`.<br>
The infrastructure services handle the technical concerns of the application, such as database access and network communication.<br>
The `API repository interacts` with the API and maps the data to the domain model.

```
├─ infrastructure
│ ├─ index.ts
│ └─ restful
│    └─ UserRestfulRepository.ts
```

- infrastructure/restful/UserRestfulRepository.ts

```ts
function UserRepository(): IUserRepository {
  return {
    findByToken: () =>
      serviceHandler<UserCurrent>(() =>
        request.get(endpoints.USERS.GET_USER()),
      ),

    findByEmailAndPassword: (body: UserLoginParams) =>
      serviceHandler<UserLogin>(() =>
        requestWithoutAuth.post(endpoints.USERS.POST_USERS_LOGIN(), body),
      ),

    update: (body: UserUpdateParams) =>
      serviceHandler<UserUpdate>(() =>
        request.put(endpoints.USERS.PUT_USER(), body),
      ),

    create: (body: UserRegisterParams) =>
      serviceHandler<UserRegister>(() =>
        requestWithoutAuth.post(endpoints.USERS.POST_USERS(), body),
      ),
  };
}
```

# Application Layer

The application layer contains the application services `(services)` and the data transfer objects `(dtos)`.<br>
The application services encapsulate the `use-cases` of the application and the data transfer objects shape the data for the client-side.

```
├─ applications
│ ├─ dtos
│ │  └─ UserDTO.ts
│ └─ services
│    ├─ IUserService.ts
│    └─ UserService.ts
```

- applications/services/IUserService.ts

```ts
export interface IUserService {
  register(body: UserRegisterParams): Promise<ResponseObject<UserCurrent>>;
  login(body: UserLoginParams): Promise<ResponseObject<UserCurrent>>;
  update(body: UserUpdateParams): Promise<ResponseObject<UserUpdate>>;
  getUser(): Promise<ResponseObject<UserCurrent>>;
}
```

- applications/services/UserService.ts

```ts
function UserService(
  UserRepository: IUserRepository,
  redirect?: Function,
  cookies: Function = cookiesClient,
): IUserService {
  return {
    getUser: () => serviceHandler<UserCurrent>(UserRepository.findByToken),

    login: (body: UserLoginParams) =>
      serviceHandler<UserLogin>(
        () => UserRepository.findByEmailAndPassword(body),
        {
          onSuccess: (response) => {
            console.log('service onSuccess :>> ', response);
            const token = response?.data.user?.token;
            if (token) {
              cookies.set('access_token', token);
            }
          },
        },
      ),

    register: (body: UserRegisterParams) =>
      serviceHandler<UserRegister>(() => UserRepository.create(body), {
        onSuccess: (response) => {
          const token = response?.data.user?.token;
          if (cookies && token && redirect) {
            cookies.set('access_token', token);
            redirect('/users');
          }
          return response;
        },
      }),

    update: (body: UserUpdateParams) =>
      serviceHandler<UserUpdate>(() => UserRepository.update(body)),
  };
}
```

# Presentation Layer

The presentation layer contains the controllers `(controllers)` and the query library `(reactQuery, SWR, ...)`. <br>
The controllers handle the user interactions and delegate the work to the application layer. <br>
`For example:` the `React Query` handles the state management and the data fetching for the React components.

```
└─ presentations
   ├─ controllers
   │  └─ UserController.ts
   ├─ nextSSR
   │  └─ UserNextSSR.ts
   └─ reactQuery
      └─ UserReactQuery.ts
```

- presentations/controllers/UserController.ts

```ts
function UserController(UserService: IUserService) {
  return {
    getCurrentUser: () => UserService.getUser(),

    register: (params: UserRegisterParams) => {
      const requestBody: UserRegisterParams = {
        user: params,
      };
      return UserService.register(requestBody);
    },

    login: (params: UserLoginParams) => {
      const requestBody: UserLoginParams = {
        user: params,
      };
      return UserService.login(requestBody);
    },

    update: (email: string) => {
      const requestBody: UserUpdateParams = {
        user: { email },
      };
      return UserService.update(requestBody);
    },
  };
}
```

- presentations/nextSSR/UserNextSSR.ts

```ts
import UserService from '@/modules/users/applications/services/UserService';
import UserController from '@/modules/users/controllers/UserController';
import { UserRepository } from '@/modules/users/infrastructure';

// constructor controller by repository and service functions
const userService = UserService(UserRepository);
const userController = UserController(userService);

function UserNextSSR() {
  return {
    login: (formData: FormData) => {
      const rawFormData: UserLoginParams = {
        email: formData.get('email') as string,
        password: formData.get('password') as string,
      };
      return userController.login(rawFormData);
    },
    register: (formData: FormData) => {
      const rawFormData: UserRegisterParams = {
        email: formData.get('email') as string,
        username: formData.get('username') as string,
        password: formData.get('password') as string,
      };
      return userController.register(rawFormData);
    },
  };
}
```

- presentations/controllers/UserReactQuery.ts

```ts
import UserService from '@/modules/users/applications/services/UserService';
import UserController from '@/modules/users/controllers/UserController';
import { UserRepository } from '@/modules/users/infrastructure';

// constructor controller by repository and service functions
const userService = UserService(UserRepository);
const userController = UserController(userService);

function UserReactQuery() {
  return {
    useGetCurrentUser: () =>
      useQuery<ResponseObject<UserCurrent>>({
        queryKey: ['user'],
        queryFn: userController.getCurrentUser,
      }),

    useUserLogin: () => {
      const router = useRouter();
      const searchParams = useSearchParams();
      return useMutation({
        mutationFn: ({ username, password }) => {
          const rawFormData: UserLoginParams = {
            username,
            password,
          };
          return userController.userLogin(rawFormData);
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

    useUserRegister: () =>
      useMutation({
        mutationFn: (formData: FormData) => {
          const rawFormData: UserRegisterParams = {
            email: formData.get('email') as string,
            username: formData.get('username') as string,
            password: formData.get('password') as string,
          };
          return userController.userRegister(rawFormData);
        },
      }),
  };
}
```

<!--
# Testing

In a DDD project, there are three main types of tests to consider:

Unit tests: Focus on individual components or classes, testing the behavior of domain entities, value objects, and other building blocks.
Integration tests: Test the interaction between different components, such as application layer use cases and infrastructure components like repositories or external service clients.
End-to-end tests: Validate the entire system, including user interface and external integrations, ensuring that the application works correctly from the user’s perspective -->

# Communication

The communication and connection between the different layers and modules in your application are handled through the interfaces and the dependency injection.

For example, the `IUserRepository`.ts file in the repositories folder defines the interface for the `UserRepository`. This interface is then implemented in the `UserRestFullRepository.ts` file in the restFull folder. The `UserService.ts` file in the services folder uses the `IUserRepository` to interact with the data source.

Similarly, the `UserController.ts` file in the controllers folder uses the `UserService` to handle the user interactions. The `UserReactQuery.ts` file in the `reactQuery` folder uses the `UserController` to fetch the data for the UI components.

This structure allows you to swap the inner workings of the infrastructure without having to change the domain layer, making your code easier to maintain and test

## Getting Started

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

First, run the development server:

```bash
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

## CLI

You can use modules cli for generate DDD api folders and files in `/modules` folder

```bash
sh modules.sh
```

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
