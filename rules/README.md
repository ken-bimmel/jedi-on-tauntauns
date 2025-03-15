This folder contains the rules for _Jedi on Tauntauns_.

# The rules text

The rules are currently written in markdown. At some point in the future, when
they are more stable, the rules may be updated to be written in HTML to allow
greater flexibility in laying out and styling the rules text.

## Comments in the text

There are a number of places where comments have been left in the rules text.
These comments are intended as ideas about new systems, highlights of areas of
concern about existing systems, or other designer notes.

# Rules pdf

To generate a new copy of the rules pdf, make sure all of your changes are
saved and that you have updated the version number, then run:

```bash
npm run rules
```

This will generate a new version of the rules pdf, overwriting the previous
version.

All configuration for the generated file is contained in the _config.js_ file in
this folder. This is where you should update the version number whenever you
make changes to the rules text.

# Upcoming or desired features

- [ ] More rules/text
  - [ ] Additional examples
    - [ ] Vehicle creation
    - [ ] Combat/social encounter
  - [ ] GM section
    - [ ] Check difficulty explanation
    - [ ] NPC Generation logic?
- [ ] Infrastructure
  - [ ] Improved styling
