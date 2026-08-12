"use client";
import { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { triggerSync } from "@/lib/api";
import { useRouter } from "next/navigation";
import { MdSync } from "react-icons/md";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";

export default function SyncButton() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ productsSynced: number } | null>(null);
  const router = useRouter();

  const handleSync = async () => {
    setLoading(true);
    try {
      const response = await triggerSync();
      setResult(response);
      router.refresh();
    } catch (error) {
      alert(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button onClick={handleSync} disabled={loading} className="group">
        {loading ? "Syncing..." : "Sync"}
        <MdSync className="group-hover:animate-spin" />
      </Button>

      <AlertDialog
        open={!!result}
        onOpenChange={(open) => !open && setResult(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <div className="flex items-center gap-3">
              <AlertDialogTitle className="text-xl">
                Syncing complete
              </AlertDialogTitle>
              <IoMdCheckmarkCircleOutline className="w-6 h-6" />
            </div>
            <AlertDialogDescription className="text-left">
              Syncing {result?.productsSynced} products.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogAction onClick={() => setResult(null)}>
              Accept
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
