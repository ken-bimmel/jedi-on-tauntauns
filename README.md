# Jedi on Tauntauns

_Jedi on Tauntauns_ is intended to be a rules-lite system for playing improv and
storytelling-focused TTRPG games in the Star Wars universe based on the
[Kids on Bikes](https://www.huntersentertainment.com/kidsonbikesrpg) system.

This repository contains both the rules for _Jedi on Tauntauns_ and the source
code for several web-based tools to assist in playing and running the system.

Currently the tools included in this repository are:

- NPC generator and tracker
- Character sheet
- Vehicle sheet

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
- [ ] Add warning to reset button and PC delete
  - [ ] Reset Button
  - [ ] PC Delete
- [ ] New rating component for injury and destiny point trackers that allows
      tooltips on individual icons
- [ ] Add roll history viewer
- [ ] Standardize implementations of reducer actions and generation

### NPC Generator

- [ ] Generate a random NPC
  - [] Include name/species as part of generated NPC
    - [ ] Option for non-sentient creatures

### Character Sheet

### Vehicle Sheet

- [ ] Linking characters to ships for ship rolls
