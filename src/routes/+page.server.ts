import { sendEmail } from '$lib/email.js';
import type { Actions } from './$types.js';

const companyEmail = 'test@corridorrequests.com';

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

		const res = await sendEmail({
			personalizations: [
				{
					to: [{ email: companyEmail }],
					reply_to: { email: body.email, name: body.name }
				}
			],
			subject: 'New message from corridorrequests.co.nz',
			from: { email: 'no-reply@corridorrequests.co.nz' },
			content: [
				{
					type: 'text/plain',
					value: `
New message recieved through contact form on corridorrequests.co.nz

Name: ${body.name}
Email: ${body.email}
Phone: ${body.phone || 'Not provided'}

${body.message}
`
				}
			]
		});

		if (res.success) {
			return { success: true };
		}
		return { error: res.errors.join('; ') };
	}
};
