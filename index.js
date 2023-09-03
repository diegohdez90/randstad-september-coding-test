var colors = []

const drawContainer = (containerSize, childSize, numberOfChildren) => {

  const main = document.getElementById('mainSquare');

  main.style.position = 'relative'
  main.style.overflow = 'hidden'
  main.style.width = `${containerSize}px`;
  main.style.height = `${containerSize}px`;
  let containerColor = getUniqueColor(colors);
  main.style.backgroundColor = containerColor

  var accWidth = 0
  var accHeight = 0
  var squares = 1;
  var totalSquares;
  let overlapped = false;

  let fitWidth = false;
  let fitHeight = false;
  while (squares <= numberOfChildren) {
    const square = document.createElement('div');
    square.style.position = 'absolute'
    square.style.width = `${childSize}px`;
    square.style.height = `${childSize}px`;
    square.style.top = `${accHeight}px`;
    square.style.left = `${accWidth}px`;
    var bgColor = getUniqueColor(colors)
    var hoverColor = getUniqueColor(colors, bgColor);
    square.style.backgroundColor = bgColor;
    square.setAttribute('bgColor', bgColor);
    square.setAttribute('hoverColor', hoverColor);

    var fn
    square.addEventListener('mouseenter', function () {
      this.style.backgroundColor = square.getAttribute('hoverColor')
      fn = setInterval(() => {
        square.remove();
      }, 2000);
    })
    square.addEventListener('mouseleave', function () {
      this.style.backgroundColor = this.getAttribute('bgColor')
      clearInterval(fn)
    })

    main.appendChild(square)
    accWidth += childSize;

    if (accWidth === containerSize && !fitWidth) {
      fitWidth = true;
    }
    
    if (fitWidth && accHeight + childSize === containerSize && !fitHeight) {
      fitHeight = true;
    }

    if (accWidth + childSize > containerSize) {
      accWidth = 0;
      accHeight += childSize
    }

    if (accHeight + childSize > containerSize && !overlapped) {
      overlapped = true;
      totalSquares = squares;
    }
    squares++;
  }

  var msg;

  if(totalSquares == undefined) {
    totalSquares = squares
  }
  if (!overlapped && (accWidth < containerSize || accHeight < containerSize )) {
    msg = 'The squares don\'t fit the container ' + totalSquares + ' squares'
  } else if (fitWidth && fitHeight ) {
    msg = 'Square fit '
  } else {
    msg = 'The parameters don \'t fit with the container'
  }

  document.querySelector('#message').textContent = msg
};

drawContainer(200, 50, 17);
//drawContainer(310, 200, 4);
//drawContainer(413, 42, 30);
//drawContainer(200, 300, 2);
/* My test cases */
//drawContainer(100, 10, 100);
//drawContainer(100, 20, 50);



function getHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function getUniqueColor() {
  const [colors, bgColor] = arguments;

  let containerColor = getHexColor();
  while (colors.includes(containerColor)) {
    if (bgColor !== undefined) 
      if (bgColor!== containerColor) break;
    containerColor = getHexColor();
  }
  colors.push(containerColor)
  return containerColor;
}