# v2.3.3

- Now supports the [Bug Reporter module](https://www.foundryvtt-hub.com/package/bug-reporter/)!
- Added cover and icon for Manifest+

# v2.3.2

**All updates starting now will only be available for FVTT versions >0.8.1**

- _0.8.x FIX_ removed deprecated attribute usage.

# v2.3.1

- _FIX_ some small issue when checking keys
- _FIX_ changed the update Pointer update method to be async, as i initially intended it to be..
- _FIX_ now using `Timeline.kill()` instead of `Timeline.clear()`, for proper timeline removal

# v2.3.0

- _FIX_ Apply settings to all player buttons being shown to non GM users.
- _FIX_ Some issues when selecting the pointer/ping checkboxes.
- Some styling changes for the settings menu to make it more flexible (i hope) regarding different themes. (At least wfrp is now compatible :rolling_eyes: )

# v2.2.0

- Added spanish localization, thanks to Github User @lozalojo!

# v2.1.2

- _FIX_ using the new gsap dist path again, now that it has returned.

# v2.1.1

- _FIX_ links in the settings menu

# v2.1.0

- grape juices isometric module compatibility!
  - This also resulted in a bit smarter and cleaner way to get the cursor position, yay!

# v2.0.1

- Fix the GSAP Timeline not being cleared on scene change, resulting in endless amount of errors.
- Now using relative paths to import the gsap library, to allow for foundry instances using route prefixes.

# v2.0.0

- Almost everything build from the ground up for a more flexible and good looking experience!
- New Settings menu
  - custom hotkeys (per player)
  - ping and pointer design studio
  - custom pings and pointer on a per player basis
- Pings on top of tokens or other entities is now possible
- Switched to GitHub, like most of my other modules
