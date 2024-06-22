import fs from 'fs';
import path from 'path';

const iconDir = path.join(__dirname, './svg');
const outputFile = path.join(__dirname, './icons.ts');

const toCamelCase = (str: string) => {
  return str
    .replace(/-./g, (match) => match.charAt(1).toUpperCase())
    .replace(/\.svg$/, '')
    .replace(/^\w/, (c) => c.toUpperCase());
};

fs.readdir(iconDir, (err, files) => {
  if (err) throw err;

  const iconComponents = files
    .filter((file) => file.endsWith('.svg'))
    .map((file) => {
      const componentName = `${toCamelCase(file)}PixelIcon`;
      return `export { ReactComponent as ${componentName} } from './svg/${file}';`;
    });

  const content = iconComponents.join('\n');
  fs.writeFileSync(outputFile, content, 'utf8');
  console.log('Icons file generated!');
});
