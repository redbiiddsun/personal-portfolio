<script lang="ts">
  import { onMount } from 'svelte';
  import '#lib/style.css';
  import { OWNER } from '#lib/data.ts';
  import { restoreLang } from '#lib/i18n.svelte.ts';
  import Features from '#lib/components/Features.svelte';
  import FinalCta from '#lib/components/FinalCta.svelte';
  import Footer from '#lib/components/Footer.svelte';
  import Experience from '#lib/components/Experience.svelte';
  import Hero from '#lib/components/Hero.svelte';
  import Intro from '#lib/components/Intro.svelte';
  import Keep from '#lib/components/Keep.svelte';
  import Nav from '#lib/components/Nav.svelte';
  import People from '#lib/components/People.svelte';
  import Showcase from '#lib/components/Showcase.svelte';

  let heroCardElements: HTMLElement[] = $state([]);

  onMount(restoreLang);
</script>

<svelte:head>
  <title>{OWNER.name} · {OWNER.title}</title>
  <meta name="description" content="{OWNER.name} ({OWNER.nickname}), a full-stack developer building web apps, APIs and mobile apps end to end." />
</svelte:head>

<Intro cards={heroCardElements} />
<Nav />

<main>
  <div class="panel panel-light panel-top">
    <Hero bind:cards={heroCardElements} />
    <People />
    <Showcase />
  </div>
  <Experience />
  <Keep />
  <Features />
  <FinalCta />
  <Footer />
</main>

