/**
 * @param {string} [fullName]
 * @returns {string} First word for “Kia ora …” greeting
 */
export function caregiverFirstName(fullName) {
  const t = typeof fullName === 'string' ? fullName.trim() : ''
  if (!t) return 'there'
  return t.split(/\s+/)[0] ?? t
}

/**
 * @param {{ caregiverFirstName: string, studentName: string, applicationId: string }} p
 */
export function buildRequestInfoEmailBody({ caregiverFirstName, studentName, applicationId }) {
  return `Kia ora ${caregiverFirstName},

Thank you for submitting an enrolment application for ${studentName} (${applicationId}).

To proceed with the review, we need the following additional information:

•
•
•

Please reply to this email with the requested details at your earliest convenience.

Ngā mihi,
Senior Leadership Team`
}
