import * as React from "react";
import Box from "@mui/joy/Box";
import Textarea from "@mui/joy/Textarea";

export default function TextareaSizes({ size, placeholder, value, onChange }) {
  return (
    <Box>
      {/* <Textarea color="neutral" size={size} placeholder={placeholder} value={value} onChange={onChange} /> */}
      <Textarea
        size={size}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </Box>
  );
}
