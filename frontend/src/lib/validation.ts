import { z } from "zod";

export const moroccanPhoneRegex = /^0[5-7][0-9]{8}$/;

export const checkoutSchema = z.object({
  customerName: z.string().trim().min(3, "كتب الاسم الكامل باش نأكدو الطلب."),
  phone: z
    .string()
    .trim()
    .regex(moroccanPhoneRegex, "Enter a valid phone number, e.g. 0612345678 or +212612345678.")
});

export type CheckoutInput = z.infer<typeof checkoutSchema>;
