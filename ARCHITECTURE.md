# Information architecture

## Routes

- `/` — single-page portfolio: introduction, work, technical foundation, background, and contact.
- `/projects/[slug]` — detail page for each project, using the centralized project catalogue.

## UI composition

The home page composes reusable project primitives:

`ProjectGrid` → `ProjectCard` → `ProjectLinks` + `TechStack`

The detail route composes:

`ProjectHero` + architecture diagram + `CaseStudy` sections + `ProjectLinks`

## Content boundaries

Components only render data. `data/` modules hold content, resource URLs, and availability flags. Missing resources are `null`; link controls are never rendered in that case.
