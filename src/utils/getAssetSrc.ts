/**
 * Used for dynamically importing assets from '/src/assets' folder
 * 
 *
 * Function takes the file name & extension as a parameter and returns the path to the file
 * @param name
 * 
 * If nesting assets into a child directory pass, pass the name as a string
 * @param subDir (optional)
 *
 * @returns string
 */

const getAssetSrc = (name: string, subDir: string | null = null) => {
  if(subDir){
    const path = `/src/assets/${subDir}/${name}`;
    const modules = import.meta.glob("/src/assets/*/*", { eager: true });
    const mod = modules[path] as { default: string };
    return mod.default;
  }
  const path = `/src/assets/${name}`;
  const modules = import.meta.glob("/src/assets/*", { eager: true });
  const mod = modules[path] as { default: string };
  return mod.default;
};

export default getAssetSrc;
