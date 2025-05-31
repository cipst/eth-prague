import { useCallback, useEffect, useState } from "react";

export const useMerits = (address: `0x${string}` | undefined) => {
	const [userBalance, setUserBalance] = useState(0);

	const getUserBalance = useCallback(async () => {
		if (!address) return;

		const url = `https://merits-staging.blockscout.com/api/v1/auth/user/${address}`;
		const response = await fetch(url);
		const data = await response.json();
		console.log(data);
		if (!data.exists) {
			const a = await fetch("https://merits-staging.blockscout.com/api/v1/auth/nonce");
			const b = (await a.json()) as { nonce: string };
			console.log(b);

			const nonce = b.nonce;

			console.log(nonce);

			const c = await fetch("https://merits-staging.blockscout.com/api/v1/auth/login", {
				method: "post",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					nonce: nonce,
					message:
						"merits.blockscout.com wants you to sign in with your Ethereum account:\n0x813399e5b08Bb50b038AA7dF6347b6AF2D161338\n\nSign-In for the Blockscout Merits program.\n\nURI: https://merits.blockscout.com\nVersion: 1\nChain ID: 1\nNonce: 4MCWIDlddqsmJAAAZ\nIssued At: 2025-03-18T12:23:51.549Z\nExpiration Time: 2026-03-18T12:23:51.549Z",
					signature:
						"0xb11b582a6ef196a3f20fa9c84443a92c9f456c9da2ce8ceea2bcf4ce2b936e35767ac2ff56a1de635b7a5f4bcb5da89c4297efb2b4ce559123891202731752661c",
				}),
			});

			const d = (await c.json()) as { created: boolean; token: string };

			console.log(d);

			const e = await fetch("https://merits-staging.blockscout.com/api/v1/user/balances", {
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
					Authorization: d.token,
				},
			});

			const f = await e.json();

			console.log(f);
		}
		setUserBalance(-1);
	}, [address]);

	useEffect(() => {
		getUserBalance();
	}, [getUserBalance]);

	return {
		userBalance,
	};
};
