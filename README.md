# Dokploy Template Generator

A browser-based service to generate Dokploy template import payloads from GitHub repositories.

## How to use

1.  Add a `Dokployfile.yml` to the root of your repository.
2.  Add your `docker-compose.yml` and `template.toml`.
3.  Go to `https://dealenx.github.io/dokployfile/#/your-username/your-repo` to get your import string.
4.  Optionally add a badge to your README:

```markdown
[![Deploy with Dokploy](https://img.shields.io/badge/Deploy_with-Dokploy-blue?logo=docker)](https://dealenx.github.io/dokployfile/#/your-username/your-repo)
```

## Dokployfile.yml Format

```yaml
# yaml-language-server: $schema=https://dealenx.github.io/dokployfile/schema.json
version: "1"
meta:
  slug: "my-app"
  name: "My Awesome App"
  version: "1.0.0"
  description: "A cool app for cool people"
  logo: "logo.png"
  tags: ["web", "automation"]
  links:
    github: "https://github.com/..."
template:
  compose: "docker-compose.yml"
  config: "template.toml"
```

## Development

```bash
pnpm install
pnpm dev
```

## License

MIT
