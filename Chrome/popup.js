function update() {
    const now = new Date();
    // UTC+14 Solar Anchor
    const utcSeconds = (now.getTime() / 1000) + (14 * 3600);
    const secondsPastMidnight = utcSeconds % 86400;
    
    // 1 Beat = 57.6s | 1 Pulse = 0.96s
    const totalPulses = secondsPastMidnight / 0.96;
    
    const beat = Math.floor(totalPulses / 60);
    const pulse = Math.floor(totalPulses % 60);
    const centi = Math.floor((totalPulses % 1) * 100);

    // Format: 0000:00.00
    const timeStr = `${beat.toString().padStart(4, '0')}:${pulse.toString().padStart(2, '0')}.${centi.toString().padStart(2, '0')}`;
    
    document.getElementById('long_time').textContent = timeStr;
    
    requestAnimationFrame(update);
}

document.addEventListener('DOMContentLoaded', update);