import React, { useEffect, useState } from 'react';
import './RiotMatchInfoForm.css';
import { getSummonerList } from '../../../../api/beljabi'
import { MatchProps, MatchInfo } from "./RiotMatchLoader"
import { Typography, Select, Input, AutoComplete, Button } from 'antd';
import Form from 'antd/lib/form/Form';

const { Title } = Typography;

type UserListItem = {
    summonerId: string,
    summonerName: string,
}

type RiotMatchInfoFormProps = {
  onSubmitMatch: (match: MatchInfo) => void;
  matchInfo: MatchInfo;
};

function RiotMatchInfoForm({ onSubmitMatch, matchInfo }: RiotMatchInfoFormProps) {
  const [ users, setUsers ] = useState([])
  const [values, setValues] = useState({})
  
  useEffect(() => {
      getSummonerList().then( (res) => {
        var summonerNameList = [];
        res.forEach((u : UserListItem) => {
          summonerNameList.push({ value: u.summonerName })
        })
        setUsers(summonerNameList)
      }) 

      console.log(matchInfo)
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setValues({
        ...values,
        [name]: value
    })
  }

  const onFinish = () => {
    console.log('Received values of form:', values);
    for (let i = 0; i < 10 ; i++ ) {
      let teamNo = ( i < 5 ? 0 : 1)
      let name = values[`name-${i}`]
      matchInfo["teams"][teamNo]["participants"][i - teamNo * 5].name = name
    }
//    console.log(matchInfo)
    onSubmitMatch(matchInfo);
  };

  const onSelect = (data: string) => {
    console.log('onSelect', data);
  };

  const onChange = (data: string) => {
    console.log(data);
  };

  return (
    <div className="RiotMatchInfoForm">
      <Title level={5}>MatchId : {matchInfo.matchId} </Title>
      {
        matchInfo["teams"].map((team, i) => {
          return (
            <div className="Team">
            <Title level={3}>{team["win"] == "Win" ? "Win" : "Defeat" }</Title>
            <Title level={5}>
              Baron: {team["baronKills"]} / Dragon: {team["dragonKills"]} / Tower: {team["towerKills"]}
            </Title>
            {
              team["participants"].map((participant, j) => {
                return(
                <div className="participant">
                  <Input
                    id='testName'
                    type="text" 
                    name={`name-${5*i + j}`}
                    style={{ width: 200, margin:"10px" }}
                    placeholder="Summoner"
                    onChange={handleChange}
                  />
                  {/*
                      <AutoComplete
                        style={{ width: 200, margin:"10px" }}
                        options={users}
                        placeholder="summoner"
                        onChange={onChange}
                        filterOption={(inputValue, option) =>
                          option!.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                        }
                      />
                  */}
                  <Title level={5} style={{alignSelf: "center"}}>
                    {participant.champion} - {participant.lane} - 
                    ({participant.kills} / {participant.deaths} / {participant.assists} / {participant.totalCS})
                  </Title>
                </div>
                )
              })
            }
            </div>
          )
        })
      }
      <Button
        onClick={onFinish}
      >
        Submit
      </Button>
    </div>
  )
}

export default RiotMatchInfoForm;