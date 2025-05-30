import React from "react";

interface MetamaskProviderProps {
	children: React.ReactNode;
}

interface TMetamaskContext {
	accountAddress: string;
	connectWallet(btnRef: React.RefObject<HTMLButtonElement | null>): Promise<void>;
}

export const MetamaskContext = React.createContext<TMetamaskContext | null>(null);

import { MetaMaskSDK } from "@metamask/sdk";

// const ethereum = MMSDK.getProvider()

// // Connect to MetaMask
// const accounts = await MMSDK.connect()

// // Make requests
// const result = await ethereum.request({
//   method: "eth_accounts",
//   params: []
// })

const metamask = new MetaMaskSDK({
	dappMetadata: {
		name: "Delulu Explorer",
		url: window.location.href,
		iconUrl: "https://i.pinimg.com/736x/15/c8/31/15c831ce412de557cc1ea77d37f55fc5.jpg",
	},
	checkInstallationImmediately: true,
	checkInstallationOnAllCalls: true,
	logging: {
		developerMode: false,
		sdk: false,
	},
});

export function MetamaskProvider({ children }: MetamaskProviderProps) {
	const [account, setAccount] = React.useState("");

	// Connect wallet
	async function connectWallet(btnRef: React.RefObject<HTMLButtonElement | null>) {
		if (!btnRef.current) throw new Error("Metamask Button not initialized!");
		try {
			// Disable button while request is pending
			btnRef.current.disabled = true;

			const provider = metamask.getProvider();
			if (!provider) throw new Error("Unable to retrieve provider!");

			console.log({ providerChainId: provider.chainId, isMetamask: provider.isMetaMask });

			const accounts = await provider.request<string[]>({
				method: "eth_requestAccounts",
			});

			if (!accounts) throw new Error("No accounts avaiable!");

			const account = accounts[0];
			console.log("Connected:", account);

			if (!account) throw new Error("No account found!");
		} catch (err) {
			if ((err as { code: number; message: string }).code === 4001) {
				console.log("User rejected connection");
			} else {
				console.error(err);
			}
		} finally {
			btnRef.current.disabled = false;
		}
	}

	React.useEffect(() => {
		const provider = metamask.getProvider();

		console.log("IS METAMASK INSTALLED: ", provider?.isMetaMask);
		console.log("IS PROVIDER CONNECTED: ", provider?.isConnected());

		if (!provider) throw new Error("Unable to retrieve provider!");

		// Handle account changes
		provider.on("accountsChanged", (accounts) => {
			if ((accounts as string[]).length === 0) {
				setAccount("");
			} else {
				console.log("Account connected: ", (accounts as string[])[0]);
				setAccount((accounts as string[])[0]);
			}
		});

		return () => {};
	}, [metamask]);

	React.useEffect(() => {
		const provider = metamask.getProvider();
		if (!provider) throw new Error("Unable to retrieve provider!");

		(async () => {
			const permissions = await provider.request<{ id: string; parentCapability: string; caveats: { type: string; value: string[] }[] }[]>({
				method: "wallet_getPermissions",
			});

			const accountPermission = permissions?.filter((v) => v?.parentCapability === "eth_accounts");

			console.log({ accountPermission });

			if (accountPermission) {
				setAccount(accountPermission[0]?.caveats[0].value[0] || "");
			}
		})();
	}, []);

	const value: TMetamaskContext = {
		accountAddress: account,
		connectWallet,
	};

	return <MetamaskContext.Provider value={value}>{children}</MetamaskContext.Provider>;
}

export function useMetamask() {
	const context = React.useContext(MetamaskContext);
	if (context === undefined) {
		throw new Error("useMetamask should be used inside a MetamaskProvider!");
	}
	return context as TMetamaskContext;
}
