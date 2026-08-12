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
      <Button onClick={handleSync} disabled={loading}>
        {loading ? "Syncing..." : "Sync"}
      </Button>

      <AlertDialog
        open={!!result}
        onOpenChange={(open) => !open && setResult(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Syncing complete</AlertDialogTitle>
            <AlertDialogDescription>
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
