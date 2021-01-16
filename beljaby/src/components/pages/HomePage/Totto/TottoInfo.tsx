import React, { useState } from 'react';
import { useSelector } from 'react-redux'
import { RootState } from '../../../../modules';
import { useSpring, animated } from 'react-spring'
import { Totto } from "../../../../api/beljabi"
import { TottoGuess } from "./TottoLoader"

import { Input, Typography, Button } from 'antd';

type CurrentMatchInfoProps = {
  totto: Totto,
  onSubmitTottoGuess : (totto: TottoGuess) => void;
};

const { Title } = Typography;

function CurrentMatchInfo({ totto, onSubmitTottoGuess }: CurrentMatchInfoProps) {
  const fade = useSpring({ from: { opacity: 0 }, opacity: 1 , delay: 200})
  const { data } = useSelector((state: RootState) => state.beljabi.userProfile);
  const [values, setValues] = useState<object>({})

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setValues({
        ...values,
        [name]: value
    })
  }

  const onFinish = (idx : number) => {
    console.log('Received values of form:', values);
    onSubmitTottoGuess(
      {
        title: totto.tottos[idx].title,
        value: values[`answer-${idx}`],
        participant: {
          point: values[`point-${idx}`],
          user: data._id,
        }
      }
    )
  };

  return (
    <animated.div style={fade}>        
        <div className="TottoInfo">
          <Title level={3} style={{alignSelf:"center", margin: "30px 0px 30px 0px"}}> TOTTO </Title>
          {
            totto && totto.tottos.map((totto, i) => {
              return (
                <div className="TottoGuess">
                  <Title level={5} style={{margin: "5px"}}> {totto.title} </Title>
                  <Input
                    id='tottoAnswer'
                    type="text" 
                    name={`answer-${i}`}
                    style={{ width: 200, margin:"10px" }}
                    placeholder="Answer"
                    onChange={handleChange}
                  />
                  <Input
                    id='tottoPoint'
                    type="number" 
                    name={`point-${i}`}
                    style={{ width: 200, margin:"10px" }}
                    placeholder="Betting Points"
                    onChange={handleChange}
                  />
                  <Button
                    onClick={() => onFinish(i)}
                  >
                    Submit
                  </Button>
                </div>
              )
            })
          }
      </div >
    </animated.div>
  );
}

export default CurrentMatchInfo;