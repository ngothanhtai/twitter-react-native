/**
 * Created by tai on 3/26/17.
 */

import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import {
  getHeaders,
} from 'react-native-simple-auth/lib/utils/oauth1';

import { twitter, } from 'react-native-simple-auth';

const config = {
  // consumerKey: 'Your Consumer Key (API Key)',
  // consumerSecret: 'Your Consumer Secret (API Secret)',
};
export default class App extends Component {
  constructor(props) {
    super(props);
  }

  async _loginWithTwitter() {
    try {
      const info = await twitter({
        appId: config.consumerKey,
        appSecret: config.consumerSecret,
        callback: 'rncs://authorize',
      });

      console.log('info', info);
      this._getHomeTimeline(info);
      this._getProfileTimeline(info);

    } catch (error) {
      console.log('error', error);
    }
  }

  async _getHomeTimeline(info, params = {}) {
    const { credentials: { oauth_token, oauth_token_secret } } = info;
    const httpMethod = 'GET';
    const url = 'https://api.twitter.com/1.1/statuses/home_timeline.json';
    const headers = getHeaders(url, params, {}, config.consumerKey, config.consumerSecret, httpMethod, oauth_token, oauth_token_secret);

    const response = await fetch(url, {
      method: httpMethod,
      headers,
    });
    const json = await response.json();
    console.log('home_timeline', json);
  }

  async _getProfileTimeline(info, params = {}) {
    const { credentials: { oauth_token, oauth_token_secret } } = info;
    const httpMethod = 'GET';
    const url = 'https://api.twitter.com/1.1/statuses/user_timeline.json';
    const headers = getHeaders(url, params, {}, config.consumerKey, config.consumerSecret, httpMethod, oauth_token, oauth_token_secret);

    const response = await fetch(url, {
      method: httpMethod,
      headers,
    });
    const json = await response.json();
    console.log('user_timeline', json);
  }

  render() {

    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center', justifyContent: 'center',
        }}
      >
        <TouchableOpacity
          onPress={() => this._loginWithTwitter()}
          style={{
            paddingVertical: 10, paddingHorizontal: 20,
            backgroundColor: 'steelblue',
            borderRadius: 6,
          }}
        >
          <Text style={{color: '#fff'}}>Login with Twitter</Text>
        </TouchableOpacity>
      </View>
    )
  }
}