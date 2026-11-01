import { ExternalLink, GitFork } from 'lucide-react'
import { profile } from '../data/profile'
import { otherRepos } from '../data/projects'
import { useGithubData } from '../hooks/useGithubData'
import { Reveal, Section, SectionHeading } from './Shared'
import { GithubIcon } from './icons'

const curated = new Map(otherRepos.map((r) => [r.url.split('/').pop()!.toLowerCase(), r.description]))

const langColor: Record<string, string> = {
  Python: '#3572A5', TypeScript: '#3178c6', JavaScript: '#d9bf2b', 'Jupyter Notebook': '#DA5B0B', HTML: '#e34c26', CSS: '#563d7c', Java: '#b07219', PHP: '#4F5D95',
}

function Skeleton() {
  return (
    <div className="grid gap-4 sm:grid-cols-2" aria-busy="true" aria-label="Loading GitHub data">
      {[0, 1, 2, 3].map((i) => <div key={i} className="skeleton h-32" />)}
    </div>
  )
}

export default function GithubActivity() {
  const gh = useGithubData(profile.githubUser)

  return (
    <Section id="github">
      <SectionHeading index="06" label="Open source" title="Code, collaboration,|and continuous learning." />

      <Reveal>
        {gh.status === 'loading' && <Skeleton />}

        {gh.status === 'ok' && (
          <>
            <div className="mb-8 grid gap-4 sm:grid-cols-[auto_1fr]">
              <div className="glass flex items-center gap-5 rounded-3xl p-6">
                <span className="iridescent grid h-14 w-14 place-items-center rounded-full text-ink"><GithubIcon size={26} /></span>
                <div>
                  <p className="font-display text-5xl font-medium leading-none text-iridescent">{gh.user.public_repos}</p>
                  <p className="kicker mt-2 !text-[0.64rem] !text-mute">Public repositories</p>
                </div>
              </div>
              <div className="glass rounded-3xl p-6">
                <p className="kicker !text-[0.64rem] !text-mute">Languages across repositories</p>
                {gh.languages.length === 0 ? (
                  <p className="mt-2 text-sm text-mute">No language data reported.</p>
                ) : (
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {gh.languages.map(([l, n]) => (
                      <li key={l} className="chip flex items-center gap-1.5"><span className="h-2 w-2 rounded-full" style={{ background: langColor[l] ?? '#94a3b8' }} />{l} · {n}</li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
            <p className="mb-4 font-mono text-xs text-mute">Recently updated · live from the GitHub API{gh.cached ? ' (cached for 15 min)' : ''}</p>
            <ul className="grid gap-4 sm:grid-cols-2">
              {[...gh.repos]
                .sort((a, b) => Number(!!(curated.get(b.name.toLowerCase()) || b.description)) - Number(!!(curated.get(a.name.toLowerCase()) || a.description)))
                .slice(0, 6)
                .map((r) => (
                  <li key={r.name} className="paper flex flex-col p-6 transition duration-300 hover:-translate-y-1 hover:border-rose/40">
                    <div className="flex items-start justify-between gap-3">
                      <a href={r.html_url} target="_blank" rel="noopener noreferrer" className="link-underline font-display text-xl font-medium">{r.name}</a>
                      {r.language && <span className="flex items-center gap-1.5 font-mono text-[0.68rem] text-mute"><span className="h-2 w-2 rounded-full" style={{ background: langColor[r.language] ?? '#94a3b8' }} />{r.language}</span>}
                    </div>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-mute">{r.description ?? curated.get(r.name.toLowerCase()) ?? ''}</p>
                    <p className="mt-3 font-mono text-[0.65rem] text-mute/70">Updated {new Date(r.pushed_at).toLocaleDateString('en-IN', { month: 'short', year: 'numeric' })}</p>
                  </li>
                ))}
            </ul>
          </>
        )}

        {gh.status === 'error' && (
          <>
            <p className="mb-4 flex items-center gap-2 text-sm text-mute">
              <GitFork size={14} aria-hidden="true" />Live GitHub data is unavailable right now (the API may be rate-limited). Showing verified repositories instead.
            </p>
            <ul className="grid gap-4 sm:grid-cols-2">
              {otherRepos.map((r) => (
                <li key={r.name} className="paper flex flex-col p-6">
                  <a href={r.url} target="_blank" rel="noopener noreferrer" className="link-underline font-display w-fit text-xl font-medium">{r.name}</a>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-mute">{r.description}</p>
                  <div className="mt-3 flex flex-wrap gap-1.5">{r.stack.map((s) => <span key={s} className="chip">{s}</span>)}</div>
                </li>
              ))}
            </ul>
          </>
        )}
      </Reveal>

      <Reveal className="mt-10">
        <div className="flex flex-wrap items-center gap-4">
          <a href={profile.github} target="_blank" rel="noopener noreferrer" className="btn btn-solid"><GithubIcon size={16} />Explore my GitHub<ExternalLink size={14} aria-hidden="true" /></a>
          <span className="max-w-md text-xs leading-relaxed text-mute">The contribution graph lives on GitHub; it isn't reproduced here so nothing on this page can go stale.</span>
        </div>
      </Reveal>
    </Section>
  )
}
