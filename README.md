# Jedi on Tauntauns

_Jedi on Tauntauns_ is intended to be a rules-lite system for playing improv and
storytelling-focused TTRPG games in the Star Wars universe based on the
[Kids on Bikes](https://www.huntersentertainment.com/kidsonbikesrpg) system.

This repository contains both the rules for _Jedi on Tauntauns_ and the source
code for several web-based tools to assist in playing and running the system.

Currently the tools included in this repository are:

- NPC generator and tracker
- Character sheet (in progress)
- Vehicle sheet (planned)

These tools are accessible here: https://ken-bimmel.github.io/jedi-on-tauntauns/

The rules are located in the [_rules_ folder](https://github.com/ken-bimmel/jedi-on-tauntauns/tree/main/rules).

## Running locally

To start:

1. Clone the repo
2. `npm install`
3. `npm run start`

## Deploying to GitHub Pages

1. Update the `homepage` attribute of _package.json_
2. `npm run deploy`

## Proposed features include:

### Overall Project

- [ ] Convert to Vite
- [x] Add Tabs to separate parts of the program
- [ ] Add data sharing urls
- [x] Add rules and pdf generation

### NPC Generator

- [x] Generate a random NPC
  - [x] Include name/species as part of generated NPC
    - [x] Include species
    - [x] Include species-determined name
  - [x] Include randomly generated stats
    - [x] Switch to normal distribution from linear
  - [x] Include randomly generated feats
  - [x] Role-based templated for the generator
    - [x] Add random option for Role
  - [x] Add tiers to the generator
  - [x] Add force sensitivity toggle
- [x] Ability to modify generated NPC name/species/description/stats
  - [x] Add UI for editing name
  - [x] Add UI for editing species
  - [x] Add UI for editing/adding description
  - [x] Add UI for editing stats
  - [x] Add UI for editing feats
  - [x] Add link to name generator
- [x] Ability to track health
  - [x] Add read-only display
  - [x] Add interactive tracking
- [x] Add Destiny Point tracking
- [x] Ability to save current state to local storage and/or json file
- [x] Add rules text as tooltips
  - [x] Add to stats
  - [x] Add to injury levels
- [ ] Add NPC grouping and Table of Contents
- [ ] Add NPC dice rolling
  - [ ] Add die roll log
- [ ] Set friendly/hostile/neutral status

### Character Sheet

- [ ] Create a new blank character
  - [ ] Save character with name
  - [ ] Retrieve a saved character
- [ ] Track and modify
  - [x] Injuries
  - [x] Destiny Points
  - [x] Inventory
  - [x] Stats
  - [x] Feats
  - [x] Character Description
  - [ ] IP usage
- [ ] Roll stats
  - [ ] Flat rolls
  - [ ] Roll log

### Vehicle Sheet

- [ ] Create a new vehicle
  - [ ] Save vehicle
  - [ ] Retrieve a saved vehicle
- [ ] Track and modify
  - [ ] Hull
  - [ ] Systems
  - [ ] Modifiers
  - [ ] Cargo
