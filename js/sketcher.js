var canvas,
    context,
    oldCoords,
    storedPencilColor = 'black',
    storedPencilWidth = 1,
    storedEraserColor = 'white',
    storedEraserWidth = 10;

function configureCanvas()
{
    var canvasContainerWidth = $('#canvasContainer').width(),
        canvasContainerHeight = $('#canvasContainer').height(),
        canvasMenuHeight = $('#canvasMenu').height();

    $('#canvasArea').attr({'width' : canvasContainerWidth,
                           'height' : canvasContainerHeight - (canvasMenuHeight + 2)});

    // Canvas definition.
    canvas = document.getElementById('canvasArea');
    context = canvas.getContext('2d');

    configurePencil(storedPencilColor, storedPencilWidth, 'butt');
}

function configureEvents()
{
    // Creating events
    canvas.addEventListener('touchstart', startLine, false);
    canvas.addEventListener('touchmove', drawLine, false);
    canvas.addEventListener('touchend', endLine, false);

    // Radio events
    $('#drawPencilOption').on('click', function() 
    { 
        configurePencil(storedPencilColor, storedPencilWidth, 'butt'); 
        $('#drawPencilTool').css('display', 'block');
        $('#eraserPencilTool').css('display', 'none');
    });

    $('#eraserPencilOption').on('click', function() 
    { 
        configurePencil(storedEraserColor, storedEraserWidth, 'round'); 
        $('#drawPencilTool').css('display', 'none');
        $('#eraserPencilTool').css('display', 'block');
    });

    $('#drawPencilColorPicker input[type=radio]').on('click', function()
    {
//                    configurePencilColor(this.dataset.color);
        storedPencilColor = $('#drawPencilColorPicker input[type=radio]:checked').attr('data-color');
        configurePencilColor(storedPencilColor);
    });

    // Input Range events
    $('#eraserPencilTool input[type=range]').bind('change', function()
    {
        // This event is used when the user just click on the range, not slides it.
        setEraserPencilWidth(this.value);
    });

    $('#eraserPencilTool input[type=range]').bind('touchstart', function()
    {
        $('#eraserPencilTool input[type=range]').bind('touchmove', function()
        {
            setEraserPencilWidth(this.value);
        });
    });

    $('#eraserPencilTool input[type=range]').bind('touchstop', function()
    {
        $('#eraserPencilTool input[type=range]').unbind('touchmove');
    });
}

function setEraserPencilWidth(rangeValue)
{
    storedEraserWidth = rangeValue;
    context.lineWidth = storedEraserWidth;
    $('#eraserPencilTool span').html(storedEraserWidth);
}

function startLine(e)
{
    oldCoords = giveMeTheCoords(e);
}

function drawLine(e)
{
    var coords = giveMeTheCoords(e);

    context.beginPath();
    context.moveTo(oldCoords[0], oldCoords[1]);
    context.lineTo(coords[0], coords[1]);
    context.stroke();

    oldCoords = coords;

    event.preventDefault();
}

function endLine(e)
{
    oldCoords = null;
}

function configurePencil(pencilColor, pencilWidth, pencilCap)
{
    configurePencilColor(pencilColor);
    context.lineWidth = pencilWidth;
    context.lineCap = pencilCap;
}

function configurePencilColor(pencilColor)
{
    context.strokeStyle = pencilColor;
}

function giveMeTheCoords(eventObject)
{
    if (eventObject.touches.length === 1) { // Only deal with one finger
        return [eventObject.touches[0].pageX - eventObject.touches[0].target.offsetLeft,
                eventObject.touches[0].pageY - eventObject.touches[0].target.offsetTop];
    }
}