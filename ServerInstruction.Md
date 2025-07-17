
### 🧠 Server
- Hosts WebSocket server
- Maintains authoritative `GameState`
- Runs game tick loop (~30fps)
- Validates input, processes collisions
- Broadcasts snapshots to all clients
