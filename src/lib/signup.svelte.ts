/** Shared so any "Get started" button can open the one sign-up dialog. */
export const signup = $state({ isOpen: false });

export const openSignup = () => {
  signup.isOpen = true;
};
