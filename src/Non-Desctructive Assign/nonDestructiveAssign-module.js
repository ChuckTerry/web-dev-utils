/**
 * A non-destructive version of the native Object.assign method
 * @param {object} target The target object to assign properties to
 * @param {object} source The source object containing properties to assign
 * @returns The target object with properties assigned from the source object
 */
export function nonDestructiveAssign(target = {}, source = {}) {
  const entries = Object.entries(source);
  const propertyCount = entries.length;
  for (let propertyIndex = 0; propertyIndex < propertyCount; propertyIndex++) {
    const [key, value] = entries[propertyIndex];
    const currentValue = target[key];
    const isUndefined = currentValue === undefined;
    // Primitives will be assigned if the target key is undefined
    if (typeof value !== "object") {
      if (isUndefined) {
        target[key] = value;
      }
    // Non-Primitive Handling is based on whether the value is null, an array, or an object
    } else {
      // For Arrays we will push in any values that are not already present
      if (Array.isArray(value) === true) {
        const arrayLength = value.length;
        // If the target key is undefined, make it an empty array
        if (isUndefined) {
          target[key] = [];
        }
        // If the target key is not an array, make it an array and push the existing value
        if (Array.isArray(currentValue) === false) {
          target[key] = [currentValue];
        }
        // Push in any values from source that are not already present
        for (let valueIndex = 0; valueIndex < arrayLength; valueIndex++) {
          const item = value[valueIndex];
          if (currentValue.includes(item) === false) {
            target[key].push(item);
          }
        }
      // For null values we will only assign if the target key is undefined
      } else if (isUndefined && value === null) {
        target[key] = null;
      // Otherwise we will recursively call nonDestructiveAssign to build the object
      } else {
        target[key] = nonDestructiveAssign(target[key], value);
      }
    }
  }
  return target;
}
