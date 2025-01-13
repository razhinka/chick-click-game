import React, { ReactNode, useRef } from 'react';
import ReactDOM from 'react-dom';
import './Tooltip.css'

interface Props {
   child: ReactNode,
   content: ReactNode,
   className: string
}

const Tooltip = (props: Props) => {
   const [visible, setVisible] = React.useState(false);
   const [coords, setCoords] = React.useState({ x: 0, y: 0 });
   const tooltipRef = useRef<HTMLDivElement>(null); 
   
   const renderTooltipCorrectPosition = (imageRect: any) => {
      if(tooltipRef.current == null){
         requestAnimationFrame(() => renderTooltipCorrectPosition(imageRect));
         return;
      }
      const tooltipRect = tooltipRef.current.getBoundingClientRect();
      let left  = Math.min(Math.max(imageRect.left, 10), window.innerWidth - tooltipRect.width - 10);

      setCoords({ x: left, y:  imageRect.bottom });
   }

   const show = (e) => {
      setVisible(true); 
      const imageRect = e.target.getBoundingClientRect();

      requestAnimationFrame(() => renderTooltipCorrectPosition(imageRect))
   };

   const hide = () => {
      setVisible(false);
   }

   return (
      <div
         onMouseOver={show}
         onMouseOut={hide}
      >
         {props.child}
         {visible && ReactDOM.createPortal(<div
            className={props.className + ` ${tooltipRef.current == undefined ? '' : 'ready'}`}
            style={{ left: coords.x, top: coords.y + 5 }}
            ref={tooltipRef}
         >
         {props.content}
         </div>, document.body)}
      </div>
   );
}

export default Tooltip;
