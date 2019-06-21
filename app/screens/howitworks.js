import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Button, Alert, Linking, Image, SafeAreaView, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import DefaultButton from 'app/components/button';
import { navigateToReport } from 'app/actions/ui';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#019864',
  },
  scrollview: {
    flex: 1,
  },
  logoWrap: {
    alignItems: 'center',
    paddingVertical: 60,
  },
  reportButton: {
    padding: 20,
  },
  stepWrap: {
    marginHorizontal: 30,
    paddingTop: 20,
  },
  step: {
    flexDirection: 'row',
    paddingBottom: 30,
    marginBottom: 30,
    borderBottomColor: '#4DB792',
    borderBottomWidth: 1,
  },
  stepLast: {
    flexDirection: 'row',
    paddingBottom: 30,
    marginBottom: 30,
  },
  icon: {
    marginRight: 30,
    marginTop: 5,
  },
  stepTextWrap: {
    flex: 1,
    flexGrow: 1,
  },
  stepHeader: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  stepText: {
    fontSize: 14,
    color: '#B3E0D0',
  },
});

const logo = require('app/assets/img/logo.png');
const cameraIconTranslucent = require('app/assets/img/cameraIconTranslucent.png');
const emailIconTranslucent = require('app/assets/img/emailIconTranslucent.png');
const sendIconTranslucent = require('app/assets/img/sendIconTranslucent.png');

class HowItWorks extends Component {
  static navigationOptions = () => ({ header: null });

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollview}>
          <View style={styles.logoWrap}>
            <Image source={logo} style={styles.logo} />
          </View>
          <View style={styles.stepWrap}>
            <View style={styles.step}>
              <Image source={cameraIconTranslucent} style={styles.icon} />
              <View style={styles.stepTextWrap}>
                <Text style={styles.stepHeader}>Take a Photo</Text>
                <Text style={styles.stepText}>Use your location & add a note</Text>
              </View>
            </View>
            <View style={styles.step}>
              <Image source={emailIconTranslucent} style={styles.icon} />
              <View style={styles.stepTextWrap}>
                <Text style={styles.stepHeader}>Create an Email</Text>
                <Text style={styles.stepText}>This will open your email app</Text>
              </View>
            </View>
            <View style={styles.stepLast}>
              <Image source={sendIconTranslucent} style={styles.icon} />
              <View style={styles.stepTextWrap}>
                <Text style={styles.stepHeader}>Send to City Hall</Text>
                <Text style={styles.stepText}>Report your mobility incident by just tapping Send</Text>
              </View>
            </View>
          </View>
          <View style={styles.reportButton}>
            <DefaultButton
              title="Create a Report"
              onPress={() => {
                this.props.navigateToReport(this.props.navigation);
              }}
              solid
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => ({
  reports: state.reports,
  ui: state.ui,
});

const mapDispatchToProps = dispatch => ({
  navigateToReport: navigation => dispatch(navigateToReport(navigation)),
});

export default connect(mapStateToProps, mapDispatchToProps)(HowItWorks);
