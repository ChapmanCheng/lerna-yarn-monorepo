# Lerna Yarn workspace for React Projects

-   Bootstrap the packages in the current Lerna repo  
    `$ <yarn> lerna bootstrap`
-   clean all packages ./node_modules/  
    `$ <yarn> lerna clean`
-   add a library to a project within the monorepo  
    `$ <yarn> lerna add <repo-library> --scope <target-project>`
-   npm script (build, start, deploy ... )  
    `$ yarn workspace <package> <script>`


## import the _"shared-ui"_ library

1.  Import module and css file;  
1.  destructure the required component
```
import sharedUI from "shared-ui";  
import "shared-ui/dist/index.css";

function YourComponent () {
    const { Button, Header, ButtonJSX, ButtonTS } = sharedUI;

    return ( 
        // rest
    );
};
```

## Supported CSS 
- #### normal CSS      `import "./path/to/file.css";` 
- #### CSS module    `import style from "./path/to/index.module.css";`
- #### SASS __TBC__
- #### PostCSS __TBC__
