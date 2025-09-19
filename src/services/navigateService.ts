let _navigate: ((path: string) => void) | null = null;

export const setNavigate = (navigateFn: (path: string) => void) => {
  _navigate = navigateFn;
};

export const goTo = (path: string) => {
  if (_navigate) _navigate(path);
};
