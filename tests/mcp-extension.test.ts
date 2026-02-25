import { describe, expect, it, vi } from "vitest";
import { createMCPExtension } from "../src/mcp-extension.js";

describe("createMCPExtension", () => {
  it("should delegate connect to bridge", async () => {
    const bridge = {
      connect: vi.fn().mockResolvedValue(undefined),
      disconnect: vi.fn().mockResolvedValue(undefined),
      listServers: vi.fn().mockReturnValue([]),
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any;

    const ext = createMCPExtension(bridge);
    await ext.connect({ name: "test", kind: "stdio", cmd: "echo", args: [] });

    expect(bridge.connect).toHaveBeenCalledWith({ name: "test", kind: "stdio", cmd: "echo", args: [] });
  });

  it("should delegate disconnect to bridge", async () => {
    const bridge = {
      connect: vi.fn(),
      disconnect: vi.fn().mockResolvedValue(undefined),
      listServers: vi.fn(),
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any;

    const ext = createMCPExtension(bridge);
    await ext.disconnect("test");

    expect(bridge.disconnect).toHaveBeenCalledWith("test");
  });

  it("should delegate listServers to bridge", () => {
    const bridge = {
      connect: vi.fn(),
      disconnect: vi.fn(),
      listServers: vi.fn().mockReturnValue([{ name: "gmail", kind: "stdio", toolCount: 3 }]),
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any;

    const ext = createMCPExtension(bridge);
    expect(ext.listServers()).toEqual([{ name: "gmail", kind: "stdio", toolCount: 3 }]);
  });
});
