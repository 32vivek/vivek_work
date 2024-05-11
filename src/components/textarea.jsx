import * as React from "react";
import Box from "@mui/joy/Box";
import Textarea from "@mui/joy/Textarea";

export default function TextareaSizes({ size, placeholder, value, onChange, label }) {

  // const handleInputChange = (e) => {
  //   onChange(e.target.value);
  // };
  return (

    <Box>
      {/* <Textarea color="neutral" size={size} placeholder={placeholder} value={value} onChange={onChange} /> */}
      <Textarea
        size={size}
        variant="standard"
        required
        label={label}
        placeholder={placeholder}
        value={value || ""}
        onChange={onChange}

      />
    </Box>
  );
}

