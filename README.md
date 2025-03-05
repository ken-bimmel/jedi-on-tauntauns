# Jedi On Tauntauns NPC Generator

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

To start:

1. Clone the repo
2. `npm install`
3. `npm run start`

## Deploying to GitHub Pages

1. Update the `homepage` attribute of _package.json_
2. `npm run deploy`

This is intended to be an NPC generator and tracker for the Kids on Bikes hack, Jedi on Tauntauns.

## Proposed features include:

- [ ] Generate a random NPC
  - [ ] Include name/species/description as part of generated NPC
    - [x] Include species
    - [x] Include species-determined name
    - [ ] Include physical description
  - [x] Include randomly generated stats
    - [x] Switch to normal distribution from linear
  - [ ] Include randomly generated feats
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
- [ ] Add Destiny Point tracking
- [ ] Ability to track initiative order
  - [ ] Ability to add PCs to initiative
- [x] Ability to save current state to local storage and/or json file
- [ ] Add rules text as tooltips
  - [ ] Add to stats
  - [ ] Add to injury levels
