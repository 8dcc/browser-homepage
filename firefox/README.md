# Firefox
Folder containing some of my firefox configuration.

### How to install
1. Go to `about:config` and set `toolkit.legacyUserProfileCustomizations.stylesheets` to `true`.
2. Go to [`about:support`](about:support) on your browser.
3. Click on `Profile Folder` > `Open Folder`
4. If there is no directory named `chrome`, create it and enter it.
5. Copy the files `userChrome.css` and `userContent.css` to that folder.
6. Restart firefox to apply.

### `userChrome.css`
Main source: [Link](https://superuser.com/questions/1653533/how-to-switch-back-to-firefox-old-style-of-tabs)
- This file changes the [*firefox 89+* tabs](screenshots/89.jpg) for the old [*firefox 88* tabs](screenshots/88.jpg) (customized).  
- This file changes the right click menu padding to make it smaller (shorter).

### `userContent.css`
This file is currently commented because the use case is very specific.  
It makes image zooming "not smooth" (crispy).

### Screenshots
![image](https://user-images.githubusercontent.com/29655971/193450406-4749bb2b-249a-4d1e-b65c-3360cbc39b91.png)
