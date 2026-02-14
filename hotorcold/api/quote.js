import { ModalClient } from "modal";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

export default async function handler(request, response) {
  const modal = new ModalClient();

  const app = await modal.apps.fromName("hotorcold", {
    createIfMissing: true,
  });
  const image = modal.images.fromRegistry("python:3.11-slim");

  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const file = "quote.py";
  const file_contents = fs.readFileSync(path.join(__dirname, "../python", file), "utf-8");

  const sb = await modal.sandboxes.create(app, image, { timeoutMs: 10000 });
  console.log(`Sandbox ID: ${sb.sandboxId}`);

  const write = await sb.exec(
    ["sh", "-c", `cat > /tmp/${file}`],
    { stdin: "pipe", stdout: "pipe", stderr: "pipe" }
  );
  await write.stdin.writeText(file_contents);
  await write.stdin.getWriter().close();
  await write.wait();

  const p = await sb.exec(
    ["python", `/tmp/${file}`],
    { stdout: "pipe", stderr: "pipe" }
  );
  const output = await p.stdout.readText();
  const errors = await p.stderr.readText();
  const exitCode = await p.wait();
  await sb.terminate();

  return response.status(200).json({ sandboxId: sb.sandboxId, output, errors, exitCode });
}
