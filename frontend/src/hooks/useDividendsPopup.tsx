import { useState } from "react";

export function useDividendsPopup() {
  const [open, setOpen] = useState(false);
  const [profit, setProfit] = useState<number | null>(null);

  const openPopup = (profitValue: number) => {
    setProfit(profitValue);
    setOpen(true);
  };

  const closePopup = () => {
    setOpen(false);
    setProfit(null);
  };

  return { open, openPopup, closePopup, profit };
}