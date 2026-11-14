export function getPortfolioItem(key: string) {
  return localStorage.getItem(key);
}

export function setPortfolioItem(key: string, value: string) {
  localStorage.setItem(key, value);
}
