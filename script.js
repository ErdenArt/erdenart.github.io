document.addEventListener('DOMContentLoaded', function() {
    const container = document.getElementById('trianglesContainer');
    const sizes = ['small', 'medium', 'large', 'xlarge'];
    const numTriangles = 60;

    for (let i = 0; i < numTriangles; i++) {
        const triangle = document.createElement('div');
        triangle.className = 'triangle';

        const size = sizes[Math.floor(Math.random() * sizes.length)];
        triangle.classList.add(`triangle-${size}`);

        const x = Math.random() * 100;
        triangle.style.left = `${x}%`;

        const duration = 15 + Math.random() * 20;
        triangle.style.animationDuration = `${duration}s`;

        const delay = Math.random() * duration;
        triangle.style.animationDelay = `-${delay}s`;

        container.appendChild(triangle);
    }

    // FPS Meter
    const fpsValue = document.getElementById('fpsValue');
    let lastTime = performance.now();
    let frames = 0;
    let fps = 0;

    function updateFPS() {
        frames++;
        const currentTime = performance.now();
        const delta = currentTime - lastTime;

        if (delta >= 1000) {
            fps = Math.round((frames * 1000) / delta);
            fpsValue.textContent = fps;
            
            // Color coding based on FPS
            fpsValue.classList.remove('low', 'medium');
            if (fps < 30) {
                fpsValue.classList.add('low');
            } else if (fps < 50) {
                fpsValue.classList.add('medium');
            }

            frames = 0;
            lastTime = currentTime;
        }

        requestAnimationFrame(updateFPS);
    }

    updateFPS();

    // function update(){
    //     console.log(document.querySelector(".sidebar").style.width)
    //     requestAnimationFrame(update);
    // }
    // update()
});

let isSettingsOn = false;
function clickedSettings(){
    isSettingsOn = !isSettingsOn;

    const sideBar = document.querySelector('.sidebar');
    const settingsInner = document.querySelector('.settings-inner');
    sideBar.classList.toggle('settings-open', isSettingsOn);
    settingsInner.classList.toggle('visible', isSettingsOn);
}

function changeTriangleCount(num){
    const container = document.getElementById('trianglesContainer');
    var triangles = container.children;
    for (let i = 0; i < 60; i++) {
        triangles[i].style.display = "";
    }
    for (let i = 0; i < 60 - num; i++) {
        triangles[i].style.display = "none";
    }
}

function changeVolume(object){
    audio.volume = object.value
}
