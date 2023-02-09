import packageJson from '../../package.json';
import axios from "axios";

interface PackageJson {
  version: string;
}

caches.keys().then((names) => {
  console.log(names);
  // for (let name of names) {
  //   caches.delete(name);
  // }
});

const checkVersion = async () => {
  const localVersion = packageJson.version;
  try {
    const remotePackageJson = await axios.get<PackageJson>(packageJson.homepage.replace("/build/", "") + "/package.json");
    const remoteVersion = remotePackageJson.data.version;
    console.log({localVersion, remoteVersion});
    if (remoteVersion && localVersion !== remoteVersion) {

    }
  } catch (e) {}
}

checkVersion();
