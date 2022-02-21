import {$} from '@core/dom';

export function resizeHandler(event, $root) {
    const $resizer = $(event.target);
    const $parent = $resizer.closest('[data-type="resizable"]');
    const coords = $parent.getCoords();
    let value;

    $resizer.css({
        opacity: 1
    });

    if (event.target.dataset.resize === 'col') {
        $resizer.css({
            bottom: '-5000px'
        });

        document.onmousemove = (e) => {
            const delt = e.pageX - coords.right;
            value = coords.width + delt;
            $resizer.css({
                right: -delt + 'px'
            });
        };
    } else if (event.target.dataset.resize === 'row') {
        $resizer.css({
            right: '-5000px'
        });

        document.onmousemove = (e) => {
            const delt = e.pageY - coords.bottom;
            value = coords.height + delt;
            $resizer.css({
                bottom: -delt + 'px'
            });
        };
    }

    document.onmouseup = () => {
        $resizer.css({
            opacity: 0,
            bottom: '0px',
            right: 0
        });

        document.onmouseup = null;
        document.onmousemove = null;

        if (event.target.dataset.resize === 'col') {
            $parent.css({
                width: value + 'px'
            });
            $root.findeAll(`[data-col="${$parent.data.col}"]`).forEach((el) => {
                el.style.width = value + 'px';
            });
        } else if (event.target.dataset.resize === 'row') {
            $parent.css({
                height: value + 'px'
            });
            $root.findeAll(`[data-col="${$parent.data.col}"]`).forEach((el) => {
                el.style.height = value + 'px';
            });
        }
    };
}
