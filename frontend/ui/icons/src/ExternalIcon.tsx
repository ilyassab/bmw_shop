import React from "react";
export const ExternalIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg width="1em" height="1em" viewBox="0 0 16 16" fill="none" {...props}>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M0 0H6V2H2V14H14V10H16V16H0V0ZM9 0H16V7H14V3.41432L7.00003 10.4143L5.58582 9.00008L12.5859 2H9V0Z"
      fill={props.color || "rgba(24, 84, 205, 1)"}
    />
  </svg>
);
