import { AlertCircle } from "lucide-react";

export default function Error() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="flex items-center gap-2 text-red-500">
        <AlertCircle className="w-5 h-5" />
        <span>Oops! Something went wrong while loading data.</span>
      </div>
    </div>
  );
}
