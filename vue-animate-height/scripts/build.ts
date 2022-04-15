import { execaCommandSync as exec } from 'execa';
import { chProjectDir, copyPackageFiles, rmDist } from 'lion-system';
import * as fs from 'node:fs';

chProjectDir(import.meta.url);
rmDist();
exec('tsc');
exec('tsc-alias');
await copyPackageFiles({ commonjs: { external: 'vue' } });
fs.copyFileSync('../readme.md', 'dist/readme.md');
fs.copyFileSync('../license', 'dist/license');
