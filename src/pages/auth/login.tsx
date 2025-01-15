import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { api } from '@/lib/api';
import { useAuth } from '@/contexts/auth-context';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const formSchema = z.object({
	email: z.string().email(),
	password: z.string(),
});

export default function LoginScreen() {
	const { setToken } = useAuth();
	const form = useForm<z.infer<typeof formSchema>>({
		defaultValues: {
			email: '',
			password: '',
		},
		resolver: zodResolver(formSchema),
	});
	const navigate = useNavigate();

	async function handleSubmit(data: z.infer<typeof formSchema>) {
		const res = await api.post('/user', data);

		if (res.status === 200) {
			setToken(res.data.token);
			navigate('/');
		} else {
			toast.error(res.data);
		}
	}

	return (
		<main className="w-screen h-screen flex justify-center items-center">
			<div className="border border-border rounded-lg p-4 max-w-md w-full shadow-lg space-y-8">
				<h1 className="text-2xl font-bold text-center">Super Secret Login</h1>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(handleSubmit)}
						className="space-y-8"
					>
						<FormField
							control={form.control}
							name="email"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Email</FormLabel>
									<FormControl>
										<Input placeholder="aadne.nerdheim@atea.no" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="password"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Password</FormLabel>
									<FormControl>
										<Input placeholder="******" {...field} type="password" />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<section
							id="footer"
							className="w-full flex flex-row justify-between items-center gap-1"
						>
							<div className="flex flex-row gap-1 items-center">
								<Button type="submit">Submit</Button>
								<Button variant="link" asChild>
									<Link to="/auth/register">Register</Link>
								</Button>
							</div>
							<Button variant="link" asChild className="self-end">
								<Link to="/auth/reset">Forgot password?</Link>
							</Button>
						</section>
					</form>
				</Form>
			</div>
		</main>
	);
}
