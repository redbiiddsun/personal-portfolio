<script lang="ts">
  import { onMount } from 'svelte';
  import '#lib/style.css';
  import { OWNER, SITE_DESCRIPTION, SITE_URL, skills, socials } from '#lib/data.ts';
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

  const PAGE_TITLE = `${OWNER.name} · ${OWNER.title}`;
  const PAGE_URL = `${SITE_URL}/`;
  const OG_IMAGE = `${SITE_URL}/og.jpg`;
  const OG_IMAGE_WIDTH = 1200;
  const OG_IMAGE_HEIGHT = 630;
  const OG_IMAGE_ALT = `${PAGE_TITLE}: portfolio hero`;
  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: OWNER.name,
    alternateName: OWNER.nickname,
    jobTitle: OWNER.title,
    url: PAGE_URL,
    image: `${SITE_URL}/logo.webp`,
    email: `mailto:${OWNER.email}`,
    sameAs: socials.filter((social) => social.isExternal).map((social) => social.url),
    knowsAbout: skills,
  };
  // Escape `<` so the JSON can't close the tag; the closing tag is split so Svelte doesn't end this block.
  const personJsonLd = `<script type="application/ld+json">${JSON.stringify(personSchema).replace(/</g, '\\u003c')}<${'/'}script>`;

  onMount(restoreLang);
</script>

<svelte:head>
  <title>{PAGE_TITLE}</title>
  <meta name="description" content={SITE_DESCRIPTION} />
  <link rel="canonical" href={PAGE_URL} />
  <meta property="og:type" content="profile" />
  <meta property="og:url" content={PAGE_URL} />
  <meta property="og:title" content={PAGE_TITLE} />
  <meta property="og:description" content={SITE_DESCRIPTION} />
  <meta property="og:image" content={OG_IMAGE} />
  <meta property="og:image:width" content={String(OG_IMAGE_WIDTH)} />
  <meta property="og:image:height" content={String(OG_IMAGE_HEIGHT)} />
  <meta property="og:image:alt" content={OG_IMAGE_ALT} />
  <meta property="og:locale" content="en_US" />
  <meta property="og:locale:alternate" content="th_TH" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content={PAGE_TITLE} />
  <meta name="twitter:description" content={SITE_DESCRIPTION} />
  <meta name="twitter:image" content={OG_IMAGE} />
  <meta name="twitter:image:alt" content={OG_IMAGE_ALT} />
  {@html personJsonLd}
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

