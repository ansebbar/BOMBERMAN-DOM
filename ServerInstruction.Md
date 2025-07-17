---
## 🧠 Server
- Hosts WebSocket server
- Maintains authoritative `GameState`
- Runs game tick loop (~30fps)
- Validates input, processes collisions
- Broadcasts snapshots to all clients

    ┌────────────┐
    │ GameState  │
    └────────────┘
      ▲     ▲     ▲
      │     │     │
┌─────────┘ │ └──────────┐
│      │                 │
│      ▼                 ▼
│ ┌────────────┐ ┌────────────┐
│ │ Player     │      Bomb   │
│ └────────────┘ └────────────┘
│      ▲                ▲
│      │                │
│ ┌────────────┐ ┌────────────┐
│ │ PowerUp    │   Explosion  │
│ └────────────┘ └────────────┘
│
└─────────────────────────────────────┐
▼
┌────────────┐
│      Map   │


---

## 🧩 Entity Design

### `GameState`
- `players[]`: Active players
- `bombs[]`: Active bombs
- `map`: 2D grid of walls, blocks, ground, power-ups
- `phase`: `'waiting' | 'running' | 'ended'`
- `tick()`: Called every 30ms, updates game
- `sendSnapshot()`: Broadcasts full game state

### `Player`
- `id`, `position`, `lives`, `stats`, `mapRef`
- `move(direction)`
- `layBomb()`

### `Bomb`
- `position`, `range`, `ownerId`, `timer`
- Triggers `Explosion` after 2s

### `Explosion`
- Propagates in 4 directions
- Destroys blocks, hits players
- Can chain-react with other bombs

### `PowerUp`
- Randomly spawns from destroyed blocks
- Types: `flame`, `bomb`, `speed`
- Collected when player steps on tile

### `Map`
- 2D array of tiles:
  - `0`: Wall
  - `1`: Block
  - `2`: Ground
  - `'p'`: PowerUp
- Functions:
  - `isWalkable(x, y)`
  - `destroyBlock(x, y)`
  - `placePowerUp(x, y)`


---