# 1.5.2 - 2016-09-05

- Fixed: no more generation `postinstall` hook ``\o/``.
  ([#47](https://github.com/Nyalab/caniuse-api/pull/47) - @alexisvincent)

# 1.5.1 - 2016-08-06

- Fixed: Do not fail when browserslist gives a browser that caniuse-api doesn't
  know about
  ([#45](https://github.com/Nyalab/caniuse-api/pull/45) - @onigoetz)

# 1.5.0 - 2016-06-01

- Added: JSPM support with explicit file extensions ([#40](https://github.com/Nyalab/caniuse-api/issues/40))
- Upgraded: dependecies (lodash.memoize, lodash.uniq, shelljs, babel-tape-runner, tape, tap-spec)
- Upgraded: ask travis to only test node stable
- Upgraded: some tests fixed, some tests added

# 1.4.1 - 2015-10-18

- Fixed: `generator.js` was missing

# 1.4.0 - 2015-10-18

- Upgraded: browserlist 1.x
- Upgraded: shelljs 0.5.x
- Added: output to notify if generation has been made or not
(related to [#25](https://github.com/Nyalab/caniuse-api/issues/25))

# 1.3.2 - 2015-06-23

- Fixed: lodash.uniq dep
([#31](https://github.com/Nyalab/caniuse-api/issues/31))

# 1.3.1 - 2015-03-31

- Fixed: Windows support

# 1.3.0 - 2015-03-30

- Added: better exception messages
- Added: full browserify compatibility (by avoiding dynamic require)

# 1.2.2 - 2015-02-06

- Fixed: postinstall hook for Windows

# 1.2.1 - 2015-02-04

- Changed: Allow in browser usage by avoiding `require.resolve` and using a generated json instead or reading a directory ([#20](https://github.com/Nyalab/caniuse-api/pull/20)]

# 1.2.0 [YANKED]

# 1.1.0 - 2015-02-03

- Fixed: usage of caniuse-db outside the package itself
- Changed: upgrade to browserslist 0.2.x

# 1.0.0 - 2014-12-16

- Added: package is now automatically tested by [Travis-CI](https://travis-ci.org/Nyalab/caniuse-api)

# 0.1.0 - 2014-12-15

- Changed: complete API changes, released as `caniuse-api` package

# 0.0.1 - 2014-12-09

✨Initial release
