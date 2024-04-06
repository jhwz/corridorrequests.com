import { send_email } from '$lib/email.js';
import { fail } from '@sveltejs/kit';
import type { Actions } from './$types.js';

export const actions: Actions = {
	default: async ({ request }) => {
		const form = await request.formData();

		// Validate the captcha
		const token = form.get('cf-turnstile-response') as string;
		if (!token) {
			return fail(400, {
				error: 'Missing verification token'
			});
		}
		const ip = request.headers.get('CF-Connecting-IP') as string;
		const captchaFormData = new FormData();
		captchaFormData.append('secret', '0x4AAAAAAAWec5-K4h4Yi9WMtcOJXme3Rc0');
		captchaFormData.append('response', token);
		if (ip) captchaFormData.append('remoteip', ip);
		const captchaRes = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
			body: captchaFormData,
			method: 'POST'
		}).then((r) => r.json());
		if (!captchaRes.success) {
			console.error(captchaRes);
			return fail(400, { error: 'Verification failed' });
		}

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
