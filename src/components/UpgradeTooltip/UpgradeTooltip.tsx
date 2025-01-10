import React, { MouseEvent, ReactNode, useRef } from 'react';
import { Upgrade, Player } from '../../context/player-context.tsx';
import './UpgradeTooltip.css';
import eggCurrency from '../../img/egg.png';
import ReactDOM from 'react-dom';
import { formatNumber } from '../../util/number-formatter.tsx';

interface Props{
   children: ReactNode,
   upgrade: Upgrade,
   player: Player,
}

const UpgradeTooltip = (props: Props) => {
   const {children, upgrade, player} = props;
   const [visible, setVisible] = React.useState(false);
   const [coords, setCoords] = React.useState({ x: 0, y: 0 });
   const tooltipRef = useRef<HTMLDivElement>(null); 
   
   const show = (e) => {
      setVisible(true); 
      const imageRect = e.target.getBoundingClientRect();

      requestAnimationFrame(() => {
         if(tooltipRef.current == null){
            return;
         }
         const tooltipRect = tooltipRef.current.getBoundingClientRect();
         let left = imageRect.left;
         if(left + tooltipRect.width > window.innerWidth){
            left = window.innerWidth - tooltipRect.width - 10;
         }
         if(left < 10) {
            left = 10;
         }
         setCoords({ x: left, y:  imageRect.bottom });
      })
   };

   const hide = () => {
      setVisible(false);
   }

   return (
      <div  
         onMouseEnter={show}
         onMouseLeave={hide}
      >
         {children}
         {visible && ReactDOM.createPortal(<div 
            className={`upgrade-tooltip ${tooltipRef.current == undefined ? '' : 'ready'}`}
            style={{ left: coords.x, top: coords.y  + 5}}
            ref={tooltipRef}
          >
            <UpgradeTooltipContent upgrade={upgrade} player={player} children={children}/>
          </div>, document.body)}
      </div>
   );
}

const UpgradeTooltipContent = (props: Props) => {
   const {upgrade, player} = props;
   return (
      <div className='upgrade-tooltip-content'>
         <p className='upgrade-tooltip-header'>{upgrade.name}</p>
         <div className='upgrade-tooltip-info'>
            <p className={player.score < upgrade.price ? 'cant-buy' : ''}>{formatNumber(upgrade.price)}</p>
            <p>{upgrade.description}</p>
            {upgrade.dinamicDescriptionPart !== undefined && upgrade.dinamicDescriptionPart(player)}
         </div>
      </div>
   )
}


export default UpgradeTooltip;
