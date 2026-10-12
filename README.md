# Champions Randbats Tooltip v0.3

This Chrome/Edge Manifest V3 extension adds the **role-specific movepools** from the bundled `sets.json` into Showdown's **existing** Pokémon hover tooltip. No second popup appears.

## Install

1. Extract the ZIP.
2. Go to `chrome://extensions`, enable Developer mode, click Load unpacked.
3. Select the `champions-tooltip-json` folder.
4. Refresh any open Pokémon Showdown tab, then hover over a Pokémon icon.

## Data and limitations

- All set information comes **only** from the bundled `sets.json` (342 Pokémon entries).
- `movepool` lists candidate moves per role, **not** guaranteed exact four-move combinations. This file contains no item data or move/role probabilities.
- This version displays all roles without filtering by observed moves. The original Showdown tooltip continues to display revealed moves and other battle information.
- Showdown can change its tooltip markup; if the native tooltip's heading or container changes, selectors may need adjustment. This implementation has not been tested in a live Showdown battle.
- `sets-data.js` is the preloaded JavaScript representation of the same bundled `sets.json`, so the content script does not make network requests.

Version 0.5: Narrow 340px tooltip, text wraps to multiple lines.

Version 0.6: Removed the redundant Champions possible sets heading and level/role count. The role information remains directly below the native Showdown tooltip.

## Open Source & Contributions

Champions Randbats Tooltip is a free, open-source project created for the Pokémon Showdown community.

Everyone is welcome to download, use, modify, and improve the extension in accordance with its license.

Contributions are welcome! If you'd like to improve the extension, fix bugs, or add new features, feel free to fork the repository and submit a pull request.

If you encounter any bugs or have suggestions, you can open an issue on GitHub.

## License

This project's original extension code is released under the MIT License. See the `LICENSE` file for details.

Third-party datasets and other resources remain subject to their respective licenses.

## Disclaimer

This is an unofficial fan-made project and is not affiliated with Pokémon Showdown, Nintendo, Game Freak, or The Pokémon Company.
