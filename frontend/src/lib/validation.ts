import { z } from "zod";

export const moroccanPhoneRegex = /^0[5-7][0-9]{8}$/;

export const checkoutSchema = z.object({
  customerName: z.string().trim().min(3, "كتب الاسم الكامل باش نأكدو الطلب."),
  phone: z
    .string()
    .trim()
    .regex(moroccanPhoneRegex, "دخل رقم مغربي صحيح، مثال: 0612345678.")
});

export type CheckoutInput = z.infer<typeof checkoutSchema>;
