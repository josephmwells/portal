//randomly sets the size of a div on page load
$(document).ready(function (){
  initWin($('#win-00'));
  initWin($('#win-01'));
});

function startPos($container, childH, childW){
  //get container dimensions
  var h = $container.height() - childH - 25;
  var w = $container.width() - childW - 25;

  var newH = Math.floor(Math.random() * h);
  var newW = Math.floor(Math.random() * w);

  if(newH < 0){ newH = 25;}
  if(newW < 0){ newW = 25;}

  return [newH, newW];
}

function initWin($target){
  var coord = startPos($target.parent(), $target.height(), $target.width());
  $target.css({top: coord[0], left: coord[1], visibility: "visible"});
}


//DRAGGABLE SCRIPT
interact('.draggable')
  .allowFrom('.drag-handle')
  .draggable({
    inertia: true,
    restrict: {
      restriction: "parent",
      endOnly: true,
      elementRect: {top: 0, left: 0, bottom: 1, right: 1}
    },
    autoScroll: false,
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
    edges: { right: '.resize-handle', bottom: '.resize-handle' }
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
    edges: { right: '.resize-handle', bottom: '.resize-handle' }
  })
  .on('resizemove', function (event) {
    var target = event.target;

    // update the element's style
    target.style.width  = event.rect.width + 'px';
    target.style.height = event.rect.height + 'px';
  });
