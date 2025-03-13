# Contributing to @marimo-team/marimo-snippets

Thanks for your interest in contributing!

**We're actively seeking help with integrating marimo-snippets with other
static site generators, like Sphinx.**

However, if you want to contribute to this repo, here's our process.

## Development Setup

1. Fork and clone the repo
2. Install dependencies (currently none): `pnpm install`

## Development Process

1. Create a feature branch: `git checkout -b feature-name`
2. Make your changes
3. Commit your changes using conventional commits
4. Push to your fork and submit a pull request

## Pull Request Guidelines

- Include tests for any new functionality
- Update documentation for API changes
- Follow the existing code style
- Keep PRs focused - one feature/fix per PR

## Commit Messages

We use conventional commits. Format:

```markdown
type(scope): description

[optional body]
[optional footer]
```

Types:

- feat: New feature
- fix: Bug fix
- docs: Documentation only
- style: Code style changes
- refactor: Code changes that neither fixes a bug nor adds a feature
- perf: Performance improvements
- test: Adding or updating tests
- chore: Changes to build process or auxiliary tools

## Release Process

For maintainers only:

```bash
git checkout main
git pull
npx bumpp --no-git-check=false
```

## Questions?

Open an issue or discussion if you have questions!
