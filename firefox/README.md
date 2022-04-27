# Firefox
Folder containing some of my firefox configuration.

### How to install
1. Go to [`about:support`](about:support) on your browser.
2. Click on `Profile Folder` > `Open Folder`
3. If there is no directory named `chrome`, create it and enter it.
4. Copy the files `userChrome.css` and `userContent.css` to that folder.
5. Restart firefox to apply.

### `userChrome.css`
Main source: [Link](https://superuser.com/questions/1653533/how-to-switch-back-to-firefox-old-style-of-tabs)
- This file changes the [*firefox 89+* tabs](screenshots/89.jpg) for the old [*firefox 88* tabs](screenshots/88.jpg) (customized).  
- This file changes the right click menu padding to make it smaller (shorter).

### `userContent.css`
This file is currently commented because the use case is very specific.  
It makes image zooming "not smooth" (crispy).
