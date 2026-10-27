<script lang="ts">
  import '#lib/style.css';
  import { goto } from '$app/navigation';
  import { page } from '$app/state';
  import {
    ADMIN_HOME_PATH,
    adminApi,
    adminSession,
    LOGIN_PATH,
    PASSWORD_PATH,
    type Admin,
    type Site,
  } from '#lib/admin/api.ts';
  import {
    parseSiteSection,
    SECTION_PARAM,
    SITE_ID_PARAM,
    SITE_PATH,
    SITE_SECTIONS,
    siteHref,
  } from '#lib/admin/site-sections.ts';
  import { LOGO_SRC, OWNER } from '#lib/data.ts';

  let { children } = $props();

  const isLoginPage = $derived(page.url.pathname === LOGIN_PATH);
  const currentSiteId = $derived(page.url.pathname === SITE_PATH ? page.url.searchParams.get(SITE_ID_PARAM) : null);
  const currentSection = $derived(parseSiteSection(page.url.searchParams.get(SECTION_PARAM)));

  let isReady = $state(false);
  let isMenuOpen = $state(false);
  let admin: Admin | null = $state(null);
  let sites: Site[] = $state([]);

  // Every page except login needs a session; without one, go to login before rendering anything.
  $effect(() => {
    isReady = isLoginPage || Boolean(adminSession.token);
    if (!isReady) goto(LOGIN_PATH, { replaceState: true });
  });

  $effect(() => {
    if (isLoginPage || !isReady) return;
    adminApi
      .me()
      .then(({ admin: currentAdmin }) => (admin = currentAdmin))
      .catch(() => {});
  });

  // Refetched on every navigation, so sites created or deleted on a page show up here.
  $effect(() => {
    void page.url.href;
    isMenuOpen = false;
    if (isLoginPage || !isReady) return;
    adminApi
      .listSites()
      .then((loadedSites) => (sites = loadedSites))
      .catch(() => {});
  });

  async function logout() {
    // Sign out locally even if the server call fails.
    await adminApi.logout().catch(() => {});
    adminSession.clear();
    admin = null;
    sites = [];
    await goto(LOGIN_PATH, { replaceState: true });
  }

  const navItemClasses = (isActive: boolean) => [
    'flex items-center gap-2.5 rounded-full px-3.5 py-2 text-sm no-underline transition-colors',
    isActive ? 'bg-white/10 text-white' : 'text-on-dark-2 hover:bg-white/5 hover:text-on-dark',
  ];

  const subNavItemClasses = (isActive: boolean) => [
    'rounded-full px-3 py-1.5 text-[13px] no-underline transition-colors',
    isActive ? 'bg-blue/20 text-white' : 'text-on-dark-2 hover:bg-white/5 hover:text-on-dark',
  ];
</script>

<svelte:head>
  <title>Admin · {OWNER.nickname}</title>
  <meta name="robots" content="noindex, nofollow" />
</svelte:head>

{#snippet brand()}
  <a
    href={ADMIN_HOME_PATH}
    class="inline-flex items-center gap-2 font-semibold tracking-[-.02em] text-white no-underline"
  >
    <img class="size-7.5" src={LOGO_SRC} alt="" width="30" height="30" />
    <span class="text-[19px]">{OWNER.nickname}</span>
    <span class="font-hand -rotate-3 text-[17px] font-normal text-blue-pale">admin</span>
  </a>
{/snippet}

{#if isLoginPage}
  <div class="min-h-screen bg-dark px-4 py-[10vh] text-ink">
    <div class="mb-8 flex justify-center">{@render brand()}</div>
    {@render children()}
  </div>
{:else if isReady}
  <div class="min-h-screen bg-soft text-ink lg:pl-64">
    <!-- Mobile top bar -->
    <header class="sticky top-0 z-30 flex items-center justify-between bg-dark px-4 py-3 lg:hidden">
      {@render brand()}
      <button
        type="button"
        class="rounded-full px-3 py-1.5 text-sm text-on-dark hover:bg-white/10"
        aria-expanded={isMenuOpen}
        aria-controls="admin-sidebar"
        onclick={() => (isMenuOpen = !isMenuOpen)}>Menu</button
      >
    </header>

    {#if isMenuOpen}
      <button
        type="button"
        class="fixed inset-0 z-40 bg-dark/50 lg:hidden"
        aria-label="Close menu"
        onclick={() => (isMenuOpen = false)}
      ></button>
    {/if}

    <aside
      id="admin-sidebar"
      class={[
        'fixed inset-y-0 left-0 z-50 flex w-64 flex-col bg-dark text-on-dark transition-transform duration-300 ease-smooth lg:translate-x-0',
        isMenuOpen ? 'translate-x-0' : '-translate-x-full',
      ]}
    >
      <div class="px-5 pt-6 pb-8">{@render brand()}</div>

      <nav class="flex min-h-0 flex-1 flex-col gap-1 overflow-y-auto px-3" aria-label="Admin">
        <a href={ADMIN_HOME_PATH} class={navItemClasses(page.url.pathname === ADMIN_HOME_PATH)}>All sites</a>

        {#if sites.length > 0}
          <p class="mt-5 mb-1 px-3.5 text-xs font-medium tracking-wider text-on-dark-3 uppercase">Sites</p>
          {#each sites as site (site.id)}
            {@const isCurrent = currentSiteId === site.id}
            <a
              href={siteHref(site.id)}
              class={navItemClasses(isCurrent)}
              title={site.name}
              aria-current={isCurrent ? 'true' : undefined}
            >
              <span class={['size-1.5 shrink-0 rounded-full', site.registrationOpen ? 'bg-[#4ade80]' : 'bg-on-dark-3']}
              ></span>
              <span class="truncate">{site.name}</span>
            </a>
            {#if isCurrent}
              <div
                class="mb-1 ml-[22px] flex flex-col gap-0.5 border-l border-white/10 pl-2"
                role="group"
                aria-label={site.name}
              >
                {#each SITE_SECTIONS as section (section.id)}
                  <a
                    href={siteHref(site.id, section.id)}
                    class={subNavItemClasses(currentSection === section.id)}
                    aria-current={currentSection === section.id ? 'page' : undefined}>{section.label}</a
                  >
                {/each}
              </div>
            {/if}
          {/each}
        {/if}
      </nav>

      <div class="border-t border-white/10 p-3">
        <a href={PASSWORD_PATH} class={navItemClasses(page.url.pathname === PASSWORD_PATH)}>Change password</a>
        <button type="button" class={[navItemClasses(false), 'w-full text-left']} onclick={logout}>Log out</button>
        {#if admin}<p class="mt-2 truncate px-3.5 text-xs text-on-dark-3">
            {admin.email}
          </p>{/if}
      </div>
    </aside>

    <main class="mx-auto max-w-5xl px-4 py-8 lg:px-10 lg:py-10">
      {@render children()}
    </main>
  </div>
{/if}
