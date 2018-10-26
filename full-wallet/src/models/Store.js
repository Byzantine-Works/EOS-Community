export default class State {
    constructor(){ 
        this.account = false;
        this.loading = false;
        this.staking = { staked: null, unstaked: null};
        this.cpu = { used: null, max: null};
        this.net = { used: null, max: null};
        this.ram = { used: null, max: null};
        // this.bill =
        // this.csvData = [
        //     {
        //       action: 'Deployment',
        //       ram: 850721.095
        //     },
        //     {
        //       action: 'withdraw',
        //       cpu: 1126,
        //       ram: 0,
        //       net: 144
        //     },
        //     {
        //       action: 'getbalances',
        //       cpu: 403,
        //       ram: 0,
        //       net: 104
        //     },
        //     {
        //       action: 'registeruser',
        //       cpu: 513,
        //       ram: 501,
        //       net: 112
        //     },
        //     {
        //       action: 'resetex',
        //       cpu: 300,
        //       ram: 501,
        //       net: 104
        //     },
        //     {
        //       action: 'setadmin',
        //       cpu: 603,
        //       ram: 501,
        //       net: 104
        //     },
        //     {
        //       action: 'deposit',
        //       cpu: 211,
        //       ram: 501,
        //       net: 128
        //     },
        //     {
        //       action: 'setrelprd',
        //       cpu: 589,
        //       ram: 501,
        //       net: 112
        //     },
        //     {
        //       action: 'invalorders',
        //       cpu: 607,
        //       ram: 501,
        //       net: 120
        //     },
        //     {
        //       action: 'Total',
        //       cpu: 4352,
        //       ram: 853727.095,
        //       net: 928
        //     },
        //     {
        //       action: 'Total Resources EOS',
        //       cpu: 1.0299779110129377,
        //       ram: 84.37410631612521,
        //       net: 0.000014821841465583685
        //     },
        //     {
        //       action: 'Total EOS',
        //       ram: '85.4040990489796 EOS'
        //     }
        //   ];
        //   this.cpuRate = 0.00023666771852319342;
        //   this.netRate = 0.000014821841465583685;
        //   this.ramPrice = 0.00009883030163886882;
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
