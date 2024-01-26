import { type FC, type InputHTMLAttributes } from "react";
import { useFormContext, Controller } from "react-hook-form";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";

interface RHInputProps {
  name: string;
  className?: string;
  containerClassName?: string;
  errorClassName?: string;
}

const RHFInput: FC<RHInputProps & InputHTMLAttributes<HTMLInputElement>> = ({
  name,
  className = "",
  containerClassName = "",
  errorClassName = "",
  ...other
}) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <div className={cn("w-full space-y-2", containerClassName)}>
          <Input
            {...field}
            {...other}
            className={cn(
              `focus-visible:ring-transparent ${error && "border-destructive text-destructive"}`,
              className
            )}
          />
          {error?.message && (
            <p
              className={cn(
                "text-sm font-medium text-destructive",
                errorClassName
              )}
            >
              {error.message}
            </p>
          )}
        </div>
      )}
    />
  );
};

export default RHFInput;
