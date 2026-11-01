import {
  siPython, siJavascript, siFlask, siDjango, siFastapi, siTensorflow, siScikitlearn,
  siLangchain, siOllama, siPandas, siNumpy, siMysql, siMongodb, siPostgresql, siGit,
  siDocker, siPytest, siLinux, siPostman, siGithub,
} from 'simple-icons'
import { Code2, BarChart3, type LucideIcon } from 'lucide-react'
import type { CategoryId } from '../data/skills'

const brand: Record<string, { path: string; hex: string }> = {
  python: siPython, javascript: siJavascript, flask: siFlask, django: siDjango, fastapi: siFastapi,
  tensorflow: siTensorflow, scikitlearn: siScikitlearn, langchain: siLangchain, ollama: siOllama,
  pandas: siPandas, numpy: siNumpy, mysql: siMysql, mongodb: siMongodb, postgresql: siPostgresql,
  git: siGit, docker: siDocker, pytest: siPytest, linux: siLinux, postman: siPostman,
}

export function BrandIcon({ name, size = 20 }: { name: string; size?: number }) {
  const i = brand[name]
  if (!i) return null
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">
      <path d={i.path} />
    </svg>
  )
}

export function GithubIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">
      <path d={siGithub.path} />
    </svg>
  )
}

export function LinkedInIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
    </svg>
  )
}

const fallback: Partial<Record<CategoryId, LucideIcon>> = { data: BarChart3 }

export function SkillIcon({ icon, cat, size = 20 }: { icon?: string; cat: CategoryId; size?: number }) {
  if (icon && brand[icon]) return <BrandIcon name={icon} size={size} />
  const Fallback = fallback[cat] ?? Code2
  return <Fallback size={size} aria-hidden="true" />
}
