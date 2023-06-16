// Get the canvas element and its 2D rendering context
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// Set the canvas size to match the window size
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Define the size of each flow field cell
const resolution = 10;
const cols = Math.floor(canvas.width / resolution) + 1;
const rows = Math.floor(canvas.height / resolution) + 1;

// Create an array to store the flow vectors
const flowfield = new Array(cols * rows);

// Initialize the flow field with random vectors
function init() {
  for (let i = 0; i < flowfield.length; i++) {
    const angle = Math.random() * 2 * Math.PI;
    const vector = {
      x: Math.cos(angle),
      y: Math.sin(angle)
    };
    flowfield[i] = vector;
  }
}

// Update the flow field based on mouse position
function update(mouseX, mouseY) {
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      const index = x + y * cols;
      
      // Calculate the direction towards the mouse
      const dx = mouseX - x * resolution;
      const dy = mouseY - y * resolution;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const angle = Math.atan2(dy, dx);
      
      // Create the vector towards the mouse
      const vector = {
        x: Math.cos(angle),
        y: Math.sin(angle)
      };
      
      // Scale the vector based on the distance
      vector.x *= distance * 0.01;
      vector.y *= distance * 0.01;
      
      flowfield[index] = vector;
    }
  }
}

// Draw the flow field vectors on the canvas
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      const index = x + y * cols;
      const vector = flowfield[index];
      
      const xPos = x * resolution;
      const yPos = y * resolution;
      
      ctx.save();
      ctx.translate(xPos, yPos);
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(vector.x, vector.y);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
      ctx.stroke();
      ctx.restore();
    }
  }
}

// Handle mouse movement to update the flow field
function handleMouseMove(event) {
  const mouseX = event.clientX;
  const mouseY = event.clientY;
  
  update(mouseX, mouseY);
}

// Animation loop
function animate() {
  draw();
  requestAnimationFrame(animate);
}

// Initialize and start the animation
init();
animate();

// Add event listener for mouse movement
window.addEventListener('mousemove', handleMouseMove);
