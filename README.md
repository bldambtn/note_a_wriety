# note_a_wriety

## Description
An application called Note Taker that can be used to write and save notes. This application uses an Express.js back end and will save and retrieve note data from a JSON file.

## Original User Story and Acceptace Criteria

### User Story
```md
AS A small business owner
I WANT to be able to write and save notes
SO THAT I can organize my thoughts and keep track of tasks I need to complete
```

### Acceptance Criteria
```md
GIVEN a note-taking application
WHEN I open the Note Taker
THEN I am presented with a landing page with a link to a notes page
WHEN I click on the link to the notes page
THEN I am presented with a page with existing notes listed in the left-hand column, plus empty fields to enter a new note title and the note’s text in the right-hand column
WHEN I enter a new note title and the note’s text
THEN a "Save Note" button and a "Clear Form" button appear in the navigation at the top of the page
WHEN I click on the Save button
THEN the new note I have entered is saved and appears in the left-hand column with the other existing notes and the buttons in the navigation disappear
WHEN I click on an existing note in the list in the left-hand column
THEN that note appears in the right-hand column and a "New Note" button appears in the navigation
WHEN I click on the "New Note" button in the navigation at the top of the page
THEN I am presented with empty fields to enter a new note title and the note’s text in the right-hand column and the button disappears
Mock-Up
```

## Walkthrough

*   Link to Deployed Application: https://bldambtn.github.io/note_a_wriety/ 

![Walkthrough of expected application functionality](./public/assets/11-express-homework-demo.gif)

## Credits

### Collaborator(s):

*   Travis Haynie, https://github.com/TravisHaynie, personal communication in class and in a zoom about project on July 28,2024 GitHub; helped with route files, locating note in db.json for delete functionality.

### Research Sources:

*   Expressjs.com (n.d.). (accessed July, 28 2024). Express. Retrieved from https://expressjs.com/

*   Medium (August 19, 2023). (accessed July, 28 2024). Nodejs #Day3: Exploring HTTP Methods — GET, POST, DELETE, PATCH, PUT, and More. Retrieved from https://sandydev.medium.com/nodejs-day3-exploring-http-methods-get-post-delete-patch-put-and-more-cd71449acaf2 

*   Mozilla. (n.d.). (accessed July, 28 2024). Express Tutorial Part 4: Routes and controllers. Retrieved from https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/routes

*   Mozilla. (n.d.). (accessed July, 28 2024). Express Tutorial Part 5: Displaying library data. Retrieved from https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/Displaying_data 

*   Mozilla. (n.d.). (accessed July, 28 2024). Express Tutorial Part 6: Working with forms. Retrieved from https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/forms 

*   W3Schools. (n.d.). (accessed July, 28 2024). NHTML File Paths. Retrieved from https://www.w3schools.com/html/html_filepaths.asp 

*   W3Schools. (n.d.). (accessed July, 28 2024). Node.js. Retrieved from https://www.w3schools.com/nodejs/nodejs_intro.asp

### Source Code:

*   The code in this project is based on the work/assignment from EdX (https://git.bootcampcontent.com/University-of-Texas-at-Austin/UTA-VIRT-FSF-PT-05-2024-U-LOLC/-/tree/main/11-Express/02-Challenge?ref_type=heads)

## License
MIT License

Copyright (c) 2024 bldambtn

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
