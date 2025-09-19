import { z } from "zod";

export const screenSchema = z
  .object({
    name: z.string().min(3, { message: "Name is required." }),
    theatreId: z.string().min(1, { message: "Theatre is required." }),
    type: z.string().min(2, { message: "Type is required." }),
    capacity: z
      .number()
      .min(20, { message: "Capacity must be at least 20 seats." }),
    rows: z.number().min(1, { message: "Row is required." }),
    cols: z.number().min(1, { message: "Seats per row is required." }),
    aisles: z.string().nullable(),
    disabledSeats: z.string().nullable(),
    multiplier: z
      .number({ message: "Multiplier is required." })
      .min(0.5)
      .max(3),
    seatTypes: z
      .array(
        z.object({
          typeId: z.string().min(1, "Seat type is required."),
          seatList: z.array(z.string()),
        }),
      )
      .nonempty("Please assign seat types."),
  })
  .refine(
    (data) => {
      if (!data.aisles) return true;
      const aisles = data.aisles
        .split(",")
        .map((a) => parseInt(a.trim(), 10))
        .filter((n) => !isNaN(n));

      return aisles.every((a) => a >= 1 && a <= data.cols);
    },
    {
      message: "Aisles must be within seat column range.",
      path: ["aisles"],
    },
  )
  .refine(
    (data) => {
      if (!data.disabledSeats) return true;

      // generate seat labels (A1, A2, ..., B1, B2, ...)
      const validSeats = new Set<string>();
      for (let r = 0; r < data.rows; r++) {
        const rowLetter = String.fromCharCode(65 + r); // A, B, C...
        for (let c = 1; c <= data.cols; c++) {
          validSeats.add(`${rowLetter}${c}`);
        }
      }

      const disabled = data.disabledSeats.split(",").map((s) => s.trim());

      return disabled.every((seat) => validSeats.has(seat));
    },
    {
      message: "Disabled seats must exist in the actual layout.",
      path: ["disabledSeats"],
    },
  );
