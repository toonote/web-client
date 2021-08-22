const mimeMap = {
  'image/png': 'png',
  'image/jpeg': 'jpg',
  'image/gif': 'gif',
  'image/svg+xml': 'svg',
  'image/bmp': 'bmp',
  'image/tiff': 'tif',
  'image/x-icon': 'ico',
  'text/html': 'html',
  'text/plain': 'txt',
  'application/pdf': 'pdf',
  'video/mpeg4': 'mp4',
  'video/x-msvideo': 'avi',
  'video/quicktime': 'mov',
  'video/x-flv': 'flv',
  'video/x-ms-wmv': 'wmv',
};

const reverseMap = {};

for (const key in mimeMap) {
  reverseMap[mimeMap[key]] = key;
}

export const getExtensionByFilename = (fileName: string) => {
  const parts = fileName.split('.');
  if (parts.length === 1) {
    return '';
  }
  return parts[parts.length - 1];
};

export const getExtensionByMimeType = (mimeType: string) => {
  return mimeMap[mimeType] || '';
};

export const getExtensionByFile = (file: File) => {
  return getExtensionByFilename(file.name) || getExtensionByMimeType(file.type);
};

export const getMimeByExtension = (extension: string) => {
  return reverseMap[extension] || '';
};
