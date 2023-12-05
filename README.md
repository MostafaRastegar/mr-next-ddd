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
│   └─ users
│      ├─ applications
│      │ ├─ dtos
│      │ │ └─ UserDTO.ts
│      │ └─ services
│      │    ├─ IUserService.ts
│      │    └─ UserService.ts
│      ├─ domains
│      │ ├─ models
│      │ │ └─ User.ts
│      │ └─ repositories
│      │    └─ IUserRepository.ts
│      ├─ infrastructure
│      │ ├─ index.ts
│      │ └─ restFull
│      │    └─ UserRestFullRepository.ts
│      └─ presentations
│         ├─ controllers
│         │ └─ UserController.ts
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
It includes the domain model `(models)` and the repository interface `(repositories)`.
The domain model encapsulates the business rules and the repository interface defines the contract for interacting with the data source.

# Application Layer

The application layer contains the application services `(services)` and the data transfer objects `(dtos)`.
The application services encapsulate the use-cases of the application and the data transfer objects shape the data for the client-side.

# Infrastructure Layer

The infrastructure layer contains the infrastructure services `(infrastructure)` and the API repository `(restFull, graphQl,...)`.
The infrastructure services handle the technical concerns of the application, such as database access and network communication.
The API repository interacts with the API and maps the data to the domain model.

# Presentation Layer

The presentation layer contains the controllers `(controllers)` and the query library `(reactQuery, SWR, ...)`. The controllers handle the user interactions and delegate the work to the application layer.
For example: the React Query handles the state management and the data fetching for the React components.

# Testing

In a DDD project, there are three main types of tests to consider:

Unit tests: Focus on individual components or classes, testing the behavior of domain entities, value objects, and other building blocks.
Integration tests: Test the interaction between different components, such as application layer use cases and infrastructure components like repositories or external service clients.
End-to-end tests: Validate the entire system, including user interface and external integrations, ensuring that the application works correctly from the user’s perspective

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

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
