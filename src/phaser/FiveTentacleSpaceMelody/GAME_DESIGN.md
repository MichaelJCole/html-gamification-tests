# Game Design Document

There is an alien game about mono-poles, and those mono-poles do fun stuff,while making music.

      Now Playing!
"5-Tentacle Space Melody"!
      The Game!

This alien universe is full of mono-poles in a fully connected graph with:
- 3 quasi-magnetic forces
- separated by distance
- applied to mass

These mono-poles all have mass.  And that mass can change by game events (outside vector updating).

## Player pointers - it's a touchscreen game for 5 people

Player Pointers apply very strong force to force-tools.  

Those force-tools are mono-poles that then apply force in the universe.

5-ish player pointers can choose from several force-tools.  These tools are monopoles with differing forces which players move through the world.

Tools can be physically blocked by obstacles or disallowed regions of the game area.

If the tool has stopped, and the player's pointer continues off, the player "drops" the tool and has to start a sequence over.  

## Mono-pole Forces

There are three forces:
- Gravity 
- pull/push polarity.  
- effect: snow
- Magnetism
- pull/push: monopole magnets - effect: bendy lines (x-ray glassses reveal)
- Light - rays (light/shadow special effect - almost immediatly flips to equalibrium, usually triggering puzzle events)

Each object has:
- GravityPolarity: 1 / -1
- MagnetismForce: x / -x
- LightForce: x / -x

## Mono-pole Tools

TBD

# Implementation

Vector updating is calculating, then applying, the forces mono-poles apply to one another.

Once the vectors are calculated, they can be applied.  Calculations can be spread over multiple Game.update()s.

The universe is a fully connected graph with N mono-poles and E force edges.  This is the number of mono-pole-to-mono-pole force calculations, and is a computational limit.

   N nodes -> N(N-1)/2 Edges
  20          200
  50         1300

This game is intended for N < 20 or a game with 5 players and 15 monopoles in play.

The mono-pole forces are kept separate from the game objects, so they can be calculated outside Game.update()s (WASM and/or web worker).

Once ready, the forces are applied to MatterJS which handles the rest of the simulation.

Algorithm:

```
  Collect:
  - For each mono-pole: 
    { id, 
      x, 
      y, 
      mass,
      vector: { x, y } }
    
  Compute: 
  - Set of mono-poles called ALL
  
  - Start:
  - Set of mono-poles called REMAINING = ALL

  - For each mono-pole
    - Remove ME from REMAINING
    - Compute 3-force-vectors ME and each left in REMAINING
      - save computed distances
    - Apply those 3-force vectors
      - apply to each mono-poles' vector
  
  - Return monopole vectors

  Apply:
  - For each node, apply force vector in MatterJS
```

This could be computed over multiple Game.updates() using a web worker and/or WASM code.

Once applied, MatterJS will adjust objects in space with relation to MASS and DISTANCE for the pleasure of the viewer.

