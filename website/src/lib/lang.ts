export type Lang = 'en' | 'zh';

const BASE_PATH = '/awesome-auto-research-hub'.replace(/\/$/, '');

function stripBasePath(path: string): string {
  if (!BASE_PATH) return path;
  if (path === BASE_PATH) return '/';
  if (path.startsWith(`${BASE_PATH}/`)) return path.slice(BASE_PATH.length) || '/';
  return path;
}

export function getLang(url: URL): Lang {
  const pathname = stripBasePath(url.pathname);
  const match = pathname.match(/^\/(en|zh)(\/|$)/);
  if (match) return match[1] as Lang;
  return 'en';
}

export function localizePath(path: string, lang: Lang): string {
  const withoutBase = stripBasePath(path);
  const clean = withoutBase.replace(/^\/(en|zh)(\/|$)/, '/');
  const normalized = clean.startsWith('/') ? clean : `/${clean}`;
  const suffix = normalized === '/' ? '' : normalized;
  return `${BASE_PATH}/${lang}${suffix}`;
}

export function assetPath(path: string): string {
  if (!path || !BASE_PATH) return path;
  if (/^(https?:)?\/\//.test(path) || path.startsWith('data:') || path.startsWith('#')) {
    return path;
  }
  if (path.startsWith(`${BASE_PATH}/`)) return path;
  return path.startsWith('/') ? `${BASE_PATH}${path}` : path;
}

export function unbasePath(path: string): string {
  return stripBasePath(path);
}

export function alternateLang(lang: Lang): Lang {
  return lang === 'en' ? 'zh' : 'en';
}
