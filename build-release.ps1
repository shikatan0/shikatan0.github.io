esbuild src/index.ts --outdir=out --minify --bundle --format=esm --log-level=warning
sass src/index.sass out/index.css
postcss out/index.css -o out/index.css -u autoprefixer cssnano --no-map
pug src/index.pug -o docs
