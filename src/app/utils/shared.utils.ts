export const filteredObjectByKeys = (obj: any, keys: any): any => {
  const allowed = keys;
  const filtered = Object.keys(obj)
    .filter((key) => allowed.includes(key))
    .reduce((raw, key) => {
      raw[key] = obj[key];
      return raw;
    }, {});
  return filtered;
};
