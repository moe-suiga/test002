const fs = require('fs');
const path = require('path');

const { resolve } = path;
const { log, error } = console;
const ROOT = resolve(__dirname, '..');

const mdReg = /\.(?:md|markdown)$/;
const titleReg = /^title:\s+(.+)$/m;
const dateReg = /^date:\s+(.+)$/m;

const ignoreFiles = [
  './README.md',
  './index.md',
];

const ignoreFolders = [
  'node_modules',
  '.git',
  'script',
]

function getMetadata(file) {
  const filename = path.basename(file);

  let title = filename.split('.')[0];
  let time = Date.now();

  try {
    const data = fs.readFileSync(file, 'utf-8');

    // =====================================
    //
    // Markdown file title:
    // ---
    // title: post title
    // date: post create date
    // (...other props)
    // ---
    //
    // =====================================

    const ctnArray = data.split('---');
    if (ctnArray.length > 1) {
      const metadata = ctnArray[0].trim() ? ctnArray[0].trim() : ctnArray[1].trim();

      const matchTitle = titleReg.exec(metadata);
      const matchDate = dateReg.exec(metadata);

      if (matchTitle && matchTitle[1].trim()) {
        title = matchTitle[1].trim();
      }
      if (matchDate && matchDate[1].trim()) {
        time = new Date(matchDate[1].trim()).getTime();
      }
    }
  } catch (err) {
    error('[ReadFileError]: ', file, e);
  }
  return {
    title,
    time
  }
}

function fileProcess(file) {
  if (!mdReg.test(file)) return;
  // Markdown
  const relArray = path.relative(ROOT, file).split(path.sep);

  if (relArray.indexOf('.') !== 0) {
    relArray.unshift('.');
  }

  const relPath = relArray.join('/');

  if (ignoreFiles.includes(relPath)) return;

  const { title, time } = getMetadata(file);
  return {
    title,
    time,
    path: relPath.replace(mdReg, ''),
  };
}

function dirProcess(dir, arr) {
  try {
    const files = fs.readdirSync(dir);
    const res = files.reduce((arr, file) => {
      const basename = path.basename(file);

      if (ignoreFolders.includes(basename)) return arr;

      return traversal(resolve(dir, file), arr);
    }, arr);
    return res;
  } catch (err) {
    error('[ReadDirError]', dir, err);
    return arr;
  }
}

function traversal(dir, res = []) {
  const absPath = path.isAbsolute(dir) ? dir : resolve(ROOT, dir);

  if (!fs.existsSync(absPath)) {
    error('No Such File Or Directory', absPath);
    return res;
  }

  const stat = fs.statSync(absPath);

  // File
  if (stat.isFile()) {
    const obj = fileProcess(absPath);
    if (obj) {
      res.push(obj);
    }
    return res;
  }
  // Directory
  if (stat.isDirectory()) {
    const arr = dirProcess(absPath, res);
   return arr
  }
}

function releaseIndex() {
  const res = traversal(ROOT);
  let indexContent =
`---
title: Blog
---

## Indexes

`;
  res.sort((a, b) => a.time - b.time)
    .forEach(metadata => {
      indexContent += `[${metadata.title}](${metadata.path})\n`;
    });

  fs.writeFileSync(resolve(ROOT, 'index.md'), indexContent);
  log('Updated index.md')
}

releaseIndex();
