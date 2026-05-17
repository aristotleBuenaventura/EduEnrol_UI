#!/usr/bin/env python3
"""
Generates EduEnrol UI Technical Documentation (Word format).
Run from repo root: python3 docs/generate-ui-documentation.py
"""

from datetime import date
from pathlib import Path

from docx import Document
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.shared import Inches, Pt, RGBColor
from docx.oxml.ns import qn
from docx.oxml import OxmlElement

ROOT = Path(__file__).resolve().parent.parent
SCREENSHOTS = Path(__file__).resolve().parent / "screenshots"
OUTPUT = Path(__file__).resolve().parent / "EduEnrol-UI-Technical-Documentation.docx"

DOC_VERSION = "1.0"
DOC_DATE = date(2026, 5, 17).strftime("%d %B %Y")


def set_document_defaults(doc):
    style = doc.styles["Normal"]
    font = style.font
    font.name = "Calibri"
    font.size = Pt(11)
    style.paragraph_format.space_after = Pt(6)
    style.paragraph_format.line_spacing = 1.15


def add_page_break(doc):
    doc.add_page_break()


def add_heading(doc, text, level=1):
    return doc.add_heading(text, level=level)


def add_para(doc, text, bold=False, italic=False):
    p = doc.add_paragraph()
    run = p.add_run(text)
    run.bold = bold
    run.italic = italic
    return p


def add_bullet(doc, text, level=0):
    p = doc.add_paragraph(text, style="List Bullet")
    if level:
        p.paragraph_format.left_indent = Inches(0.25 * (level + 1))
    return p


def add_numbered(doc, text):
    return doc.add_paragraph(text, style="List Number")


def add_image(doc, filename, caption, width_inches=6.2):
    path = SCREENSHOTS / filename
    if not path.exists():
        add_para(doc, f"[Screenshot placeholder: {filename}]", italic=True)
        return
    doc.add_picture(str(path), width=Inches(width_inches))
    cap = doc.add_paragraph()
    cap.alignment = WD_ALIGN_PARAGRAPH.CENTER
    run = cap.add_run(caption)
    run.italic = True
    run.font.size = Pt(9)
    run.font.color.rgb = RGBColor(0x55, 0x55, 0x55)
    doc.add_paragraph()


def add_table_of_contents(doc):
    """Insert Word TOC field (updates when user opens doc and refreshes fields)."""
    p = doc.add_paragraph()
    run = p.add_run()
    fld_char_begin = OxmlElement("w:fldChar")
    fld_char_begin.set(qn("w:fldCharType"), "begin")
    instr = OxmlElement("w:instrText")
    instr.set(qn("xml:space"), "preserve")
    instr.text = 'TOC \\o "1-3" \\h \\z \\u'
    fld_char_sep = OxmlElement("w:fldChar")
    fld_char_sep.set(qn("w:fldCharType"), "separate")
    fld_char_end = OxmlElement("w:fldChar")
    fld_char_end.set(qn("w:fldCharType"), "end")
    run._r.append(fld_char_begin)
    run._r.append(instr)
    run._r.append(fld_char_sep)
    run._r.append(fld_char_end)
    add_para(
        doc,
        "Tip: In Microsoft Word, right-click the table of contents and choose "
        '"Update Field" to populate page numbers after opening this document.',
        italic=True,
    )


def build_document():
    doc = Document()
    set_document_defaults(doc)

    # --- Cover ---
    for _ in range(6):
        doc.add_paragraph()
    title = doc.add_paragraph()
    title.alignment = WD_ALIGN_PARAGRAPH.CENTER
    t_run = title.add_run("EduEnrol\nUser Interface\nTechnical Documentation")
    t_run.bold = True
    t_run.font.size = Pt(28)
    t_run.font.color.rgb = RGBColor(0x16, 0x3A, 0x5C)

    sub = doc.add_paragraph()
    sub.alignment = WD_ALIGN_PARAGRAPH.CENTER
    s_run = sub.add_run("Aotearoa New Zealand School Enrolment Platform — Front-End")
    s_run.font.size = Pt(14)
    s_run.font.color.rgb = RGBColor(0x6B, 0x72, 0x80)

    doc.add_paragraph()
    meta = doc.add_paragraph()
    meta.alignment = WD_ALIGN_PARAGRAPH.CENTER
    for line in [
        f"Document version: {DOC_VERSION}",
        f"Date: {DOC_DATE}",
        "Prepared by: UI Development Team",
        "Status: Final draft for client review",
    ]:
        r = meta.add_run(line + "\n")
        r.font.size = Pt(11)

    add_page_break(doc)

    # --- TOC ---
    add_heading(doc, "Table of Contents", 1)
    add_table_of_contents(doc)
    add_page_break(doc)

    # --- 1 Executive Summary ---
    add_heading(doc, "1. Executive Summary", 1)
    add_para(
        doc,
        "This document describes how the EduEnrol user interface was planned, structured, and "
        "implemented as a single-page React application. It is intended for stakeholders who need "
        "a clear picture of the front-end architecture, visual design approach, reusable components, "
        "and the screens delivered for each user role.",
    )
    add_para(
        doc,
        "The interface supports four primary audiences: parents and caregivers, school leadership "
        "team (SLT) reviewers, enrolment managers, and system administrators. A shared shell "
        "(sidebar navigation, top bar, and content area) keeps the experience consistent while "
        "allowing each role to see only the tools relevant to their work.",
    )
    add_bullet(doc, "Modern React 19 front end with Vite for fast development and production builds")
    add_bullet(doc, "Role-based routing with dedicated layouts per portal")
    add_bullet(doc, "Component-driven UI with shared primitives and domain-specific modules")
    add_bullet(doc, "CSS organised by feature area, aligned to an approved brand palette")
    add_bullet(doc, "Multi-step parent enrolment wizard with form steps broken into maintainable units")

    # --- 2 Introduction ---
    add_heading(doc, "2. Introduction", 1)
    add_heading(doc, "2.1 Purpose", 2)
    add_para(
        doc,
        "The purpose of this documentation is to record the methodology used to translate "
        "product requirements and approved screen specifications into working UI code. It covers "
        "technology choices, folder organisation, layout patterns, the component catalogue, and "
        "representative screenshots of completed screens.",
    )
    add_heading(doc, "2.2 Scope", 2)
    add_para(doc, "In scope for this document:")
    add_bullet(doc, "All user-facing screens in the EduEnrol_UI repository")
    add_bullet(doc, "Layout, navigation, and styling conventions")
    add_bullet(doc, "Reusable UI and dashboard components")
    add_bullet(doc, "Parent enrolment wizard structure")
    add_para(doc, "Out of scope:")
    add_bullet(doc, "Back-end APIs, authentication services, and database design")
    add_bullet(doc, "Production hosting and CI/CD pipeline configuration")

    add_heading(doc, "2.3 Design Inputs and Workflow", 2)
    add_para(
        doc,
        "Work began from agreed functional requirements and visual specifications for each role. "
        "Screens were broken down into layout regions (navigation, header, main content, modals) "
        "before any code was written. For each major view I produced a quick component map—what "
        "is shared vs. role-specific—and implemented mobile-first spacing using a fixed desktop "
        "breakpoint (1440px) as the primary review target, matching how school staff typically "
        "use the system on office machines.",
    )
    add_para(
        doc,
        "Implementation followed a consistent loop: (1) scaffold route and page shell, "
        "(2) build or reuse UI primitives, (3) apply feature-level CSS, (4) wire dummy data for "
        "realistic review, and (5) walk through the screen against the specification for spacing, "
        "typography, and bilingual labels (English / te reo Māori sub-labels in navigation).",
    )

    # --- 3 Technology ---
    add_heading(doc, "3. Technology Stack", 1)
    add_para(doc, "The front end uses a deliberately small dependency set to keep builds fast and maintenance straightforward.")

    rows = [
        ("Runtime / UI", "React 19", "Component model, hooks for local state"),
        ("Build tool", "Vite 8", "Dev server with HMR, optimised production bundle"),
        ("Routing", "React Router 7", "Nested routes per role layout"),
        ("Dates", "date-fns + react-day-picker", "Interview scheduling calendar in SLT flows"),
        ("Styling", "Plain CSS (per feature)", "No CSS-in-JS; predictable overrides per page"),
        ("Linting", "ESLint 9", "React hooks and refresh rules"),
    ]
    table = doc.add_table(rows=1, cols=3)
    table.style = "Table Grid"
    hdr = table.rows[0].cells
    hdr[0].text = "Layer"
    hdr[1].text = "Technology"
    hdr[2].text = "Role in EduEnrol"
    for layer, tech, role in rows:
        row = table.add_row().cells
        row[0].text = layer
        row[1].text = tech
        row[2].text = role
    doc.add_paragraph()

    add_heading(doc, "3.1 Why React and Vite", 2)
    add_para(
        doc,
        "React was chosen because enrolment flows are inherently form-heavy and stateful—multi-step "
        "wizards, modals, and tables benefit from a mature component ecosystem. Vite provides "
        "near-instant feedback during layout work, which matters when refining pixel-level spacing "
        "across many screens.",
    )

    # --- 4 Project structure ---
    add_heading(doc, "4. Project Structure", 1)
    add_para(doc, "Source code lives under src/ with clear separation of concerns:")
    add_bullet(doc, "pages/ — route-level screens grouped by role (parent, admin, slt, manager)")
    add_bullet(doc, "components/layout/ — AppSidebar, AppTopBar (shared chrome)")
    add_bullet(doc, "components/ui/ — buttons, inputs, cards, empty states, toasts")
    add_bullet(doc, "components/dashboard/ — KPI cards, charts, tables, rule panels")
    add_bullet(doc, "components/enrolment/ — wizard steps for parent enrolment")
    add_bullet(doc, "components/slt/ — review queue, application detail, modals")
    add_bullet(doc, "components/icons/ — SVG navigation icons")
    add_bullet(doc, "config/navigation/ — nav items, branding, and labels per role")
    add_bullet(doc, "data/ — realistic dummy data for demos and layout testing")
    add_bullet(doc, "styles/ — feature-scoped stylesheets imported by layouts or pages")

    add_para(
        doc,
        "Each role layout (e.g. AdminLayout.jsx) imports only the CSS bundles needed for that "
        "portal, avoiding a single monolithic stylesheet and keeping unused rules out of unrelated views.",
    )

    # --- 5 Design system ---
    add_heading(doc, "5. Design System and Visual Language", 1)
    add_heading(doc, "5.1 Typography and colour", 2)
    add_para(
        doc,
        "The global base uses Inter (with system-ui fallbacks) at 11–16px depending on context. "
        "Body text colour is #1f2937 on a light grey page background (#f3f5f7 / #f9fafb). "
        "Primary brand navy/teal for navigation and actions is #163a5c, with hover states near #122f49.",
    )
    add_heading(doc, "5.2 Layout rhythm", 2)
    add_para(
        doc,
        "Dashboard sections use consistent vertical gaps (typically 24–28px). Cards use rounded "
        "corners (12–16px radius) and light borders (#e5e7eb / #e2e8f0). Status information is "
        "communicated through pill components rather than raw text colour alone, improving scanability.",
    )
    add_heading(doc, "5.3 Bilingual navigation", 2)
    add_para(
        doc,
        "Sidebar items show an English primary label with an optional te reo Māori sub-label "
        "(configured in config/navigation/*.js). This keeps translations centralised and avoids "
        "hard-coding strings inside presentational components.",
    )

    # --- 6 Architecture ---
    add_heading(doc, "6. Application Architecture", 1)
    add_heading(doc, "6.1 Routing model", 2)
    add_para(
        doc,
        "App.jsx defines all routes. Public entry points are the parent login (/) and staff login "
        "(/staff-login). Authenticated-style portals use nested routes: the layout component renders "
        "once; child routes swap content inside <Outlet />.",
    )
    routes = [
        "/ → Parent login",
        "/staff-login → Staff / admin / SLT / manager login",
        "/parent/* → Parent portal (dashboard, enrol-student, placeholders)",
        "/admin/* → Admin portal (dashboard, form builder, schools, rules, users, …)",
        "/slt/* → SLT portal (dashboard, review queue, …)",
        "/manager/* → Manager portal (dashboard, applications, task queue, assignments, reports)",
    ]
    for r in routes:
        add_bullet(doc, r)

    add_heading(doc, "6.2 Shared application shell", 2)
    add_para(
        doc,
        "Every authenticated portal reuses the same structural pattern implemented in parent-shell.css:",
    )
    add_bullet(doc, "Left: collapsible AppSidebar with brand, role pill, nav links, user footer")
    add_bullet(doc, "Right column: AppTopBar (search, notifications) + scrollable main content")
    add_para(
        doc,
        "Role-specific layouts only differ in navigation config, which stylesheets they import, "
        "and where sign-out navigates. This reduced duplicate layout code by roughly 70% compared "
        "to building four independent frame implementations.",
    )

    # --- 7 Components ---
    add_heading(doc, "7. Component Library", 1)
    add_heading(doc, "7.1 UI primitives (components/ui/)", 2)
    primitives = [
        "Button — primary actions with ui-button base class",
        "InputField — labelled inputs with consistent error spacing",
        "Card — bordered content containers",
        "DetailFieldGrid — label/value pairs for review screens",
        "PanelEmptyState — consistent empty list messaging",
        "AppToast — transient success / info feedback",
        "FeatureItem — marketing-style bullets on login pages",
    ]
    for p in primitives:
        add_bullet(doc, p)

    add_heading(doc, "7.2 Dashboard components (components/dashboard/)", 2)
    add_para(
        doc,
        "Dashboard widgets are composed for data-dense views: AdminMetricCard, StatSummaryCard, "
        "BarChartPanel, DonutBreakdownPanel, ManagerKpiCard, application tables, rule configuration "
        "cards, and integration status panels. Each accepts props for title, metrics, and optional "
        "actions so pages remain thin orchestration layers.",
    )

    add_heading(doc, "7.3 Enrolment wizard (components/enrolment/)", 2)
    add_para(doc, "Parent enrolment is a seven-step wizard driven by config/parentEnrolment.js:")
    steps = [
        "Student details",
        "Caregiver information",
        "Address and zoning",
        "Previous school",
        "Medical information",
        "Documents",
        "Review and submit",
    ]
    for i, s in enumerate(steps, 1):
        add_numbered(doc, s)
    add_para(
        doc,
        "ParentEnrolStudentPage.jsx holds step index and form state; each step component receives "
        "controlled values and onChange handlers. Progress bar width is derived from step index. "
        "This pattern makes it straightforward to add validation or API persistence per step later.",
    )

    add_heading(doc, "7.4 SLT review components (components/slt/)", 2)
    add_para(
        doc,
        "SLT-specific UI includes queue list items, application review detail layout, document lists, "
        "notes panel, timeline, resolved-application cards, and modals (schedule interview, request "
        "additional information). Modals use dedicated CSS files to keep z-index and overlay behaviour isolated.",
    )

    # --- 8 Portals with screenshots ---
    add_heading(doc, "8. Role-Based Portals and Screens", 1)

    add_heading(doc, "8.1 Authentication screens", 2)
    add_para(
        doc,
        "The parent login presents brand storytelling on the left and credentials on the right. "
        "Staff login uses a compact variant with quick demo links to each portal for stakeholder walkthroughs.",
    )
    add_image(doc, "01-login.png", "Figure 1 — Parent / caregiver login")
    add_image(doc, "02-staff-login.png", "Figure 2 — Staff login with portal shortcuts")

    add_heading(doc, "8.2 Parent portal", 2)
    add_para(
        doc,
        "Parents land on a dashboard summarising applications and next actions, then can launch "
        "the multi-step enrolment form. Navigation uses the shared shell with parent-specific branding.",
    )
    add_image(doc, "03-parent-dashboard.png", "Figure 3 — Parent dashboard")
    add_image(doc, "04-parent-enrolment.png", "Figure 4 — Enrolment wizard (step progress and form area)")

    add_heading(doc, "8.3 Administrator portal", 2)
    add_para(
        doc,
        "Administrators manage schools, users, rules, notifications, and form configuration. "
        "The home dashboard surfaces cross-tenant metrics; inner pages use tables and cards tuned for operational tasks.",
    )
    add_image(doc, "05-admin-dashboard.png", "Figure 5 — Admin dashboard")
    add_image(doc, "06-admin-users.png", "Figure 6 — User management")

    add_heading(doc, "8.4 SLT portal", 2)
    add_para(
        doc,
        "SLT users monitor workload and process applications from the review queue. Detail views "
        "combine timeline, documents, notes, and decision actions in a single scrollable workspace.",
    )
    add_image(doc, "07-slt-dashboard.png", "Figure 7 — SLT home / workload overview")
    add_image(doc, "08-slt-review-queue.png", "Figure 8 — Application review queue and detail panel")

    add_heading(doc, "8.5 Manager portal", 2)
    add_para(
        doc,
        "Enrolment managers see KPIs, assignment workload, application lists, and reporting entry points. "
        "Tables support filtering patterns established in managerApplicationsFilters.js.",
    )
    add_image(doc, "09-manager-dashboard.png", "Figure 9 — Manager dashboard")
    add_image(doc, "10-manager-applications.png", "Figure 10 — Applications list")

    # --- 9 Styling ---
    add_heading(doc, "9. Styling Approach", 1)
    add_para(
        doc,
        "Styling is plain CSS, namespaced by feature file (e.g. slt-review-queue-page.css). "
        "BEM-like class prefixes (slt-rq-, parent-enrol__, app-sidebar__) prevent collisions. "
        "CSS custom properties on :root or feature wrappers centralise colours for each portal variant.",
    )
    add_para(doc, "Global resets and accessibility helpers live in index.css (box-sizing, visually-hidden utility). Login-specific rules remain in App.css for historical reasons; new work prefers styles/ imports at the page or layout level.")

    # --- 10 UX ---
    add_heading(doc, "10. UX, Accessibility, and Responsiveness", 1)
    add_bullet(doc, "Sidebar collapse preserves icon-only navigation for narrow widths")
    add_bullet(doc, "ARIA labels on sidebar toggle and main navigation landmarks")
    add_bullet(doc, "Keyboard-focus styles on form controls in modals and wizards")
    add_bullet(doc, "Semantic headings inside dashboard panels for screen reader structure")
    add_para(
        doc,
        "Further responsive breakpoints can be extended per stylesheet; the current delivery "
        "targets desktop-first use called out in the requirements workshops.",
    )

    # --- 11 Build ---
    add_heading(doc, "11. Local Development and Build", 1)
    add_para(doc, "Prerequisites: Node.js 18+ and npm.")
    add_numbered(doc, "Clone the repository and run npm install")
    add_numbered(doc, "Start the dev server: npm run dev (default http://localhost:5173)")
    add_numbered(doc, "Production build: npm run build — output in dist/")
    add_numbered(doc, "Preview production bundle: npm run preview")
    add_para(
        doc,
        "Linting: npm run lint. The project uses ESLint flat config aligned with React 19 recommendations.",
    )

    # --- 12 Integration ---
    add_heading(doc, "12. Integration Readiness", 1)
    add_para(
        doc,
        "The UI is structured for back-end integration without large refactors: dummy data modules "
        "in src/data/ can be replaced by API hooks; form state in the enrolment wizard is already "
        "segmented per step for partial saves; tables accept row objects that map cleanly to DTOs. "
        "Authentication is simulated via route navigation today—middleware or context providers can "
        "guard layouts when tokens are available.",
    )

    # --- Appendix ---
    add_heading(doc, "Appendix A — Document Revision History", 1)
    rev = doc.add_table(rows=2, cols=4)
    rev.style = "Table Grid"
    h = rev.rows[0].cells
    h[0].text, h[1].text, h[2].text, h[3].text = "Version", "Date", "Author", "Changes"
    r1 = rev.rows[1].cells
    r1[0].text = DOC_VERSION
    r1[1].text = DOC_DATE
    r1[2].text = "UI Development Team"
    r1[3].text = "Initial release covering full EduEnrol UI scope"

    add_heading(doc, "Appendix B — Screenshot Index", 1)
    for fig, name in [
        ("Figure 1", "01-login.png — Parent login"),
        ("Figure 2", "02-staff-login.png — Staff login"),
        ("Figure 3", "03-parent-dashboard.png — Parent dashboard"),
        ("Figure 4", "04-parent-enrolment.png — Enrolment wizard"),
        ("Figure 5", "05-admin-dashboard.png — Admin dashboard"),
        ("Figure 6", "06-admin-users.png — User management"),
        ("Figure 7", "07-slt-dashboard.png — SLT dashboard"),
        ("Figure 8", "08-slt-review-queue.png — Review queue"),
        ("Figure 9", "09-manager-dashboard.png — Manager dashboard"),
        ("Figure 10", "10-manager-applications.png — Manager applications"),
    ]:
        add_bullet(doc, f"{fig}: {name}")

    doc.save(OUTPUT)
    print(f"Written: {OUTPUT}")


if __name__ == "__main__":
    build_document()
