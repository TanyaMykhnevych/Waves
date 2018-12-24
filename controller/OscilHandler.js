class OscilHandler
{
    static down(e)  {
        let c = e.offsetX;
        let r = e.offsetY;
        if (e.buttons === 1) {
            sea.addOscillator(r, c, OMEGA_MIN, 1);
        } else if (e.buttons === 2) {
            sea.removeOscillator(r, c);
        }
        view.draw();
    }

    static move(e) {
        let c = e.offsetX;
        let r = e.offsetY;
        if (c < N && r < N )
            info.innerHTML = sea.w[r][c].x;
     }

    static up() {
    }

    static set() {
        canvas.onmousedown = OscilHandler.down;
        canvas.onmousemove = OscilHandler.move;
        canvas.onmouseup = OscilHandler.up;
        canvas.oncontextmenu = e => {e.preventDefault();}
    }
}

