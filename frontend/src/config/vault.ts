import VaultLogo from "@/assets/vault_logo.png";
import FakeVaultLogo from "@/assets/fake_vault_logo.png";

export type VaultInfo = {
	address: string;
	company_name: string;
	logo: string;
};

export const VAULT_INFO: VaultInfo = {
	address: "0x9BdA63D2F68AeC5AB0832FF13448aa5972D3b3B3",
	company_name: "Acme Company",
	logo: VaultLogo,
};


export const FAKE_VAULT_INFO: VaultInfo = {
	address: "0x4e68Ccd3E89f51C3074ca5072bbAC773960dFa36",
	company_name: "BipBip Company",
	logo: FakeVaultLogo,
};