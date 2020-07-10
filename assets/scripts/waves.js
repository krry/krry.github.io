document.addEventListener('DOMContentLoaded', () => {
    VANTA.WAVES({
        el: "#waves",
        color: 0x280664,
        shininess: 32.00,
        waveHeight: 12.00,
        waveSpeed: 1.50,
        mouseControls: false,
        touchControls: false,
        zoom: 1
    })
    document.getElementById("waves").classList.add("on");
})
