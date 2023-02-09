import packageJson from '../../package.json';
import axios from "axios";

interface PackageJson {
  version: string;
}

export const checkVersion = async () => {
  const localVersion = packageJson.version;
  try {
    const remotePackageJson = await axios.get<PackageJson>(packageJson.homepage.replace("/build/", "") + "/package.json");
    const remoteVersion = remotePackageJson.data.version;
    console.log({localVersion, remoteVersion});
    if (remoteVersion && localVersion !== remoteVersion) {
      const keys = await caches.keys();
      keys.forEach((key) => caches.delete(key));
      console.log(`clearing cache to update game from ${localVersion} to ${remoteVersion}`)
    }
  } catch (e) {}
}
