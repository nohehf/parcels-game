import { NFTStorage, File } from "nft.storage";
import { getFilesFromPath } from "files-from-path";

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDBDNzQ2NDkwMDUzOEJGNDQyNTMyZjUzRGMwYUIyMjIwRDE4N2Q2NzciLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY0NzE2MDY2MjM4OSwibmFtZSI6InRlc3QifQ.Xi18Gwveit1rhNfrNBLHt8pgBJgN7MG5X_5VfTIMhKA";

async function main() {
  const path = process.argv.slice(2);
  const files = await getFilesFromPath(path);

  const storage = new NFTStorage({ token });

  console.log(`storing ${files.length} file(s) from ${path}`);
  const cid = await storage.storeDirectory(files, {
    pathPrefix: path, // see the note about pathPrefix below
    hidden: true, // use the default of false if you want to ignore files that start with '.'
  });
  console.log({ cid });

  const status = await storage.status(cid);
  console.log(status);
}
main();
