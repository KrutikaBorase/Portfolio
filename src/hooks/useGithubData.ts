import { useEffect, useState } from 'react'

export interface GhRepo {
  name: string
  description: string | null
  html_url: string
  language: string | null
  fork: boolean
  pushed_at: string
  homepage: string | null
}
export interface GhUser { public_repos: number; avatar_url: string; html_url: string }

type State =
  | { status: 'loading' }
  | { status: 'ok'; user: GhUser; repos: GhRepo[]; languages: [string, number][]; cached: boolean }
  | { status: 'error' }

const TTL = 15 * 60 * 1000

/** Reads public GitHub data from the browser (unauthenticated, no token) and caches it for 15 minutes. */
export function useGithubData(username: string): State {
  const [state, setState] = useState<State>({ status: 'loading' })

  useEffect(() => {
    const key = `gh:${username}`
    try {
      const raw = sessionStorage.getItem(key)
      if (raw) {
        const c = JSON.parse(raw)
        if (Date.now() - c.t < TTL) { setState({ status: 'ok', ...c.d, cached: true }); return }
      }
    } catch { /* storage unavailable */ }

    const ctrl = new AbortController()
    ;(async () => {
      try {
        const [u, r] = await Promise.all([
          fetch(`https://api.github.com/users/${username}`, { signal: ctrl.signal }),
          fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=pushed`, { signal: ctrl.signal }),
        ])
        if (!u.ok || !r.ok) throw new Error('github api')
        const user = (await u.json()) as GhUser
        const repos = ((await r.json()) as GhRepo[]).filter((x) => !x.fork)
        const counts = new Map<string, number>()
        repos.forEach((x) => x.language && counts.set(x.language, (counts.get(x.language) ?? 0) + 1))
        const languages = [...counts.entries()].sort((a, b) => b[1] - a[1])
        const d = { user, repos, languages }
        try { sessionStorage.setItem(key, JSON.stringify({ t: Date.now(), d })) } catch { /* ignore */ }
        setState({ status: 'ok', ...d, cached: false })
      } catch (e) {
        if ((e as Error).name !== 'AbortError') setState({ status: 'error' })
      }
    })()
    return () => ctrl.abort()
  }, [username])

  return state
}
