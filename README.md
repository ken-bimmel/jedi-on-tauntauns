# Template Repo

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

To start:

1. Clone the repo
2. `npm install`
3. `npm run start`

## Deploying to GitHub Pages

1. Update the `homepage` attribute of _package.json_
2. `npm run deploy`

This is intended to be an NPC generator and tracker for the Kids on Bikes hack, Jedi on Tauntauns.

Proposed features include:

- [ ] Generate a random NPC
  - [ ] Include name/species/description as part of generated NPC
  - [x] Include randomly generated stats
    - [x] Switch to normal distribution from linear
  - [ ] Include randomly generated feats
  - [x] Role-based templated for the generator
  - [ ] Add tiers to the generator
- [ ] Ability to modify generated NPC name/species/description/stats
- [ ] Ability to track health
- [ ] Ability to track initiative order
  - [ ] Ability to add PCs to initiative
- [ ] Ability to save current state to local storage and/or json file
