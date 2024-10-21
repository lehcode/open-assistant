## Create monorepo

1. Install [yarn](https://yarnpkg.com/lang/en/docs/install/)
2. `mkdir apps`
3. `cd apps`
4. `npx create-nx-workspace@latest .`
5. `Which stack do you want to use?` Answer with `None: Configures a TypeScript/JavaScript monorepo.`
6. Delete `packages` directory
7. Remove `workspaces` entry from `package.json`
8. Add UI application: `npx nx g @nx/react:app ui`
9. Add API application: `npx nx g @nx/nest:application api`
10. Add library: `npx nx g @nx/react:library [name] --unitTestRunner=vitest --bundler=none`. See [ProjectDependencyRules.md](/doc/ProjectDependencyRules.md) for more information.
