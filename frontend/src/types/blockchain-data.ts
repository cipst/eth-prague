export interface TokenBalance {
	token: {
		icon_url: string;
		name: string;
		decimals: string;
		symbol: string;
		exchange_rate: string;
	};
	value: string;
}
