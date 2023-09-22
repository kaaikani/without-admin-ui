import { SmsService } from "../smsService";
import { CustomOrderProcess } from "@vendure/core";

export const productDeliveredNotificationProcess: CustomOrderProcess<"ProductDeliveredNotificationProcess"> =
  {
    transitions: {
      Shipped: {
        to: ["ProductDeliveredNotificationProcess"],
        mergeStrategy: "replace",
      },
      ProductDeliveredNotificationProcess: {
        to: ["Delivered", "Shipped"],
      },
    },

    onTransitionStart(fromState, toState, data) {
      if (
        fromState === "ProductDeliveredNotificationProcess" &&
        toState === "Delivered"
      ) {
        // order Delivered
        const smsService = new SmsService(
          "64900d7fd6fc053c5e31a685",
          data.order.customer!.phoneNumber,
          "delivered",
          data.order.code.toString()
        );
        smsService.sendSms();
      }
    },
  };
