import { z } from "zod";

export const validateWebhookCreate = z.object({
  name: z
    .string({ invalid_type_error: "Must be a string" })
    .min(3, "At least 3 chars")
    .max(50, "At most length 50 chars"),
  url: z
    .string({ invalid_type_error: "Must be a string" })
    .url({
      message: "Invalid url",
    })
    .max(256, "At most length 256 chars"),
});

export const validateScheduleBody = z.object({
  event: z
    .string({ invalid_type_error: "Event must be a string" })
    .nonempty({ message: "Event is required" })
    .min(3, { message: "Event length is too short (minimum 3 characters)" })
    .max(50, { message: "Event length is too long (maximum 50 characters)" }),

  scheduledFor: z.coerce.date({
    invalid_type_error: "Scheduled date must be a valid date",
  }),

  payload: z
    .string({ invalid_type_error: "Payload must be a string" })
    .nonempty({ message: "Payload is required" })
    .refine(
      (v) => {
        try {
          JSON.parse(v);
          return true;
        } catch {
          return false;
        }
      },
      { message: "Payload must be a valid JSON string" },
    ),
});
