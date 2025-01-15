import { Button } from '@/components/ui/button';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { useAuth } from '@/contexts/auth-context';
import { api } from '@/lib/api';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

interface SpyProps {
	codeName: string;
	realName: string;
}

const formSchema = z.object({
	codeName: z.string().min(1),
	realName: z.string().min(1),
});

export default function SpiesScreen() {
	const { token } = useAuth();
	const [spies, setSpies] = useState<SpyProps[]>([]);
	const form = useForm<z.infer<typeof formSchema>>({
		defaultValues: {
			codeName: '',
			realName: '',
		},
		resolver: zodResolver(formSchema),
	});

	async function getSpies() {
		const res = await api.get('/topsecret');

		if (res.status === 200) {
			setSpies(res.data);
		} else {
			toast.error('Could not fetch spies');
		}
	}

	async function onSubmit(data: z.infer<typeof formSchema>) {
		const res = await api.post('/spies', null, {
			params: {
				...data,
				token,
			},
		});

		if (res.status === 201) {
			toast.success('Spy added');
			form.reset();
			getSpies();
		} else {
			toast.error(res.data);
		}
	}

	return (
		<main className="w-screen h-screen flex justify-center items-center">
			<div className="border border-border rounded-lg p-4 max-w-lg w-full shadow-lg">
				<h1>Spies</h1>
			</div>
			<section className="space-y-4">
				<Table>
					<TableCaption>A list of all spies</TableCaption>
					<TableHeader>
						<TableRow>
							<TableHead>Codename</TableHead>
							<TableHead>Real Name</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{spies.map((spy) => (
							<TableRow>
								<TableCell>{spy.codeName}</TableCell>
								<TableCell>{spy.realName}</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</section>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
					<FormField
						control={form.control}
						name="codeName"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Code Name</FormLabel>
								<FormControl>
									<Input {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="realName"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Real Name</FormLabel>
								<FormControl>
									<Input {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<Button type="submit">Add</Button>
				</form>
			</Form>
		</main>
	);
}
