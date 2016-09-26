
//DRAGGABLE SCRIPT
interact('.draggable')
  .draggable({
    inertia: true,
    restrict: {
      restriction: "parent",
      endOnly: true,
      elementRect: {top: 0, left: 0, bottom: 1, right: 1}
    },
    autoScroll: true,
    onmove: dragMoveListener,
  });

function dragMoveListener (event){
  var target = event.target,
  //keeps the dragged position in the data-x and data-y attributes
  x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx;
  y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

  //start translating element
  target.style.webkitTransform =
  target.style.transform =
    'translate(' + x + 'px, ' + y + 'px)';

  //update the position
  target.setAttribute('data-x', x);
  target.setAttribute('data-y', y);
}

window.dragMoveListener = dragMoveListener;

/*-----------------------------------------------------*/

//RESIZABLE script
interact('.resizable')
  .resizable({
    edges: { right: true, bottom: true }
  })
  .on('resizemove', function (event) {
    var target = event.target;

    // update the element's style
    target.style.width  = event.rect.width + 'px';
    target.style.height = event.rect.height + 'px';
  });

/*-----------------------------------------------------*/

//RESIZE + DRAG
interact('.resize-drag')
  .draggable({
    inertia: true,
    restrict: {
      restriction: "parent",
      endOnly: true,
      elementRect: {top: 0, left: 0, bottom: 1, right: 1}
    },
    autoScroll: true,
    onmove: window.dragMoveListener
  })
  .resizable({
    edges: { right: true, bottom: true }
  })
  .on('resizemove', function (event) {
    var target = event.target;

    // update the element's style
    target.style.width  = event.rect.width + 'px';
    target.style.height = event.rect.height + 'px';
  });
