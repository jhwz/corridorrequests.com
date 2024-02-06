import { dev } from '$app/environment';
import { RESEND_API_KEY } from '$env/static/private';

const to = dev ? 'joelhowse@gmail.com' : 'info@corridorrequests.com';

const from = `Site Contact Form<noreply@corridorrequests.com>`;

type SendEmailBody = {
	subject: string;
	text: string;
	reply_to: string | string[];
};

export async function send_email(body: SendEmailBody) {
	const res = await fetch('https://api.resend.com/emails', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${RESEND_API_KEY}`
		},
		body: JSON.stringify({
			...body,
			to,
			from
		})
	});
	return handle_res(res);
}

async function handle_res(res: Response) {
	if (!res.ok) {
		throw new Error(await res_text(res));
	}
}

async function res_text(res: Response) {
	const contentType = res.headers.get('content-type') || '';
	if (contentType.includes('application/json')) {
		return JSON.stringify(await res.json());
	}
	return res.text();
}
