import type { ServerConfig } from "./config.js";
import type { MCPBridge } from "./mcp-bridge.js";
import type { MCPExtension } from "./types.js";

export function createMCPExtension(bridge: MCPBridge): MCPExtension {
  return {
    async connect(config: ServerConfig): Promise<void> {
      await bridge.connect(config);
    },
    async disconnect(name: string): Promise<void> {
      await bridge.disconnect(name);
    },
    listServers() {
      return bridge.listServers();
    },
  };
}
