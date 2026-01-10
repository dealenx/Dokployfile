import { zodToJsonSchema } from "zod-to-json-schema";
import { DokployfileSchema } from "../app/utils/schema";
import fs from "node:fs";
import path from "node:path";

const schema = zodToJsonSchema(DokployfileSchema, "Dokployfile");
const outputPath = path.resolve(process.cwd(), "public/schema.json");

fs.writeFileSync(outputPath, JSON.stringify(schema, null, 2));
console.log(`Schema generated at ${outputPath}`);
