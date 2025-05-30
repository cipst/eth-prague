export type CurrencyUnit = "wei" | "gwei" | "ether";

export const defaultCurrencyUnits: Record<CurrencyUnit, string> = {
	wei: "wei",
	gwei: "gwei",
	ether: "ETH",
};

export const SUPPORTED_CHAINS_ID: Record<string, string> = Object.freeze({
	"1": "ETHERUM",
});
