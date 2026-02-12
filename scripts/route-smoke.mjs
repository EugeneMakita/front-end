#!/usr/bin/env node

import fs from "node:fs"
import path from "node:path"

const appDir = path.resolve("app")

const routeChecks = [
  { route: "/", file: "app/page.tsx" },
  { route: "/courses", file: "app/courses/page.tsx" },
  { route: "/courses/1", file: "app/courses/[id]/page.tsx" },
  { route: "/courses/1/information", file: "app/courses/[id]/information/page.tsx" },
  { route: "/courses/1/wiki/home", file: "app/courses/[id]/wiki/[pageId]/page.tsx" },
  { route: "/library", file: "app/library/page.tsx" },
  { route: "/library/1", file: "app/library/[id]/page.tsx" },
  { route: "/library/1/questions", file: "app/library/[id]/questions/page.tsx" },
  { route: "/library/folder/favorites", file: "app/library/folder/[folderId]/page.tsx" },
  { route: "/create-account", file: "app/create-account/page.tsx" },
  { route: "/login", file: "app/login/page.tsx" },
]

function fileMode() {
  const missing = routeChecks.filter(({ file }) => !fs.existsSync(path.resolve(file)))
  if (missing.length > 0) {
    console.error("Route smoke check failed. Missing route files:")
    missing.forEach((entry) => {
      console.error(`- ${entry.route} -> ${entry.file}`)
    })
    process.exit(1)
  }
  console.log(`Route smoke check passed (${routeChecks.length} route files present).`)
}

async function httpMode(baseUrl) {
  const failures = []
  for (const check of routeChecks) {
    const url = `${baseUrl.replace(/\/$/, "")}${check.route}`
    try {
      const response = await fetch(url, { redirect: "manual" })
      if (response.status >= 400) {
        failures.push({ ...check, status: response.status })
      }
    } catch (error) {
      failures.push({ ...check, status: "ERR", error: String(error) })
    }
  }

  if (failures.length > 0) {
    console.error("HTTP route smoke check failed:")
    failures.forEach((failure) => {
      console.error(`- ${failure.route} -> ${failure.status}`)
    })
    process.exit(1)
  }
  console.log(`HTTP route smoke check passed (${routeChecks.length} routes).`)
}

const baseUrl = process.env.ROUTE_SMOKE_URL
if (!fs.existsSync(appDir)) {
  console.error("No app directory found. Run from repo root.")
  process.exit(1)
}

if (baseUrl) {
  await httpMode(baseUrl)
} else {
  fileMode()
}
