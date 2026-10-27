// Shared Tailwind classes for the admin pages, so every form and card looks the same.
export const ui = {
  card: 'rounded-2xl border border-line bg-paper p-6 shadow-[0_1px_2px_rgba(20,24,33,.04)]',
  heading: 'text-lg font-semibold tracking-[-.01em]',
  label: 'flex flex-col gap-1.5 text-sm font-medium text-ink-2',
  input:
    'rounded-lg border border-line bg-paper px-3 py-2 text-[15px] font-normal text-ink outline-none transition-colors focus:border-blue disabled:bg-soft',
  checkbox: 'flex items-center gap-2 text-sm text-ink-2',
  primary:
    'inline-flex items-center justify-center rounded-full bg-dark px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#2a3142] disabled:opacity-50',
  secondary:
    'inline-flex items-center justify-center rounded-full border border-line bg-paper px-4 py-2 text-sm font-medium text-ink transition-colors hover:bg-soft disabled:opacity-50',
  danger:
    'inline-flex items-center justify-center rounded-full border border-[#f1c9c9] bg-paper px-4 py-2 text-sm font-medium text-[#b42318] transition-colors hover:bg-[#fdf0f0] disabled:opacity-50',
  dangerLink: 'text-sm text-[#b42318] hover:underline',
  muted: 'text-sm text-ink-2',
  error: 'rounded-lg bg-[#fdf0f0] px-3 py-2 text-sm text-[#b42318]',
  success: 'rounded-lg bg-ok-bg px-3 py-2 text-sm text-ok',
  badgeOn: 'rounded-full bg-ok-bg px-2.5 py-0.5 text-xs font-medium text-ok',
  badgeOff: 'rounded-full bg-soft px-2.5 py-0.5 text-xs font-medium text-ink-2',
  badgeWarn: 'rounded-full bg-warn-bg px-2.5 py-0.5 text-xs font-medium text-warn',
};
