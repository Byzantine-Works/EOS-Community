export default class State {
    constructor(){ 
        this.account = false;
        this.loading = false;
        this.staking = { staked: null, unstaked: null};
        this.cpu = { used: null, max: null};
        this.net = { used: null, max: null};
        this.ram = { used: null, max: null};
        this.bill = false;
        this.csvData = null; 
        //[
        // {
        //     deposit: {
        //       ram: 268,
        //       net: 128,
        //       cpu: 613
        //     },
        //     setrelprd: {
        //       ram: 0,
        //       net: 112,
        //       cpu: 686
        //     },
        //     setadmin: {
        //       ram: 268,
        //       net: 104,
        //       cpu: 814
        //     },
        //     resetex: {
        //       ram: 0,
        //       net: 104,
        //       cpu: 492
        //     },
        //     testsig: {
        //       ram: 268,
        //       net: 136,
        //       cpu: 446
        //     },
        //     account: {
        //       ram: 268,
        //       net: 112,
        //       cpu: 483
        //     },
        //     registeruser: {
        //       ram: 268,
        //       net: 112,
        //       cpu: 739
        //     },
        //     getbalances: {
        //       ram: 268,
        //       net: 104,
        //       cpu: 593
        //     }
        //   }
     }
}
