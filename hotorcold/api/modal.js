import { ModalClient } from "modal";

export default async function handler(request, response) {
  const modal = new ModalClient();

  const app = await modal.apps.fromName("hotorcold", {
    createIfMissing: true,
  });
  const image = modal.images.fromRegistry("python:3.11-slim");

  const sb = await modal.sandboxes.create(app, image, { timeoutMs: 10000 });
  console.log(`Sandbox ID: ${sb.sandboxId}`);

  const p = await sb.exec(
    ["python", "-c", "print('Hello from Modal!')"],
    { stdout: "pipe", stderr: "pipe" }
  );
  const output = await p.stdout.readText();
  const errors = await p.stderr.readText();
  const exitCode = await p.wait();
  await sb.terminate();

  return response.status(200).json({ sandboxId: sb.sandboxId, output, errors, exitCode });
}
