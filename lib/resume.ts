import { CERTIFICATIONS, EDUCATION, EXPERIENCE, PROFILE, PROJECTS, SKILLS } from '@/lib/data'

/** Generates a plain-text resume from the portfolio data and triggers a download. */
export function downloadResume() {
  const line = '='.repeat(56)
  const parts: string[] = []

  parts.push(PROFILE.name)
  parts.push(PROFILE.role)
  parts.push(line)
  parts.push(`Location : ${PROFILE.location}`)
  parts.push(`Email    : ${PROFILE.email}`)
  parts.push(`Phone    : ${PROFILE.phone}`)
  parts.push(`Languages: ${PROFILE.languages.join(', ')}`)
  parts.push('')
  parts.push('PROFILE')
  parts.push(PROFILE.intro)
  parts.push('')
  parts.push('EDUCATION')
  parts.push(`${EDUCATION.degree} - ${EDUCATION.field}`)
  parts.push(`${EDUCATION.institution} ${EDUCATION.institutionSub}`)
  parts.push('')
  parts.push('TECHNICAL SKILLS')
  SKILLS.forEach((s) => parts.push(`- ${s.title}: ${s.skills.join(', ')}`))
  parts.push('')
  parts.push('PROJECTS')
  PROJECTS.forEach((p) => {
    parts.push(`* ${p.title} (${p.category})`)
    parts.push(`  ${p.description}`)
    parts.push(`  Tech: ${p.technologies.join(', ')}`)
  })
  parts.push('')
  parts.push('EXPERIENCE')
  EXPERIENCE.forEach((e) => parts.push(`- ${e.role} @ ${e.company}`))
  parts.push('')
  parts.push('CERTIFICATIONS')
  CERTIFICATIONS.forEach((c) => parts.push(`- ${c.title} (${c.provider})`))
  parts.push('')
  parts.push(line)

  const blob = new Blob([parts.join('\n')], { type: 'text/plain;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'Mohamed_Farhan_P_Resume.txt'
  document.body.appendChild(a)
  a.click()
  a.remove()
  URL.revokeObjectURL(url)
}
