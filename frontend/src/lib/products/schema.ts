import { z } from "zod";

export const productFormSchema = z.object({
  name: z.string().trim().min(1, "Title is required"),
  description: z.string(),
  price: z.number({ error: "Price is required" }).positive("Price must be greater than zero"),
  duration: z.string().min(1, "Duration is required"),
  category: z.string().min(1, "Category is required"),
  quality: z.string().min(1, "Quality is required"),
  deviceLimit: z
    .number({ error: "Device limit is required" })
    .int()
    .min(1, "At least one device")
    .max(99),
  isActive: z.boolean(),
  visibleFrom: z.string().optional(),
  visibleTo: z.string().optional()
});

export const productApiSchema = z.object({
  name: z.string().trim().min(1, "Title is required"),
  description: z.string().optional().default(""),
  price: z.coerce.number().positive("Price must be greater than zero"),
  duration: z.string().min(1, "Duration is required"),
  category: z.string().min(1, "Category is required"),
  quality: z.string().min(1, "Quality is required"),
  deviceLimit: z.coerce.number().int().min(1, "At least one device").max(99),
  isActive: z.boolean(),
  visibleFrom: z.string().optional(),
  visibleTo: z.string().optional()
});

export const productUpdateSchema = productApiSchema.partial().refine(
  (data) => Object.keys(data).length > 0,
  { message: "At least one field is required" }
);

export type ProductFormValues = z.infer<typeof productFormSchema>;

export function parseProductForm(body: unknown) {
  return productApiSchema.safeParse(body);
}

export function parseProductUpdate(body: unknown) {
  return productUpdateSchema.safeParse(body);
}
