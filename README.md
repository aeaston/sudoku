sudoku
======

A friendly front-end game of Sudoku

For this project, I did not break up the different javascript "classes" into different files, as I normally would. The same goes for the sass. Because the project was so small in it's entirety, I decided this was more of a hassle than a benefit.

In terms of structure, there are only three main files. There's the input.html file housing all of the html, the sudoku.scss sass file (which gets compiled to css), and the sudoku.js file.

In the js file itself, I have three "classes". I use the word classes knowing javascript does not actually have true classes, but for all intents and purposes that is how they are being used here. The first class is a game class (which is essentially the main app class). It does the initializing and houses the main events, wiring up the js to the UI etc. Next is the board class which stores the state of the sudoku board and all the actions that can be taken on it. Finally, a cell class which stores the state of the individual cells on the board.

If I had more time, I may have considered row, column and section classes to help with determining if there were an error on the board, however since there is only one function that actually checks that, I think writing it without the classes is sufficient.

I made a couple other decisions between space and performance that are outlined in notes in the code itself so please check that out for those.

In terms of technologies, the only two I really used beyond standard html, css, and javascript are JQuery and SASS (and compass to compile it).

Had I had more time I would have loved to have done a bit more work on the UI. Once I click on a box, it would be nice to be able to enter my input on the keyboard for example. I'm pretty happy with the look and feel of the app but I do feel there is (almost always) room for improvement there. At some point though the returns outweigh the costs and that's when it's time to ship.

For any questions or comments, I can be reached at aeaston@cs.stanford.edu
