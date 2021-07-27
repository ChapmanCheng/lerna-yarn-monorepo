-   ### Bootstrap the packages in the current Lerna repo  
    `$ <yarn> lerna bootstrap`
-   ### clean all packages ./node_modules/  
    `$ <yarn> lerna clean`
-   ### add a library to a project within the monorepo  
    `$ <yarn> lerna add <repo-library> --scope <target-project>`
-   ### npm script (build, start, deploy ... )  
    `$ yarn workspace <package> <script>`
