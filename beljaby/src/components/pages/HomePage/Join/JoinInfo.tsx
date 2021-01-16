import React from 'react';
import { useSpring, animated } from 'react-spring'
import './JoinInfo.css';
import { Summoner } from "../../../../api/beljabi"

import { Progress } from 'antd';

function JoinInfo({ summoners }: Summoner[]) {
  const fade = useSpring({ from: { opacity: 0 }, opacity: 1 , delay: 200})

  return (
    <>
      <animated.div style={fade}>        
        <Progress type="circle" 
          percent={summoners.length/10 * 100} 
          format={(percent: number) => `${percent/10}/10`}
          width={130} 
          strokeColor={{
            '0%': '#14ad8c',
            '100%': '#87d068',
          }}
          status="active"/>
      </animated.div>
    </>
  );
}

export default JoinInfo;