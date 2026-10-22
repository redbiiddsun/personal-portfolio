<script lang="ts">
  import { onMount } from 'svelte';
  import '#lib/style.css';
  import { restoreLang } from '#lib/i18n.svelte.ts';
  import ConsentToast from '#lib/components/ConsentToast.svelte';
  import Features from '#lib/components/Features.svelte';
  import FinalCta from '#lib/components/FinalCta.svelte';
  import Footer from '#lib/components/Footer.svelte';
  import Hero from '#lib/components/Hero.svelte';
  import Intro from '#lib/components/Intro.svelte';
  import Keep from '#lib/components/Keep.svelte';
  import Nav from '#lib/components/Nav.svelte';
  import Notes from '#lib/components/Notes.svelte';
  import People from '#lib/components/People.svelte';
  import Showcase from '#lib/components/Showcase.svelte';
  import SignupDialog from '#lib/components/SignupDialog.svelte';

  let heroCardElements: HTMLElement[] = $state([]);

  onMount(restoreLang);
</script>

<svelte:head>
  <title>craftly · Show the world what you can do</title>
  <meta name="description" content="In the age of AI, your portfolio proves why clients need you." />
</svelte:head>

<Intro cards={heroCardElements} />
<Nav />

<main>
  <div class="panel panel-light panel-top">
    <Hero bind:cards={heroCardElements} />
    <People />
    <Showcase />
  </div>
  <Notes />
  <Keep />
  <Features />
  <FinalCta />
  <Footer />
</main>

<SignupDialog />
<ConsentToast />
