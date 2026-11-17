import { supabase } from "./supabase";

const PORTFOLIO_KEY_PREFIX = "buksu-";

type PortfolioItemRow = {
  key: string;
  value: string;
};

export type PortfolioItemUpdate = {
  key: string;
  value: string;
};

const PORTFOLIO_ITEM_UPDATED_EVENT = "buksu-portfolio-item-updated";

function dispatchPortfolioItemUpdate(key: string, value: string) {
  window.dispatchEvent(
    new CustomEvent<PortfolioItemUpdate>(PORTFOLIO_ITEM_UPDATED_EVENT, {
      detail: { key, value },
    }),
  );
}

export function getPortfolioItem(key: string) {
  return localStorage.getItem(key);
}

export function subscribeToPortfolioItem(
  key: string,
  onUpdate: (value: string) => void,
) {
  const listener = (event: Event) => {
    const update = (event as CustomEvent<PortfolioItemUpdate>).detail;
    if (update?.key === key) {
      onUpdate(update.value);
    }
  };

  window.addEventListener(PORTFOLIO_ITEM_UPDATED_EVENT, listener);
  return () => window.removeEventListener(PORTFOLIO_ITEM_UPDATED_EVENT, listener);
}

export function subscribeToPortfolioUpdates() {
  const channel = supabase
    .channel("portfolio-item-changes")
    .on(
      "postgres_changes",
      { event: "*", schema: "public", table: "portfolio_items" },
      (payload) => {
        const row = payload.new as Partial<PortfolioItemRow>;
        if (typeof row.key !== "string" || typeof row.value !== "string") {
          return;
        }

        try {
          localStorage.setItem(row.key, row.value);
        } catch (cacheError) {
          console.error("Unable to update the local cache from a portfolio change.", cacheError);
        }

        dispatchPortfolioItemUpdate(row.key, row.value);
      },
    )
    .subscribe((status, error) => {
      if (status === "CHANNEL_ERROR" || status === "TIMED_OUT") {
        console.error("Live portfolio updates are unavailable.", error);
      }
    });

  return () => {
    void supabase.removeChannel(channel);
  };
}

export async function initializePortfolioStorage(isOwner: boolean) {
  const { data, error } = await supabase.from("portfolio_items").select("key, value");

  if (error) {
    throw error;
  }

  const remoteItems = new Map(
    (data as PortfolioItemRow[]).map(({ key, value }) => [key, value]),
  );
  const localItems = Object.keys(localStorage)
    .filter((key) => key.startsWith(PORTFOLIO_KEY_PREFIX))
    .map((key) => [key, localStorage.getItem(key)] as const)
    .filter((item): item is readonly [string, string] => item[1] !== null);
  const itemsToSeed = isOwner
    ? localItems.filter(([key]) => !remoteItems.has(key))
    : [];

  if (itemsToSeed.length > 0) {
    const { error: seedError } = await supabase.from("portfolio_items").upsert(
      itemsToSeed.map(([key, value]) => ({ key, value })),
      { onConflict: "key" },
    );

    if (seedError) {
      throw seedError;
    }

    for (const [key, value] of itemsToSeed) {
      remoteItems.set(key, value);
    }
  }

  for (const [key, value] of remoteItems) {
    localStorage.setItem(key, value);
  }

  if (remoteItems.size > 0) {
    for (const [key] of localItems) {
      if (!remoteItems.has(key)) {
        localStorage.removeItem(key);
      }
    }
  }
}

export async function setPortfolioItem(key: string, value: string) {
  if (!key.startsWith(PORTFOLIO_KEY_PREFIX)) {
    throw new Error("Portfolio content keys must start with buksu-.");
  }

  const { error } = await supabase.from("portfolio_items").upsert(
    { key, value, updated_at: new Date().toISOString() },
    { onConflict: "key" },
  );

  if (error) {
    throw error;
  }

  try {
    localStorage.setItem(key, value);
    dispatchPortfolioItemUpdate(key, value);
  } catch (cacheError) {
    console.warn("The shared portfolio was saved, but its local cache could not be updated.", cacheError);
  }
}
