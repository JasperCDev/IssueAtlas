import * as React from "react";

import { cn } from "@/lib/utils";

type ButtonFragmentProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

const ButtonFragment = React.forwardRef<HTMLButtonElement, ButtonFragmentProps>(
  ({ type = "button", className, ...props }, ref) => {
    return (
      <button
        ref={ref}
        type={type}
        data-slot="button-fragment"
        className={cn(
          "cursor-pointer appearance-none border-0 bg-transparent p-0 font-inherit text-inherit",
          className,
        )}
        {...props}
      />
    );
  },
);

ButtonFragment.displayName = "ButtonFragment";

export { ButtonFragment };
  