import { Button } from "../ui/button";
import { Card, CardAction, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card";

export const IncomeStatement = () => {
	return (
		<Card className="w-xl">
			<CardHeader>
				<CardTitle className="font-mono uppercase text-2xl">Income Statement</CardTitle>
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
	);
};
