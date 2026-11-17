import { useCallback, useEffect, useRef, useState } from "react";
import { ConfirmationDialog, type ConfirmationOptions } from "./ConfirmationDialog";

type PendingConfirmation = {
  options: ConfirmationOptions;
  resolve: (confirmed: boolean) => void;
};

export function useConfirmationDialog() {
  const [pending, setPending] = useState<PendingConfirmation | null>(null);
  const pendingRef = useRef<PendingConfirmation | null>(null);

  const requestConfirmation = useCallback((options: ConfirmationOptions) => {
    return new Promise<boolean>((resolve) => {
      pendingRef.current?.resolve(false);
      const next = { options, resolve };
      pendingRef.current = next;
      setPending(next);
    });
  }, []);

  const settle = useCallback((confirmed: boolean) => {
    const current = pendingRef.current;
    if (!current) {
      return;
    }

    pendingRef.current = null;
    setPending(null);
    current.resolve(confirmed);
  }, []);

  useEffect(
    () => () => {
      pendingRef.current?.resolve(false);
      pendingRef.current = null;
    },
    [],
  );

  return {
    requestConfirmation,
    confirmationDialog: pending ? (
      <ConfirmationDialog
        {...pending.options}
        onCancel={() => settle(false)}
        onConfirm={() => settle(true)}
      />
    ) : null,
  };
}
