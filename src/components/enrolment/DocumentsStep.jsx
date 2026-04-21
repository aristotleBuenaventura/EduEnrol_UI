import { useMemo } from 'react'
import { IconUpload } from '../icons/NavIcons.jsx'

function RequiredMark() {
  return (
    <span className="parent-enrol__required" aria-hidden="true">
      {' '}
      *
    </span>
  )
}

const ACCEPTED_FILE_TYPES = '.pdf,.jpg,.jpeg,.png'

/**
 * @param {object} props
 * @param {object} props.value
 * @param {(patch: object) => void} props.onChange
 */
function DocumentsStep({ value, onChange }) {
  const patch = (updates) => onChange({ ...value, ...updates })

  const uploadFields = useMemo(
    () => [
      {
        key: 'birthCertificate',
        title: 'Birth Certificate',
        hint: 'Upload a copy of the birth certificate or passport',
        required: true,
      },
      {
        key: 'proofOfAddress',
        title: 'Proof of Address',
        hint: 'Utility bill or bank statement showing current address',
        required: true,
      },
      {
        key: 'immunisationRecords',
        title: 'Immunisation Records',
        hint: 'Health immunisation certificate',
        required: false,
      },
      {
        key: 'visaDocuments',
        title: 'Visa/Immigration Documents',
        hint: 'If applicable',
        required: false,
      },
    ],
    []
  )

  const onFileChange = (key, files) => {
    const file = files?.[0] ?? null
    patch({ [key]: file })
  }

  return (
    <>
      <h2 className="parent-enrol__section-title">Documents</h2>
      <p className="parent-enrol__section-desc">Upload required documents</p>

      <div className="parent-enrol__fields">
        {uploadFields.map((field) => {
          const file = value[field.key]
          const inputId = `enrol-doc-${field.key}`
          return (
            <div key={field.key}>
              <label className="parent-enrol__field-label" htmlFor={inputId}>
                {field.title}
                {field.required ? <RequiredMark /> : null}
              </label>
              <span className="parent-enrol__field-hint">{field.hint}</span>
              <label
                className="parent-enrol__upload"
                htmlFor={inputId}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  e.preventDefault()
                  onFileChange(field.key, e.dataTransfer.files)
                }}
              >
                <input
                  id={inputId}
                  className="parent-enrol__upload-input"
                  type="file"
                  accept={ACCEPTED_FILE_TYPES}
                  onChange={(e) => onFileChange(field.key, e.target.files)}
                />
                <span className="parent-enrol__upload-icon" aria-hidden="true">
                  <IconUpload width={26} height={26} />
                </span>
                <span className="parent-enrol__upload-title">Click to upload or drag and drop</span>
                <span className="parent-enrol__upload-subtitle">PDF, JPG, PNG (max 10MB)</span>
                {file ? <span className="parent-enrol__upload-file">{file.name}</span> : null}
              </label>
            </div>
          )
        })}
      </div>
    </>
  )
}

export default DocumentsStep
