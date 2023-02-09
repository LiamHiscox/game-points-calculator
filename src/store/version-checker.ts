import packageJson from '../../package.json';
import axios from "axios";

interface PackageJson {
  version: string;
}

const versionKey = "package-version";

export const checkVersion = async () => {
  const localVersion = localStorage.getItem(versionKey);
  try {
    const remotePackageJson = await axios.get<PackageJson>(packageJson.homepage.replace("/build/", "") + "/package.json");
    const remoteVersion = remotePackageJson.data.version;
    console.log({localVersion, remoteVersion});
    if (remoteVersion && localVersion !== remoteVersion) {
      const keys = await caches.keys();
      keys.forEach((key) => caches.delete(key));
      localStorage.setItem(versionKey, remoteVersion);
      console.log(`clearing cache to update game from ${localVersion} to ${remoteVersion}`)
    }
  } catch (e) {}
}
