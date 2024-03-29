import $ from '@core/dom';

const RESIZER_OFFSET = 2.5;

export default function resizeHandler($root, event) {
  return new Promise((resolve) => {
    const $resizer = $(event.target);
    const $parent = $resizer.closest('[data-type="resizable"]');
    const coords = $parent.getCoords();
    const type = $resizer.data.resize;
    const sideProp = type === 'col' ? 'bottom' : 'right';
    let value;

    $resizer.css({
      opacity: 1,
      [sideProp]: '-5000px',
    });

    document.onmousemove = (e) => {
      if (type === 'col') {
        const delta = e.pageX - coords.right;
        value = coords.width + delta;

        if (value > 0) {
          $resizer.css({ right: `${-delta - RESIZER_OFFSET}px` });
        }
      } else {
        const delta = e.pageY - coords.bottom;
        value = coords.height + delta;

        if (value > 0) {
          $resizer.css({ bottom: `${-delta - RESIZER_OFFSET}px` });
        }
      }
    };

    document.onmouseup = () => {
      document.onmousemove = null;
      document.onmouseup = null;

      if (type === 'col') {
        $parent.css({ width: `${value}px` });
        $root.findAll(`[data-col="${$parent.data.col}"]`).forEach((el) => {
          el.style.width = `${value}px`;
        });

        $resizer.css({
          opacity: 0,
          bottom: 0,
          right: `-${RESIZER_OFFSET}px`,
        });
      } else {
        $parent.css({ height: `${value}px` });

        $resizer.css({
          opacity: 0,
          right: 0,
          bottom: `-${RESIZER_OFFSET}px`,
        });
      }

      resolve({
        value,
        type,
        id: $parent.data[type],
      });
    };
  });
}
