const fs = require("fs");
const path = require("path");
const regex = require('./regex')

const readdirOption = { withFileTypes: true };
const src = "src/";

module.exports = function writeEntries(srcPath, entry) {
  fs.readdirSync(srcPath, readdirOption)
    .sort((dirent) => (dirent.isDirectory() ? 1 : -1))
    .forEach((dirent) => {
      if (dirent.isFile() && dirent.name.match(regex.js) !== null) {
        const ext = path.extname(dirent.name);
        const relativePath = path.relative(
          process.cwd(),
          path.resolve(srcPath, dirent.name)
        );
        const pathSliceIn = relativePath.indexOf(src) + src.length;
        const filename = relativePath
          .substring(pathSliceIn)
          .slice(0, ext.length * -1);

        entry[filename] = dotPath(path.join(relativePath));
      }

      if (dirent.isDirectory()) {
        srcPath = path.resolve(srcPath, dirent.name);
        entry = { ...entry, ...writeEntries(srcPath, entry) };
      }
    });

  return entry;
};

function dotPath(path) {
  if (path.startsWith("./")) return path;
  if (path.startsWith("/")) return path;
  return "./".concat(path);
}
