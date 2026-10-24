---
layout: app
title: Proscenium
slug: proscenium
meta_title: "Proscenium — an agentic studio for 3D RPGs"
description: An agentic 3D RPG game development studio — build levels, characters, quests and combat in one editor, with a coding agent that edits the world alongside you.
label: Game Studio
image: '/images/proscenium/proscenium-samurai.jpg'

app:
  number: '01'
  kicker: Game studio · Early alpha
  icon: '/images/proscenium/proscenium-icon.png'
  name_plain: Prosce
  name_accent: nium
  headline_before: An
  headline_accent: agentic
  headline_after: studio for 3D RPGs.
  lede: >-
    Levels, characters, quests, combat and the HUD in one native editor — and a
    coding agent that builds the world with you. Written in Rust on Bevy,
    scripted in Lua, and yours.
  buttons:
    - label: Get updates
      url: /subscribe/
      icon: fa-regular fa-envelope
      primary: true
    - label: See it in action
      url: '#screenshots'
      icon: fa-regular fa-image
    - label: How it works
      url: '#under-the-hood'
      icon: fa-solid fa-terminal
  note: For macOS · Apple silicon
  platforms: [Rust, Bevy 0.18, Lua 5.4, Claude Code, Codex, Gemini CLI]
  hero_shot:
    src: '/images/proscenium/proscenium-colorgrade.jpg'
    caption: Live colour grading in Play mode
    meta: Screenshot

  highlights_title_plain: What's
  highlights_title_accent: inside
  highlights:
    - title: Agentic by design
      text: Describe a change in plain words. Claude Code, Codex or Gemini CLI edits the level, the editor validates it, and ⌘Z undoes it.
    - title: Real 3D, isometric soul
      text: Bevy's 3D renderer behind an orthographic iso camera. Physically based lights, real shadows, flickering torches.
    - title: Quests as world state
      text: Main and Side quests whose objectives are facts about the world — defeat every enemy, reach the cave, the gate is open.
    - title: Combat and progression
      text: Factions, weapons and skills, enemy factories, experience, and a passive skill tree in the style of Path of Exile.
    - title: Lua where it counts
      text: Small Lua 5.4 scripts hook into triggers, hits, loot and AI responses, reading and writing the world through one path syntax.
    - title: Your HUD, your way
      text: Life and mana bars, action bar, bag, quest tracker and minimap — pinned to the screen's edges and dragged into place.

  shots:
    - src: '/images/proscenium/proscenium-editor.jpg'
      caption: Edit mode with outline, gizmo and inspector
    - src: '/images/proscenium/proscenium-quests.jpg'
      caption: Quests and factions during Play
    - src: '/images/proscenium/proscenium-weapons.jpg'
      caption: The weapon library and real shadows

  agent:
    eyebrow: The agent · Built in
    title_plain: Describe it. The
    title_accent: agent
    title_after: builds it.
    text: >-
      The editor never calls a model itself. It writes the level and an asset
      catalogue into the project, starts the coding agent you picked, and
      streams its progress back. A bundled skill teaches the agent the world
      format, the Lua API and the quest model, so it uses only your assets,
      places things near the centre of your view, and never renumbers what is
      already there.
    checks: [Claude Code, Codex, Gemini CLI]
    panel_label: Example run
    prompt: put four enemies around the shrine and give them bows
    output: |-
      ▸ reading .proscenium/agent/assets.json
      ▸ reading .proscenium/agent/world.json
      ▸ placing 4 × UAL2_Standard near cell (3,-2)
      ▸ labels: enemy · attackable · weapon: Bow
      ✓ Added four archers around the shrine.
    panel_note: Validated and loaded · ⌘Z to undo

  code:
    - eyebrow: Scripting
      title_plain: Script it in
      title_accent: Lua
      text: Hooks for triggers, hits, loot and responses. Paths like world.entity[12].life autocomplete as you type.
      label: assets/scripts/boss.lua
      body: |-
        local enraged = false

        function on_hit(hit)
          if not enraged and hit.life.value <= hit.life.max // 2 then
            enraged = true
            self_play_clip("Roar", false)
          end
          if hit.life.value <= 0 then
            self_set_attackable(false)
            world.vars.gate_open = true
            emit("boss_defeated")
          end
        end
    - eyebrow: Quests
      title_plain: Quests are
      title_accent: data
      text: A level is plain JSON, and its quests live in it — readable by you, writable by the agent.
      label: worlds/world.json
      body: |-
        "quest_book": {
          "quests": [{
            "id": 1,
            "title": "Kill all enemies",
            "kind": "Main",
            "xp": 250,
            "objectives": [{
              "goal": {
                "kind": "Defeat",
                "target": { "Label": "enemy" }
              }
            }]
          }]
        }

  stack:
    - label: Engine
      name: Rust + Bevy
      text: Native 3D with PBR lights and shadows.
      items:
        - { name: Iso camera, text: "Orthographic 3D at the classic 2:1 angle.", file: src/camera.rs }
        - { name: Painted ground, text: "Texture layers blended by a splat map.", file: src/ground_splat.wgsl }
        - { name: glTF models, text: "Every animation clip, ready to play.", file: src/model_view.rs }
    - label: Editor
      name: egui
      text: One native macOS window, panels docked.
      items:
        - { name: Overlay builder, text: "Custom HUD panels bound to live values.", file: src/overlay_builder.rs }
        - { name: Passive tree, text: "Nodes, links and start points.", file: src/passive_tree.rs }
        - { name: Audio mixer, text: "Master volume and a 3-band EQ.", file: src/audio_mixer.rs }
    - label: Behaviour
      name: Lua 5.4
      text: Embedded through mlua, one state per object.
      items:
        - { name: Scripting host, text: "on_load, on_tick, on_collide and more.", file: src/scripting.rs }
        - { name: Quests, text: "Event-driven goals over world state.", file: src/quests.rs }
        - { name: Agents, text: "Headless coding-agent runs.", file: src/agent.rs }

  cta_eyebrow: Early alpha · In development
  cta_plain: Help shape Prosce
  cta_accent: nium
  cta_text: Proscenium is a work in progress. Subscribe for occasional notes on what's landed, or get in touch with questions, ideas or a game you'd like to build with it.
---
