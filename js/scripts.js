
/*
interact('.draggable').
  draggable({
    inertia: true,
    autoScroll: true,
  });*/

//resize script
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
