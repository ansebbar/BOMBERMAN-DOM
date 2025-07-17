
🔹 1. Setup & Initialization
Task 1.1: Initialize the Project
✅ What: Create folder structure as shown above
✅ Why: Organizes client/server/shared logic
✅ How: Use mkdir and create placeholder files

Task 1.2: Install Required Dependencies
✅ What: Install Express and ws for WebSocket
✅ Why: Used for HTTP server and real-time sync
✅ How: npm init -y && npm install express ws

Task 1.3: Serve Static Files
✅ What: Serve index.html and client JS via Express
✅ Why: Allows the frontend to load on localhost
✅ How: Express app.use(express.static('client'))

🔹 2. Game Map System
Task 2.1: Map Initialization
✅ What: Generate 2D grid with:

indestructible walls

destructible blocks

free ground tiles
✅ Why: Forms the game field
✅ How: Use nested arrays with numeric tile values

Task 2.2: Spawn Zones
✅ What: Ensure corners are clear for player spawning
✅ Why: Players should not start stuck
✅ How: Avoid placing blocks near (0,0), (mapWidth,mapHeight), etc.

Task 2.3: Map API
✅ What: Write methods:

isWalkable(x, y)

destroyBlock(x, y)

placePowerUp(x, y)
✅ Why: Used by movement, bomb and explosion logic
✅ How: Use value checks inside the 2D grid

🔹 3. Player Logic
Task 3.1: Player Entity
✅ What: Define properties:

ID

position

stats (bombs, range, speed)

lives
✅ Why: Tracks each player's state
✅ How: Use a class or object template

Task 3.2: Movement Logic
✅ What: Check movement validity using Map.isWalkable()
✅ Why: Prevents walking into walls
✅ How: Validate next tile before updating position

Task 3.3: Player PowerUps
✅ What: Collect power-ups when standing on one
✅ Why: Updates stats (bomb count, range, speed)
✅ How: Check map tile at player position on move

🔹 4. Bomb and Explosion Logic
Task 4.1: Bomb Entity
✅ What: Create bombs with:

ownerId

position

timer (2s)
✅ Why: Stores pending explosions
✅ How: Add bombs to GameState, then explode on timeout

Task 4.2: Explosion Mechanics
✅ What: When timer ends, explode in 4 directions
✅ Why: Damages players, destroys blocks
✅ How: Use for loops in all 4 directions, respect bomb range and walls

Task 4.3: Chain Reactions
✅ What: If another bomb is in range, trigger it
✅ Why: Supports classic Bomberman chain effect
✅ How: Recursively call explosion for affected bombs

Task 4.4: Block Destruction
✅ What: If explosion hits destructible block → destroy it
✅ Why: Opens new paths, reveals power-ups
✅ How: Map.destroyBlock(x, y)

🔹 5. Power-Ups
Task 5.1: Power-Up Spawning
✅ What: After a block is destroyed, chance to spawn power-up
✅ Why: Adds game progression
✅ How: Use random chance (e.g., 30%) after block destruction

Task 5.2: Power-Up Collection
✅ What: Player collects power-up when stepping on it
✅ Why: Buffs player stats
✅ How: Check tile type and apply effect

🔹 6. Game State + Server Tick
Task 6.1: GameState Container
✅ What: Create object to hold:

players

bombs

map

power-ups
✅ Why: Single source of truth
✅ How: Use a class or singleton module

Task 6.2: Game Loop (tick())
✅ What: Run logic every 30ms
✅ Why: Updates game consistently
✅ How: Use setInterval or setTimeout

Task 6.3: Snapshot Sync
✅ What: Every tick, send full snapshot to all clients
✅ Why: Keeps game in sync across clients
✅ How: Serialize GameState into plain object and emit via WebSocket

🔹 7. Frontend Game Client
Task 7.1: DOM Grid Renderer
✅ What: Render 2D grid as HTML elements
✅ Why: Visual representation of map
✅ How: Use <div> elements in CSS grid

Task 7.2: Player/Bomb Rendering
✅ What: Render player positions and bombs
✅ Why: Visual feedback
✅ How: Update classList or use data attributes for CSS styling

Task 7.3: DOM Optimization
✅ What: Avoid full DOM re-renders
✅ Why: Maintain 60FPS
✅ How: Compare old vs new state and update only changes

Task 7.4: Input Handler
✅ What: Capture arrow keys and spacebar
✅ Why: Trigger movement and bombs
✅ How: Add keydown listeners and emit actions to server

🔹 8. Chat System (Optional)
Task 8.1: Chat UI
✅ What: Create input + chat log
✅ Why: Simple communication
✅ How: Basic DOM elements with scrollable div

Task 8.2: Chat Sync
✅ What: Send chat messages via socket
✅ Why: Sync across players
✅ How: socket.emit('chat', msg), server broadcasts

🔹 9. Game Phases & Victory
Task 9.1: Game Phases
✅ What: Phases: waiting, countdown, running, ended
✅ Why: Organizes game flow
✅ How: Track phase in GameState

Task 9.2: Countdown to Start
✅ What: When 2+ players join, start countdown
✅ Why: Wait for enough players
✅ How: Use setTimeout to start game

Task 9.3: Victory Condition
✅ What: Last player alive wins
✅ Why: End the game fairly
✅ How: Check if only 1 player has lives > 0

Task 9.4: Show Winner
✅ What: Display winner screen on client
✅ Why: Wraps up match
✅ How: Server sends final snapshot with phase: "ended" and winner info

