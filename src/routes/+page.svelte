<script lang="ts">
	import { enhance } from '$app/forms';
	import Barricade from '$lib/assets/Barricade.svelte';
	import Check from '$lib/assets/Check.svelte';
	import Footprints from '$lib/assets/Footprints.svelte';
	import Hammer from '$lib/assets/Hammer.svelte';
	import Repeat from '$lib/assets/Repeat.svelte';
	import Stack from '$lib/assets/Stack.svelte';
	import type { ActionData } from './$types.js';

	import dinsdaleImage from '$lib/images/dinsdale_aberdeen.jpg';
	import hoodStImage from '$lib/images/hood_st.jpg';
	import sh36Image from '$lib/images/sh36_kennedy_rd.jpg';
	import wairereImage from '$lib/images/wairere.jpg';

	let { form } = $props<{ form: ActionData }>();

	const iconSize = 40;
</script>

<svelte:head>
	<title>Corridor Requests</title>
	<meta name="description" content="NZ Traffic Management Plans" />
	<meta
		name="keywords"
		content="corridor requests, corridor access requests, corridor requests nz, corridor access requests nz, TMP, TMP nz, traffic management plans"
	/>
</svelte:head>

<section class="hero">
	<h1>New Zealand Traffic Management Plans</h1>
</section>

<section class="desc">
	<div>
		<p>We are a NZ owned business located in the Waikato but cover all areas of New Zealand.</p>

		<img src={dinsdaleImage} alt="TMP in Dinsdale" />
	</div>

	<div>
		<p>
			We like to work in closely with all councils and NZTA Waka Kotahi to create safe and effective
			traffic management plans for your unique requirements.
		</p>

		<img src={hoodStImage} alt="TMP in Hood St" />
	</div>

	<div>
		<p>
			We pride ourselves on our high quality traffic management plans and the effort we put in to
			ensure you have in place, what you need to both do your work unobstructed and keep your staff
			safe.
		</p>

		<img src={sh36Image} alt="TMP in SH36" />
	</div>

	<div>
		<p>
			We make sure we provide good communication on how things are progressing through the Corridor
			Access Request process.
		</p>

		<img src={wairereImage} alt="TMP in Wairere" />
	</div>

	<p>
		If you're needing a TMP for a Resource Consent, on going work or just a one off project you have
		coming up, we can help.
	</p>
</section>

<section class="services">
	<h2>What we do</h2>

	<service-card>
		<card-icon>
			<Barricade size={iconSize} />
		</card-icon>
		Corridor Access Requests for construction sites and vehicle crossings
	</service-card>
	<service-card>
		<card-icon>
			<Stack size={iconSize} />
		</card-icon>
		Large TMP's for complex projects with multiple stages
	</service-card>
	<service-card>
		<card-icon>
			<Repeat size={iconSize} />
		</card-icon>
		Generic TMP's for routine yearly activities
	</service-card>
	<service-card>
		<card-icon>
			<Hammer size={iconSize} />
		</card-icon>
		Traffic management plans for inside your construction site
	</service-card>
	<service-card>
		<card-icon>
			<Footprints size={iconSize} />
		</card-icon>
		Footpath closures
	</service-card>
	<service-card>
		<card-icon>
			<Check size={iconSize} />
		</card-icon>
		Anything to do with corridor access requests and traffic management plans, we do it.
	</service-card>
</section>

<form class="contact" use:enhance method="POST">
	<h2 id="contact-us">Contact Us</h2>

	<input type="text" required placeholder="Name..." name="name" />
	<input type="email" required placeholder="Email..." name="email" />
	<input type="tel" placeholder="Phone..." name="phone" />
	<textarea required placeholder="Message..." rows="5" name="message" />

	{#if form?.success}
		Message sent! We will be in touch shortly
	{:else if form?.error}
		<error-text style="color: red;">{form?.error}</error-text>
	{/if}
	<button type="submit">Send</button>

	<p>
		Or send an email to <a href="mailto:info@corridorrequests.com">info@corridorrequests.com</a>
	</p>
</form>

<style>
	section.hero {
		display: grid;
		grid-template-columns: 1fr min(48rem, 100%) 1fr;
		padding: var(--sp-24) 0;
	}
	section.hero h1 {
		grid-column: 2;
		font-size: 2.6rem;
		text-align: center;
		/* color: var(--color-brand); */
	}

	section.desc {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: var(--sp-08);
		padding: var(--sp-24) 0;
		font-size: large;
		background-color: var(--color-bg-01);
	}
	section.desc div {
		display: flex;
		align-items: center;
		padding: var(--sp-04);
		gap: var(--sp-06);
		max-width: 60rem;
	}

	section.desc > p {
		text-align: center;
		padding: 0 var(--sp-06);
	}

	@media (max-width: 768px) {
		section.desc div {
			flex-direction: column;
		}
	}
	section.desc img {
		max-width: 40%;
		min-width: min(200px, 100%);
	}

	section.services {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		padding: var(--sp-16) var(--sp-08);
		gap: var(--sp-08);
	}
	@media (max-width: 1050px) {
		section.services {
			grid-template-columns: repeat(2, 1fr);
		}
	}
	@media (max-width: 768px) {
		section.services {
			grid-template-columns: 1fr;
		}
	}

	section.services h2 {
		grid-column: 1 / -1;
		text-align: center;
	}

	service-card {
		border: 4px dashed var(--color-bg-01);
		/* border: 4px dashed transparent; */
		border-radius: 8px;
		padding: var(--sp-04);
		display: flex;
		flex-direction: column;
		gap: var(--sp-02);
		justify-content: center;
		align-items: center;
		text-align: center;
		/* box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px; */
		box-shadow: none;
		transition: box-shadow 0.3s ease-out;
	}
	service-card:hover {
		/* border-color: var(--color-brand); */
		box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
	}

	form.contact {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		background-color: var(--color-bg-01);
		padding: var(--sp-04);
		padding-bottom: 8rem;
		text-align: center;
		gap: var(--sp-03);
	}

	form.contact h2 {
		margin-bottom: var(--sp-08);
	}

	form.contact :is(input, textarea) {
		background-color: var(--color-bg-01);
		border: 2px solid var(--color-bg);
		outline-color: var(--color-brand);
		padding: var(--sp-02) var(--sp-03);
		border-radius: 8px;
		min-width: min(100%, 32rem);
	}
	form.contact button {
		background-color: var(--color-brand);
		border: none;
		cursor: pointer;
		color: var(--color-bg-01);
		padding: var(--sp-02) var(--sp-06);
		border-radius: 8px;
		font-weight: bold;
		transition:
			transform 150ms ease 0s,
			box-shadow 0.15s ease-out 0s;
	}

	form.contact button:hover {
		transform: scale(1.02);
		box-shadow: rgba(86, 86, 85, 0.3) 0px 7px 15px;
	}
</style>
