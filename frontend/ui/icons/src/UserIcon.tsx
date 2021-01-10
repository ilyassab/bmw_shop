import React from "react";
export const UserIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg width="1em" height="1em" viewBox="0 0 20 20" fill="none" {...props}>
    <rect width={20} height={20} />
    <path
      d="M1 19V16.9415C1 16.0807 1.55086 15.3164 2.36754 15.0442L6.12 13.7933C6.67811 13.6073 7.12601 13.185 7.3445 12.6387L8 11H12L12.6555 12.6387C12.874 13.185 13.3219 13.6073 13.88 13.7933L17.6325 15.0442C18.4491 15.3164 19 16.0807 19 16.9415V19"
      stroke={props.color || "rgba(38, 38, 38, 1)"}
      strokeWidth={2}
      strokeLinecap="square"
    />
    <path
      d="M6 4C6 2.34315 7.34315 1 9 1H11C12.6569 1 14 2.34315 14 4V8C14 10.2091 12.2091 12 10 12C7.79086 12 6 10.2091 6 8V4Z"
      stroke={props.color || "rgba(38, 38, 38, 1)"}
      strokeWidth={2}
    />
  </svg>
);
