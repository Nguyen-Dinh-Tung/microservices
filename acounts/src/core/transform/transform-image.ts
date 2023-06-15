import * as fs from 'fs';
export const transformImage = (files: Express.Multer.File) => {
  const file = files[0];
  const filename = file.filename;
  const path = file.path;
  const type = file.mimetype.split('/').pop().toLowerCase();
  const source = `${process.env.STATICIMG + filename}${Date.now()}.${type}`;
  const buffer = fs.readFileSync(file.path);
  fs.writeFileSync(`.${source}`, buffer);
  fs.unlinkSync(path);
  return source;
};
