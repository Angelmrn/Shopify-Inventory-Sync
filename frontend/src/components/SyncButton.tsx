"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { triggerSync } from "@/lib/api";
import { useRouter } from "next/navigation";

export default function SyncButton() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSync = async () => {
    setLoading(true);
    try {
      const response = await triggerSync();
      alert(`Sincronizados ${response.productsSynced} productos`);
      router.refresh();
    } catch (error) {
      alert("Error in Sync");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button onClick={handleSync} disabled={loading}>
      {loading ? "Syncing..." : "Sync"}
    </Button>
  );
}
