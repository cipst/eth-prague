import { Button } from "../ui/button";
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";

export const BalanceSheet = () => {
	return (
		<div className="flex flex-wrap items-center justify-center gap-5">
			<Card className="w-xl">
				<CardHeader>
					<CardTitle>Balance Sheet</CardTitle>
					{/* <CardDescription>Card Description</CardDescription> */}
					<CardAction>
						<Button>Update CEX balance</Button>
					</CardAction>
				</CardHeader>
				<CardContent></CardContent>
				<CardFooter>
					<p>Card Footer</p>
				</CardFooter>
			</Card>
			<Card className="w-xl">
				<CardHeader>
					<CardTitle>Income Statement</CardTitle>
					{/* <CardDescription>Card Description</CardDescription> */}
					<CardAction>
						<Button>Update</Button>
					</CardAction>
				</CardHeader>
				<CardContent>
					<p>Card Content</p>
				</CardContent>
				<CardFooter>
					<p>Card Footer</p>
				</CardFooter>
			</Card>
		</div>
	);
};
