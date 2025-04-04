# Jedi on Tauntauns

_Jedi on Tauntauns_ is intended to be a rules-lite system for playing improv and
storytelling-focused TTRPG games in the Star Wars universe based on the
[Kids on Bikes](https://www.huntersentertainment.com/kidsonbikesrpg) system.

This repository contains both the rules for _Jedi on Tauntauns_ and the source
code for several web-based tools to assist in playing and running the system.

Currently the tools included in this repository are:

- NPC generator and tracker
  - Create NPCs of varying tiers, with profiles determined by their career or
    role
  - Track and edit NPC Injury Levels, Stats, Feats, and narrative details
  - Roll checks for any NPC (including injury modifiers!)
- Character sheet
  - Create as many characters as you want
  - Track character Stats, Feats, Destiny Points, Injury Levels, inventory, and
    narrative details
  - Roll checks for your PC (including injury modifiers!)
  - Automatically calculate IP expenditure
- Vehicle sheet
  - Create as many vehicles as you want in any vehicle class (starting Modules
    automatically included!)
  - Use pre-made standard vehicles (or don't!) for ease and speed
  - Automatically calculated Spec bonuses and penalties
  - Track Modules, including passive and active Modules, Module destruction, and
    Module modifiers
  - Track cargo and narrative details
  - Automatically calculate VP expenditure

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

## Possible new/additional features include:

### Overall Project

- [ ] Convert to Vite
- [ ] Add data sharing url
  - [ ] Load individual character/vehicle
- [ ] Add warning to reset button and PC delete
  - [ ] Reset Button
  - [ ] PC Delete
- [ ] New rating component for injury and destiny point trackers that allows
      tooltips on individual icons
- [ ] Add roll history viewer
- [ ] Standardize implementations of reducer actions and generation

### NPC Generator

- [ ] Generate a random NPC
  - [ ] Include name/species as part of generated NPC
    - [ ] Option for non-sentient creatures

### Character Sheet

### Vehicle Sheet

- [ ] Linking characters to vehicles for vehicle rolls
- [ ] Library of standard vehicles for use with NPCs
  - [x] UI for adding standard vehicles
  - [x] Terrestrial Vehicles
  - [x] Small Starships
  - [ ] Medium Starships
  - [ ] Large Starships
- [ ] Autocomplete standard modules?
