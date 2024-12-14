import { z } from "zod";

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
      { message: "Payload must be a valid JSON string" }
    ),

  destination: z
    .string({ invalid_type_error: "Destination must be a string" })
    .nonempty({
      message: "Destination is required",
    }),
});
