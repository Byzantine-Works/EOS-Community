const path = require('path');
const sketchtool = require('sketchtool-cli');
const sharp = require('sharp');
const icongen = require('icon-gen');
const execSync = require('child_process').execSync;


const sizes = [
  1024,
  512,
  256,
  228,
  195,
  152,
  144,
  128,
  120,
  96,
  72,
  64,
  57,
  48,
  32,
  24,
  16
];

function exec (command) {
  return execSync(command).toString();
}

// export artboard to temp directory
const exportArtboards = (artboards) => {
  // io config
  const itemFlag = Array.isArray(artboards) ? 'items' : 'item';
  const sketchFile = path.resolve(`./sketch/assets.sketch`);
  const output = path.resolve(`./build/tmp/${__dirname}`);
  const ext = "png";

  // export  images @ max res for each specified artboard
  sketchtool.run(`export artboards ${sketchFile} --output=${output} --${itemFlag}=${artboards} --scales='1.0' --formats='${ext}'`);
  
  // iterate over each output & each desired sized
  for (let boardIdx = 0; boardIdx < artboards.length; boardIdx += 1) {
    // const assetName = artboards[boardIdx];

    const name = artboards[boardIdx];
    const tmpFile = `${output}/${name}.${ext}`;
    // const rootFile = `${rootPath}.${ext}`;

    const dir = `${output}/${name}`;

    // const path = `${pathNoExt}.${ext}`
    
    console.log(`output: ${path}`);

    exec(`mkdir -p ${dir}`);
    const basePath = `${dir}/image.png`;

    exec(`mv ${tmpFile} ${basePath}`);
    
    var img = sharp(`${basePath}`);

    for (let sizeIdx = 0; sizeIdx < sizes.length; sizeIdx += 1) {

      const size = sizes[sizeIdx];
      img
      .resize(size)
      // .webp()
      .toFile(`${dir}/${size}.png`)
      .then((info) => {
        if (info) console.log(`INFO: ${JSON.stringify(info)}`);
        else console.log('ERROR');
      });

    }
  }
}

exportArtboards(['icon']);
exportArtboards(['logo-bg-light', 'logo-bg-dark', 'logo-bg-dark-v2']);


// icongen('./../public.', './dist', {
//   report: true
// })
// .then((results) => {
//   console.log(results)
// })
// .catch((err) => {
//   console.error(err)
// });


