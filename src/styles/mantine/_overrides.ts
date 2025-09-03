import { Button, type MantineThemeOverride } from "@mantine/core";

export const MantineComponentOverrides: MantineThemeOverride = {
  components: {
    Button: Button.extend({
      defaultProps: {
        color: "var(--color-primary)",
        style: {
          height: "42px",
          borderRadius: "8px",
          padding: "0 20px",
          fontSize: "16px",
          fontWeight: 500,
        },
      },
    }),
  },
};

// // Create a separate compact button component
// export const CompactButton = Button.extend({
//   defaultProps: {
//     color: "var(--color-primary)",
//     style: {
//       height: "42px",
//       borderRadius: "8px",
//       padding: "0 20px",
//       fontSize: "14px",
//       fontWeight: 500,
//     },
//   },
// });
