console.log('Hello from the client side!');

function toggleColor() {
  console.log('Toggle color function called');
  const element = document.getElementsByTagName('h1')[0];
  console.log('Element found:', element);
  element.onclick = function () {
    console.log('Element clicked');
    // element.style.transition = 'background-color 0.5s ease';
    console.log('Transition applied');
    // get element current class
    const currentClass = element.className;
    console.log('Current class:', currentClass);
    if (element.className === 'bg-blue') {
      element.className = 'bg-red';
    } else {
      element.className = 'bg-blue';
    }
  };
}

toggleColor();
