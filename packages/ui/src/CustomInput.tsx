import * as React from "react";

export const CustomInput = React.forwardRef((props, ref) => {
  const [value, setValue] = React.useState("");
  React.useImperativeHandle(
    ref,
    () => {
      getValue: () => value;
    },
    [value]
  );
  return (
    <input
      value={value}
      placeholder={props.placeholder}
      onChange={(e) => setValue(e.target.value)}
    />
  );
});
