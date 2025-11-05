document.addEventListener('DOMContentLoaded', function() {
    
    
    const statusElement = document.getElementById('opening-status');
    
    
    if (!statusElement) {
        return;
    }

    
    
    const openingHours = [
        null, 
        { open: 8, close: 18 }, 
        { open: 8, close: 18 }, 
        { open: 8, close: 18 }, 
        { open: 8, close: 18 }, 
    ];

    
    function updateOpeningStatus() {
        const now = new Date();
        const currentDay = now.getDay();
        const currentHour = now.getHours();
        const currentMinutes = now.getMinutes();
        

        
        const currentTime = currentHour + (currentMinutes / 60);
        
        const todayHours = openingHours[currentDay];

        if (!todayHours) {
           
            statusElement.textContent = "Dzisiaj zamknięte";
            statusElement.style.color = "#a63c3c"; 
            return;
        }

        const { open, close } = todayHours; 

        if (currentTime < open) {
           
            statusElement.textContent = `Otwieramy o ${open}:00`;
            statusElement.style.color = "#E8A317"; 
        } else if (currentTime >= close) {
           
            statusElement.textContent = "Dzisiaj już zamknięte";
            statusElement.style.color = "#a63c3c"; 
        } else {
            
            
            
            const closingTime = new Date();
            closingTime.setHours(close, 0, 0, 0); 

            const diffMs = closingTime.getTime() - now.getTime(); 
            
            
            let diffSeconds = Math.floor(diffMs / 1000);
            
            let hours = Math.floor(diffSeconds / 3600);
            diffSeconds %= 3600; 
            
            let minutes = Math.floor(diffSeconds / 60);
            diffSeconds %= 60; 
            
            let seconds = diffSeconds;

            
            const fHours = hours.toString().padStart(2, '0');
            const fMinutes = minutes.toString().padStart(2, '0');
            const fSeconds = seconds.toString().padStart(2, '0');

            statusElement.textContent = `Jesteśmy dla was otwarci jeszcze przez : ${fHours}:${fMinutes}:${fSeconds}`;
            statusElement.style.color = "#aa6e3cff";
        }
    }

    setInterval(updateOpeningStatus, 1000);
    
    
    updateOpeningStatus();
});