import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  ActivityIndicator,
  FlatList,
  TextInput,
  Modal,
  Image,
  ScrollView,
  Dimensions,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';
import {callAPI} from '../ActionCreators/callAction';
import {API_URL} from '../config';
import {Colors, Images} from '../theme';
import {BarChart} from 'react-native-chart-kit';

const PokedexScreen = () => {
  const [text, setText] = useState('');
  const [showDetails, setShowDetails] = useState(false);
  const [sortType, setSortType] = useState('ASC');
  const [filteredList, setFilteredList] = useState([]);
  const [isFiltered, setIsFiltered] = useState(false);
  const [detailsChart, setDetailsChart] = useState({
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43],
      },
    ],
  });
  const chartConfig = {
    backgroundGradientFrom: '#1E2923',
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: '#08130D',
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => '#000000',
    // color:"#FFFFFF",
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.9,
    useShadowColorFromDataset: false, // optional
  };

  const response = useSelector(state => state);
  const dispatch = useDispatch();
  const {isLoading, data, error, pokemonList, pokemonDetails} =
    response.callReducer;

  useEffect(() => {
    dispatch(callAPI(API_URL, 'list'));
  }, []);

  useEffect(() => {
    if (pokemonDetails) {
      const label = [];
      const data = [];
      pokemonDetails?.stats?.map(item => {
        label.push(item?.stat?.name);
        data.push(item?.base_stat);
      });
      const newData = {labels: label, datasets: [{data: data}]};
      setDetailsChart(newData);
      console.log(' push ', newData);
    }
  }, [response.callReducer]);

  const tableFooter = () => {
    return (
      <View style={styles.tableHeader}>
        <ActivityIndicator
          size={'large'}
          color={Colors.appColorLightMain}
          style={{marginVertical: 10}}
        />
      </View>
    );
  };

  return (
    <SafeAreaView edges={['top']} style={styles.container}>
      <View style={styles.container}>
        <View style={styles.navigationBar}>
          <Text style={styles.title}>POKEMON LIST</Text>
        </View>
        <View style={styles.mainView}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingHorizontal: 10,
            }}>
            <TextInput
              style={styles.searchField}
              keyboardType="ascii-capable"
              placeholder="Search..."
              value={text}
              onChange={field => {
                setIsFiltered(true);
                let newData = [...pokemonList];
                newData = newData.filter(item =>
                  item?.name
                    ?.toUpperCase()
                    .includes(field?.nativeEvent?.text?.toUpperCase()),
                );
                setFilteredList(newData);
                setText(field?.nativeEvent?.text);
              }}
            />
            <TouchableOpacity
              style={styles.icon}
              onPress={() => {
                setIsFiltered(true);
                let newData = [...pokemonList];
                if (sortType == 'ASC') {
                  newData = newData.sort(
                    (item1, item2) => item1?.name > item2?.name,
                  );
                } else {
                  newData = newData.sort(
                    (item1, item2) => item1?.name < item2?.name,
                  );
                }
                setFilteredList(newData);
                setSortType(sortType == 'ASC' ? 'DESC' : 'ASC');
              }}>
              <Image
                source={Images.sort}
                style={{
                  height: 25,
                  aspectRatio: 1,
                  transform: [{rotate: sortType == 'DESC' ? '180deg' : '0deg'}],
                }}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.icon}
              onPress={() => {
                setText('');
                setIsFiltered(false);
              }}>
              <Image
                source={Images.filter}
                style={{height: 25, aspectRatio: 1}}
              />
            </TouchableOpacity>
          </View>
          <FlatList
            data={isFiltered ? filteredList : pokemonList}
            keyExtractor={(item, index) => index.toString()}
            ListFooterComponent={isLoading && tableFooter}
            onEndReachedThreshold={0.1}
            onEndReached={() => {
              console.log('End Reached:- ');
              if (data?.next && !isFiltered) {
                dispatch(callAPI(data?.next, 'list'));
              }
            }}
            enableEmptySections={true}
            renderItem={({item, index}) => {
              return (
                <TouchableOpacity
                  key={index.toString()}
                  onPress={() => {
                    setShowDetails(true);
                    dispatch(callAPI(item?.url, 'details'));
                  }}>
                  <View style={styles.listItem}>
                    <View style={[styles.icon, {height: 40}]}>
                      <View style={styles.iconMini} />
                    </View>
                    <Text style={styles.cellTitle}>
                      {item?.name.toUpperCase()}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            }}
          />
        </View>
      </View>
      <Modal
        animationType="fade"
        transparent={true}
        visible={showDetails}
        onRequestClose={() => {
          setShowDetails(!showDetails);
        }}>
        <View style={styles.modalMain}>
          <ScrollView>
            <View style={styles.modalView}>
              <View style={{alignItems: 'center', justifyContent: 'center'}}>
                <Text style={styles.title}>POKEMON DETAILS</Text>
              </View>
              <View style={{alignItems: 'center', paddingVertical: 20}}>
                <Image
                  style={styles.pokemonImage}
                  source={{uri: pokemonDetails?.sprites?.front_default}}
                />
                <Text style={[styles.title, {fontSize: 18, marginTop: 10}]}>
                  {pokemonDetails?.name?.toUpperCase()}
                </Text>
              </View>
              <View style={{marginVertical: 10}}>
                <View style={{flexDirection: 'row'}}>
                  <View
                    style={{
                      borderWidth: 2,
                      borderColor: Colors.white,
                      alignItems: 'center',
                      flex: 4,
                    }}>
                    <Text
                      style={[
                        styles.title,
                        {fontSize: 18, paddingVertical: 5, textAlign: 'left'},
                      ]}>
                      {'NAME'}
                    </Text>
                  </View>
                  <View
                    style={{
                      borderWidth: 2,
                      borderColor: Colors.white,
                      alignItems: 'center',
                      flex: 2,
                    }}>
                    <Text
                      style={[
                        styles.title,
                        {fontSize: 18, paddingVertical: 5, textAlign: 'left'},
                      ]}>
                      {'BASE'}
                    </Text>
                  </View>
                </View>
                {pokemonDetails?.stats?.map((item, index) => {
                  return (
                    <View key={index.toString()} style={{flexDirection: 'row'}}>
                      <View
                        style={{
                          borderWidth: 1,
                          borderColor: Colors.white,
                          alignItems: 'center',
                          flex: 4,
                        }}>
                        <Text
                          style={[
                            styles.title,
                            {
                              fontSize: 18,
                              paddingVertical: 5,
                              textAlign: 'left',
                            },
                          ]}>
                          {item?.stat?.name?.toUpperCase()}
                        </Text>
                      </View>
                      <View
                        style={{
                          borderWidth: 1,
                          borderColor: Colors.white,
                          alignItems: 'center',
                          flex: 2,
                        }}>
                        <Text
                          style={[
                            styles.title,
                            {
                              fontSize: 18,
                              paddingVertical: 5,
                              textAlign: 'left',
                            },
                          ]}>
                          {item?.base_stat}
                        </Text>
                      </View>
                    </View>
                  );
                })}
              </View>
              <View style={{marginBottom: 20}}>
                <ScrollView horizontal>
                  <BarChart
                    data={detailsChart}
                    width={Dimensions.get('screen').width * 1.5}
                    height={250}
                    chartConfig={{
                      backgroundColor: Colors.clear,
                      backgroundGradientFrom: Colors.clear,
                      backgroundGradientTo: Colors.clear,
                      decimalPlaces: 0,
                      color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                      labelColor: (opacity = 1) =>
                        `rgba(255, 255, 255, ${opacity})`,
                      style: {
                        borderRadius: 16,
                      },
                      propsForDots: {
                        r: '6',
                        strokeWidth: '2',
                        stroke: '#ffa726',
                      },
                    }}
                    verticalLabelRotation={30}
                  />
                </ScrollView>
              </View>
              <TouchableOpacity
                style={[styles.icon, {alignSelf: 'center'}]}
                onPress={() => {
                  setShowDetails(false);
                }}>
                <Image
                  source={Images.close}
                  style={{height: 25, aspectRatio: 1}}
                />
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.appColorDarkMain,
    flex: 1,
  },
  navigationBar: {
    height: 40,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20,
    color: 'white',
  },
  searchField: {
    height: 50,
    backgroundColor: Colors.appColorLightMain,
    color: Colors.appColorDarkMain,
    borderRadius: 30,
    fontSize: 18,
    paddingHorizontal: 20,
    marginVertical: 10,
    flex: 1,
  },
  mainView: {
    flex: 1,
  },
  listItem: {
    width: '100%',
    marginVertical: 5,
    flexDirection: 'row',
    paddingHorizontal: 10,
    alignItems: 'center',
    paddingVertical: 10,
  },
  icon: {
    height: 50,
    aspectRatio: 1,
    backgroundColor: Colors.white,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconMini: {
    height: 20,
    aspectRatio: 1,
    borderRadius: 30,
    backgroundColor: Colors.appColorDarkMain,
  },
  cellTitle: {
    marginLeft: 10,
    color: Colors.white,
    fontWeight: 'bold',
    fontSize: 20,
  },
  modalMain: {
    flex: 1,
    backgroundColor: Colors.lightBlack,
  },
  modalView: {
    margin: 15,
    padding: 20,
    borderRadius: 10,
    backgroundColor: Colors.appColorDarkMain,
    flex: 1,
  },
  pokemonImage: {
    height: 150,
    aspectRatio: 1,
    borderRadius: 150,
    backgroundColor: Colors.white,
  },
});

export default PokedexScreen;
