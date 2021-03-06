class RectHandler
{
    static down(e)  {
        RectHandler.o = {type: "rect", c0: e.offsetX, r0: e.offsetY, w: 0, h: 0};
    }

    static move(e) {
        if (RectHandler.o) {
            RectHandler.o.w = e.offsetX - RectHandler.o.c0;
            RectHandler.o.h = e.offsetY - RectHandler.o.r0;

            let ctx = canvas1d.getContext('2d');
            ctx.fillStyle = "lightblue";
            ctx.clearRect(0, 0, opts.N, opts.N);
            ctx.fillRect(RectHandler.o.c0, RectHandler.o.r0, RectHandler.o.w, RectHandler.o.h);
        }
    }

    static up()  {
        if (RectHandler.o) {
            let canvasData = canvas1d.getContext("2d").getImageData(0, 0, opts.N, opts.N);
            sea.getRocksFromCanvasData(canvasData);
            sea.isles.push(RectHandler.o);
            //
            view.draw();
            view3d.addIsle(RectHandler.o);
            view3d.draw();
            let ctx = canvas1d.getContext('2d');
            ctx.clearRect(0, 0, opts.N, opts.N);

            RectHandler.o = null;
        }
    }

    static set() {
        canvas1d.onmousedown = RectHandler.down;
        canvas1d.onmousemove = RectHandler.move;
        canvas1d.onmouseup = RectHandler.up;
        canvas1d.oncontextmenu = e => { e.preventDefault(); }
    }
}


