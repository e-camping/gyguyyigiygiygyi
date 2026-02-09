import { ModalClient } from "modal";

export default async function handler(request, response) {
  const modal = new ModalClient();

  const app = await modal.apps.fromName("hotorcold", {
    createIfMissing: true,
  });
  const image = modal.images.fromRegistry("python:3.11-slim");

  const fs = await import("fs");
  const path = await import("path");

  const mainPy = fs.readFileSync(path.join(process.cwd(), "main.py"), "utf-8");

  const sb = await modal.sandboxes.create(app, image, { timeoutMs: 10000 });
  console.log(`Sandbox ID: ${sb.sandboxId}`);

  const write = await sb.exec(
    ["sh", "-c", "cat > /tmp/main.py"],
    { stdin: "pipe", stdout: "pipe", stderr: "pipe" }
  );
  await write.stdin.writeText(mainPy);
  await write.stdin.getWriter().close();
  await write.wait();

  const p = await sb.exec(
    ["python", "/tmp/main.py"],
    { stdout: "pipe", stderr: "pipe" }
  );
  const output = await p.stdout.readText();
  const errors = await p.stderr.readText();
  const exitCode = await p.wait();
  await sb.terminate();

  return response.status(200).json({ sandboxId: sb.sandboxId, output, errors, exitCode });
}
