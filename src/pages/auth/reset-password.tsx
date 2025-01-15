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
import { useState } from 'react';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

const formSchema = z.object({
	email: z.string().email(),
	pin: z.string(),
	newPassword: z.string(),
});

export default function ResetPasswordScreen() {
	const [requestEmail, setRequestEmail] = useState('');
	const [requestSent, setRequestSent] = useState(false);
	const form = useForm<z.infer<typeof formSchema>>({
		defaultValues: {
			email: '',
			pin: '',
			newPassword: '',
		},
		resolver: zodResolver(formSchema),
	});
	const navigate = useNavigate();

	async function sendResetRequest() {
		const res = await api.get('/user/resetrequest', {
			params: {
				email: requestEmail,
			},
		});

		if (res.status === 200) {
			setRequestSent(true);
			toast.success('Please check your email');
		} else {
			toast.error(res.data);
		}
	}

	async function handleSubmit(data: z.infer<typeof formSchema>) {
		const res = await api.put('/user/resetrequest', data);

		if (res.status === 200) {
			toast.success('Success, please log in with your new password');
			navigate('/auth/login');
		} else {
			toast.error(res.data);
		}
	}

	return (
		<main className="w-screen h-screen flex justify-center items-center">
			<div className="border border-border rounded-lg p-4 max-w-md w-full shadow-lg space-y-8">
				<h1 className="text-2xl font-bold text-center">
					Super Secret Forgot Password Place
				</h1>
				{requestSent ? (
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
								name="pin"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Reset Pin</FormLabel>
										<FormControl>
											<Input {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="newPassword"
								render={({ field }) => (
									<FormItem>
										<FormLabel>New Password</FormLabel>
										<FormControl>
											<Input placeholder="******" {...field} type="password" />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<Button type="submit">Submit</Button>
						</form>
					</Form>
				) : (
					<div className="space-y-8">
						<div className="space-y-2">
							<Label>Email</Label>
							<Input
								placeholder="aadne.nerdheim@atea.no"
								value={requestEmail}
								onChange={(e) => setRequestEmail(e.target.value)}
							/>
						</div>
						<Button onClick={sendResetRequest}>Send Reset Request</Button>
					</div>
				)}
			</div>
		</main>
	);
}
