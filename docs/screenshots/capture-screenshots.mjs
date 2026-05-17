/**
 * One-off script to capture UI screenshots for client documentation.
 * Run: node docs/screenshots/capture-screenshots.mjs
 * Requires dev server at http://localhost:5173
 */
import { chromium } from 'playwright'
import { mkdir } from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const OUT_DIR = __dirname
const BASE = 'http://localhost:5173'

const routes = [
  { name: '01-login', path: '/', wait: 800 },
  { name: '02-staff-login', path: '/staff-login', wait: 800 },
  { name: '03-parent-dashboard', path: '/parent/dashboard', wait: 1200 },
  { name: '04-parent-enrolment', path: '/parent/enrol-student', wait: 1200 },
  { name: '05-admin-dashboard', path: '/admin/dashboard', wait: 1200 },
  { name: '06-admin-users', path: '/admin/users', wait: 1200 },
  { name: '07-slt-dashboard', path: '/slt/dashboard', wait: 1200 },
  { name: '08-slt-review-queue', path: '/slt/review-queue', wait: 1500 },
  { name: '09-manager-dashboard', path: '/manager/dashboard', wait: 1200 },
  { name: '10-manager-applications', path: '/manager/applications', wait: 1200 },
]

await mkdir(OUT_DIR, { recursive: true })

const browser = await chromium.launch()
const context = await browser.newContext({
  viewport: { width: 1440, height: 900 },
  deviceScaleFactor: 2,
})
const page = await context.newPage()

for (const route of routes) {
  const url = `${BASE}${route.path}`
  await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 })
  await page.waitForTimeout(route.wait)
  const filePath = path.join(OUT_DIR, `${route.name}.png`)
  await page.screenshot({ path: filePath, fullPage: false })
  console.log('Saved', filePath)
}

await browser.close()
console.log('Done.')
