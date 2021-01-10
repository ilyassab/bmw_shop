import React from "react";
export const CartIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg width="1em" height="1em" viewBox="0 0 20 20" fill="none" {...props}>
    <rect width={20} height={20} />
    <path
      d="M1.19995 7L3 19H17L18.8 7H1.19995Z"
      stroke={props.color || "rgba(38, 38, 38, 1)"}
      strokeWidth={2}
    />
    <path
      d="M6 11V5C6 2.79086 7.79086 1 10 1V1C12.2091 1 14 2.79086 14 5V11"
      stroke={props.color || "rgba(38, 38, 38, 1)"}
      strokeWidth={2}
    />
  </svg>
);
