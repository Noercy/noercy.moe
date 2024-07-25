import { useState, useRef, useEffect } from 'react'


const WobblingLine: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [playerX, setPlayerX] = useState<number>(250);
  const [playerY, setPlayerY] = useState<number>(0); // Initial Y position of the player (will be set on mount)
  const [velocityY, setVelocityY] = useState<number>(0); // Player's vertical velocity
  const [isJumping, setIsJumping] = useState<boolean>(false); // Is the player jumping
  const [direction, setDirection] = useState<{ left: boolean; right: boolean }>({ left: false, right: false });
 

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext('2d');
    if (!context) return;

    // Define canvas dimensions
    const width = canvas.width;
    const height = canvas.height;

    const nodes = [
        { x: 0, speed: 1, amplitude: 30 },
        { x: width / 4, speed: 1.5, amplitude: 80 },
        { x: width / 2, speed: 1.2, amplitude: 100 },
        { x: (3 * width) / 4, speed: 2, amplitude: 20 },
        { x: width, speed: 1.3, amplitude: 35 },
      ];

    
      const getLineY = (x: number, time: number) => {
        for (let i = 1; i < nodes.length; i++) {
          if (x >= nodes[i - 1].x && x <= nodes[i].x) {
            const prevNode = nodes[i - 1];
            const nextNode = nodes[i];
            const prevY = height / 2 + Math.sin(prevNode.speed * time) * prevNode.amplitude;
            const nextY = height / 2 + Math.sin(nextNode.speed * time) * nextNode.amplitude;
            const t = (x - prevNode.x) / (nextNode.x - prevNode.x); // Interpolation factor
            const cp1x = (prevNode.x + nextNode.x) / 2;
            const cp1y = prevY;
            const cp2x = (prevNode.x + nextNode.x) / 2;
            const cp2y = nextY;
            return (1 - t) ** 3 * prevY +
              3 * (1 - t) ** 2 * t * cp1y +
              3 * (1 - t) * t ** 2 * cp2y +
              t ** 3 * nextY;
          }
        }
        return height / 2; // Default value if out of bounds
      };


    const animateLine = () => {
      // Clear canvas
      context.clearRect(0, 0, width, height);

      // Update the y-coordinates of the nodes to create the wobbling effect
      const time = Date.now() * 0.001; // Time factor for animation

      // Draw the line
      context.beginPath();
      context.moveTo(0, height / 2);
      
    nodes.forEach((node, index) => {
        const y = height / 2 + Math.sin(node.speed * time) * node.amplitude; // Adjust frequency and amplitude for wobbling
        if (index === 0) {
          context.moveTo(node.x, y);
        } else {
          const prevNode = nodes[index - 1];
          const prevY = height / 2 + Math.sin(prevNode.speed * time) * prevNode.amplitude;
          const cp1x = (prevNode.x + node.x) / 2;
          const cp1y = prevY;
          const cp2x = (prevNode.x + node.x) / 2;
          const cp2y = y;
          context.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, node.x, y);
        }
      });

    context.lineTo(width, height / 2);
    context.lineWidth = 2;
    context.strokeStyle = 'white';
    context.stroke();

      // Draw the nodes
    nodes.forEach((node) => {
        const y = height / 2 + Math.sin(node.speed * time) * node.amplitude; // Adjust frequency and amplitude for wobbling
        context.beginPath();
        context.arc(node.x, y, 5, 0, Math.PI * 2);
        context.fillStyle = 'white';
        context.fill();
      });

      
      // Update player position
      const gravity = 0.5; // Adjust gravity as needed
      if (direction.left) setPlayerX((x) => Math.max(0, x - 2));
      if (direction.right) setPlayerX((x) => Math.min(width, x + 2));

      setVelocityY((v) => v + gravity);
      setPlayerY((y) => y + velocityY);
      const lineY = getLineY(playerX, time);
      if (playerY >= lineY) {
        setPlayerY(lineY);
        setIsJumping(false);
        setVelocityY(0);
      }

      // Draw the player
      context.beginPath();
      context.arc(playerX, playerY, 10, 0, Math.PI * 2); // Player size
      context.fillStyle = 'blue';
      context.fill();

      

      // Request next frame
      requestAnimationFrame(animateLine);
    };

    animateLine();

    
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space' && !isJumping) {
        setIsJumping(true);
        setVelocityY(-10); // Adjust jump strength as needed
      }
      if (e.code === 'ArrowLeft') setDirection((d) => ({ ...d, left: true }));
      if (e.code === 'ArrowRight') setDirection((d) => ({ ...d, right: true }));
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.code === 'ArrowLeft') setDirection((d) => ({ ...d, left: false }));
      if (e.code === 'ArrowRight') setDirection((d) => ({ ...d, right: false }));
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [playerX, playerY, velocityY, isJumping]);
  
    return ( 
    <div>
      <canvas ref={canvasRef} width={500} height={500} />
    </div>
  );
};


export default WobblingLine;