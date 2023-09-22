const request = require("request");

export class SmsService {
  smsData: {
    template_id: string;
    sender: string;
    mobiles: string;
    var?: string;
    number?: string;
  } = {
    template_id: "64900d7fd6fc053c5e31a685",
    sender: "KAIMSG",
    mobiles: "91XXXXXXXXXX",
  };
  orderType: string;
  orderId: string;
  constructor(
    templateId: string,
    mobiles: string,
    orderType: string,
    orderId: string
  ) {
    this.smsData.template_id = templateId;
    this.smsData.mobiles = '+91' + mobiles;
    this.orderType = orderType;
    this.orderId = orderId;
  }
  sendSms() {
    const path = `https://control.msg91.com/api/v5/flow/`;
    console.log(path);
    if (this.orderType == "order_cancelled") {
      this.smsData.number = this.orderId;
    }

    let options = {
      method: "POST",
      url: path,
      body: JSON.stringify(this.smsData),
      headers: {
        accept: "application/json",
        authkey: "395929AcYuel89696451b515P1",
        "content-type": "application/json",
      },
    };
    console.log(
      'template id ' + this.smsData.template_id +  'sender ' + this.smsData.sender +'mobile '+ this.smsData.mobiles +'number '+ this.smsData.number +'var'+ this.smsData.var);

    request(options, (error: any, response: any) => {
      if (error) {
        console.log(error);
      } else {
        console.log(response.body);
      }
    });
  }
}
