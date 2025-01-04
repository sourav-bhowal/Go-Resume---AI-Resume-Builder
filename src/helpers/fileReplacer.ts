// This function is used to replace the File object with an object that contains the file's properties. This is useful when you want to stringify an object that contains a File object, as the File object cannot be stringified. This function is used in the stringify function of the JSON object.
export default function fileReplacer(key: unknown, value: unknown) {
    // Check if the value is an instance of File
  return value instanceof File
    ? {
        name: value.name,
        size: value.size,
        type: value.type,
        lastModified: value.lastModified,
      }
    : value;
}
