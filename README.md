# HyperTerm Tab Icons

> Icons in the header tabs for the current running process in HyperTerm.

## How It Works

Uses [fuzzaldrin][1] to try to match the current tab title against the icons
that have been pre-compiled and displays it. Has the ability to map different
icons and styles.

### Demo

![alt demo][2]

### Configuration

There are few options to customize the different icons and styles applied.
You may configure these inside of `~/.hyperterm.js`.

#### `config.tabIcons.activeStyle`

*   Type: `object`
*   Default: `{ transition: 'opacity 200ms ease-in' }`

This object can be any [CSSStyleDeclaration][3] allowed.
Essentially pass an inline style object [the same way you would with React][4].

#### `config.tabIcons.inactiveStyle`

*   Type: `object`
*   Default: `{ color: '#fff', opacity: 0.3 }`

This object can be any [CSSStyleDeclaration][3] allowed.
Essentially pass an inline style object [the same way you would with React][4].

#### `config.tabIcons.mapIcons`

*   Type: `object`
*   Default: `{}`

Map of icon to array of process names. Example:

```javascript
{
  nodejs: ['node'],
  docker: ['docker-compose'],
}
```

Look inside [`src/icons`][5] for possible icons to map to. Look at
[`src/mapIcons.js`][6] for defaults.

#### `config.tabIcons.mapColors`

*   Type: `object`
*   Default: `{}`

Map of process name to color string. Example:

```javascript
{
  bash: '#FFF',
  fish: '#D8494F',
  zsh: '#C5DB00',
}
```

Look at [`src/mapColors.js`][7] for defaults.

#### `config.tabIcons.disableColors`

* Type: `boolean`
* Default: `false`

Toggles icon colors. Similar to setting all colors to `#FFF`.

### Contribution

Obviously there are an almost infinite amount of processes out there, so any
help adding new icons, mapping colors, et cetera is greatly appreciated!

### Credit

Inspired by [Atom's][8] [`file-icons`][9].

[1]: https://github.com/atom/fuzzaldrin
[2]: http://i.giphy.com/pb6hCi4j0ErpC.gif
[3]: https://developer.mozilla.org/en-US/docs/Web/API/CSSStyleDeclaration/cssText
[4]: https://facebook.github.io/react/tips/inline-styles.html
[5]: https://github.com/dfrankland/hyperterm-tab-icons/tree/master/src/icons
[6]: https://github.com/dfrankland/hyperterm-tab-icons/tree/master/src/mapIcons.js
[7]: https://github.com/dfrankland/hyperterm-tab-icons/tree/master/src/mapColors.js
[8]: http://atom.io/
[9]: https://github.com/DanBrooker/file-icons
