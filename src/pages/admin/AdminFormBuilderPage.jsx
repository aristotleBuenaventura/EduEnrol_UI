import { useState } from 'react'
import { IconChevronRight, IconPencil, IconSave } from '../../components/icons/NavIcons.jsx'

const questionTypeOptions = [
  'Short Text',
  'Long Text',
  'Dropdown',
  'Radio Buttons',
  'Checkboxes',
  'Date Picker',
  'File Upload',
  'Address',
  'Phone',
  'Email',
  'Yes/No',
]

const formPages = [
  {
    id: 'page-1',
    title: 'Page 1: Student Details',
    pageTitle: 'Student Details',
    pageDescription: 'Basic information about the student',
    enabled: true,
    questions: [
      { id: 'q-1', label: 'First Name', type: 'Short Text', required: true },
      { id: 'q-2', label: 'Middle Name(s)', type: 'Short Text', required: false },
      { id: 'q-3', label: 'Last Name', type: 'Short Text', required: true },
      { id: 'q-4', label: 'Preferred Name', type: 'Short Text', required: false },
      { id: 'q-5', label: 'Date of Birth', type: 'Date Picker', required: true },
      { id: 'q-6', label: 'Gender', type: 'Radio Buttons', required: true },
      { id: 'q-7', label: 'Ethnicity', type: 'Checkboxes', required: true },
      { id: 'q-8', label: 'Year Level', type: 'Dropdown', required: true },
    ],
  },
  {
    id: 'page-2',
    title: 'Page 2: Caregiver Information',
    pageTitle: 'Caregiver Information',
    pageDescription: 'Details of parents/caregivers',
    enabled: true,
    questions: [
      { id: 'q-page-2-1', label: 'Relationship to Student', type: 'Dropdown', required: true },
      { id: 'q-page-2-2', label: 'First Name', type: 'Short Text', required: true },
      { id: 'q-page-2-3', label: 'Last Name', type: 'Short Text', required: true },
      { id: 'q-page-2-4', label: 'Email Address', type: 'Email', required: true },
      { id: 'q-page-2-5', label: 'Phone Number', type: 'Phone', required: true },
      { id: 'q-page-2-6', label: 'Is this the primary contact?', type: 'Yes/No', required: true },
      { id: 'q-page-2-7', label: 'Can this person pick up the student?', type: 'Yes/No', required: true },
    ],
  },
  {
    id: 'page-3',
    title: 'Page 3: Address & Zoning',
    pageTitle: 'Address & Zoning',
    pageDescription: 'Residential address information',
    enabled: true,
    questions: [{ id: 'q-page-3-1', label: 'Home Address', type: 'Address', required: true }],
  },
  {
    id: 'page-4',
    title: 'Page 4: Previous School',
    pageTitle: 'Previous School',
    pageDescription: 'Information about previous schooling',
    enabled: true,
    questions: [
      {
        id: 'q-page-4-1',
        label: 'Has the student attended another school?',
        type: 'Yes/No',
        required: true,
        conditional: false,
      },
      {
        id: 'q-page-4-2',
        label: 'Previous School Name',
        type: 'Short Text',
        required: false,
        conditional: true,
      },
      {
        id: 'q-page-4-3',
        label: 'Reason for Leaving',
        type: 'Long Text',
        required: false,
        conditional: true,
      },
      {
        id: 'q-page-4-4',
        label: 'Last Day Attended',
        type: 'Date Picker',
        required: false,
        conditional: true,
      },
    ],
  },
  {
    id: 'page-5',
    title: 'Page 5: Medical Information',
    pageTitle: 'Medical Information',
    pageDescription: 'Health and medical details',
    enabled: true,
    questions: [
      {
        id: 'q-page-5-1',
        label: 'Does the student have any medical conditions?',
        type: 'Yes/No',
        required: true,
        conditional: false,
      },
      {
        id: 'q-page-5-2',
        label: 'Medical Condition Details',
        type: 'Long Text',
        required: false,
        conditional: true,
      },
      {
        id: 'q-page-5-3',
        label: 'Does the student have any allergies?',
        type: 'Yes/No',
        required: true,
        conditional: false,
      },
      {
        id: 'q-page-5-4',
        label: 'Allergy Details',
        type: 'Long Text',
        required: false,
        conditional: true,
      },
      {
        id: 'q-page-5-5',
        label: 'Current Medications',
        type: 'Long Text',
        required: false,
        conditional: false,
      },
      {
        id: 'q-page-5-6',
        label: 'Doctor/Medical Centre Name',
        type: 'Short Text',
        required: false,
        conditional: false,
      },
      {
        id: 'q-page-5-7',
        label: 'Doctor Phone Number',
        type: 'Phone',
        required: false,
        conditional: false,
      },
      {
        id: 'q-page-5-8',
        label: 'Special Educational Needs',
        type: 'Long Text',
        required: false,
        conditional: false,
      },
    ],
  },
  {
    id: 'page-6',
    title: 'Page 6: Documents',
    pageTitle: 'Documents',
    pageDescription: 'Upload required documents',
    enabled: true,
    questions: [
      { id: 'q-page-6-1', label: 'Birth Certificate', type: 'File Upload', required: true, conditional: false },
      { id: 'q-page-6-2', label: 'Proof of Address', type: 'File Upload', required: true, conditional: false },
      { id: 'q-page-6-3', label: 'Immunisation Records', type: 'File Upload', required: false, conditional: false },
      { id: 'q-page-6-4', label: 'Visa/Immigration Documents', type: 'File Upload', required: false, conditional: false },
    ],
  },
  {
    id: 'page-7',
    title: 'Page 7: Review & Submit',
    pageTitle: 'Review & Submit',
    pageDescription: 'Review your application and submit',
    enabled: true,
    questions: [
      { id: 'q-page-7-1', label: 'I confirm that all information provided is accurate', type: 'Yes/No', required: true },
      { id: 'q-page-7-2', label: "I agree to the school's privacy policy and terms", type: 'Yes/No', required: true },
    ],
  },
]

function IconEye(props) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" {...props}>
      <path d="M2 12s3.6-6 10-6 10 6 10 6-3.6 6-10 6S2 12 2 12Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  )
}

function IconGrip() {
  return (
    <span className="admin-form-builder__grip" aria-hidden="true">
      <span />
      <span />
      <span />
      <span />
      <span />
      <span />
    </span>
  )
}

function IconTrash(props) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
      <path d="M4 7h16M9 7V5h6v2M7.5 7l.8 12.3a1 1 0 0 0 1 .9h5.4a1 1 0 0 0 1-.9L16.5 7" />
      <path d="M10 11.2v5.4M14 11.2v5.4" />
    </svg>
  )
}

function AdminFormBuilderPage() {
  const [pages, setPages] = useState(formPages)
  const [formName, setFormName] = useState('Standard Enrolment Form 2024')
  const [description, setDescription] = useState('Primary school enrolment form for new students')
  const [openPageId, setOpenPageId] = useState(null)
  const [questionEditors, setQuestionEditors] = useState({})

  const handleToggle = (pageId) => {
    setPages((previousPages) =>
      previousPages.map((page) => (page.id === pageId ? { ...page, enabled: !page.enabled } : page)),
    )
  }

  const handlePageExpand = (pageId) => {
    setOpenPageId((previousPageId) => (previousPageId === pageId ? null : pageId))
  }

  const handlePageMetaChange = (pageId, key, value) => {
    setPages((previousPages) => previousPages.map((page) => (page.id === pageId ? { ...page, [key]: value } : page)))
  }

  const handleOpenAddQuestionEditor = (pageId, questionType) => {
    setOpenPageId(pageId)
    setQuestionEditors((previousEditors) => ({
      ...previousEditors,
      [pageId]: {
        mode: 'add',
        questionId: null,
        label: `New ${questionType} Question`,
        helpText: '',
        type: questionType,
        required: false,
      },
    }))
  }

  const handleOpenEditQuestionEditor = (pageId, question) => {
    setOpenPageId(pageId)
    setQuestionEditors((previousEditors) => ({
      ...previousEditors,
      [pageId]: {
        mode: 'edit',
        questionId: question.id,
        label: question.label,
        helpText: question.helpText ?? '',
        type: question.type,
        required: question.required,
      },
    }))
  }

  const handleQuestionEditorChange = (pageId, key, value) => {
    setQuestionEditors((previousEditors) => ({
      ...previousEditors,
      [pageId]: { ...previousEditors[pageId], [key]: value },
    }))
  }

  const handleCloseQuestionEditor = (pageId) => {
    setQuestionEditors((previousEditors) => {
      const nextEditors = { ...previousEditors }
      delete nextEditors[pageId]
      return nextEditors
    })
  }

  const handleSaveQuestionEditor = (pageId) => {
    const editor = questionEditors[pageId]
    if (!editor?.label?.trim()) return

    setPages((previousPages) =>
      previousPages.map((page) =>
        page.id !== pageId
          ? page
          : {
              ...page,
              questions:
                editor.mode === 'edit'
                  ? page.questions.map((question) =>
                      question.id === editor.questionId
                        ? {
                            ...question,
                            label: editor.label.trim(),
                            helpText: editor.helpText,
                            type: editor.type,
                            required: editor.required,
                          }
                        : question,
                    )
                  : [
                      ...page.questions,
                      {
                        id: `${page.id}-q-${Date.now()}`,
                        label: editor.label.trim(),
                        helpText: editor.helpText,
                        type: editor.type,
                        required: editor.required,
                      },
                    ],
            },
      ),
    )

    handleCloseQuestionEditor(pageId)
  }

  const handleDeleteQuestion = (pageId, questionId) => {
    setPages((previousPages) =>
      previousPages.map((page) =>
        page.id === pageId
          ? {
              ...page,
              questions: page.questions.filter((question) => question.id !== questionId),
            }
          : page,
      ),
    )

    setQuestionEditors((previousEditors) => {
      const editor = previousEditors[pageId]
      if (!editor || editor.questionId !== questionId) {
        return previousEditors
      }
      const nextEditors = { ...previousEditors }
      delete nextEditors[pageId]
      return nextEditors
    })
  }

  const handleAddPage = () => {
    const nextPageNumber = pages.length + 1
    const nextPageId = `page-${nextPageNumber}`
    const nextPage = {
      id: nextPageId,
      title: `Page ${nextPageNumber}: New Section`,
      pageTitle: 'New Section',
      pageDescription: 'Add section description',
      enabled: true,
      questions: [],
    }
    setPages((previousPages) => [...previousPages, nextPage])
    setOpenPageId(nextPageId)
  }

  const totalQuestions = pages.reduce((count, page) => count + page.questions.length, 0)

  return (
    <div className="admin-form-builder">
      <header className="admin-form-builder__hero">
        <div>
          <h1 className="admin-form-builder__title">Form Builder</h1>
          <p className="admin-form-builder__subtitle">Customize the enrolment form for your school</p>
        </div>
        <div className="admin-form-builder__actions">
          <button type="button" className="admin-form-builder__btn admin-form-builder__btn--ghost">
            <IconEye />
            <span>Preview</span>
          </button>
          <button type="button" className="admin-form-builder__btn admin-form-builder__btn--primary">
            <IconSave width={15} height={15} />
            <span>Save Form</span>
          </button>
        </div>
      </header>

      <section className="admin-form-builder__panel" aria-label="Form details">
        <div className="admin-form-builder__meta-grid">
          <label className="admin-form-builder__field">
            <span>Form Name</span>
            <input type="text" value={formName} onChange={(event) => setFormName(event.target.value)} />
          </label>
          <label className="admin-form-builder__field">
            <span>Description</span>
            <input type="text" value={description} onChange={(event) => setDescription(event.target.value)} />
          </label>
        </div>

        <div className="admin-form-builder__stats">
          <span>{pages.length} pages</span>
          <span className="admin-form-builder__dot" aria-hidden="true">
            •
          </span>
          <span>{totalQuestions} questions</span>
          <span className="admin-form-builder__dot" aria-hidden="true">
            •
          </span>
          <span className="admin-form-builder__pill">Active</span>
        </div>
      </section>

      <section className="admin-form-builder__pages" aria-label="Form pages">
        {pages.map((page) => {
          const isOpen = openPageId === page.id
          const questionEditor = questionEditors[page.id]

          return (
            <article key={page.id} className={`admin-form-builder__page-card ${isOpen ? 'is-open' : ''}`}>
              <header className="admin-form-builder__page-row" onClick={() => handlePageExpand(page.id)}>
                <div className="admin-form-builder__page-left">
                  <IconGrip />
                  <span
                    className={`admin-form-builder__row-chevron ${isOpen ? 'is-open' : ''}`}
                    aria-hidden="true"
                  >
                    <IconChevronRight width={14} height={14} />
                  </span>
                  <div>
                    <h2>{page.title}</h2>
                    <p>{page.questions.length + (questionEditor?.mode === 'add' ? 1 : 0)} questions</p>
                  </div>
                </div>
                <div className="admin-form-builder__toggle-wrap">
                  <span>Enabled</span>
                  <button
                    type="button"
                    onClick={(event) => {
                      event.stopPropagation()
                      handleToggle(page.id)
                    }}
                    className={`admin-form-builder__toggle ${page.enabled ? 'is-on' : ''}`}
                    aria-pressed={page.enabled}
                    aria-label={`Toggle ${page.title}`}
                  >
                    <span />
                  </button>
                </div>
              </header>

              {isOpen ? (
                <div className="admin-form-builder__page-body" id={`${page.id}-content`}>
                  <div className="admin-form-builder__meta-grid admin-form-builder__meta-grid--page">
                    <label className="admin-form-builder__field">
                      <span>Page Title</span>
                      <input
                        type="text"
                        value={page.pageTitle}
                        onChange={(event) => handlePageMetaChange(page.id, 'pageTitle', event.target.value)}
                      />
                    </label>
                    <label className="admin-form-builder__field">
                      <span>Description</span>
                      <input
                        type="text"
                        value={page.pageDescription}
                        onChange={(event) => handlePageMetaChange(page.id, 'pageDescription', event.target.value)}
                      />
                    </label>
                  </div>

                  <div className="admin-form-builder__question-list">
                    {page.questions.map((question) => {
                      const isEditingQuestion =
                        questionEditor?.mode === 'edit' && questionEditor.questionId === question.id

                      if (isEditingQuestion) {
                        return (
                          <article key={question.id} className="admin-form-builder__new-question">
                            <div className="admin-form-builder__question-left">
                              <IconGrip />
                              <div className="admin-form-builder__new-question-fields">
                                <input
                                  type="text"
                                  value={questionEditor.label}
                                  onChange={(event) => handleQuestionEditorChange(page.id, 'label', event.target.value)}
                                  aria-label="Edit question title"
                                />
                                <input
                                  type="text"
                                  placeholder="Help text (optional)"
                                  value={questionEditor.helpText}
                                  onChange={(event) => handleQuestionEditorChange(page.id, 'helpText', event.target.value)}
                                  aria-label="Edit question help text"
                                />
                              </div>
                            </div>
                            <div className="admin-form-builder__new-question-actions">
                              <button
                                type="button"
                                className={`admin-form-builder__required-toggle ${questionEditor.required ? 'is-on' : ''}`}
                                onClick={() => handleQuestionEditorChange(page.id, 'required', !questionEditor.required)}
                                aria-pressed={questionEditor.required}
                              >
                                <span className="admin-form-builder__required-dot" aria-hidden="true" />
                                <span>Required</span>
                              </button>
                              <button
                                type="button"
                                className="admin-form-builder__done-btn admin-form-builder__done-btn--subtle"
                                onClick={() => handleCloseQuestionEditor(page.id)}
                              >
                                Cancel
                              </button>
                              <button
                                type="button"
                                className="admin-form-builder__done-btn"
                                onClick={() => handleSaveQuestionEditor(page.id)}
                              >
                                Done
                              </button>
                            </div>
                          </article>
                        )
                      }

                      return (
                        <article key={question.id} className="admin-form-builder__question-row">
                          <div className="admin-form-builder__question-left">
                            <IconGrip />
                            <div>
                              <h3>{question.label}</h3>
                              <div className="admin-form-builder__question-tags">
                                <span className="admin-form-builder__tag">{question.type}</span>
                                {question.required ? (
                                  <span className="admin-form-builder__tag admin-form-builder__tag--required">Required</span>
                                ) : null}
                                {question.conditional ? (
                                  <span className="admin-form-builder__tag admin-form-builder__tag--conditional">Conditional</span>
                                ) : null}
                              </div>
                            </div>
                          </div>
                          <div className="admin-form-builder__question-actions">
                            <button
                              type="button"
                              className="admin-form-builder__icon-btn"
                              aria-label={`Edit ${question.label}`}
                              onClick={() => handleOpenEditQuestionEditor(page.id, question)}
                            >
                              <IconPencil width={14} height={14} />
                            </button>
                            <button
                              type="button"
                              className="admin-form-builder__icon-btn admin-form-builder__icon-btn--danger"
                              aria-label={`Delete ${question.label}`}
                              onClick={() => handleDeleteQuestion(page.id, question.id)}
                            >
                              <IconTrash />
                            </button>
                          </div>
                        </article>
                      )
                    })}
                  </div>

                  {questionEditor?.mode === 'add' ? (
                    <article className="admin-form-builder__new-question">
                      <div className="admin-form-builder__question-left">
                        <IconGrip />
                        <div className="admin-form-builder__new-question-fields">
                          <input
                            type="text"
                            value={questionEditor.label}
                            onChange={(event) => handleQuestionEditorChange(page.id, 'label', event.target.value)}
                            aria-label="New question title"
                          />
                          <input
                            type="text"
                            placeholder="Help text (optional)"
                            value={questionEditor.helpText}
                            onChange={(event) => handleQuestionEditorChange(page.id, 'helpText', event.target.value)}
                            aria-label="New question help text"
                          />
                        </div>
                      </div>
                      <div className="admin-form-builder__new-question-actions">
                        <button
                          type="button"
                          className={`admin-form-builder__required-toggle ${questionEditor.required ? 'is-on' : ''}`}
                          onClick={() => handleQuestionEditorChange(page.id, 'required', !questionEditor.required)}
                          aria-pressed={questionEditor.required}
                        >
                          <span className="admin-form-builder__required-dot" aria-hidden="true" />
                          <span>Required</span>
                        </button>
                        <button
                          type="button"
                          className="admin-form-builder__done-btn admin-form-builder__done-btn--subtle"
                          onClick={() => handleCloseQuestionEditor(page.id)}
                        >
                          Cancel
                        </button>
                        <button type="button" className="admin-form-builder__done-btn" onClick={() => handleSaveQuestionEditor(page.id)}>
                          Done
                        </button>
                      </div>
                    </article>
                  ) : null}

                  <section className="admin-form-builder__add-question">
                    <h3>Add Question</h3>
                    <div className="admin-form-builder__add-question-grid">
                      {questionTypeOptions.map((option) => (
                        <button
                          key={option}
                          type="button"
                          className="admin-form-builder__type-chip"
                          onClick={() => handleOpenAddQuestionEditor(page.id, option)}
                        >
                          <span aria-hidden="true">＋</span>
                          <span>{option}</span>
                        </button>
                      ))}
                    </div>
                  </section>
                </div>
              ) : null}
            </article>
          )
        })}

        <button type="button" className="admin-form-builder__add-page" onClick={handleAddPage}>
          <span aria-hidden="true">＋</span>
          <span>Add New Page</span>
        </button>
      </section>
    </div>
  )
}

export default AdminFormBuilderPage
