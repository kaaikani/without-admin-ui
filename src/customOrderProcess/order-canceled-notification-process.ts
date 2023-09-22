import { SmsService } from "../smsService";
import { CustomOrderProcess } from "@vendure/core";

export const orderCanceledNotificationProcess: CustomOrderProcess<"OrderCanceledNotificationProcess"> =
  {
    onTransitionStart(fromState, toState, data) {
      console.log(`current state ${fromState} to ${toState}`);
      // Order Cancelled
      if (toState === "Cancelled") {
        const smsService = new SmsService(
          "64d47249d6fc057c85655632",
          data.order.customer!.phoneNumber,
          "order_cancelled",
          data.order.code.toString()
        );
        smsService.sendSms();
      }
    },
  };
