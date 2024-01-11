export function getDirtyValues(dirtyFields, allValues) {
  const result = {};
  console.log(dirtyFields);
  for (const key in dirtyFields) {
    if (dirtyFields[key] === true && key !== 'radioField') {
      try {
        if (allValues[key]) result[key] = allValues[key];
      } catch (e) {
        result[key] = '';
      }
    } else if (typeof dirtyFields[key] === 'object') {
      const nested = getDirtyValues(dirtyFields[key], allValues[key]);

      if (Object.keys(nested).length > 0) {
        result[key] = nested;
      }
    }
  }
  return result;
}
