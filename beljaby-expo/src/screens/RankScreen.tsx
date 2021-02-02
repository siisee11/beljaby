import React, { memo, useState, useEffect, useCallback } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
import { useSelector, useDispatch } from 'react-redux';
import Background from '../components/Background';
import Logo from '../components/Logo';
import Header from '../components/Header';
import Paragraph from '../components/Paragraph';
import Button from '../components/Button';
import { Navigation } from '../types';
import { getUserList } from '../api/beljabi'
import { RootState } from "../modules"
import { theme } from "../core/theme"
import Pusher from 'pusher-js/react-native';

const pusher = new Pusher('09aca0914798759c73f6', {
    cluster: 'ap3'
});

type Props = {
  navigation: Navigation;
};

type UserListItem = {
  gname: string,
  name: string,
  elo: number,
  point: number,
}

// Table header items
const head = [
  'NAME',
  'ELO',
]

// Table data rows
const tdata = [
  ['ADBE', '4'],
  ['AAPL', '9'],
  ['GOOGL', '3'],
  ['AIR', '10'],
  ['MSFT', '6']
]

const RankScreen = ({ navigation }: Props) => {
  const dispatch = useDispatch()
  const { data } = useSelector((state: RootState) => state.beljabi.userProfile);
  const [ users, setUsers ] = useState<string[][]>(null)

  const getUserListInfo = useCallback(async () => {
    const res = await getUserList();
    res.sort((a: UserListItem, b : UserListItem) => {
        return b.elo - a.elo
    })

    let tableData : Array<Array<string>> = []
    res.map((summoner:object) => {
      tableData.push([summoner.name, Math.round(summoner.elo)])
    })

    setUsers(tableData)
  }, [])

  useEffect(() => {
    if (data)
      getUserListInfo();

    //real time stuff...
    const channel = pusher.subscribe('user-channel');
    channel.bind('updateTotto', () => {
        /* Why call this several times?? */
        getUserListInfo()
    });
  }, [data, getUserListInfo])

  return (
    <Background>
      <Header></Header>
      <Header>Hi, {data?.name}</Header>
      <ScrollView>
        <View style={styles.container}>
          <Table borderStyle={styles.border}>
            <Row data={head} style={styles.HeadStyle} textStyle={styles.TableText}/>
            <Rows data={users} textStyle={styles.TableText}/>
          </Table>
        </View>
      </ScrollView>
    </Background>
  );
}
export default memo(RankScreen);

const styles = StyleSheet.create({
  container: { 
    flex: 1,
    paddingBottom: 20,
//    padding: 18,
//    paddingTop: 35,
    backgroundColor: theme.colors.background
  },
  HeadStyle: { 
    height: 50,
    alignContent: "center",
    backgroundColor: theme.colors.primary,
  },
  TableText: { 
    color: theme.colors.secondary,
    margin: 10
  },
  border: {
    borderWidth: 2,
    borderColor: theme.colors.secondary
  },
});