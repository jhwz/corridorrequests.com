import { send_email } from '$lib/email.js';
import type { Actions } from './$types.js';

export const actions: Actions = {
	default: async ({ request }) => {
		const form = await request.formData();
		const body = Object.fromEntries(form) as {
			name: string;
			email: string;
			phone: string;
			message: string;
		};
		if (!body.name || !body.email || !body.message) {
			return { error: 'Please provide all fields' };
		}

		try {
			await send_email({
				subject: 'New message from corridorrequests.co.nz',
				text: `
New message recieved through contact form on corridorrequests.co.nz

Name: ${body.name}
Email: ${body.email}
Phone: ${body.phone || 'Not provided'}

${body.message}
`,
				reply_to: body.email
			});
			return { success: true };
		} catch (e) {
			if (e instanceof Error) {
				return { error: e.message };
			}
			return { error: 'Failed to send email' };
		}
	}
};
