import { describe, it, expect } from "vitest";
import {
  generateDokployPayload,
  decodeDokployPayload,
} from "../app/utils/payload";
import { lintComposeFile } from "../app/utils/linter";
import { DokployfileSchema } from "../app/utils/schema";

describe("Payload Utils", () => {
  it("should encode and decode correctly", () => {
    const compose = "services:\n  web:\n    image: nginx";
    const config = "[config]\nport = 80";

    const base64 = generateDokployPayload(compose, config);
    const decoded = decodeDokployPayload(base64);

    expect(decoded.compose).toBe(compose);
    expect(decoded.config).toBe(config);
  });
});

describe("Linter Utils", () => {
  it("should detect container_name", () => {
    const yaml = `
services:
  app:
    container_name: my-app
    image: nginx
`;
    const results = lintComposeFile(yaml);
    expect(results.some((r) => r.message.includes("container_name"))).toBe(
      true
    );
  });

  it("should detect port mappings", () => {
    const yaml = `
services:
  app:
    ports:
      - 8080:80
    image: nginx
`;
    const results = lintComposeFile(yaml);
    expect(results.some((r) => r.message.includes("host-port mapping"))).toBe(
      true
    );
  });
});

describe("Schema Utils", () => {
  it("should validate correct Dokployfile", () => {
    const valid = {
      version: "1",
      meta: {
        slug: "test",
        name: "Test App",
        version: "1.0.0",
      },
      template: {
        compose: "docker-compose.yml",
        config: "template.toml",
      },
    };
    const result = DokployfileSchema.safeParse(valid);
    expect(result.success).toBe(true);
  });

  it("should validate Dokployfile with custom paths", () => {
    const valid = {
      version: "1",
      meta: {
        slug: "test",
        name: "Test App",
        version: "1.0.0",
      },
      template: {
        compose: "dokploy/compose.yml",
        config: "dokploy/cfg.toml",
      },
    };
    const result = DokployfileSchema.safeParse(valid);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.template.compose).toBe("dokploy/compose.yml");
    }
  });
});
