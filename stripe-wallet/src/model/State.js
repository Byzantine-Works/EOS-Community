import { isNull } from "util";

export default class State {
    constructor() {

        this.tokens = null,

        this.token = null,
        
        this.rateEURUSD = null,

        this.fiatAm = 0,

        this.message = false,

        this.transactionID = null;
        
        this.scatter = false;

        this.tooltip = "";

        this.tooltipMessage = {from: "Enter your account name.", to: "Enter the account name's recipient.", memo:"Enter the motive of the transaction.", amount:"The amount of token that are going to be sent.", privateKey:"Copy Paste here your account active private key.", scatterBox: "Check this box if you want to pair with your Scatter account."}

        this.amRend = "";

        this.fiatAmRend = "";

        this.loading = false;

        this.balance = null;
        
        this.privateKey = "";
        
        this.from = "";
        
        this.to = null;
        
        this.amount = 0;
        
        this.coin = "EOS";

        this.rate = null;
        
        this.memo = null;

        this.usdeur = "USD";
    }
}