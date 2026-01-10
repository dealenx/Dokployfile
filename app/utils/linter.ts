import { parse } from "yaml";

export interface LintResult {
  level: "warning" | "error";
  message: string;
}

export function lintComposeFile(content: string): LintResult[] {
  const results: LintResult[] = [];
  try {
    const doc = parse(content);

    if (!doc || typeof doc !== "object" || !doc.services) {
      return results;
    }

    const services = doc.services;
    for (const serviceName in services) {
      const service = services[serviceName];

      // 1. Check for container_name
      if (service.container_name) {
        results.push({
          level: "warning",
          message: `Service "${serviceName}" uses "container_name". Dokploy handles container naming automatically; it's recommended to remove it.`,
        });
      }

      // 2. Check for port mapping (3000:3000)
      if (service.ports) {
        const ports = Array.isArray(service.ports)
          ? service.ports
          : [service.ports];
        for (const port of ports) {
          const portStr = String(port);
          if (portStr.includes(":")) {
            results.push({
              level: "warning",
              message: `Service "${serviceName}" uses host-port mapping "${portStr}". Dokploy recommends using only the container port (e.g., "- 3000") for better compatibility.`,
            });
          }
        }
      }

      // 3. Check for networks
      if (service.networks) {
        results.push({
          level: "warning",
          message: `Service "${serviceName}" defines custom networks. Dokploy provides an isolated network by default; you can usually remove custom network definitions.`,
        });
      }
    }
  } catch (e: any) {
    results.push({
      level: "error",
      message: `Failed to parse YAML: ${e.message}`,
    });
  }

  return results;
}
