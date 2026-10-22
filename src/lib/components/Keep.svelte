<script lang="ts">
  import { reveal } from '#lib/actions.ts';
  import { avatar } from '#lib/data.ts';
  import { t } from '#lib/i18n.svelte.ts';
  import { prefersReducedMotion, wait } from '#lib/utils.ts';

  const CLIENT_MESSAGE = 'Hi! I found your profile on Explore 👋';
  const REPLY_MESSAGE = 'Thanks! Let’s get started 🙌';
  const TYPE_DELAY_MS = 38;
  const REPLY_PAUSE_MS = 500;
  const PILL_STAGGER_MS = 350;
  const FEE_PILLS = [
    { tone: 'pill-amber', label: 'First order · small referral fee' },
    { tone: 'pill-green', label: 'Every repeat order · 0%' },
  ];
  const SMALL_AVATAR_PX = 80;
  const clientAvatarIds = [13, 26, 38];
  const chatAvatarId = 29;

  const chat = $state({ client: '', reply: '', isClientOn: false, isReplyOn: false, isCaretShown: true, pillsShown: 0 });

  const typeInto = async (field: 'client' | 'reply', text: string) => {
    const delay = prefersReducedMotion() ? 0 : TYPE_DELAY_MS;
    for (const character of Array.from(text)) {
      chat[field] += character;
      await wait(delay);
    }
  };

  /* Chat bubbles type themselves when the referral row scrolls in. */
  const playChat = async () => {
    chat.isClientOn = true;
    await typeInto('client', CLIENT_MESSAGE);
    chat.isCaretShown = false;
    await wait(REPLY_PAUSE_MS);
    chat.isReplyOn = true;
    await typeInto('reply', REPLY_MESSAGE);
    for (let pill = 0; pill < FEE_PILLS.length; pill++) {
      await wait(PILL_STAGGER_MS);
      chat.pillsShown++;
    }
  };
</script>

<div class="panel panel-light">
  <section class="keep" id="keep" data-theme="light">
    <h2 class="keep-title" use:reveal>
      <span class="muted">{t('keep.a')}</span><br />
      <span class="scribble-wrap"><span>{t('keep.b')}</span>
        <svg class="scribble" viewBox="0 0 120 14" preserveAspectRatio="none" aria-hidden="true"><path d="M3 9c22-4 52-6 114-3" /></svg></span>
    </h2>

    <div class="k-row" use:reveal>
      <div class="k-art art-own">
        <div class="own-client">
          <span class="stack">{#each clientAvatarIds as avatarId (avatarId)}<img src={avatar(avatarId, SMALL_AVATAR_PX)} alt="" />{/each}</span>
          <span>Your client</span>
        </div>
        <svg class="own-arrow" viewBox="0 0 200 120" aria-hidden="true"><path class="draw" d="M32 6c-6 50 20 90 130 92" /><path class="draw head" d="m150 86 14 12-14 10" /></svg>
        <div class="own-zero">0<small>%</small></div>
      </div>
      <div class="k-text">
        <h3><span>{t('k1.a')}</span> <span class="shine">{t('k1.b')}</span></h3>
        <p>{t('k1.p')}</p>
        <a class="k-link" href="#features"><span>{t('k1.link')}</span> <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9 6 6 6-6 6"/></svg></a>
      </div>
    </div>

    <div class="k-row" use:reveal={playChat}>
      <div class="k-art art-ref">
        <div class="chat-line them">
          <img src={avatar(chatAvatarId, SMALL_AVATAR_PX)} alt="" />
          <div class="bubble" class:on={chat.isClientOn}><span class="typed">{chat.client}</span>{#if chat.isCaretShown}<i class="caret"></i>{/if}</div>
        </div>
        <div class="chat-line me"><div class="bubble" class:on={chat.isReplyOn}><span class="typed">{chat.reply}</span></div></div>
        <div class="fee-pills">
          {#each FEE_PILLS as pill, index (pill.label)}<span class="pill {pill.tone}" class:on={index < chat.pillsShown}>{pill.label}</span>{/each}
        </div>
      </div>
      <div class="k-text">
        <h3><span>{t('k2.a')}</span><br /><span class="shine">{t('k2.b')}</span></h3>
        <p>{t('k2.p')}</p>
      </div>
    </div>
  </section>
</div>
