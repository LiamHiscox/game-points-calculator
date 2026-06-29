import packageJson from '../../package.json';

interface PackageJson {
  version: string;
}

const versionKey = 'package-version';

export const checkVersion = async (): Promise<void> => {
  const localVersion = localStorage.getItem(versionKey);
  try {
    const response = await fetch(packageJson.homepage.replace('/dist/', '') + '/package.json');
    if (!response.ok) return;
    const remotePackageJson = await response.json() as PackageJson;
    const remoteVersion = remotePackageJson.version;
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
