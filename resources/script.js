document.addEventListener("DOMContentLoaded", () => {
    const container = document.querySelector(".background");
    const emojis = ['🌸', '🌸', '🍃']; // Mostly blossoms with some leaves

    
    const createLeaf = () => {
        const leaf = document.createElement("div");
        leaf.className = "sakura-leaf";
        
        // Randomly select any emoji from the array (not just first two)
        leaf.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        
        // Calculate slower duration (8-18 seconds)
        const baseDuration = 8 + Math.random() * 30;
        const fontSize = 14 + Math.random() * 12; // 14-26px
        
        Object.assign(leaf.style, {
            left: `${50 + Math.random() * 50}vw`, // Start in right half
            fontSize: `${fontSize}px`,
            animation: `fall ${baseDuration}s linear infinite`,
            animationDelay: `${Math.random() * 5}s`,
            filter: `opacity(${0.7 + Math.random() * 0.3})` // Slight opacity variation
        });
        
        container.appendChild(leaf);
        
        // Auto cleanup
        setTimeout(() => {
            leaf.remove();
        }, (baseDuration + 5) * 1000);
    };
    
    // Create initial leaves (reduced quantity)
    for (let i = 0; i < 8; i++) {
        setTimeout(createLeaf, i * 30000); // Stagger initial creation
    }
    
    // Continuous animation with reduced frequency
    setInterval(createLeaf, 3400);
});
