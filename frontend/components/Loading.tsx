import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
        <Loader2 className="animate-spin h-5 w-5" />
        <span>Fetching data...</span>
      </div>
    </div>
  );
}
