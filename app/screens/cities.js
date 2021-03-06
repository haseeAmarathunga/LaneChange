import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, ScrollView, Button, Alert, Linking, Image, TouchableOpacity, SafeAreaView } from 'react-native';
import { connect } from 'react-redux';
import { headerButtonStyle } from 'app/navigation/headerStyle';
import MenuItem from 'app/components/menuItem';
import LoadingView from 'app/components/loadingview';
import { setChosenCity } from 'app/actions/cities';
import consolelog from 'app/utils/logging';

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    backgroundColor: '#f7f7f7',
  },
  scrollview: {
    backgroundColor: '#f7f7f7',
  },
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
    paddingBottom: 20,
  },
  version: {
    alignItems: 'center',
  },
  versionText: {
    fontSize: 14,
    lineHeight: 24,
    color: '#878787',
  },
  linkText: {
    fontSize: 14,
    lineHeight: 24,
    color: '#019864',
  },
  headerButton: headerButtonStyle,
});

const backArrowIcon = require('app/assets/img/backArrowIcon.png');

class Cities extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: 'Choose your City',
    headerLeft: (
      <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity
          style={styles.headerButton}
          onPress={() => navigation.state.params.backPressed()}
        >
          <Image source={backArrowIcon} />
        </TouchableOpacity>
      </View>
    ),
    headerRight: undefined,
  });

  constructor(props) {
    super(props);
    this.state = {
    };

    this.backPressed = this.backPressed.bind(this);
  }

  componentDidMount() {
    this.props.navigation.setParams({
      backPressed: this.backPressed,
    });
  }

  backPressed = () => {
    this.props.navigation.pop();
  }

  render() {
    const { showLoading } = this.state;
    const { cities } = this.props.cities;
    const { chosenCity } = this.props.cities;
    consolelog('DEBUG cities screen: chosenCity is');
    consolelog(chosenCity);
    let foundSelected = false;
    let cityElements = cities.map((cityMapped, index) => {
      const city = JSON.parse(JSON.stringify(cityMapped));
      const { name, email } = city;
      let retval = (
        <MenuItem
          key={name}
          title={name}
          rightTitle={email}
          onPress={() => this.props.setChosenCity(city)}
          noChevron
        />
      );
      if (city.name === chosenCity.name) {
        foundSelected = true;
        retval = React.cloneElement(retval, { selected: true });
      }
      if (cities.length - 1 === index && foundSelected) {
        retval = React.cloneElement(retval, { last: true });
      }
      return retval;
    });
    if (!foundSelected) {
      const unknownCity = (
        <MenuItem
          key={chosenCity.name}
          title={chosenCity.name}
          onPress={() => {}}
          last
          selected
          noChevron
        />
      );
      cityElements.push(unknownCity);
    }

    return (
      <SafeAreaView style={styles.wrap}>
        <ScrollView style={styles.scrollview}>
          <View style={styles.container}>
            {cityElements}

            <View style={styles.version}>
              <Text style={styles.versionText}>Want your city added? Email us at</Text>
              <TouchableOpacity onPress={() => {
                Linking.openURL('mailto://lanechange@solodigitalis.com')
                  .catch(() => {});
              }}>
                <Text style={styles.linkText}>lanechange@solodigitalis.com</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
        {!!showLoading && (
          <LoadingView />
        )}
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => ({
  cities: state.cities,
});

const mapDispatchToProps = dispatch => ({
  setChosenCity: city => dispatch(setChosenCity(city)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Cities);
