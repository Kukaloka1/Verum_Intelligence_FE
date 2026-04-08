import { ROUTES } from "@/lib/constants/routes";

export const LEGACY_AUTH_DASHBOARD_PATH = "/auth/dashboard";

const PRODUCT_DESTINATIONS = new Set<string>([
  ROUTES.dashboard,
  ROUTES.query,
  ROUTES.comparison,
  ROUTES.toolkit,
  ROUTES.workspace,
  ROUTES.profile
]);

function isSafeInternalPath(value: string): boolean {
  return value.startsWith("/") && !value.startsWith("//");
}

function splitPathAndSuffix(raw: string) {
  const match = raw.match(/^([^?#]+)([?#].*)?$/);

  if (!match) {
    return { pathname: raw, suffix: "" };
  }

  return {
    pathname: match[1],
    suffix: match[2] ?? ""
  };
}

export function getPostAuthRedirect(candidate?: string | null): string {
  if (!candidate) {
    return ROUTES.postAuthHome;
  }

  const trimmed = candidate.trim();
  const { pathname, suffix } = splitPathAndSuffix(trimmed);

  if (pathname === LEGACY_AUTH_DASHBOARD_PATH) {
    return ROUTES.postAuthHome;
  }

  if (!isSafeInternalPath(pathname)) {
    return ROUTES.postAuthHome;
  }

  if (pathname.startsWith("/auth/")) {
    return ROUTES.postAuthHome;
  }

  if (!PRODUCT_DESTINATIONS.has(pathname)) {
    return ROUTES.postAuthHome;
  }

  return `${pathname}${suffix}`;
}
