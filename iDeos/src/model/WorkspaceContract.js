
const fs = window.require('fs');





export default class WorkspaceContract {
  static async checkFile(path) {
  
    try {
    return fs.readFileSync(path);
    } catch(err) {
      return null;
    }
  
  
  }
  constructor(path) {
    let univPath = path.split(".")
    univPath.pop();
    univPath = univPath.join(".");
    console.log(this.checkFile(univPath+'.cpp'));
    

    this.name = path.split('.')[-2];
    this.cpp = this.checkFile(univPath+'.cpp');
    // this.wasm = async () => {return await checkFile(univPath+'.wasm') ? fs.readFileSync(univPath+'.wasm') : null};
    // this.hpp = async () => {return await checkFile(univPath+'.hpp') ? fs.readFileSync(univPath+'.hpp') : null};
    // this.abi = async () => {return await checkFile(univPath+'.abi') ? fs.readFileSync(univPath+'.abi') : null};
    this.isDeployed = false;
  }
}