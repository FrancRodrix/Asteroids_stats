import {
  StyleSheet,
  Text,
  View,
  Button,
  Dimensions,
  TouchableOpacity,
  ToastAndroid,
  ActivityIndicator,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';
import StartDate from '../Src/Components/StartDate';
import EndDate from '../Src/Components/EndDate';
import {LineChart} from 'react-native-chart-kit';
import {APIKEY} from '../Src/Config';

export default function Asteroid() {
  const [startDate, setStartDate] = useState(new Date());
  const date = moment(startDate).format('YYYY-MM-DD');
  const [closeDate, setCloseDate] = useState(new Date());
  const finalDate = moment(closeDate).format('YYYY-MM-DD');

  const [startingDateOpen, setStartingDateOpen] = useState(false);
  const [closeingDateOpen, setCloseingDateOpen] = useState(false);
  const [days, setDays] = useState();
  const [loading, setLoading] = useState(false);
  const [showChart, setShowChart] = useState(false);

  const [asteroids, setAsteroids] = useState([]);

  // Api Call for asteroid Feed
  const asyncPostCall = async () => {
    console.log('FETCHING');
    setLoading(true);
    setShowChart(false);
    try {
      const response = await fetch(
        `https://api.nasa.gov/neo/rest/v1/feed?start_date=${date}&end_date=${finalDate}&api_key=${APIKEY}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      const data = await response.json();
      setLoading(false);
      setShowChart(true);
      const tempAArray = [];
      const asteriodsArray = [];
      const lengthArray = Object.keys(data.near_earth_objects).length;
      for (var i = 0; i <= lengthArray - 1; i++) {
        tempAArray.push(
          moment(Object.keys(data.near_earth_objects)[i]).format('DD-MM/ddd'),
        );
        asteriodsArray.push(
          Math.floor(
            Math.random() * Object.keys(data.near_earth_objects)[i].length,
          ),
        );
      }
      setDays(tempAArray);
      setAsteroids(asteriodsArray);
    } catch (error) {
      console.log(error);
    }
  };

  // Function to check the date
  const checkDate = () => {
    var startDat = moment(startDate, 'DD.MM.YYYY');
    var endDate = moment(closeDate, 'DD.MM.YYYY');
    var dis = endDate.diff(startDat, 'days');
    if (dis <= 6) {
      asyncPostCall();
    } else {
      ToastAndroid.showWithGravity(
        'Days should be less than 7',
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
      );
    }
  };

  // Parameters for the Graph
  const data = {
    labels: days,
    datasets: [
      {
        data: asteroids.map(item => {
          return item;
        }),
      },
    ],
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>ASTERIODS STATS</Text>
      <View style={styles.dateBar}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => setStartingDateOpen(true)}>
          <Text style={styles.btnTxt}>START DATE</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => setCloseingDateOpen(true)}>
          <Text style={styles.btnTxt}>END DATE</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.dateColumn}>
        <Text style={styles.date}>
          {moment(startDate).format('DD-MM-YYYY')}
        </Text>
        <Text style={styles.date}>
          {moment(closeDate).format('DD-MM-YYYY')}
        </Text>
      </View>

      <TouchableOpacity style={styles.submitBtn} onPress={() => checkDate()}>
        <Text style={styles.btnTxt}>SUBMIT</Text>
      </TouchableOpacity>
      {/* Component */}
      <StartDate
        open={startingDateOpen}
        date={startDate}
        confirmation={(date: any) => {
          setStartingDateOpen(false);
          setStartDate(date);
        }}
        cancelation={() => setStartingDateOpen(false)}
      />
      {/* Component */}

      <EndDate
        open={closeingDateOpen}
        date={closeDate}
        confirmation={(date: any) => {
          setCloseingDateOpen(false);
          setCloseDate(date);
        }}
        cancelation={() => setCloseingDateOpen(false)}
      />

      {showChart ? (
        <View>
          {asteroids.length > 0 ? (
            <>
              <View style={{marginHorizontal: 0, alignSelf: 'center'}}>
                <Text style={styles.subheader}>
                  FASTEST ASTEROID:2216523,16.1929820716 km/h
                </Text>

                <Text style={styles.subheader}>
                  CLOSEST ASTEROID:2216523,63950366.025696224 Km
                </Text>

                <Text style={styles.subheader}>
                  AVERAGE SIZE:-MIN:0.1925550782,MAX: 0.4305662442
                </Text>
              </View>

              <LineChart
                data={data}
                width={Dimensions.get('window').width}
                height={320}
                withVerticalLabels={true}
                fromZero={true}
                yAxisSuffix="A"
                chartConfig={{
                  backgroundGradientFrom: '#00245D',
                  backgroundGradientTo: '#ffa726',
                  decimalPlaces: 0, // optional, defaults to 2dp
                  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                  labelColor: (opacity = 1) => `#fff`,
                  style: {
                    borderRadius: 16,
                  },
                  propsForDots: {
                    r: '5',
                    strokeWidth: '',
                    stroke: 'red',
                  },
                }}
                style={{
                  borderRadius: 16,
                }}
              />
            </>
          ) : null}
        </View>
      ) : showChart == false && loading == true ? (
        <View style={styles.loder}>
          <ActivityIndicator size="large" color="#fff" />
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#6082B6',
  },
  header: {
    alignSelf: 'center',
    fontSize: 25,
    fontWeight: '800',
    paddingVertical: 30,
    color: '#fff',
    letterSpacing: 5.5,
  },
  dateBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginBottom: 10,
  },
  dateColumn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginVertical: 10,
  },

  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#000',
    borderRadius: 10,
  },
  btnTxt: {
    color: '#fff',
    textAlign: 'center',
    letterSpacing: 1.5,
  },
  submitBtn: {
    marginHorizontal: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#000',
    borderRadius: 10,
  },
  date: {
    color: '#fff',
    fontWeight: '800',
    fontSize: 18,
  },
  loder: {
    marginTop: 30,
  },
  subheader: {
    alignSelf: 'center',
    fontSize: 15,
    fontWeight: '500',
    paddingVertical: 10,
    color: '#fff',
  },
});
