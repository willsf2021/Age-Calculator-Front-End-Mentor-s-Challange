# Frontend Mentor - Age calculator app solution

This is a solution to the [Age calculator app challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/age-calculator-app-dF9DFFpj-Q). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
- [Author](#author)
- [Acknowledgments](#acknowledgments)

## Overview

### The challenge

Users should be able to:

- View an age in years, months, and days after submitting a valid date through the form
- Receive validation errors if:
  - Any field is empty when the form is submitted
  - The day number is not between 1-31
  - The month number is not between 1-12
  - The year is in the future
  - The date is invalid e.g. 31/04/1991 (there are 30 days in April)
- View the optimal layout for the interface depending on their device's screen size
- See hover and focus states for all interactive elements on the page
- **Bonus**: See the age numbers animate to their final number when the form is submitted

### Screenshot

![](./design/desktop-completed.jpg)

### Links

- Solution URL:
- Live Site URL:

## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- Vanilla Javascript ES6

### What I learned

Working on this project helped me improve my understanding of date validation and handling user input in forms. I also practiced using Flexbox for responsive layouts.

```html
<section id="results">
  <p><span class="results yearr">--</span> years</p>
  <p><span class="results monthr">--</span> months</p>
  <p><span class="results dayr">--</span> days</p>
</section>
```

```css
input {
  border: 1px solid var(--light-grey);
  height: 50px;
  max-width: 100%;
  border-radius: 5px;
  padding-left: 12px;
  font-size: 24px;
  font-weight: 700;
  cursor: pointer;

  &::-webkit-inner-spin-button,
  &::-webkit-outer-spin-button {
    display: none;
  }

  &:focus {
    outline: none;
    border: 1px solid var(--purple);
  }
}
```

```js
function calculateAge() {
  const today = new Date();
  const birthDate = new Date(
    yearInput.value,
    monthInput.value - 1,
    dayInput.value
  );

  if (isValidDate(dayInput.value, monthInput.value, yearInput.value)) {
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    const dayDifference = today.getDate() - birthDate.getDate();

    // Adjust age if the current month or day is before the birth month or day
    if (monthDifference < 0 || (monthDifference === 0 && dayDifference < 0)) {
      age--;
    }

    // Calculate month difference
    let month = monthDifference < 0 ? 12 + monthDifference : monthDifference;
    if (dayDifference < 0) {
      month--;
      if (month < 0) month = 11;
    }

    // Calculate day difference
    let day =
      dayDifference < 0
        ? new Date(today.getFullYear(), today.getMonth(), 0).getDate() +
          dayDifference
        : dayDifference;

    // Display the calculated age
    daySpan.textContent = day >= 0 ? day : "--";
    monthSpan.textContent = month >= 0 ? month : "--";
    yearSpan.textContent = age >= 0 ? age : "--";
  } else {
    // Clear age display if the date is invalid
    daySpan.textContent = "--";
    monthSpan.textContent = "--";
    yearSpan.textContent = "--";
  }
}
```

### In future projects, I plan to focus on improving my skills in the following areas:

Advanced JavaScript: I aim to deepen my understanding of JavaScript, particularly in areas such as asynchronous programming, closures, and higher-order functions.
React and State Management: While I am comfortable with basic React concepts, I want to become more proficient in state management libraries such as Redux or Context API, and explore more advanced React patterns.
Responsive Design: I want to refine my ability to create responsive layouts that work seamlessly across different devices and screen sizes, utilizing modern CSS techniques like Grid and Flexbox.
Accessibility (a11y): Ensuring that my applications are accessible to all users is important to me. I plan to focus on improving my knowledge of accessibility standards and best practices.
Performance Optimization: I aim to learn more about optimizing web applications for performance, including techniques for reducing load times and improving the overall user experience.
Testing: I want to incorporate more comprehensive testing into my workflow, including unit tests, integration tests, and end-to-end tests using tools like Jest, React Testing Library, and Cypress.
By focusing on these areas, I hope to enhance the quality and robustness of my future projects, making them more efficient, maintainable, and user-friendly.

### Useful resources

https://developer.mozilla.org/ - This comprehensive resource is my go-to for any HTML, CSS, or JavaScript questions, providing detailed documentation and examples.
https://css-tricks.com/ - I find this site extremely helpful for understanding CSS concepts and finding practical solutions to common styling challenges.
https://javascript.info/ - This site offers in-depth tutorials and articles on various JavaScript topics, which have been invaluable in improving my understanding of the language.
https://reactjs.org/docs/getting-started.html - The official React documentation has been essential for learning React fundamentals and advanced concepts.
https://www.frontendmentor.io/ - Working on challenges from Frontend Mentor has provided me with practical, hands-on experience in building projects and solving real-world problems.

## Author

- Frontend Mentor - [@WilsonPereiraJr](https://www.frontendmentor.io/profile/WilsonPereiraJr)
