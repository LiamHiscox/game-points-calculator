import packageJson from '../../package.json';
import axios from "axios";

interface PackageJson {
  version: string;
}

const versionKey = 'package-version';

export const checkVersion = async (): Promise<void> => {
  const localVersion = localStorage.getItem(versionKey);
  try {
    const remotePackageJson = await axios.get<PackageJson>(packageJson.homepage.replace('/build/', '') + '/package.json');
    const remoteVersion = remotePackageJson.data.version;
    if (remoteVersion && localVersion !== remoteVersion) {
      const keys = await caches.keys();
      await Promise.all(keys.map((key) => caches.delete(key)));
      localStorage.setItem(versionKey, remoteVersion);
      window.location.reload();
    }
  } catch (e) {
    console.error(e);
  }
}
