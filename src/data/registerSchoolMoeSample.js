/**
 * Demo “MOE zoning database” records for Register School search.
 *
 * Edit `MOE_SAMPLE_SCHOOLS` to change which schools appear in results.
 * Adjust `searchMoeSampleSchools` if you need different matching rules (e.g. API-backed search later).
 */

/** @typedef {{ id: string, name: string, location: string, moeNumber: string }} MoeSampleSchool */

/** @type {MoeSampleSchool[]} */
export const MOE_SAMPLE_SCHOOLS = [
  { id: 'auckland-grammar', name: 'Auckland Grammar School', location: 'Auckland', moeNumber: '67' },
  { id: 'wellington-college', name: 'Wellington College', location: 'Wellington', moeNumber: '266' },
  { id: 'christchurch-boys', name: 'Christchurch Boys High School', location: 'Christchurch', moeNumber: '331' },
  { id: 'mount-albert-grammar', name: 'Mount Albert Grammar School', location: 'Auckland', moeNumber: '92' },
  { id: 'epsom-girls', name: 'Epsom Girls Grammar School', location: 'Auckland', moeNumber: '74' },
  { id: 'rangitoto', name: 'Rangitoto College', location: 'Auckland', moeNumber: '113' },
  { id: 'burnside', name: 'Burnside High School', location: 'Christchurch', moeNumber: '328' },
  { id: 'otago-boys', name: 'Otago Boys High School', location: 'Dunedin', moeNumber: '376' },
]

/** Queries that always return no results (for testing empty / error UI). */
const NO_MATCH_TRIGGERS = ['nothing', 'noresult']

/**
 * Typing this as the whole search box returns every sample school (useful for demos / QA).
 * Change or remove if you wire a real API.
 */
export const MOE_SEARCH_SHOW_ALL_TRIGGER = '*'

/**
 * @param {string} queryTrimmed - trimmed user input
 * @returns {{ results: MoeSampleSchool[], noMatch: boolean }}
 */
export function searchMoeSampleSchools(queryTrimmed) {
  const q = queryTrimmed.trim()
  if (!q) {
    return { results: [], noMatch: true }
  }

  const lower = q.toLowerCase()
  if (NO_MATCH_TRIGGERS.some((t) => lower.includes(t))) {
    return { results: [], noMatch: true }
  }

  if (q === MOE_SEARCH_SHOW_ALL_TRIGGER || lower === 'all schools') {
    return { results: [...MOE_SAMPLE_SCHOOLS], noMatch: false }
  }

  const tokens = lower.split(/\s+/).filter((t) => t.length >= 2)
  if (tokens.length === 0) {
    return { results: [], noMatch: true }
  }

  const results = MOE_SAMPLE_SCHOOLS.filter((row) => {
    const haystack = `${row.name} ${row.location} ${row.moeNumber}`.toLowerCase()
    return tokens.some((t) => haystack.includes(t))
  })

  return { results, noMatch: results.length === 0 }
}
