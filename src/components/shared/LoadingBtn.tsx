import { Loader2 } from "lucide-react";
import { Button, ButtonProps } from "../ui/button";
import { cn } from "@/lib/utils";

// LoadingBtnProps interface extends ButtonProps
interface LoadingBtnProps extends ButtonProps {
  loading: boolean;
}

// LoadingBtn component
export default function LoadingBtn({
  loading,
  disabled,
  className,
  ...props
}: LoadingBtnProps) {
  return (
    // Button component with loading spinner and children
    <Button
      disabled={loading || disabled} // disabled prop with loading or disabled value
      className={cn("flex items-center gap-2", className)}
      {...props}
    >
      {loading ? <Loader2 className="size-5 animate-spin" /> : props.children}
    </Button>
  );
}
